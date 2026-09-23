import React from 'react';
import { useAuth } from '../context/AuthContext';
import RasiChart from '../components/RasiChart';
import { ShieldCheck, Download, Edit, User, Phone, Mail } from 'lucide-react';

export default function ProfilePage({ setActivePage }) {
  const { user, registrationId, paymentDetails, language } = useAuth();

  return (
    <div style={{ padding: '3rem 0', minHeight: '85vh', background: 'var(--bg-silk)' }}>
      <div className="container" style={{ maxWidth: '840px' }}>
        
        {/* Profile Card */}
        <div className="card" style={{ padding: '2.5rem', borderRadius: 'var(--radius-lg)', marginBottom: '2rem' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="badge badge-green" style={{ marginBottom: '0.4rem' }}>
                <ShieldCheck size={14} /> Active Paid Member
              </span>
              <h1 style={{ fontSize: '2rem', color: 'var(--primary-maroon-dark)', margin: 0 }}>
                {user?.name || 'Haridass Ram'}
              </h1>
              <div style={{ fontSize: '0.9rem', color: 'var(--gold-dark)', fontWeight: 600 }}>
                Registration ID: {registrationId || user?.id || 'JM2026001234'}
              </div>
            </div>

            <button onClick={() => setActivePage('profile-setup')} className="btn btn-outline btn-sm">
              <Edit size={16} /> Edit My Profile
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem', fontSize: '0.92rem' }}>
            <div><strong>Gender:</strong> {user?.gender || 'Male'}</div>
            <div><strong>Date of Birth:</strong> {user?.dob || '1998-07-12'}</div>
            <div><strong>Mobile:</strong> {user?.mobile || '+91 98400 11223'}</div>
            <div><strong>Email:</strong> {user?.email || 'haridass@jothimatrimony.com'}</div>
            <div><strong>City:</strong> {user?.city || 'Chennai'}</div>
            <div><strong>Community:</strong> {user?.caste || 'Iyer'}</div>
          </div>

          <RasiChart rasiName={user?.rasi || 'Simmam'} nakshatra={user?.nakshatra || 'Magam'} />
        </div>

        {/* Payment Receipt Box */}
        <div className="card" style={{ padding: '1.75rem', background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
          <h3 style={{ fontSize: '1.1rem', color: 'var(--primary-maroon-dark)', marginBottom: '0.75rem' }}>
            ₹1,000 Registration Payment Receipt
          </h3>
          <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Paid Date: {paymentDetails?.paidAt ? new Date(paymentDetails.paidAt).toLocaleDateString() : '2026-02-20'} • Gateway: {paymentDetails?.gateway || 'Razorpay UPI'}
          </div>

          <button 
            onClick={() => alert('📥 Downloaded PDF Receipt: JM2026_RECEIPT.pdf')}
            className="btn btn-outline-gold btn-sm">
            <Download size={16} /> Download Tax Receipt PDF
          </button>
        </div>

      </div>
    </div>
  );
}
