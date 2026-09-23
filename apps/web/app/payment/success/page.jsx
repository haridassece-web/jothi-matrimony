'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../../context/AuthContext';
import { CheckCircle2, ShieldCheck, ArrowRight, UserCheck } from 'lucide-react';

export default function PaymentSuccessPage() {
  const { user, paymentDetails, language } = useAuth();

  return (
    <div style={{ padding: '4rem 0', minHeight: '80vh', background: 'var(--bg-silk)' }}>
      <div className="container" style={{ maxWidth: '560px' }}>
        <div className="card" style={{
          padding: '3rem 2rem',
          textAlign: 'center',
          borderRadius: 'var(--radius-lg)',
          border: '2px solid #166534',
          boxShadow: 'var(--shadow-lg)'
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
            boxShadow: '0 4px 14px rgba(22, 101, 52, 0.2)'
          }}>
            <CheckCircle2 size={46} />
          </div>

          <h2 style={{ fontSize: '1.8rem', color: '#14532D', marginBottom: '0.4rem', fontWeight: 800 }}>
            {language === 'ta' ? 'பதிவுக் கட்டணம் வெற்றி!' : 'Registration Payment Verified!'}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
            Thank you! Your ₹1,000 payment was confirmed server-side. Your account is now fully active for 1 year.
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
              <span style={{ color: '#4B5563' }}>Member ID:</span>
              <strong style={{ color: '#166534' }}>{user?.id || 'JM2026001234'}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ color: '#4B5563' }}>Transaction Ref:</span>
              <strong style={{ color: '#166534' }}>{paymentDetails?.id || 'PAY_98234729'}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ color: '#4B5563' }}>Amount Paid:</span>
              <strong style={{ color: '#166534' }}>₹1,000 (INR)</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#4B5563' }}>Membership Status:</span>
              <span className="badge badge-green">✓ Active Paid Member</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <Link 
              href="/profile-setup" 
              className="btn btn-primary btn-full btn-lg">
              <UserCheck size={18} />
              <span>Complete Profile Details & Horoscope (Step 4)</span>
            </Link>

            <Link 
              href="/alliances" 
              className="btn btn-outline-gold btn-full">
              <span>Browse Tamil Alliances Right Away →</span>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
