import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const data = {};
    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }

    const txnid = data.txnid || '';
    const mihpayid = data.mihpayid || '';

    const supabaseUrl = process.env.SUPABASE_URL || 'https://mjcbbjwttlteiqnntuet.supabase.co';
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey && txnid) {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey);
        await supabase
          .from('membership_payments')
          .update({
            status: 'failed',
            gateway_payment_id: mihpayid || null
          })
          .eq('txnid', txnid);
      } catch (dbErr) {
        console.warn('[PayU DB Failure Update Warning]:', dbErr.message);
      }
    }

    const url = new URL('/payment', request.url);
    url.searchParams.set('error', 'payment_failed');
    if (txnid) url.searchParams.set('txnid', txnid);
    return NextResponse.redirect(url, { status: 303 });
  } catch (err) {
    console.error('[PayU Failure Route Exception]:', err);
    const url = new URL('/payment', request.url);
    return NextResponse.redirect(url, { status: 303 });
  }
}

export async function GET(request) {
  const url = new URL('/payment', request.url);
  url.searchParams.set('error', 'payment_failed');
  return NextResponse.redirect(url);
}
