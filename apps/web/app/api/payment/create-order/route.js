import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { userId } = await request.json();

    const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    const amountInPaise = 1000 * 100; // ₹1,000 in paise

    if (keyId && keySecret) {
      const authHeader = 'Basic ' + Buffer.from(`${keyId}:${keySecret}`).toString('base64');
      
      const rzpRes = await fetch('https://api.razorpay.com/v1/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authHeader,
        },
        body: JSON.stringify({
          amount: amountInPaise,
          currency: 'INR',
          receipt: `receipt_${userId || 'guest'}_${Date.now()}`,
          notes: {
            userId: userId || 'unknown',
            purpose: '1 Year Matrimony Registration Fee'
          }
        })
      });

      const rzpData = await rzpRes.json();

      if (rzpData.id) {
        return NextResponse.json({
          id: rzpData.id,
          amount: rzpData.amount,
          currency: rzpData.currency
        });
      }
    }

    // Fallback Mock Order ID for local testing if production keys are not yet configured
    const mockOrderId = `order_${Math.random().toString(36).substring(2, 12)}`;
    return NextResponse.json({
      id: mockOrderId,
      amount: amountInPaise,
      currency: 'INR'
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json(
      { error: 'Failed to create order', details: error.message },
      { status: 500 }
    );
  }
}
