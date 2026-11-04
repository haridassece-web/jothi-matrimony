import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

const PAYU_KEY = process.env.PAYU_KEY || process.env.NEXT_PUBLIC_PAYU_KEY || '';
const PAYU_SALT = process.env.PAYU_SALT || '';

const PAYU_URL =
  process.env.PAYU_ENV === 'production'
    ? 'https://secure.payu.in/_payment'
    : 'https://test.payu.in/_payment';

function sha512(value) {
  return crypto.createHash('sha512').update(value).digest('hex');
}

function generatePaymentHash(data) {
  const hashString = [
    PAYU_KEY,
    data.txnid,
    data.amount,
    data.productinfo,
    data.firstname,
    data.email,
    data.udf1 || '',
    data.udf2 || '',
    data.udf3 || '',
    data.udf4 || '',
    data.udf5 || '',
    '',
    '',
    '',
    '',
    '',
    '',
    PAYU_SALT,
  ].join('|');

  return sha512(hashString);
}

export async function POST(request) {
  try {
    let body = {};
    try {
      body = await request.json();
    } catch {
      // Empty or invalid JSON
    }

    const { userId, firstname, email, phone } = body;

    if (!userId || !firstname || !email || !phone) {
      return NextResponse.json(
        { message: 'Required member details missing' },
        { status: 400 }
      );
    }

    // Amount is controlled by backend
    const amount = '1000.00';

    const txnid =
      'CJM' + Date.now() + Math.random().toString(36).slice(2, 7);

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
                    process.env.API_URL || 
                    'https://www.chennaijothimatrimony.com';

    const payment = {
      key: PAYU_KEY,
      txnid,
      amount,
      productinfo: 'Chennai Jothi Matrimony Membership',
      firstname: String(firstname).trim(),
      email: String(email).trim().toLowerCase(),
      phone: String(phone).replace(/\D/g, '').slice(-10),

      udf1: String(userId),
      udf2: '',
      udf3: '',
      udf4: '',
      udf5: '',

      surl: `${baseUrl}/api/payment/success`,
      furl: `${baseUrl}/api/payment/failure`,
    };

    payment.hash = generatePaymentHash(payment);

    // Save pending transaction to Supabase if configured
    const supabaseUrl = process.env.SUPABASE_URL || 'https://mjcbbjwttlteiqnntuet.supabase.co';
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey);
        await supabase.from('membership_payments').insert({
          user_id: userId,
          txnid,
          amount: parseFloat(amount),
          gateway: 'PayU',
          status: 'pending'
        });
      } catch (dbErr) {
        console.warn('[Next.js PayU DB Pending Warning]:', dbErr.message);
      }
    }

    return NextResponse.json({
      paymentUrl: PAYU_URL,
      paymentData: payment,
    });
  } catch (error) {
    console.error('[PayU Next.js Create Route Error]:', error);
    return NextResponse.json(
      { message: 'Unable to initiate payment', error: error.message },
      { status: 500 }
    );
  }
}
