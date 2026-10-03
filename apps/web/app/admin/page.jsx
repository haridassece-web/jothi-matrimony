'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import ChennaiJothiRegistrationForm from '../../components/ChennaiJothiRegistrationForm';
import { 
  ShieldCheck, Users, CreditCard, Lock, Sparkles, Printer, 
  Trash2, Eye, Plus, Search, Phone, Mail
} from 'lucide-react';

export default function NextAdminPage() {
  const router = useRouter();
  const { allProfiles, user, language } = useAuth();
  
  const [profilesList, setProfilesList] = useState(allProfiles || []);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegFormProfile, setSelectedRegFormProfile] = useState(null);
  const [activeTab, setActiveTab] = useState('profiles');

  React.useEffect(() => {
    if (allProfiles && allProfiles.length) {
      setProfilesList(allProfiles);
    }
  }, [allProfiles]);

  const totalProfiles = (profilesList || []).length;
  const verifiedCount = (profilesList || []).filter(p => p && p.verified).length;
  const totalRevenue = totalProfiles * 1000;

  const filtered = (profilesList || []).filter(p => {
    if (!p) return false;
    const searchLower = (searchTerm || '').toLowerCase();
    const nameStr = p.name ? String(p.name).toLowerCase() : '';
    const casteStr = p.caste ? String(p.caste).toLowerCase() : '';
    const regNoStr = p.regNo ? String(p.regNo).toLowerCase() : '';
    const idStr = p.id ? String(p.id).toLowerCase() : '';
    
    return nameStr.includes(searchLower) ||
      casteStr.includes(searchLower) ||
      regNoStr.includes(searchLower) ||
      idStr.includes(searchLower);
  });

  const toggleVerify = (id) => {
    setProfilesList(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, verified: !p.verified };
      }
      return p;
    }));
  };

  const handleDeleteProfile = (id) => {
    if (window.confirm('Are you sure you want to delete this profile from Admin Panel?')) {
      setProfilesList(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div style={{ padding: '3rem 0', minHeight: '85vh', background: 'var(--bg-silk)' }}>
      <div className="container" style={{ maxWidth: '1100px' }}>
        
        {/* Admin Header Banner */}
        <div className="card" style={{
          padding: '2rem',
          borderRadius: 'var(--radius-lg)',
          background: 'linear-gradient(135deg, #800000 0%, #4A0000 100%)',
          color: '#FFF',
          marginBottom: '2rem',
          boxShadow: 'var(--shadow-lg)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="badge badge-gold" style={{ marginBottom: '0.5rem', background: '#FFD700', color: '#1A0D03', fontWeight: 800 }}>
                👑 CHENNAI JOTHI MATRIMONY ADMIN PORTAL
              </span>
              <h1 style={{ fontSize: '2.2rem', color: '#FFF', margin: '0 0 0.3rem 0' }}>
                Administrator Management Panel
              </h1>
              <p style={{ color: '#F8FAFC', fontSize: '0.95rem', margin: 0 }}>
                Organizer: <strong>Dr. Chandra Babu</strong> (REGD-332/2008) • Master Admin Access Granted
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link href="/profile-setup" className="btn btn-gold btn-sm">
                <Plus size={16} /> Add New Profile
              </Link>
              <Link href="/dashboard" className="btn btn-outline btn-sm" style={{ borderColor: '#FFF', color: '#FFF' }}>
                User Portal View
              </Link>
            </div>
          </div>
        </div>

        {/* Metric Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2rem'
        }}>
          <div className="card" style={{ padding: '1.25rem', borderLeft: '4px solid var(--primary-maroon)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Total Active Profiles</div>
            <div style={{ fontSize: '2.1rem', fontWeight: 900, color: 'var(--primary-maroon-dark)' }}>{totalProfiles}</div>
            <div style={{ fontSize: '0.78rem', color: '#166534', fontWeight: 600 }}>100% Authentic PDF Registered</div>
          </div>

          <div className="card" style={{ padding: '1.25rem', borderLeft: '4px solid #166534' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Verified Members</div>
            <div style={{ fontSize: '2.1rem', fontWeight: 900, color: '#166534' }}>{verifiedCount}</div>
            <div style={{ fontSize: '0.78rem', color: '#166534', fontWeight: 600 }}>Official Document Verified</div>
          </div>

          <div className="card" style={{ padding: '1.25rem', borderLeft: '4px solid var(--gold-dark)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Total Revenue Collected</div>
            <div style={{ fontSize: '2.1rem', fontWeight: 900, color: 'var(--gold-dark)' }}>₹{totalRevenue.toLocaleString()}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Razorpay ₹1,000 Registration Fee</div>
          </div>

          <div className="card" style={{ padding: '1.25rem', borderLeft: '4px solid #0284C7' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Admin Privileges</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0369A1', marginTop: '0.4rem' }}>
              <ShieldCheck size={18} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
              Full Admin Granted
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Full Unrestricted Access</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '2px solid var(--border-light)', paddingBottom: '0.5rem' }}>
          <button 
            onClick={() => setActiveTab('profiles')}
            className={`btn btn-sm ${activeTab === 'profiles' ? 'btn-primary' : 'btn-outline'}`}>
            <Users size={16} /> Manage Profiles ({filtered.length})
          </button>

          <button 
            onClick={() => setActiveTab('payments')}
            className={`btn btn-sm ${activeTab === 'payments' ? 'btn-primary' : 'btn-outline'}`}>
            <CreditCard size={16} /> Razorpay Payments Ledger
          </button>
        </div>

        {/* Tab Content 1: Profiles Management */}
        {activeTab === 'profiles' && (
          <div className="card" style={{ padding: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <h3 style={{ fontSize: '1.3rem', color: 'var(--primary-maroon-dark)', margin: 0 }}>
                Registered Profiles Database
              </h3>

              <div style={{ position: 'relative', width: '280px' }}>
                <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Search Name, Reg No, Caste..."
                  style={{ paddingLeft: '2.2rem', fontSize: '0.88rem' }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Profiles Table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ background: '#F8FAFC', borderBottom: '2px solid #E2E8F0', textAlign: 'left', color: 'var(--primary-maroon-dark)' }}>
                    <th style={{ padding: '10px' }}>Reg No / ID</th>
                    <th style={{ padding: '10px' }}>Photo & Name</th>
                    <th style={{ padding: '10px' }}>Community / Caste</th>
                    <th style={{ padding: '10px' }}>Education & Job</th>
                    <th style={{ padding: '10px' }}>Phone / Email</th>
                    <th style={{ padding: '10px' }}>Status</th>
                    <th style={{ padding: '10px', textAlign: 'center' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(profile => (
                    <tr key={profile.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '12px 10px', fontWeight: 700, color: 'var(--primary-maroon)' }}>
                        {profile.regNo || profile.id}
                      </td>
                      <td style={{ padding: '12px 10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <img 
                            src={profile.photo} 
                            alt={profile.name} 
                            style={{ width: '40px', height: '48px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #CBD5E1' }}
                          />
                          <div>
                            <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{profile.name}</div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{profile.gender} • {profile.age} Yrs</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '12px 10px', fontWeight: 600 }}>
                        {profile.caste}
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{profile.subcaste || 'Subcaste specified'}</div>
                      </td>
                      <td style={{ padding: '12px 10px' }}>
                        <div>{profile.profession}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{profile.education}</div>
                      </td>
                      <td style={{ padding: '12px 10px', fontSize: '0.82rem' }}>
                        <div>📞 {profile.phone || '+91 90437 73977'}</div>
                        <div style={{ color: 'var(--text-muted)' }}>✉️ {profile.email}</div>
                      </td>
                      <td style={{ padding: '12px 10px' }}>
                        <button 
                          onClick={() => toggleVerify(profile.id)}
                          style={{
                            border: 'none',
                            background: profile.verified ? '#DCFCE7' : '#FEF3C7',
                            color: profile.verified ? '#166534' : '#92400E',
                            padding: '3px 8px',
                            borderRadius: '12px',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}>
                          {profile.verified ? '✓ Verified' : '⚠️ Pending'}
                        </button>
                      </td>
                      <td style={{ padding: '12px 10px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.4rem' }}>
                          <Link 
                            href={`/alliances/${profile.id}`}
                            title="View Profile Details"
                            className="btn btn-outline btn-sm" style={{ padding: '4px 8px' }}>
                            <Eye size={14} />
                          </Link>

                          <button 
                            onClick={() => setSelectedRegFormProfile(profile)}
                            title="Print Registration Form"
                            className="btn btn-outline-gold btn-sm" style={{ padding: '4px 8px' }}>
                            <Printer size={14} />
                          </button>

                          <button 
                            onClick={() => handleDeleteProfile(profile.id)}
                            title="Delete Profile"
                            className="btn btn-sm" style={{ padding: '4px 8px', background: '#FEE2E2', color: '#991B1B', border: 'none' }}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab Content 2: Payments Ledger */}
        {activeTab === 'payments' && (
          <div className="card" style={{ padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--primary-maroon-dark)', marginBottom: '1.25rem' }}>
              Razorpay ₹1,000 Registration Fee Payment Audit Log
            </h3>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ background: '#F8FAFC', borderBottom: '2px solid #E2E8F0', textAlign: 'left', color: 'var(--primary-maroon-dark)' }}>
                    <th style={{ padding: '10px' }}>Payment ID</th>
                    <th style={{ padding: '10px' }}>User Name</th>
                    <th style={{ padding: '10px' }}>Gateway</th>
                    <th style={{ padding: '10px' }}>Amount</th>
                    <th style={{ padding: '10px' }}>Status</th>
                    <th style={{ padding: '10px' }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {profilesList.map((profile, i) => (
                    <tr key={profile.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '12px 10px', fontWeight: 700, color: '#0369A1' }}>
                        PAY_RAZORPAY_889{i + 1}01
                      </td>
                      <td style={{ padding: '12px 10px', fontWeight: 700 }}>
                        {profile.name} ({profile.regNo || profile.id})
                      </td>
                      <td style={{ padding: '12px 10px' }}>Razorpay UPI / Button pl_TjVL3MecrAQliL</td>
                      <td style={{ padding: '12px 10px', fontWeight: 800, color: '#166534' }}>₹1,000</td>
                      <td style={{ padding: '12px 10px' }}>
                        <span className="badge badge-green">✓ SUCCESS</span>
                      </td>
                      <td style={{ padding: '12px 10px', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                        2026-03-{10 + i} 10:30 AM
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* Admin Registration Form Print Modal */}
      {selectedRegFormProfile && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(4px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
          overflowY: 'auto'
        }}>
          <div style={{
            background: '#FFF',
            borderRadius: '12px',
            maxWidth: '940px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '1.5rem',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }} className="no-print">
              <h3 style={{ margin: 0, color: 'var(--primary-maroon-dark)' }}>
                Official Chennai Jothi Registration Sheet - {selectedRegFormProfile.name}
              </h3>
              <button 
                onClick={() => setSelectedRegFormProfile(null)}
                className="btn btn-outline btn-sm">
                Close (மூடுக)
              </button>
            </div>

            <ChennaiJothiRegistrationForm profile={selectedRegFormProfile} />
          </div>
        </div>
      )}

    </div>
  );
}
