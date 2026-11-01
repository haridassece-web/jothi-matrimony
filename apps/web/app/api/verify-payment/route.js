import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request) {
  try {
    let body = {};
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON request payload' },
        { status: 400 }
      );
    }

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId
    } = body;

    // Validate missing fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields. Both razorpay_order_id, razorpay_payment_id, and razorpay_signature are required.'
        },
        { status: 400 }
      );
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return NextResponse.json(
        { success: false, error: 'Server configuration error: RAZORPAY_KEY_SECRET is missing.' },
        { status: 500 }
      );
    }

    // Algorithm: HMAC-SHA256(order_id + "|" + payment_id, KEY_SECRET)
    const hmac = crypto.createHmac('sha256', keySecret);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generatedSignature = hmac.digest('hex');

    // Compare generated signature with razorpay_signature
    const isSignatureValid = crypto.timingSafeEqual(
      Buffer.from(generatedSignature),
      Buffer.from(razorpay_signature)
    );

    if (!isSignatureValid) {
      // Signature mismatch: return 400, do NOT mark as paid
      return NextResponse.json(
        {
          success: false,
          error: 'Payment verification failed: signature mismatch.',
          marked_paid: false
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully',
      razorpay_order_id,
      razorpay_payment_id,
      userId: userId || null
    });
  } catch (error) {
    console.error('Error verifying Razorpay payment signature:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error verifying payment', details: error.message },
      { status: 500 }
    );
  }
}
