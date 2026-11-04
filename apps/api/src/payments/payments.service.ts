import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
const Razorpay = require('razorpay');
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class PaymentsService {
  private razorpay: any = null;

  constructor(private readonly supabaseService: SupabaseService) {
    const key_id = process.env.RAZORPAY_KEY_ID || 'rzp_test_Tuz6CvkXYtRSA2';
    const key_secret = process.env.RAZORPAY_KEY_SECRET || '5ybIBDOBUds3WGpivZ5zsrzB';
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
    const keyId = process.env.RAZORPAY_KEY_ID || 'rzp_test_Tuz6CvkXYtRSA2';

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
    const keySecret = process.env.RAZORPAY_KEY_SECRET || '5ybIBDOBUds3WGpivZ5zsrzB';
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

  async createPayUPayment(userId: string, firstname: string, email: string, phone: string) {
    const payuKey = process.env.PAYU_KEY || process.env.VITE_PAYU_KEY || '';
    const payuSalt = process.env.PAYU_SALT || '';
    const payuUrl = process.env.PAYU_ENV === 'production'
      ? 'https://secure.payu.in/_payment'
      : 'https://test.payu.in/_payment';

    const amount = '1000.00';
    const txnid = 'CJM' + Date.now() + Math.random().toString(36).slice(2, 7);
    const apiBaseUrl = process.env.API_URL || 'https://jothi-matrimony.onrender.com';

    const hashString = [
      payuKey,
      txnid,
      amount,
      'Chennai Jothi Matrimony Membership',
      firstname.trim(),
      email.trim().toLowerCase(),
      userId,
      '', '', '', '', '', '', '', '', '', '',
      payuSalt,
    ].join('|');

    const hash = crypto.createHash('sha512').update(hashString).digest('hex');

    const payment = {
      key: payuKey,
      txnid,
      amount,
      productinfo: 'Chennai Jothi Matrimony Membership',
      firstname: firstname.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.replace(/\D/g, '').slice(-10),
      udf1: userId,
      udf2: '', udf3: '', udf4: '', udf5: '',
      surl: `${apiBaseUrl}/api/payment/success`,
      furl: `${apiBaseUrl}/api/payment/failure`,
      hash,
    };

    try {
      const supabase = this.supabaseService.getClient();
      await supabase.from('membership_payments').insert({
        user_id: userId,
        txnid,
        amount: 1000.0,
        gateway: 'PayU',
        status: 'pending',
      });
    } catch (e) {
      console.warn('[PayU DB Insert Warning]:', e.message);
    }

    return {
      paymentUrl: payuUrl,
      paymentData: payment,
    };
  }
}
