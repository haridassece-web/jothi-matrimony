import { Controller, Post, Body, Headers, BadRequestException } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller(['payments', 'api/payment'])
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-order')
  async createOrder(
    @Body()
    body: {
      userId?: string;
      amount?: number;
      currency?: string;
      receipt?: string;
      notes?: any;
    },
  ) {
    const amountInPaise = body.amount !== undefined ? Number(body.amount) : 1000 * 100;
    if (amountInPaise < 100) {
      throw new BadRequestException('Amount must be at least 100 paise (₹1)');
    }
    return this.paymentsService.createOrder(
      body.userId || 'guest',
      amountInPaise,
      body.currency || 'INR',
      body.receipt,
    );
  }

  @Post('verify-payment')
  async verifyPaymentStandard(
    @Body()
    body: {
      razorpay_order_id: string;
      razorpay_payment_id: string;
      razorpay_signature: string;
      userId?: string;
    },
  ) {
    if (!body.razorpay_order_id || !body.razorpay_payment_id || !body.razorpay_signature) {
      throw new BadRequestException(
        'Missing required fields: razorpay_order_id, razorpay_payment_id, and razorpay_signature are required',
      );
    }

    const isValid = this.paymentsService.verifySignature(
      body.razorpay_order_id,
      body.razorpay_payment_id,
      body.razorpay_signature,
    );

    if (!isValid) {
      throw new BadRequestException('Signature verification failed: invalid signature');
    }

    if (body.userId) {
      await this.paymentsService.activateMembership(
        body.userId,
        body.razorpay_order_id,
        body.razorpay_payment_id,
        1000,
      );
    }

    return {
      success: true,
      message: 'Payment verified successfully',
      order_id: body.razorpay_order_id,
      payment_id: body.razorpay_payment_id,
    };
  }

  @Post('verify')
  async verifyPayment(
    @Body()
    body: {
      userId: string;
      razorpayOrderId?: string;
      razorpayPaymentId?: string;
      razorpaySignature?: string;
      razorpay_order_id?: string;
      razorpay_payment_id?: string;
      razorpay_signature?: string;
    },
  ) {
    const orderId = body.razorpayOrderId || body.razorpay_order_id;
    const paymentId = body.razorpayPaymentId || body.razorpay_payment_id;
    const signature = body.razorpaySignature || body.razorpay_signature;

    if (!orderId || !paymentId || !signature) {
      throw new BadRequestException('Missing required payment fields');
    }

    const isValid = this.paymentsService.verifySignature(orderId, paymentId, signature);

    if (!isValid) {
      throw new BadRequestException('Invalid Razorpay payment signature');
    }

    return this.paymentsService.activateMembership(
      body.userId || 'JM2026001234',
      orderId,
      paymentId,
      1000,
    );
  }

  @Post('webhook')
  async handleWebhook(
    @Body() payload: any,
    @Headers('x-razorpay-signature') signature: string,
  ) {
    console.log('Received Razorpay Webhook Event:', payload?.event);

    if (payload?.event === 'payment.captured') {
      const paymentEntity = payload.payload?.payment?.entity;
      const orderId = paymentEntity?.order_id;
      const paymentId = paymentEntity?.id;
      const userId = paymentEntity?.notes?.userId;

      if (userId) {
        await this.paymentsService.activateMembership(
          userId,
          orderId || 'WEBHOOK_ORDER',
          paymentId || 'WEBHOOK_PAYMENT',
          1000,
        );
      }
    }

    return { status: 'ok', received: true };
  }

  @Post('create')
  async createPayUPayment(
    @Body()
    body: {
      userId?: string;
      firstname?: string;
      email?: string;
      phone?: string;
    },
  ) {
    if (!body.userId || !body.firstname || !body.email || !body.phone) {
      throw new BadRequestException('Required member details missing');
    }
    return this.paymentsService.createPayUPayment(
      body.userId,
      body.firstname,
      body.email,
      body.phone,
    );
  }
}
