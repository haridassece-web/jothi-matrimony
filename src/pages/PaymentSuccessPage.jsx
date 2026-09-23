import React from 'react';
import { useAuth } from '../context/AuthContext';
import { CheckCircle2, Sparkles, UserCheck, ArrowRight, Download } from 'lucide-react';

export default function PaymentSuccessPage({ setActivePage }) {
  const { user, registrationId, paymentDetails } = useAuth();

  return (
    <div style={{ padding: '4rem 0', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '560px' }}>
        <div className="card" style={{
          padding: '3rem 2rem',
          textAlign: 'center',
          borderRadius: 'var(--radius-lg)',
          border: '2px solid #BBF7D0',
          boxShadow: 'var(--shadow-lg)'
        }}>
          
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: '#DCFCE7',
            color: '#166534',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem'
          }}>
            <CheckCircle2 size={50} />
          </div>

          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#14532D', marginBottom: '0.4rem' }}>
            🎉 Registration Successful!
          </h2>

          <div style={{
            fontSize: '1rem',
            color: 'var(--primary-maroon-dark)',
            fontWeight: 700,
            marginBottom: '1.25rem'
          }}>
            Registration ID: <span style={{ color: 'var(--gold-dark)' }}>{registrationId || user?.id || 'JM2026001234'}</span>
          </div>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: 1.6 }}>
            Your ₹1,000 registration fee payment has been verified server-side. Your Jothi Matrimony active membership account is now live!
          </p>

          <div style={{
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: 'var(--radius-md)',
            padding: '1rem 1.25rem',
            textAlign: 'left',
            fontSize: '0.85rem',
            marginBottom: '2rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ color: '#64748B' }}>Payment Reference:</span>
              <strong>{paymentDetails?.id || 'PAY_JM99887766'}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ color: '#64748B' }}>Amount Paid:</span>
              <strong style={{ color: '#166534' }}>₹1,000.00 (INR)</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748B' }}>Account Access:</span>
              <strong style={{ color: '#166534' }}>Active Member (Full Access)</strong>
            </div>
          </div>

          <button 
            onClick={() => setActivePage('profile-setup')}
            className="btn btn-primary btn-full btn-lg pulse-button">
            <UserCheck size={20} />
            <span>[ Complete My Profile ]</span>
            <ArrowRight size={18} />
          </button>

        </div>
      </div>
    </div>
  );
}
