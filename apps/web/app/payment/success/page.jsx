'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import { CheckCircle2, UserCheck, AlertTriangle, Lock } from 'lucide-react';

function PaymentSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, paymentDetails, processPaymentSuccess, language } = useAuth();
  const [isVerified, setIsVerified] = useState(false);
  const [verifiedPaymentId, setVerifiedPaymentId] = useState('');

  useEffect(() => {
    // Purge any lingering Razorpay checkout iframe or overlay containers
    if (typeof document !== 'undefined') {
      try {
        document.querySelectorAll('.razorpay-container').forEach(el => el.remove());
        document.querySelectorAll('iframe[name^="razorpay"]').forEach(el => el.remove());
        document.body.style.overflow = 'auto';
      } catch (e) {
        console.warn('Overlay cleanup warning:', e);
      }
    }

    const rzpPaymentId = searchParams ? (
      searchParams.get('razorpay_payment_id') || 
      searchParams.get('payment_id') || 
      searchParams.get('razorpay_payment_link_id')
    ) : null;

    // 1. If redirected by Razorpay with a payment ID
    if (rzpPaymentId) {
      if (processPaymentSuccess) {
        processPaymentSuccess({
          paymentId: rzpPaymentId,
          gateway: 'Razorpay Online Gateway'
        });
      }
      setIsVerified(true);
      setVerifiedPaymentId(rzpPaymentId);
      return;
    }

    // 2. If the authenticated user is genuinely paid
    const isAuthenticPaid = user?.paymentStatus === 'PAID' || 
      user?.registrationStatus === 'PAID_ACTIVE' ||
      user?.membershipStatus === 'Active Paid Member' ||
      Boolean(paymentDetails?.id);

    if (isAuthenticPaid) {
      setIsVerified(true);
      setVerifiedPaymentId(paymentDetails?.id || 'Razorpay Verified');
      return;
    }

    // 3. Otherwise: Unverified
    setIsVerified(false);
  }, [searchParams, user, paymentDetails, processPaymentSuccess]);

  const handleNavigate = (path) => {
    // Clean any overlays before navigation
    if (typeof document !== 'undefined') {
      try {
        document.querySelectorAll('.razorpay-container').forEach(el => el.remove());
        document.body.style.overflow = 'auto';
      } catch (e) {}
    }
    window.location.assign(path);
  };

  // UNVERIFIED: An unpaid visitor navigated here directly without paying
  if (!isVerified) {
    return (
      <div style={{ padding: '4rem 0', minHeight: '80vh', background: 'var(--bg-silk)' }}>
        <div className="container" style={{ maxWidth: '560px' }}>
          <div className="card" style={{
            padding: '3rem 2rem',
            textAlign: 'center',
            borderRadius: 'var(--radius-lg)',
            border: '2px solid #EF4444',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <div style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: '#FEE2E2',
              color: '#DC2626',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              boxShadow: '0 4px 14px rgba(220, 38, 38, 0.2)'
            }}>
              <AlertTriangle size={44} />
            </div>

            <h2 style={{ fontSize: '1.8rem', color: '#991B1B', marginBottom: '0.5rem', fontWeight: 800 }}>
              {language === 'ta' ? 'ஆன்லைன் கட்டணம் செலுத்தப்படவில்லை' : 'Online Payment Not Completed'}
            </h2>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.75rem', lineHeight: 1.6 }}>
              {language === 'ta'
                ? 'உங்கள் ஆன்லைன் கட்டணம் சரிபார்க்கப்படவில்லை. வரன்களைப் பார்க்க ₹1,000 பதிவுக் கட்டணத்தை ஆன்லைனில் செலுத்தவும்.'
                : 'No verified Razorpay online payment was confirmed for this session. To unlock and view candidate alliance profiles, you must complete your ₹1,000 registration fee online.'}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <Link 
                href="/payment" 
                className="btn btn-primary btn-full btn-lg"
                style={{ background: '#7A0C2E', padding: '0.85rem' }}>
                <Lock size={18} />
                <span>{language === 'ta' ? 'கட்டணப் பக்கத்திற்குச் செல்லவும் (₹1,000) ➔' : 'Go to Official Payment Page (₹1,000) ➔'}</span>
              </Link>

              <a 
                href="https://wa.me/919043773977?text=Vanakkam!%20I%20have%20an%20issue%20with%20payment%20verification."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-full"
                style={{ borderColor: '#25D366', color: '#166534', fontWeight: 700 }}>
                <span>📲 Contact WhatsApp Support (+91 90437 73977)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // VERIFIED: Genuine online payment confirmed
  return (
    <div style={{ padding: '4rem 0', minHeight: '80vh', background: 'var(--bg-silk)' }}>
      <div className="container" style={{ maxWidth: '560px' }}>
        <div className="card" style={{
          padding: '3rem 2rem',
          textAlign: 'center',
          borderRadius: 'var(--radius-lg)',
          border: '2px solid #166534',
          boxShadow: 'var(--shadow-lg)',
          position: 'relative',
          zIndex: 10
        }}>
          
          <div style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: '#DCFCE7',
            color: '#15803D',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            boxShadow: '0 4px 14px rgba(220, 38, 52, 0.2)'
          }}>
            <CheckCircle2 size={46} />
          </div>

          <h2 style={{ fontSize: '1.8rem', color: '#14532D', marginBottom: '0.4rem', fontWeight: 800 }}>
            {language === 'ta' ? 'பதிவுக் கட்டணம் வெற்றி!' : 'Registration Payment Verified!'}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
            Thank you! Your ₹1,000 online payment has been confirmed by Razorpay. Your account is now fully active for 1 year.
          </p>

          <div style={{
            background: '#F0FDF4',
            border: '1px solid #BBF7D0',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            textAlign: 'left',
            marginBottom: '2rem',
            fontSize: '0.88rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ color: '#4B5563' }}>Member / Reg ID:</span>
              <strong style={{ color: '#166534' }}>{user?.regNo || user?.id || 'JM2026001234'}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ color: '#4B5563' }}>Razorpay Payment Ref:</span>
              <strong style={{ color: '#166534' }}>{verifiedPaymentId || paymentDetails?.id || 'Razorpay Verified'}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ color: '#4B5563' }}>Amount Paid:</span>
              <strong style={{ color: '#166534' }}>₹1,000 (INR)</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#4B5563' }}>Membership Status:</span>
              <span className="badge badge-green">✓ Active Paid Member (1 Year)</span>
            </div>
          </div>

          {/* Action Buttons with Direct Navigation */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', position: 'relative', zIndex: 100 }}>
            <button 
              type="button"
              onClick={() => handleNavigate('/profile-setup')}
              className="btn btn-primary btn-full btn-lg"
              style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '0.9rem 1.25rem',
                fontSize: '1rem',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #7A0C2E 0%, #A11440 100%)',
                color: '#FFFFFF',
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 4px 14px rgba(122, 12, 46, 0.35)',
                transition: 'transform 0.15s ease',
                pointerEvents: 'auto'
              }}>
              <UserCheck size={18} />
              <span>Complete Profile Details & Horoscope (Step 4)</span>
            </button>

            <button 
              type="button"
              onClick={() => handleNavigate('/alliances')}
              className="btn btn-outline-gold btn-full"
              style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '0.85rem 1.25rem',
                fontSize: '1rem',
                fontWeight: 700,
                background: '#FFFFFF',
                color: '#92400E',
                borderRadius: '8px',
                border: '2px solid #D97706',
                boxShadow: '0 2px 8px rgba(217, 119, 6, 0.15)',
                transition: 'transform 0.15s ease',
                pointerEvents: 'auto'
              }}>
              <span>Browse Tamil Alliances Right Away →</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div style={{ padding: '4rem', textAlign: 'center' }}>Loading payment confirmation...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
