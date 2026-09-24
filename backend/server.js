require('dotenv').config();
const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const { getSupabaseClient } = require('./services/supabase');
const { formatIndianMobileNumber, sendOtpSms } = require('./services/msg91');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Helper to create SHA-256 hash of OTP
function hashOtp(otp) {
  return crypto.createHash('sha256').update(String(otp).trim()).digest('hex');
}

// In-memory OTP storage fallback
const inMemoryOtpStore = new Map();

// ============================================================================
// HEALTH CHECK
// GET /health
// ============================================================================
app.get('/health', (req, res) => {
  res.json({
    ok: true,
    service: 'jothi-matrimony-api',
    timestamp: new Date().toISOString()
  });
});

app.get('/', (req, res) => {
  res.json({
    ok: true,
    service: 'jothi-matrimony-api',
    message: 'Jothi Matrimony Real Mobile OTP Backend API is running'
  });
});

// ============================================================================
// SEND OTP
// POST /auth/send-otp
// ============================================================================
app.post('/auth/send-otp', async (req, res) => {
  try {
    const { mobile } = req.body;
    if (!mobile) {
      return res.status(400).json({ ok: false, success: false, message: 'Mobile number is required' });
    }

    const formattedMobile = formatIndianMobileNumber(mobile);
    const cleanDigits = formattedMobile.replace(/\D/g, '');
    
    if (cleanDigits.length < 10) {
      return res.status(400).json({ ok: false, success: false, message: 'Invalid Indian mobile number' });
    }

    // Generate 6-digit random OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpHash = hashOtp(otp);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins expiry

    console.log(`[AUTH] Generating OTP for ${formattedMobile}... OTP Code: ${otp}`);

    const supabase = getSupabaseClient();

    if (supabase) {
      try {
        const { error } = await supabase
          .from('otp_verifications')
          .insert({
            mobile: formattedMobile,
            otp_hash: otpHash,
            attempts: 0,
            verified: false,
            expires_at: expiresAt.toISOString()
          });

        if (error) {
          console.warn('[Supabase OTP Storage Warning]:', error.message);
        } else {
          console.log(`[Supabase DB] Stored otp_verifications record for ${formattedMobile}`);
        }
      } catch (dbErr) {
        console.warn('[Supabase DB Insert Exception]:', dbErr.message);
      }
    }

    // Store in-memory fallback
    inMemoryOtpStore.set(formattedMobile, {
      otp,
      otpHash,
      expiresAt: expiresAt.getTime(),
      verified: false
    });

    // Send SMS via MSG91
    const smsResult = await sendOtpSms(formattedMobile, otp);
    const isDev = process.env.NODE_ENV !== 'production' || !process.env.MSG91_AUTHKEY;

    return res.json({
      ok: true,
      success: true,
      message: smsResult.mocked 
        ? `OTP code generated for ${formattedMobile}. (Simulation Mode)`
        : `OTP sent successfully to ${formattedMobile}`,
      mobile: formattedMobile,
      devOtp: isDev ? otp : undefined
    });

  } catch (err) {
    console.error('[POST /auth/send-otp Error]:', err);
    return res.status(500).json({
      ok: false,
      success: false,
      message: 'Failed to process OTP request',
      error: err.message
    });
  }
});

