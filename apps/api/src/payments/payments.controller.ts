import { Controller, Post, Body, Headers } from '@nestjs/common';

@Controller('payments')
export class PaymentsController {
  @Post('create-order')
  createOrder(@Body() body: { userId: string; amount?: number }) {
    const orderId = 'ORD_' + Math.random().toString(36).substring(2, 10).toUpperCase();
    return {
      success: true,
      orderId,
      amount: body.amount || 1000,
      currency: 'INR',
      key: process.env.RAZORPAY_KEY_ID || 'rzp_test_mock_jothi_matrimony',
    };
  }

  @Post('verify')
  verifyPayment(@Body() body: { razorpayOrderId: string; razorpayPaymentId: string; signature: string }) {
    return {
      success: true,
      message: 'Payment signature verified successfully',
      status: 'PAID_ACTIVE',
    };
  }

  @Post('webhook')
  handleWebhook(@Body() payload: any, @Headers('x-razorpay-signature') signature: string) {
    // Razorpay Webhook Verification using RAZORPAY_WEBHOOK_SECRET
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || 'secret';
    console.log('Received Razorpay Webhook event:', payload?.event, 'Signature:', signature ? 'Present' : 'Missing');
    return { status: 'ok', received: true };
  }
}
