import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

function formatIndianMobileNumber(mobile: string): string {
  if (!mobile) return '';
  const cleaned = String(mobile).replace(/\D/g, '');
  if (cleaned.length === 10) return `91${cleaned}`;
  if (cleaned.length === 12 && cleaned.startsWith('91')) return cleaned;
  return cleaned;
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private inMemoryOtpMap = new Map<string, { otp: string; expiresAt: number }>();

  constructor(private readonly supabaseService: SupabaseService) {}

  async sendOtp(body: any) {
    const { mobile } = body;
    if (!mobile) {
      throw new BadRequestException('Mobile number is required');
    }

    const formattedMobile = formatIndianMobileNumber(mobile);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    this.logger.log(`Generated OTP for ${formattedMobile}: ${otp}`);

    let supabase;
    try {
      supabase = this.supabaseService.getClient();
    } catch (e: any) {
      this.logger.warn(`Supabase client unconfigured: ${e.message}`);
    }

    if (supabase) {
      try {
        await supabase
          .from('otp_verifications')
          .insert({
            mobile: formattedMobile,
            otp: otp,
            expires_at: expiresAt.toISOString(),
            is_verified: false,
          });
      } catch (err: any) {
        this.logger.warn(`Failed saving OTP to Supabase DB: ${err.message}`);
      }
    }

    this.inMemoryOtpMap.set(formattedMobile, {
      otp,
      expiresAt: expiresAt.getTime(),
    });

    // MSG91 API Dispatch
    const authKey = process.env.MSG91_AUTHKEY;
    const senderId = process.env.MSG91_SENDER_ID || 'JOTHI';
    const templateId = process.env.MSG91_TEMPLATE_ID;

    if (authKey && !authKey.includes('your_msg91')) {
      try {
        let msg91Url = `https://control.msg91.com/api/v5/otp?mobile=${formattedMobile}&authkey=${encodeURIComponent(authKey)}&otp=${encodeURIComponent(otp)}&sender=${encodeURIComponent(senderId)}`;
        if (templateId) msg91Url += `&template_id=${encodeURIComponent(templateId)}`;

        await fetch(msg91Url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', authkey: authKey },
          body: JSON.stringify({ OTP: otp }),
        });
      } catch (smsErr: any) {
        this.logger.error(`MSG91 Send Failed: ${smsErr.message}`);
      }
    }

    const isDev = process.env.NODE_ENV !== 'production' || !authKey;

    return {
      ok: true,
      success: true,
      message: `OTP sent successfully to ${formattedMobile}`,
      mobile: formattedMobile,
      devOtp: isDev ? otp : undefined,
    };
  }

  async verifyOtp(body: any) {
    const { mobile, otp } = body;
    if (!mobile || !otp) {
      throw new BadRequestException('Mobile and OTP are required');
    }

    const formattedMobile = formatIndianMobileNumber(mobile);
    const inputOtp = String(otp).trim();

    let verified = false;
    let supabase;

    try {
      supabase = this.supabaseService.getClient();
    } catch (e: any) {
      // ignore
    }

    if (supabase) {
      try {
        const { data } = await supabase
          .from('otp_verifications')
          .select('*')
          .eq('mobile', formattedMobile)
          .eq('otp', inputOtp)
          .eq('is_verified', false)
          .gt('expires_at', new Date().toISOString())
          .order('created_at', { ascending: false })
          .limit(1);

        if (data && data.length > 0) {
          await supabase
            .from('otp_verifications')
            .update({ is_verified: true })
            .eq('id', data[0].id);
          verified = true;
        }
      } catch (err: any) {
        this.logger.warn(`Supabase DB OTP verify exception: ${err.message}`);
      }
    }

    if (!verified) {
      const mem = this.inMemoryOtpMap.get(formattedMobile);
      if (mem && mem.otp === inputOtp && Date.now() < mem.expiresAt) {
        verified = true;
      }
    }

    if (verified) {
      return {
        ok: true,
        success: true,
        message: 'OTP verified successfully',
      };
    }

    throw new BadRequestException('Invalid or expired OTP code');
  }
}
