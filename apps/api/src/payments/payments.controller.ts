import { Controller, Post, Body, Headers, BadRequestException } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-order')
  async createOrder(@Body() body: { userId: string; amount?: number }) {
    if (!body.userId) {
      throw new BadRequestException('userId is required');
    }
    return this.paymentsService.createOrder(body.userId, body.amount || 1000);
  }

  @Post('verify')
  async verifyPayment(
    @Body()
    body: {
      userId: string;
      razorpayOrderId: string;
      razorpayPaymentId: string;
      razorpaySignature: string;
    },
  ) {
    const isValid = this.paymentsService.verifySignature(
      body.razorpayOrderId,
      body.razorpayPaymentId,
      body.razorpaySignature,
    );

    if (!isValid) {
      throw new BadRequestException('Invalid Razorpay payment signature');
    }

    return this.paymentsService.activateMembership(
      body.userId || 'JM2026001234',
      body.razorpayOrderId,
      body.razorpayPaymentId,
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
}
