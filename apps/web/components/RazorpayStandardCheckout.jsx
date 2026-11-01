'use client';

import React, { useState, useEffect } from 'react';
import { CreditCard, Loader2, AlertCircle, CheckCircle2, Lock } from 'lucide-react';

export default function RazorpayStandardCheckout({
  amount = 1000 * 100, // 100000 paise = ₹1,000
  currency = 'INR',
  userId = 'JM2026001234',
  userName = 'Valued Member',
  userEmail = 'member@chennaijothimatrimony.com',
  userPhone = '9043773977',
  onSuccess,
  onError,
  buttonText = 'Pay ₹1,000 via Razorpay Standard Checkout',
  className = '',
  style = {}
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Dynamically load Razorpay standard checkout script if not present
  useEffect(() => {
    if (typeof window === 'undefined' || window.Razorpay) return;

    const existingScript = document.getElementById('razorpay-checkout-script');
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'razorpay-checkout-script';
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onerror = () => {
        console.error('Failed to load Razorpay checkout script');
        setErrorMessage('Failed to load Razorpay payment SDK. Please refresh the page.');
      };
      document.body.appendChild(script);
    }
  }, []);

  const handleCheckout = async () => {
    try {
      setErrorMessage(null);
      setSuccessMessage(null);
      setIsLoading(true);

      // STEP 1: Call Backend to Create Order
      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          currency,
          receipt: `rcpt_${userId}_${Date.now()}`,
          notes: {
            userId,
            purpose: '1-Year Matrimony Registration Fee'
          }
        }),
      });

      const orderData = await res.json();

      if (!res.ok && !orderData.key_id) {
        throw new Error(orderData.error || orderData.details || 'Failed to initialize payment gateway');
      }

      if (!window.Razorpay) {
        throw new Error('Razorpay SDK is not ready yet. Please check your internet connection and try again.');
      }

      const keyId = orderData.key_id || 
                    process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 
                    process.env.VITE_RAZORPAY_KEY_ID || 
                    'rzp_test_TuxtCKUR66AmyF';

      // STEP 2: Open Razorpay Standard Checkout Modal
      const options = {
        key: keyId,
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        name: 'Chennai Jothi Matrimony',
        description: '1-Year Membership Registration Fee (₹1,000)',
        image: '/logo.jpg',
        // order_id attached conditionally below
        prefill: {
          name: userName,
          email: userEmail,
          contact: String(userPhone || '9043773977').replace(/\D/g, '').slice(-10)
        },
        theme: {
          color: '#800000',
        },
        modal: {
          ondismiss: function () {
            setIsLoading(false);
            setErrorMessage('Payment cancelled by user. You can click to retry anytime.');
          }
        },
        handler: async function (response) {
          // STEP 3: Send verification payload to backend
          try {
            setIsLoading(false);
            setIsVerifying(true);

            const verifyRes = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id || null,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature || null,
                userId: userId
              })
            });

            const verifyData = await verifyRes.json();

            if (verifyRes.ok && verifyData.success) {
              setSuccessMessage('🎉 Payment verified successfully! Activating your account...');
              if (onSuccess) {
                onSuccess({
                  paymentId: response.razorpay_payment_id,
                  orderId: response.razorpay_order_id,
                  signature: response.razorpay_signature,
                  ...verifyData
                });
              }
            } else {
              const err = verifyData.error || 'Payment signature verification failed. Please contact support with payment ID: ' + response.razorpay_payment_id;
              setErrorMessage(err);
              if (onError) onError(err);
            }
          } catch (err) {
            console.error('Error verifying payment:', err);
            const errText = 'Server error during payment verification: ' + err.message;
            setErrorMessage(errText);
            if (onError) onError(errText);
          } finally {
            setIsVerifying(false);
            setIsLoading(false);
          }
        }
      };

      if (orderData.order_id) {
        options.order_id = orderData.order_id;
      }

      const rzpInstance = new window.Razorpay(options);

      rzpInstance.on('payment.failed', function (failResponse) {
        setIsLoading(false);
        const reason = failResponse.error?.description || failResponse.error?.reason || 'Payment failed';
        console.error('Razorpay payment failed:', failResponse.error);
        setErrorMessage(`Payment Failed: ${reason}`);
        if (onError) onError(reason);
      });

      rzpInstance.open();

    } catch (err) {
      console.error('Checkout error:', err);
      setIsLoading(false);
      setErrorMessage(err.message || 'Payment initiation failed');
      if (onError) onError(err.message);
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: '480px', margin: '0 auto', ...style }} className={className}>
      
      {/* Error Banner */}
      {errorMessage && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: '#FEF2F2',
          border: '1.5px solid #F87171',
          color: '#991B1B',
          padding: '10px 14px',
          borderRadius: '8px',
          fontSize: '0.86rem',
          fontWeight: 600,
          marginBottom: '1rem',
          textAlign: 'left'
        }}>
          <AlertCircle size={18} style={{ flexShrink: 0 }} />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Success Banner */}
      {successMessage && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: '#F0FDF4',
          border: '1.5px solid #86EFAC',
          color: '#166534',
          padding: '10px 14px',
          borderRadius: '8px',
          fontSize: '0.86rem',
          fontWeight: 700,
          marginBottom: '1rem',
          textAlign: 'left'
        }}>
          <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Main Standard Checkout Button */}
      <button
        type="button"
        onClick={handleCheckout}
        disabled={isLoading || isVerifying}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          background: isLoading || isVerifying 
            ? '#9CA3AF' 
            : 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)',
          color: '#FFFFFF',
          border: 'none',
          borderRadius: '8px',
          padding: '14px 20px',
          fontSize: '1rem',
          fontWeight: 800,
          cursor: (isLoading || isVerifying) ? 'not-allowed' : 'pointer',
          boxShadow: '0 4px 14px rgba(2, 132, 199, 0.4)',
          transition: 'transform 0.15s ease, box-shadow 0.15s ease'
        }}>
        {isLoading ? (
          <>
            <Loader2 size={20} className="spin-animate" />
            <span>Connecting to Razorpay...</span>
          </>
        ) : isVerifying ? (
          <>
            <Loader2 size={20} className="spin-animate" />
            <span>Verifying Payment Signature...</span>
          </>
        ) : (
          <>
            <CreditCard size={20} />
            <span>{buttonText}</span>
          </>
        )}
      </button>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        fontSize: '0.76rem',
        color: '#64748B',
        marginTop: '0.65rem'
      }}>
        <Lock size={12} color="#0284C7" />
        <span>Official Razorpay Standard Web Checkout • 256-bit Encrypted SSL</span>
      </div>
    </div>
  );
}
