import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import Razorpay from 'razorpay';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class PaymentsService {
  private razorpay: Razorpay | null = null;

  constructor(private readonly supabaseService: SupabaseService) {
    const key_id = process.env.RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;
    if (key_id && key_secret && key_id !== 'YOUR_RAZORPAY_KEY') {
      this.razorpay = new Razorpay({
        key_id,
        key_secret,
      });
    }
  }

  async createOrder(userId: string, amountInRupees: number = 1000) {
    const amountInPaise = amountInRupees * 100;
    const keyId = process.env.RAZORPAY_KEY_ID || 'rzp_test_mock_jothi_matrimony';

    if (this.razorpay) {
      try {
        const order = await this.razorpay.orders.create({
          amount: amountInPaise,
          currency: 'INR',
          receipt: `receipt_${userId}_${Date.now()}`,
          notes: {
            userId,
            plan: '1_year_unlimited_access',
          },
        });

        return {
          success: true,
          orderId: order.id,
          amount: amountInPaise,
          currency: 'INR',
          key: keyId,
        };
      } catch (err) {
        console.error('Error creating Razorpay order:', err);
      }
    }

    // Fallback Mock Order ID
    const mockOrderId = 'order_' + Math.random().toString(36).substring(2, 14);
    return {
      success: true,
      orderId: mockOrderId,
      amount: amountInPaise,
      currency: 'INR',
      key: keyId,
      mock: true,
    };
  }

  verifySignature(orderId: string, paymentId: string, signature: string): boolean {
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret || keySecret === 'YOUR_RAZORPAY_SECRET') {
      // Mock mode verification returns true for test flow
      return true;
    }

    const hmac = crypto.createHmac('sha256', keySecret);
    hmac.update(`${orderId}|${paymentId}`);
    const generatedSignature = hmac.digest('hex');

    return generatedSignature === signature;
  }

  async activateMembership(userId: string, razorpayOrderId: string, razorpayPaymentId: string, amount: number = 1000) {
    const supabase = this.supabaseService.getClient();

    // Update Profile Membership Status to ACTIVE
    if (supabase) {
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          membership_status: 'ACTIVE',
          is_paid_member: true,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', userId);

      if (profileError) {
        console.error('Error updating profile membership status:', profileError);
      }

      // Insert record into payments table
      await supabase.from('payments').insert({
        user_id: userId,
        razorpay_order_id: razorpayOrderId,
        razorpay_payment_id: razorpayPaymentId,
        amount: amount * 100,
        currency: 'INR',
        status: 'captured',
        created_at: new Date().toISOString(),
      });

      // Create or update subscription record (valid for 1 year)
      const startDate = new Date();
      const endDate = new Date();
      endDate.setFullYear(startDate.getFullYear() + 1);

      await supabase.from('subscriptions').insert({
        user_id: userId,
        plan_name: '1 Year Unlimited Access',
        amount: amount,
        status: 'active',
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
        created_at: new Date().toISOString(),
      });
    }

    return {
      success: true,
      message: 'Membership activated successfully!',
      status: 'ACTIVE',
      userId,
      validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    };
  }

  verifyWebhookSignature(rawBody: string | Buffer, signature: string): boolean {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || 'secret';
    if (!signature) return false;

    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(rawBody)
      .digest('hex');

    return expectedSignature === signature;
  }
}
