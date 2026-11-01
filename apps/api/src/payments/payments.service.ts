import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
const Razorpay = require('razorpay');
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class PaymentsService {
  private razorpay: any = null;

  constructor(private readonly supabaseService: SupabaseService) {
    const key_id = process.env.RAZORPAY_KEY_ID || 'rzp_test_TuxtCKUR66AmyF';
    const key_secret = process.env.RAZORPAY_KEY_SECRET || 'mniToCh9JHutflRqXTijMIXk';
    if (key_id && key_secret && key_id !== 'YOUR_RAZORPAY_KEY') {
      try {
        const RazorpayClass = typeof Razorpay === 'function' ? Razorpay : Razorpay.default;
        this.razorpay = new RazorpayClass({
          key_id,
          key_secret,
        });
      } catch (err) {
        console.error('Failed to initialize Razorpay in PaymentsService:', err);
      }
    }
  }

  async createOrder(
    userId: string,
    amountInPaise: number = 1000 * 100,
    currency: string = 'INR',
    receipt?: string,
  ) {
    const keyId = process.env.RAZORPAY_KEY_ID || 'rzp_test_TuxtCKUR66AmyF';

    if (this.razorpay) {
      try {
        const order = await this.razorpay.orders.create({
          amount: amountInPaise,
          currency: currency || 'INR',
          receipt: receipt || `rcpt_${userId}_${Date.now()}`,
          notes: {
            userId,
            purpose: 'Chennai Jothi Matrimony 1-Year Registration Fee',
          },
        });

        return {
          success: true,
          order_id: order.id,
          orderId: order.id,
          amount: order.amount,
          currency: order.currency,
          key_id: keyId,
          key: keyId,
        };
      } catch (err) {
        console.error('Error creating Razorpay order:', err);
        throw err;
      }
    }

    throw new Error('Razorpay client is not initialized');
  }

  verifySignature(orderId: string, paymentId: string, signature: string): boolean {
    const keySecret = process.env.RAZORPAY_KEY_SECRET || 'mniToCh9JHutflRqXTijMIXk';
    if (!keySecret) {
      return false;
    }

    const hmac = crypto.createHmac('sha256', keySecret);
    hmac.update(`${orderId}|${paymentId}`);
    const generatedSignature = hmac.digest('hex');

    try {
      return crypto.timingSafeEqual(
        Buffer.from(generatedSignature),
        Buffer.from(signature),
      );
    } catch {
      return false;
    }
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
      });
    }

    return {
      success: true,
      message: 'Membership activated successfully',
      userId,
      razorpayPaymentId,
    };
  }
}
