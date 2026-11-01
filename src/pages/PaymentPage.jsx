import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import RazorpayStandardCheckout from '../components/RazorpayStandardCheckout';
import RazorpayPaymentButton from '../components/RazorpayPaymentButton';
import { ShieldCheck, CheckCircle2, Lock, Sparkles, CreditCard, Landmark, Copy, Check } from 'lucide-react';

export default function PaymentPage({ setActivePage, onOpenRazorpay }) {
  const { user, registrationId, registrationStatus, language, processPaymentSuccess } = useAuth();
  const [copiedField, setCopiedField] = useState(null);

  const handlePaymentSuccess = (paymentResult) => {
    if (processPaymentSuccess) {
      processPaymentSuccess({
        paymentId: paymentResult.paymentId,
        orderId: paymentResult.orderId,
        gateway: 'Razorpay Standard Checkout (rzp_test_Tuz6CvkXYtRSA2)'
      });
    }
    if (setActivePage) {
      setActivePage('payment-success');
    }
  };

  const bankDetails = {
    bankName: 'State Bank of India',
    accountName: 'Chandra babu M',
    accountNo: '10146632327',
    ifsc: 'SBIN0003275',
    branch: 'Vivekananda house (Chennai)'
  };

  const handleCopy = (field, text) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div style={{ padding: '4rem 0', minHeight: '80vh', background: 'var(--bg-silk)' }}>
      <div className="container" style={{ maxWidth: '540px' }}>
        
        {/* Header Notice */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span className="badge badge-gold" style={{ marginBottom: '0.6rem', padding: '0.4rem 1rem' }}>
            <Sparkles size={14} /> STEP 3: REGISTRATION PAYMENT
          </span>
          <h2 style={{ fontSize: '2.1rem', color: 'var(--primary-maroon-dark)', marginBottom: '0.4rem' }}>
            {language === 'ta' ? 'பதிவுக் கட்டணம் ₹1,000' : 'Activate Your Matrimony Account'}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Registration ID: <strong style={{ color: 'var(--primary-maroon)' }}>{registrationId || user?.id || 'JM2026001234'}</strong>
          </p>
        </div>

        {/* Exact Specification Registration Payment Box */}
        <div className="card" style={{
          padding: '2.5rem 2rem',
          borderRadius: 'var(--radius-lg)',
          border: '2px solid var(--border-gold)',
          boxShadow: 'var(--shadow-lg)',
          textAlign: 'center',
          background: 'linear-gradient(180deg, #FFFFFF 0%, #FFFDF9 100%)',
          position: 'relative',
          marginBottom: '2rem'
        }}>
          
          <div style={{
            fontSize: '1.25rem',
            fontWeight: 800,
            fontFamily: 'var(--font-heading)',
            color: 'var(--primary-maroon-dark)',
            letterSpacing: '0.05em',
            marginBottom: '1rem'
          }}>
            CHENNAI JOTHI MATRIMONY
          </div>

          <div style={{
            fontSize: '0.9rem',
            color: 'var(--text-muted)',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '0.5rem'
          }}>
            1 Year Registration Fee
          </div>

          {/* Amount Badge */}
          <div style={{
            fontSize: '3.2rem',
            fontWeight: 900,
            color: 'var(--primary-maroon-dark)',
            margin: '0.5rem 0 1.5rem',
            lineHeight: 1
          }}>
            ₹1,000
          </div>

          {/* Benefits List */}
          <div style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem 1.5rem',
            textAlign: 'left',
            marginBottom: '2rem'
          }}>
            {[
              'Create Matrimony Profile',
              'View Available Alliances',
              'Search Profiles with Filters',
              'Send & Receive Unlimited Interests',
              'Check Horoscope Match',
              'Mutual Contact Details Sharing'
            ].map((feature, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                fontSize: '0.92rem',
                color: 'var(--text-main)',
                fontWeight: 600,
                marginBottom: i === 5 ? 0 : '0.65rem'
              }}>
                <CheckCircle2 size={18} color="#166534" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* Embedded Razorpay Payment Button */}
          {/* OFFICIAL RAZORPAY STANDARD WEB CHECKOUT */}
          <div style={{
            background: '#F0F9FF',
            border: '2px solid #0284C7',
            borderRadius: '12px',
            padding: '1.5rem 1.25rem',
            marginBottom: '1.5rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: '#0369A1', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <CreditCard size={18} />
              <span>Razorpay Standard Web Checkout (Instant Verification)</span>
            </div>
            
            <p style={{ fontSize: '0.84rem', color: '#475569', margin: '0 0 1.25rem 0' }}>
              Pay securely with instant activation via UPI (GPay, PhonePe, Paytm), Cards & NetBanking:
            </p>

            <RazorpayStandardCheckout
              amount={1000 * 100}
              currency="INR"
              userId={registrationId || user?.regNo || user?.id || 'JM2026001234'}
              userName={user?.name || 'Valued Member'}
              userEmail={user?.email || 'member@chennaijothimatrimony.com'}
              userPhone={user?.mobile || user?.phone || '9043773977'}
              buttonText="Pay ₹1,000 via Razorpay Standard Checkout"
              onSuccess={handlePaymentSuccess}
            />

            <div style={{ margin: '1.5rem 0 0.85rem', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '50%', left: '10%', right: '10%', height: '1px', background: '#BAE6FD' }}></div>
              <span style={{ position: 'relative', background: '#F0F9FF', padding: '0 12px', fontSize: '0.74rem', color: '#64748B', fontWeight: 700 }}>
                OR USE DIRECT PAYMENT BUTTON
              </span>
            </div>

            <div style={{ minHeight: '48px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <RazorpayPaymentButton paymentButtonId="pl_TuQgSgXdvzHPKY" />
            </div>
          </div>

          <div style={{
            background: '#FFFBEB',
            border: '1px solid #FCD34D',
            borderRadius: '8px',
            padding: '0.85rem 1rem',
            fontSize: '0.84rem',
            color: '#B45309',
            lineHeight: 1.5,
            textAlign: 'left',
            marginBottom: '1rem'
          }}>
            📌 <strong>Important Notice:</strong> Once your ₹1,000 online payment is completed on the Razorpay screen above, Razorpay will issue your receipt and automatically unlock access to browse alliances.
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem',
            fontSize: '0.8rem',
            color: 'var(--text-muted)'
          }}>
            <Lock size={14} color="var(--gold-dark)" />
            <span>Razorpay 256-bit SSL Secure Payment & Server Verification</span>
          </div>

        </div>

        {/* Direct Bank Account Transfer Card */}
        <div className="card" style={{
          padding: '1.75rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-light)',
          background: '#FFFFFF',
          boxShadow: 'var(--shadow-md)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
            <Landmark size={22} color="var(--primary-maroon)" />
            <h3 style={{ fontSize: '1.15rem', color: 'var(--primary-maroon-dark)', margin: 0, fontWeight: 700 }}>
              Direct Bank Account Transfer (IMPS / NEFT / RTGS)
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            
            <div style={bankRowStyle}>
              <span style={labelStyle}>Bank Name:</span>
              <strong style={valueStyle}>{bankDetails.bankName}</strong>
            </div>

            <div style={bankRowStyle}>
              <span style={labelStyle}>Account Holder:</span>
              <strong style={valueStyle}>{bankDetails.accountName}</strong>
            </div>

            <div style={bankRowStyle}>
              <span style={labelStyle}>Account Number:</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <strong style={{ ...valueStyle, letterSpacing: '0.05em' }}>{bankDetails.accountNo}</strong>
                <button
                  type="button"
                  onClick={() => handleCopy('acc', bankDetails.accountNo)}
                  style={copyBtnStyle}>
                  {copiedField === 'acc' ? <Check size={14} color="#166534" /> : <Copy size={14} />}
                  <span>{copiedField === 'acc' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            <div style={bankRowStyle}>
              <span style={labelStyle}>IFSC Code:</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <strong style={{ ...valueStyle, letterSpacing: '0.05em' }}>{bankDetails.ifsc}</strong>
                <button
                  type="button"
                  onClick={() => handleCopy('ifsc', bankDetails.ifsc)}
                  style={copyBtnStyle}>
                  {copiedField === 'ifsc' ? <Check size={14} color="#166534" /> : <Copy size={14} />}
                  <span>{copiedField === 'ifsc' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            <div style={bankRowStyle}>
              <span style={labelStyle}>Branch:</span>
              <strong style={valueStyle}>{bankDetails.branch}</strong>
            </div>

          </div>

          <div style={{
            marginTop: '1.25rem',
            padding: '0.75rem 1rem',
            background: '#FFFBEB',
            border: '1px solid #FCD34D',
            borderRadius: '6px',
            fontSize: '0.82rem',
            color: '#B45309',
            lineHeight: 1.4
          }}>
            💡 <strong>Note:</strong> After making the bank transfer, please mention your <strong>Registration ID ({registrationId || user?.id || 'JM2026001234'})</strong> in the payment remarks or contact support to instantly verify your account.
          </div>
        </div>

      </div>
    </div>
  );
}

const bankRowStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0.5rem 0.75rem',
  background: '#F8FAFC',
  borderRadius: '6px',
  border: '1px solid #F1F5F9'
};

const labelStyle = {
  fontSize: '0.85rem',
  color: 'var(--text-muted)',
  fontWeight: 500
};

const valueStyle = {
  fontSize: '0.92rem',
  color: 'var(--text-main)',
  fontWeight: 700
};

const copyBtnStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.3rem',
  background: '#E0F2FE',
  color: '#0284C7',
  border: '1px solid #7DD3FC',
  borderRadius: '4px',
  padding: '2px 8px',
  fontSize: '0.75rem',
  fontWeight: 700,
  cursor: 'pointer'
};

