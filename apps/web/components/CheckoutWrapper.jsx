'use client';

import { useState } from 'react';
import Script from 'next/script';
import { useAuth } from '../context/AuthContext';
import RazorpayModal from './RazorpayModal';

export default function CheckoutWrapper({ children, onPaymentSuccess }) {
  const { user, registrationId } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to trigger Razorpay Checkout
  const handleOpenRazorpay = async () => {
    setIsProcessing(true);
    try {
      // 1. Get Order ID from Next.js backend
      const res = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user?.id || registrationId }),
      });
      const order = await res.json();

      if (!order.id) throw new Error('Failed to create order');

      const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

      // 2. If Razorpay Key is present and script is loaded, use standard Razorpay SDK
      if (razorpayKey && typeof window !== 'undefined' && window.Razorpay) {
        const options = {
          key: razorpayKey,
          amount: order.amount, // ₹1,000 in paise (100000)
          currency: "INR",
          name: "Chennai Jothi Matrimony",
          description: "1 Year Registration Fee",
          order_id: order.id,
          prefill: {
            contact: user?.phone || user?.mobile || '',
            email: user?.email || '',
          },
          theme: {
            color: "#800000", // primary-maroon theme
          },
          handler: async function (response) {
            // 3. Verify payment signature on backend
            const verifyRes = await fetch('/api/payment/verify-signature', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                ...response,
                userId: user?.id || registrationId,
              }),
            });
            
            const result = await verifyRes.json();
            if (result.success) {
              alert("Payment Successful! Your account is now active.");
              if (onPaymentSuccess) onPaymentSuccess();
              else window.location.href = '/dashboard';
            } else {
              alert("Payment verification failed. Please contact support.");
            }
          },
        };

        const rzp = new window.Razorpay(options);
        
        rzp.on('payment.failed', function (response) {
          alert(`Payment Failed: ${response.error?.description || 'Transaction cancelled'}`);
        });

        rzp.open();
      } else {
        // Fallback to Razorpay Modal component if SDK key is pending configuration
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Payment setup error:", error);
      setIsModalOpen(true);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      {/* Dynamic Razorpay Script Loading */}
      <Script 
        src="https://checkout.razorpay.com/v1/checkout.js" 
        strategy="lazyOnload" 
      />

      {/* Render Payment UI passing handleOpenRazorpay */}
      {typeof children === 'function' 
        ? children({ handleOpenRazorpay, isProcessing }) 
        : children}

      <RazorpayModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={onPaymentSuccess}
      />
    </>
  );
}
