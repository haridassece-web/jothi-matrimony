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

    const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json(
        { error: 'Razorpay API credentials not configured' },
        { status: 401 }
      );
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    try {
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
      console.error('Razorpay orders.create API error:', rzpError);
      const statusCode = rzpError.statusCode || rzpError.status || 500;
      if (statusCode === 401) {
        return NextResponse.json(
          { error: 'Razorpay authentication failed. Invalid Key ID or Key Secret.', details: rzpError.error?.description || rzpError.message },
          { status: 401 }
        );
      }
      return NextResponse.json(
        { error: 'Razorpay order creation failed', details: rzpError.error?.description || rzpError.message },
        { status: 500 }
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
