import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, CheckCircle2, Lock, Sparkles, CreditCard, Landmark, Copy, Check } from 'lucide-react';

export default function PaymentPage({ setActivePage, onOpenRazorpay }) {
  const { user, registrationId, registrationStatus, language } = useAuth();
  const [copiedField, setCopiedField] = useState(null);

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
            JOTHI MATRIMONY
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

          {/* Pay Button */}
          <button 
            onClick={onOpenRazorpay}
            className="btn btn-gold btn-full btn-lg pulse-button"
            style={{ fontSize: '1.1rem', letterSpacing: '0.02em', marginBottom: '1rem' }}>
            <CreditCard size={20} />
            <span>[ PAY ₹1,000 NOW ]</span>
          </button>

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

