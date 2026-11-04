const express = require("express");
const router = express.Router();
const { createClient } = require("@supabase/supabase-js");

const {
  generatePaymentHash,
  verifyPaymentHash,
  PAYU_KEY,
  PAYU_URL,
} = require("../payments/payu");

// Supabase client initialization helper
function getSupabase() {
  const supabaseUrl = process.env.SUPABASE_URL || 'https://mjcbbjwttlteiqnntuet.supabase.co';
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 
                      process.env.SUPABASE_SECRET_KEY || 
                      process.env.SUPABASE_ANON_KEY ||
                      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) return null;
  try {
    return createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false, autoRefreshToken: false }
    });
  } catch (err) {
    console.warn("[PayU Supabase Warning]:", err.message);
    return null;
  }
}

// Ensure URL-encoded form data from PayU callbacks can be parsed
router.use(express.urlencoded({ extended: true }));

// ============================================================================
// 1. INITIATE PAYMENT: POST /api/payment/create
// ============================================================================
router.post("/create", async (req, res) => {
  try {
    const { userId, firstname, email, phone } = req.body;

    if (!userId || !firstname || !email || !phone) {
      return res.status(400).json({
        message: "Required member details missing",
      });
    }

    // Amount is controlled by backend
    const amount = "1000.00";

    const txnid =
      "CJM" + Date.now() +
      Math.random().toString(36).slice(2, 7);

    const apiBaseUrl = process.env.API_URL || 
                       process.env.NEXT_PUBLIC_API_URL || 
                       process.env.VITE_API_URL || 
                       "https://jothi-matrimony.onrender.com";

    const payment = {
      key: PAYU_KEY,
      txnid,
      amount,
      productinfo: "Chennai Jothi Matrimony Membership",
      firstname: String(firstname).trim(),
      email: String(email).trim().toLowerCase(),
      phone: String(phone).replace(/\D/g, "").slice(-10),

      udf1: String(userId),
      udf2: "",
      udf3: "",
      udf4: "",
      udf5: "",

      surl: `${apiBaseUrl}/api/payment/success`,
      furl: `${apiBaseUrl}/api/payment/failure`,
    };

    payment.hash = generatePaymentHash(payment);

    // Save pending transaction to Supabase
    const supabase = getSupabase();
    if (supabase) {
      try {
        const { error } = await supabase
          .from("membership_payments")
          .insert({
            user_id: userId,
            txnid,
            amount: parseFloat(amount),
            gateway: "PayU",
            status: "pending"
          });

        if (error) {
          console.warn("[PayU DB Insert Warning]:", error.message);
        } else {
          console.log(`[PayU DB] Saved pending transaction ${txnid} for user ${userId}`);
        }
      } catch (dbErr) {
        console.warn("[PayU DB Insert Exception]:", dbErr.message);
      }
    }

    return res.json({
      paymentUrl: PAYU_URL,
      paymentData: payment,
    });
  } catch (error) {
    console.error("[PayU Create Payment Error]:", error);

    res.status(500).json({
      message: "Unable to initiate payment",
      error: error.message
    });
  }
});

// ============================================================================
// 2. PAYMENT SUCCESS CALLBACK: POST /api/payment/success
// Handled when PayU redirects the browser via POST form submission
// ============================================================================
router.post("/success", async (req, res) => {
  try {
    const data = req.body;
    console.log("[PayU Success Callback Received]:", data);

    const txnid = data.txnid;
    const mihpayid = data.mihpayid;
    const userId = data.udf1;
    const isHashValid = verifyPaymentHash(data);

    if (!isHashValid) {
      console.error("[PayU Hash Verification Failed]: Tampered response detected for txn:", txnid);
      const frontendUrl = process.env.FRONTEND_URL || "https://www.chennaijothimatrimony.com";
      return res.redirect(`${frontendUrl}/payment?error=hash_verification_failed`);
    }

    const supabase = getSupabase();
    if (supabase) {
      try {
        // Update membership_payments table
        await supabase
          .from("membership_payments")
          .update({
            status: "success",
            gateway_payment_id: mihpayid,
            paid_at: new Date().toISOString()
          })
          .eq("txnid", txnid);

        // Update user status
        if (userId) {
          await supabase
            .from("users")
            .update({
              payment_status: "PAID",
              registration_status: "PAID_ACTIVE",
              membership_status: "Active Paid Member",
              updated_at: new Date().toISOString()
            })
            .eq("id", userId);
        }
      } catch (err) {
        console.error("[PayU DB Update Error on Success]:", err.message);
      }
    }

    const frontendUrl = process.env.FRONTEND_URL || "https://www.chennaijothimatrimony.com";
    return res.redirect(`${frontendUrl}/payment/success?payu_payment_id=${mihpayid}&txnid=${txnid}`);
  } catch (err) {
    console.error("[PayU Success Handler Error]:", err);
    const frontendUrl = process.env.FRONTEND_URL || "https://www.chennaijothimatrimony.com";
    return res.redirect(`${frontendUrl}/payment?error=processing_error`);
  }
});

// ============================================================================
// 3. PAYMENT FAILURE CALLBACK: POST /api/payment/failure
// ============================================================================
router.post("/failure", async (req, res) => {
  try {
    const data = req.body;
    console.log("[PayU Failure Callback Received]:", data);
    const txnid = data.txnid;
    const mihpayid = data.mihpayid;

    const supabase = getSupabase();
    if (supabase && txnid) {
      try {
        await supabase
          .from("membership_payments")
          .update({
            status: "failed",
            gateway_payment_id: mihpayid || null
          })
          .eq("txnid", txnid);
      } catch (err) {
        console.error("[PayU DB Update Error on Failure]:", err.message);
      }
    }

    const frontendUrl = process.env.FRONTEND_URL || "https://www.chennaijothimatrimony.com";
    return res.redirect(`${frontendUrl}/payment?error=payment_failed&txnid=${txnid || ''}`);
  } catch (err) {
    console.error("[PayU Failure Handler Error]:", err);
    const frontendUrl = process.env.FRONTEND_URL || "https://www.chennaijothimatrimony.com";
    return res.redirect(`${frontendUrl}/payment?error=payment_failed`);
  }
});

module.exports = router;