// ============================================================================
// VERIFY OTP
// POST /auth/verify-otp
// ============================================================================
app.post('/auth/verify-otp', async (req, res) => {
  try {
    const { mobile, otp } = req.body;
    if (!mobile || !otp) {
      return res.status(400).json({ ok: false, success: false, message: 'Mobile and OTP code are required' });
    }

    const formattedMobile = formatIndianMobileNumber(mobile);
    const inputOtp = String(otp).trim();
    const inputHash = hashOtp(inputOtp);

    console.log(`[AUTH] Verifying OTP for ${formattedMobile}...`);

    const supabase = getSupabaseClient();
    let verifiedInDb = false;

    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('otp_verifications')
          .select('*')
          .eq('mobile', formattedMobile)
          .eq('verified', false)
          .gt('expires_at', new Date().toISOString())
          .order('created_at', { ascending: false })
          .limit(1);

        if (!error && data && data.length > 0) {
          const record = data[0];
          const updatedAttempts = (record.attempts || 0) + 1;

          if (record.otp_hash === inputHash || record.otp_hash === inputOtp) {
            await supabase
              .from('otp_verifications')
              .update({
                verified: true,
                verified_at: new Date().toISOString(),
                attempts: updatedAttempts
              })
              .eq('id', record.id);

            verifiedInDb = true;
            console.log(`[Supabase DB] OTP verified successfully for ${formattedMobile}`);
          } else {
            await supabase
              .from('otp_verifications')
              .update({ attempts: updatedAttempts })
              .eq('id', record.id);
            console.warn(`[Supabase DB] Invalid OTP attempt for ${formattedMobile}`);
          }
        }
      } catch (dbErr) {
        console.warn('[Supabase DB Verification Exception]:', dbErr.message);
      }
    }

    // Check memory fallback if DB verification did not match
    if (!verifiedInDb) {
      const memRecord = inMemoryOtpStore.get(formattedMobile);
      if (memRecord && (memRecord.otp === inputOtp || memRecord.otpHash === inputHash) && Date.now() < memRecord.expiresAt) {
        memRecord.verified = true;
        verifiedInDb = true;
        console.log(`[In-Memory OTP] OTP verified for ${formattedMobile}`);
      }
    }

    if (verifiedInDb) {
      return res.json({
        ok: true,
        success: true,
        message: 'OTP verified successfully'
      });
    } else {
      return res.status(400).json({
        ok: false,
        success: false,
        message: 'Invalid or expired OTP code. Please check and try again.'
      });
    }

  } catch (err) {
    console.error('[POST /auth/verify-otp Error]:', err);
    return res.status(500).json({
      ok: false,
      success: false,
      message: 'OTP verification failed',
      error: err.message
    });
  }
});

// ============================================================================
// REGISTER USER
// POST /users/register
// ============================================================================
app.post('/users/register', async (req, res) => {
  try {
    const { mobile, full_name, email, gender, date_of_birth, city } = req.body;

    if (!mobile || !full_name) {
      return res.status(400).json({ ok: false, success: false, message: 'Mobile number and Full Name are required' });
    }

    const formattedMobile = formatIndianMobileNumber(mobile);
    console.log(`[USERS] Registering user ${full_name} (${formattedMobile})...`);

    const supabase = getSupabaseClient();

    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('users')
          .insert({
            mobile: formattedMobile,
            full_name: full_name.trim(),
            email: email ? email.trim() : null,
            gender: gender || 'Male',
            date_of_birth: date_of_birth || '1997-06-15',
            city: city ? city.trim() : null
          })
          .select()
          .single();

        if (error) {
          if (error.code === '23505') {
            const { data: existingUser } = await supabase
              .from('users')
              .select('*')
              .eq('mobile', formattedMobile)
              .single();

            return res.json({
              ok: true,
              success: true,
              message: 'User already registered',
              user: existingUser || { mobile: formattedMobile, full_name }
            });
          }
          console.warn('[Supabase DB Register Warning]:', error.message);
        } else if (data) {
          return res.json({
            ok: true,
            success: true,
            message: 'User registered successfully in Supabase',
            user: data
          });
        }
      } catch (dbErr) {
        console.warn('[Supabase Register Exception]:', dbErr.message);
      }
    }

    // Fallback response if DB unconfigured or pending
    const createdUser = {
      id: 'usr_' + Math.random().toString(36).substring(2, 10),
      mobile: formattedMobile,
      full_name: full_name.trim(),
      email: email || null,
      gender: gender || 'Male',
      date_of_birth: date_of_birth || '1997-06-15',
      city: city || null,
      created_at: new Date().toISOString()
    };

    return res.json({
      ok: true,
      success: true,
      message: 'User registered successfully',
      user: createdUser
    });

  } catch (err) {
    console.error('[POST /users/register Error]:', err);
    return res.status(500).json({
      ok: false,
      success: false,
      message: 'Registration failed',
      error: err.message
    });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Jothi Matrimony API running on port ${PORT}`);
});
