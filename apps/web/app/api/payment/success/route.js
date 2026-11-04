import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

const PAYU_KEY = process.env.PAYU_KEY || process.env.NEXT_PUBLIC_PAYU_KEY || '';
const PAYU_SALT = process.env.PAYU_SALT || '';

function sha512(value) {
  return crypto.createHash('sha512').update(value).digest('hex');
}

function verifyPaymentHash(data) {
  const {
    txnid,
    amount,
    productinfo,
    firstname,
    email,
    status,
    udf1 = '',
    udf2 = '',
    udf3 = '',
    udf4 = '',
    udf5 = '',
    additionalCharges,
    hash
  } = data;

  let hashSequence = [
    status,
    '',
    '',
    '',
    '',
    '',
    udf5,
    udf4,
    udf3,
    udf2,
    udf1,
    email,
    firstname,
    productinfo,
    amount,
    txnid,
    PAYU_KEY
  ].join('|');

  let hashString = `${PAYU_SALT}|${hashSequence}`;

  if (additionalCharges) {
    hashString = `${additionalCharges}|${hashString}`;
  }

  const calculatedHash = sha512(hashString);
  return calculatedHash.toLowerCase() === (hash || '').toLowerCase();
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const data = {};
    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }

    const txnid = data.txnid || '';
    const mihpayid = data.mihpayid || '';
    const userId = data.udf1 || '';

    // Verify hash if salt is configured
    if (PAYU_SALT) {
      const isValid = verifyPaymentHash(data);
      if (!isValid) {
        console.error('[PayU Route] Invalid hash detected on success callback');
      }
    }

    // Update Supabase
    const supabaseUrl = process.env.SUPABASE_URL || 'https://mjcbbjwttlteiqnntuet.supabase.co';
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey);
        await supabase
          .from('membership_payments')
          .update({
            status: 'success',
            gateway_payment_id: mihpayid,
            paid_at: new Date().toISOString()
          })
          .eq('txnid', txnid);

        if (userId) {
          await supabase
            .from('users')
            .update({
              payment_status: 'PAID',
              registration_status: 'PAID_ACTIVE',
              membership_status: 'Active Paid Member',
              updated_at: new Date().toISOString()
            })
            .eq('id', userId);
        }
      } catch (dbErr) {
        console.warn('[PayU DB Success Update Warning]:', dbErr.message);
      }
    }

    const url = new URL('/payment/success', request.url);
    url.searchParams.set('payu_payment_id', mihpayid);
    url.searchParams.set('txnid', txnid);
    return NextResponse.redirect(url, { status: 303 });
  } catch (err) {
    console.error('[PayU Success Route Exception]:', err);
    const url = new URL('/payment/success', request.url);
    return NextResponse.redirect(url, { status: 303 });
  }
}

export async function GET(request) {
  const url = new URL('/payment/success', request.url);
  return NextResponse.redirect(url);
}
