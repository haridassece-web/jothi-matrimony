'use client';

import React, { useEffect, useRef } from 'react';

/**
 * Official Razorpay Payment Button Component (Next.js)
 * Embeds script: <form><script src="https://checkout.razorpay.com/v1/payment-button.js" data-payment_button_id="pl_TjVL3MecrAQliL" async> </script> </form>
 */
export default function RazorpayPaymentButton({ paymentButtonId = "pl_TjVL3MecrAQliL" }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Clear any existing content
    containerRef.current.innerHTML = '';

    const form = document.createElement('form');
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/payment-button.js';
    script.setAttribute('data-payment_button_id', paymentButtonId);
    script.async = true;

    form.appendChild(script);
    containerRef.current.appendChild(form);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [paymentButtonId]);

  return (
    <div 
      ref={containerRef} 
      className="razorpay-payment-button-container"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '1.25rem 0',
        minHeight: '48px'
      }}
    />
  );
}
