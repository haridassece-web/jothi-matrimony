import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(request) {
  try {
    let body = {};
    try {
      body = await request.json();
    } catch {
      // Empty or non-JSON body, will use defaults
    }

    const { amount, currency = 'INR', receipt, notes } = body;

    // Minimum amount: 100 paise (₹1)
    const parsedAmount = typeof amount === 'number' 
      ? amount 
      : (parseInt(amount, 10) || 1000 * 100); // Default ₹1,000 (100,000 paise)

    if (parsedAmount < 100) {
      return NextResponse.json(
        { error: 'Amount must be at least 100 paise (₹1)' },
        { status: 400 }
      );
    }

    const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_TuxtCKUR66AmyF';
    const keySecret = process.env.RAZORPAY_KEY_SECRET || 'mniToCh9JHutflRqXTijMIXk';

    try {
      const razorpay = new Razorpay({
        key_id: keyId,
        key_secret: keySecret,
      });

      const order = await razorpay.orders.create({
        amount: parsedAmount,
        currency: currency.toUpperCase(),
        receipt: receipt || `rcpt_${Date.now()}`,
        notes: notes || {
          purpose: 'Chennai Jothi Matrimony 1-Year Registration Fee'
        }
      });

      return NextResponse.json({
        order_id: order.id,
        amount: order.amount,
        currency: order.currency,
        key_id: keyId
      });
    } catch (rzpError) {
      console.error('Razorpay orders.create failed:', rzpError);
      const statusCode = rzpError.statusCode || rzpError.status || 500;
      const desc = rzpError.error?.description || rzpError.message || 'Razorpay order creation failed';
      
      return NextResponse.json(
        { 
          error: `Razorpay Order Error (${statusCode}): ${desc}. Please verify that your Key ID and Key Secret in Razorpay Dashboard are active.`,
          details: desc
        },
        { status: statusCode }
      );
    }
  } catch (error) {
    console.error('Internal server error in /api/create-order:', error);
    return NextResponse.json(
      { error: 'Failed to create Razorpay order', details: error.message },
      { status: 500 }
    );
  }
}
