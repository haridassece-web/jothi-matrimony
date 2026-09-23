import React from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, CheckCircle2, Lock, Sparkles, CreditCard } from 'lucide-react';

export default function PaymentPage({ setActivePage, onOpenRazorpay }) {
  const { user, registrationId, registrationStatus, language } = useAuth();

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
          position: 'relative'
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

      </div>
    </div>
  );
}
