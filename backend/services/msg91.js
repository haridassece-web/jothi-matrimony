/**
 * MSG91 SMS Service for Jothi Matrimony Mobile OTP
 */

function formatIndianMobileNumber(mobile) {
  if (!mobile) return '';
  // Remove non-digit characters
  const cleaned = String(mobile).replace(/\D/g, '');
  
  // If 10 digits (standard Indian mobile without country code)
  if (cleaned.length === 10) {
    return `91${cleaned}`;
  }
  
  // If 12 digits starting with 91
  if (cleaned.length === 12 && cleaned.startsWith('91')) {
    return cleaned;
  }
  
  // Fallback to cleaned number
  return cleaned;
}

async function sendOtpSms(mobile, otp) {
  const authKey = process.env.MSG91_AUTHKEY;
  const senderId = process.env.MSG91_SENDER_ID || 'JOTHI';
  const templateId = process.env.MSG91_TEMPLATE_ID;
  
  const formattedMobile = formatIndianMobileNumber(mobile);

  if (!authKey || authKey.includes('your_msg91_auth_key')) {
    console.warn(`[MSG91 DEV MOCK] Mobile: ${formattedMobile}, OTP: ${otp} (MSG91_AUTHKEY missing or unconfigured)`);
    return {
      success: true,
      mocked: true,
      message: 'MSG91 credentials missing. Simulation mode active.',
      mobile: formattedMobile,
      otp
    };
  }

  try {
    // Construct MSG91 SendOTP API v5 Request
    let msg91Url = `https://control.msg91.com/api/v5/otp?mobile=${formattedMobile}&authkey=${encodeURIComponent(authKey)}&otp=${encodeURIComponent(otp)}&sender=${encodeURIComponent(senderId)}&realTimeResponse=1`;
    
    if (templateId && templateId.trim()) {
      msg91Url += `&template_id=${encodeURIComponent(templateId.trim())}`;
    }

    console.log(`[MSG91 API] Dispatching OTP SMS to ${formattedMobile} via MSG91...`);

    const response = await fetch(msg91Url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authkey': authKey
      },
      body: JSON.stringify({
        OTP: otp,
        otp: otp
      })
    });

    const data = await response.json();
    console.log('[MSG91 Response]:', JSON.stringify(data));

    if (response.ok && (data.type === 'success' || data.type === '1' || data.message?.includes('success') || data.status === 'success')) {
      return {
        success: true,
        mocked: false,
        msg91Response: data
      };
    } else {
      console.error('[MSG91 Error]:', data);
      return {
        success: false,
        mocked: false,
        error: data.message || data.msg || 'Failed to dispatch OTP via MSG91',
        msg91Response: data
      };
    }
  } catch (err) {
    console.error('[MSG91 Exception]:', err.message);
    return {
      success: false,
      mocked: false,
      error: err.message
    };
  }
}

module.exports = {
  formatIndianMobileNumber,
  sendOtpSms
};
