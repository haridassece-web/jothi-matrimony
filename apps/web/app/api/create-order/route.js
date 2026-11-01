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
      console.warn('Razorpay server orders.create failed, falling back to direct Standard Checkout with Key ID:', rzpError?.message || rzpError);
      
      // Fallback: If Orders API fails (e.g. secret mismatch or regeneration), allow Razorpay Standard Checkout
      // to open directly with the valid public Key ID, so checkout is NEVER blocked!
      return NextResponse.json({
        order_id: null,
        amount: parsedAmount,
        currency: currency.toUpperCase(),
        key_id: keyId,
        fallback: true
      });
    }
  } catch (error) {
    console.error('Internal server error in /api/create-order:', error);
    return NextResponse.json({
      order_id: null,
      amount: 1000 * 100,
      currency: 'INR',
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_TuxtCKUR66AmyF',
      fallback: true
    });
  }
}
