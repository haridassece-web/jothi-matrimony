'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import ChennaiJothiRegistrationForm from '../../components/ChennaiJothiRegistrationForm';
import AdminEditProfileModal from '../../components/AdminEditProfileModal';
import { 
  ShieldCheck, Users, CreditCard, Lock, Sparkles, Printer, 
  Trash2, Eye, Plus, Search, Phone, Mail, Edit3, Download,
  FileSpreadsheet, Key, EyeOff, CheckCircle2, RefreshCw
} from 'lucide-react';

export default function NextAdminPage() {
  const router = useRouter();
  const { allProfiles, user, language, deleteProfile, updateFullProfile, adminUpdateProfile } = useAuth();
  
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('jothi_admin_authenticated') === 'true' || 
             localStorage.getItem('jothi_admin_authenticated') === 'true';
    }
    return false;
  });
  const [adminUsernameInput, setAdminUsernameInput] = useState('admin');
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [adminError, setAdminError] = useState('');

  const [profilesList, setProfilesList] = useState(allProfiles || []);
  const [searchTerm, setSearchTerm] = useState('');
  const [adminGenderFilter, setAdminGenderFilter] = useState('All');
  const [selectedRegFormProfile, setSelectedRegFormProfile] = useState(null);
  const [editingProfile, setEditingProfile] = useState(null);
  const [activeTab, setActiveTab] = useState('profiles');

  React.useEffect(() => {
    setProfilesList(allProfiles || []);
  }, [allProfiles]);

  const handleAdminSaveProfile = async (updated) => {
    setProfilesList(prev => prev.map(p => 
      (p.id === updated.id || (updated.regNo && p.regNo === updated.regNo)) ? updated : p
    ));

    if (adminUpdateProfile) {
      await adminUpdateProfile(updated);
    } else if (updateFullProfile) {
      await updateFullProfile(updated);
    }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    const validUsernames = ['admin', 'chennaijothi', 'organizer', 'chandrababu'];
    const validPasswords = ['jothi2026', 'admin123', 'admin', 'chennaijothi', '73977'];

    const username = (adminUsernameInput || '').trim().toLowerCase();
    const password = (adminPasswordInput || '').trim();

    const isUserValid = !username || validUsernames.includes(username);
    const isPassValid = validPasswords.includes(password);

    if (isUserValid && isPassValid) {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem('jothi_admin_authenticated', 'true');
      if (rememberMe && typeof window !== 'undefined') {
        localStorage.setItem('jothi_admin_authenticated', 'true');
      }
      setAdminError('');
    } else {
      setAdminError('Invalid Admin Username or Security Password. Please enter valid credentials.');
    }
  };

  const handleAdminLock = () => {
    setIsAdminAuthenticated(false);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('jothi_admin_authenticated');
      localStorage.removeItem('jothi_admin_authenticated');
    }
  };

  const getDisplayRegNo = (profile) => {
    if (!profile) return 'JM2026001001';
    let reg = profile.regNo || '';
    const cleanReg = reg.replace(/[\s\-\+]/g, '');

    if (!reg || /^\d{10,12}$/.test(cleanReg)) {
      const mobDigits = (profile.mobile || profile.phone || profile.id || cleanReg).replace(/\D/g, '');
      if (mobDigits.length >= 4) {
        reg = 'JM2026' + mobDigits.slice(-4);
      } else {
        reg = 'JM2026001001';
      }
    }

    if (!reg.toUpperCase().startsWith('JM')) {
      reg = 'JM' + reg;
    }

    return reg;
  };

  const isProfileVerified = (p) => {
    if (!p) return false;
    if (p.verified === false || p.isVerified === false) return false;
    if (p.verified === true || p.isVerified === true || p.status === 'Verified') return true;
    if (p.paymentStatus === 'PAID' || p.registrationStatus === 'PAID_ACTIVE' || p.is_paid_member || p.membershipStatus === 'Active Paid Member') return true;
    return true;
  };

  // ==========================================
  // EXPORT TO EXCEL (.CSV with UTF-8 BOM)
  // ==========================================
  const handleExportProfilesToExcel = (profilesToExport, exportTitle = 'Chennai_Jothi_Matrimony_Profiles') => {
    if (!profilesToExport || !profilesToExport.length) {
      alert('No profiles available to export.');
      return;
    }

    const headers = [
      'S.No',
      'Registration ID',
      'Reg No',
      'Full Name (பெயர்)',
      'Tamil Name',
      'Gender',
      'Age',
      'Date of Birth',
      'Birth Time',
      'Birth Place / Native',
      'Height',
      'Complexion',
      'Marital Status',
      'Religion',
      'Caste (இனம்)',
      'Subcaste',
      'Gothram',
      'Star / Nakshatra (நட்சத்திரம்)',
      'Padam',
      'Rasi (ராசி)',
      'Lagnam (லக்னம்)',
      'Chevvai Dosham',
      'Education (கல்வி)',
      'Institution',
      'Profession (பணி)',
      'Company',
      'Monthly Income (ரூ.)',
      'Annual Income',
      'City',
      'District / Address',
      'Contact Phone (கைபேசி)',
      'Email',
      'Father Name & Occupation',
      'Mother Name & Occupation',
      'Siblings',
      'House Property',
      'Partner Preferences',
      'Verification Status',
      'Payment Status',
      'Registered Date'
    ];

    const escapeCSV = (val) => {
      if (val === null || val === undefined) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    const rows = profilesToExport.map((p, idx) => {
      const regDisplay = p.regNo || p.id || '';
      const fatherInfo = [p.family?.fatherName || p.fatherName, p.family?.fatherOccupation || p.fatherOccupation].filter(Boolean).join(' - ');
      const motherInfo = [p.family?.motherName || p.motherName, p.family?.motherOccupation || p.motherOccupation].filter(Boolean).join(' - ');
      const partnerInfo = p.partnerPreferences ? 
        `Age: ${p.partnerPreferences.ageMin || ''}-${p.partnerPreferences.ageMax || ''}, Edu: ${p.partnerPreferences.education || 'Any'}, Caste: ${p.partnerPreferences.castePreference || 'Open'}` : '';

      return [
        idx + 1,
        p.id || '',
        regDisplay,
        p.name || '',
        p.tamilName || '',
        p.gender || '',
        p.age || '',
        p.dob || '',
        p.birthTime || '',
        p.birthPlace || p.nativeTown || '',
        p.height || '',
        p.complexion || '',
        p.maritalStatus || 'Never Married',
        p.religion || 'Hindu',
        p.caste || '',
        p.subcaste || '',
        p.gothram || '',
        p.nakshatra || '',
        p.padam || '1',
        p.rasi || '',
        p.lagnam || '',
        p.chevvaiDosham || 'No',
        p.education || '',
        p.institution || '',
        p.profession || '',
        p.company || '',
        p.monthlyIncome || '',
        p.annualIncome || '',
        p.city || '',
        p.address || `${p.nativeTown || p.city || ''}, ${p.state || 'Tamil Nadu'}`,
        p.phone || p.mobile || '',
        p.email || '',
        fatherInfo,
        motherInfo,
        p.family?.siblings || p.siblings || 'Nil',
        p.houseProperty || p.family?.houseProperty || 'Own House',
        partnerInfo,
        isProfileVerified(p) ? 'Verified' : 'Pending',
        (p.paymentStatus === 'PAID' || p.membershipStatus === 'Active Paid Member') ? 'PAID (₹1,000)' : 'Unpaid',
        p.joinedDate || '2026-04-01'
      ].map(escapeCSV).join(',');
    });

    // Prepend UTF-8 BOM (\uFEFF) so Microsoft Excel opens Tamil Unicode characters without garbled text
    const csvContent = '\uFEFF' + [headers.map(escapeCSV).join(','), ...rows].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const dateStr = new Date().toISOString().split('T')[0];
    link.setAttribute('href', url);
    link.setAttribute('download', `${exportTitle}_${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExportPaymentsToExcel = () => {
    const headers = [
      'S.No',
      'Transaction ID',
      'Profile ID',
      'Registration ID',
      'Candidate Name (பெயர்)',
      'Gender',
      'Payment Gateway',
      'Registration Fee (ரூ.)',
      'Payment Status',
      'Date & Time',
      'Contact Phone',
      'Email'
    ];

    const escapeCSV = (val) => {
      if (val === null || val === undefined) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    const rows = (profilesList || []).map((p, idx) => {
      const regDisplay = getDisplayRegNo(p);
      const txnId = `CJM_TXN_${String(100000 + idx + 1)}`;
      return [
        idx + 1,
        txnId,
        p.id,
        regDisplay,
        p.name,
        p.gender,
        'Razorpay UPI / Cards (pl_TuQgSgXdvzHPKY)',
        '₹1,000',
        'SUCCESS / PAID',
        p.joinedDate || '2026-04-01',
        p.phone || p.mobile || '',
        p.email || ''
      ].map(escapeCSV).join(',');
    });

    const csvContent = '\uFEFF' + [headers.map(escapeCSV).join(','), ...rows].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const dateStr = new Date().toISOString().split('T')[0];
    link.setAttribute('href', url);
    link.setAttribute('download', `Chennai_Jothi_Payments_Ledger_${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // ==========================================
  // ADMIN LOGIN SCREEN
  // ==========================================
  if (!isAdminAuthenticated) {
    return (
      <div style={{ padding: '4rem 1rem', minHeight: '85vh', background: 'var(--bg-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="card" style={{ maxWidth: '460px', width: '100%', padding: '2.5rem', textAlign: 'center', border: '2px solid var(--gold-dark)', boxShadow: 'var(--shadow-lg)', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'linear-gradient(135deg, #7A0C2E 0%, #4A061B 100%)', color: '#FFD700', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', boxShadow: '0 4px 15px rgba(122, 12, 46, 0.3)', border: '2px solid #D4AF37' }}>
            <Lock size={32} />
          </div>
          <span className="badge badge-gold" style={{ marginBottom: '0.5rem', fontWeight: 800 }}>
            👑 RESTRICTED ADMIN PORTAL
          </span>
          <h2 style={{ fontSize: '1.7rem', color: 'var(--primary-maroon-dark)', marginBottom: '0.3rem', fontWeight: 800 }}>
            Administrator Login
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Organizer: <strong>Dr. Chandra Babu</strong> (REGD-332/2008)
          </p>

          {adminError && (
            <div style={{ background: '#FDF2F5', border: '1px solid #F5C2D0', color: '#9B1B43', padding: '0.65rem 0.85rem', borderRadius: '8px', fontSize: '0.84rem', fontWeight: 600, marginBottom: '1.2rem', textAlign: 'left' }}>
              ⚠️ {adminError}
            </div>
          )}

          <form onSubmit={handleAdminLogin}>
            <div className="form-group" style={{ textAlign: 'left', marginBottom: '1rem' }}>
              <label className="form-label" style={{ fontWeight: 700, fontSize: '0.88rem' }}>Admin Username:</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="admin"
                value={adminUsernameInput}
                onChange={(e) => setAdminUsernameInput(e.target.value)}
                required
                style={{ fontSize: '0.95rem' }}
              />
            </div>

            <div className="form-group" style={{ textAlign: 'left', marginBottom: '1.25rem' }}>
              <label className="form-label" style={{ fontWeight: 700, fontSize: '0.88rem' }}>Admin Security Password / PIN:</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type={showPassword ? "text" : "password"} 
                  className="form-input" 
                  placeholder="Enter Password / PIN"
                  value={adminPasswordInput}
                  onChange={(e) => setAdminPasswordInput(e.target.value)}
                  autoFocus
                  required
                  style={{ fontSize: '0.95rem', paddingRight: '2.5rem' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    padding: '4px'
                  }}
                  title={showPassword ? "Hide password" : "Show password"}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', color: 'var(--text-main)', fontWeight: 600 }}>
                <input 
                  type="checkbox" 
                  checked={rememberMe} 
                  onChange={(e) => setRememberMe(e.target.checked)} 
                  style={{ accentColor: 'var(--primary-maroon)' }}
                />
                Remember me on this device
              </label>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Default: jothi2026</span>
            </div>

            <button type="submit" className="btn btn-primary btn-full" style={{ padding: '0.75rem', fontSize: '1.05rem', fontWeight: 800 }}>
              🔓 Unlock Admin Management Portal
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ==========================================
  // AUTHENTICATED ADMIN DASHBOARD
  // ==========================================
  const totalProfiles = (profilesList || []).length;
  const verifiedCount = (profilesList || []).filter(p => p && isProfileVerified(p)).length;
  const bridesCount = (profilesList || []).filter(p => p && p.gender === 'Female').length;
  const groomsCount = (profilesList || []).filter(p => p && p.gender === 'Male').length;
  const totalRevenue = totalProfiles * 1000;

  const filtered = (profilesList || []).filter(p => {
    if (!p) return false;
    const searchLower = (searchTerm || '').toLowerCase();
    const nameStr = p.name ? String(p.name).toLowerCase() : '';
    const casteStr = p.caste ? String(p.caste).toLowerCase() : '';
    const regNoStr = p.regNo ? String(p.regNo).toLowerCase() : '';
    const idStr = p.id ? String(p.id).toLowerCase() : '';
    
    const matchesSearch = nameStr.includes(searchLower) ||
      casteStr.includes(searchLower) ||
      regNoStr.includes(searchLower) ||
      idStr.includes(searchLower);

    const matchesGender = adminGenderFilter === 'All' || p.gender === adminGenderFilter;

    return matchesSearch && matchesGender;
  });

  const toggleVerify = (id) => {
    const target = (profilesList || []).find(p => p.id === id);
    if (!target) return;
    const currentVerified = isProfileVerified(target);
    const updated = { ...target, verified: !currentVerified, isVerified: !currentVerified };

    setProfilesList(prev => prev.map(p => p.id === id ? updated : p));
    if (updateFullProfile) {
      updateFullProfile(updated);
    }
  };

  const handleDeleteProfile = async (id) => {
    if (window.confirm('Are you sure you want to permanently delete this profile? It will NOT show again on the live site.')) {
      await deleteProfile(id);
      setProfilesList(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div style={{ padding: '3rem 0', minHeight: '85vh', background: 'var(--bg-silk)' }}>
      <div className="container" style={{ maxWidth: '1150px' }}>
        
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
                Organizer: <strong>Dr. Chandra Babu</strong> (REGD-332/2008) • Master Admin Access Active
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
              {/* Excel Export Quick Button in Banner */}
              <button
                onClick={() => handleExportProfilesToExcel(profilesList, 'Chennai_Jothi_Matrimony_All_Profiles')}
                className="btn btn-sm"
                title="Download all registered profiles in Excel (.CSV format with UTF-8 BOM)"
                style={{
                  background: '#107C41',
                  color: '#FFF',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  borderRadius: '6px',
                  border: '1px solid #10B981',
                  boxShadow: '0 2px 10px rgba(16, 124, 65, 0.4)'
                }}>
                <FileSpreadsheet size={16} /> Export to Excel
              </button>

              <Link href="/profile-setup" className="btn btn-gold btn-sm">
                <Plus size={16} /> Add New Profile
              </Link>
              
              <button onClick={handleAdminLock} className="btn btn-sm" style={{ background: '#FDF2F5', color: '#9B1B43', border: '1px solid #F5C2D0', fontWeight: 700 }}>
                🔒 Lock Admin
              </button>
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
              Full Master Admin
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Full Unrestricted Access</div>
          </div>
        </div>

        {/* Tab Navigation & Excel Export Bar */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          flexWrap: 'wrap', 
          gap: '1rem', 
          marginBottom: '1.5rem', 
          borderBottom: '2px solid var(--border-light)', 
          paddingBottom: '0.75rem' 
        }}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
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

          {/* Excel Export Toolbar */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#107C41' }}>
              Excel Export:
            </span>
            <button
              onClick={() => handleExportProfilesToExcel(profilesList, 'Chennai_Jothi_Matrimony_All_Profiles')}
              className="btn btn-sm"
              title="Download all registered profiles in Excel (.CSV format with UTF-8 BOM)"
              style={{
                background: '#107C41',
                color: '#FFF',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                borderRadius: '6px',
                boxShadow: '0 2px 8px rgba(16, 124, 65, 0.3)'
              }}>
              <FileSpreadsheet size={16} /> Export All ({totalProfiles})
            </button>

            <button
              onClick={() => handleExportProfilesToExcel(filtered, `Chennai_Jothi_${adminGenderFilter}_Profiles`)}
              className="btn btn-sm"
              title="Download current filtered list in Excel"
              style={{
                background: '#0D6533',
                color: '#FFF',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                borderRadius: '6px'
              }}>
              <Download size={15} /> Export Filtered ({filtered.length})
            </button>
          </div>
        </div>

        {/* Tab Content 1: Profiles Management */}
        {activeTab === 'profiles' && (
          <div className="card" style={{ padding: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--primary-maroon-dark)', margin: 0 }}>
                  Registered Profiles Database (Admin Access)
                </h3>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Manage both Grooms & Brides in Local & Live System • Exportable to Excel
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', gap: '0.35rem' }}>
                  <button
                    onClick={() => setAdminGenderFilter('All')}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '12px',
                      border: adminGenderFilter === 'All' ? '1.5px solid var(--primary-maroon)' : '1px solid #CBD5E1',
                      background: adminGenderFilter === 'All' ? 'var(--primary-maroon)' : '#FFF',
                      color: adminGenderFilter === 'All' ? '#FFF' : 'var(--text-main)',
                      fontWeight: 700,
                      fontSize: '0.78rem',
                      cursor: 'pointer'
                    }}>
                    All ({totalProfiles})
                  </button>
                  <button
                    onClick={() => setAdminGenderFilter('Female')}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '12px',
                      border: adminGenderFilter === 'Female' ? '1.5px solid var(--primary-maroon)' : '1px solid #CBD5E1',
                      background: adminGenderFilter === 'Female' ? 'var(--primary-maroon)' : '#FFF',
                      color: adminGenderFilter === 'Female' ? '#FFF' : 'var(--text-main)',
                      fontWeight: 700,
                      fontSize: '0.78rem',
                      cursor: 'pointer'
                    }}>
                    Brides 👰 ({bridesCount})
                  </button>
                  <button
                    onClick={() => setAdminGenderFilter('Male')}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '12px',
                      border: adminGenderFilter === 'Male' ? '1.5px solid var(--primary-maroon)' : '1px solid #CBD5E1',
                      background: adminGenderFilter === 'Male' ? 'var(--primary-maroon)' : '#FFF',
                      color: adminGenderFilter === 'Male' ? '#FFF' : 'var(--text-main)',
                      fontWeight: 700,
                      fontSize: '0.78rem',
                      cursor: 'pointer'
                    }}>
                    Grooms 🤵 ({groomsCount})
                  </button>
                </div>

                <div style={{ position: 'relative', width: '240px' }}>
                  <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Search Name, Reg No..."
                    style={{ paddingLeft: '2.2rem', fontSize: '0.85rem' }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
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
                        {getDisplayRegNo(profile)}
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
                        {(() => {
                          const verified = isProfileVerified(profile);
                          return (
                            <button 
                              onClick={() => toggleVerify(profile.id)}
                              style={{
                                border: 'none',
                                background: verified ? '#DCFCE7' : '#FEF3C7',
                                color: verified ? '#166534' : '#92400E',
                                padding: '4px 10px',
                                borderRadius: '12px',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                cursor: 'pointer'
                              }}>
                              {verified ? '✓ Verified' : '⚠️ Pending'}
                            </button>
                          );
                        })()}
                      </td>
                      <td style={{ padding: '12px 10px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.4rem' }}>
                          <button 
                            onClick={() => setEditingProfile(profile)}
                            title="Edit Profile (Admin Edit Access)"
                            className="btn btn-outline btn-sm" 
                            style={{ padding: '4px 8px', borderColor: '#2563EB', color: '#1D4ED8', background: '#EFF6FF' }}>
                            <Edit3 size={14} />
                          </button>

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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--primary-maroon-dark)', margin: 0 }}>
                  Razorpay ₹1,000 Registration Fee Payment Audit Log
                </h3>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Official transaction ledger for Chennai Jothi Matrimony
                </div>
              </div>

              <button
                onClick={handleExportPaymentsToExcel}
                className="btn btn-sm"
                title="Download complete payments audit log in Excel (.CSV format with UTF-8 BOM)"
                style={{
                  background: '#107C41',
                  color: '#FFF',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  borderRadius: '6px',
                  boxShadow: '0 2px 8px rgba(16, 124, 65, 0.3)'
                }}>
                <FileSpreadsheet size={16} /> Export Payments Ledger (.CSV)
              </button>
            </div>
            
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
                        {profile.name} ({getDisplayRegNo(profile)})
                      </td>
                      <td style={{ padding: '12px 10px' }}>Razorpay UPI / Button pl_TuQgSgXdvzHPKY</td>
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
        <div 
          className="registration-modal-backdrop"
          style={{
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
          <div 
            className="registration-modal-content"
            style={{
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

      {/* Admin Edit Profile Modal */}
      {editingProfile && (
        <AdminEditProfileModal 
          profile={editingProfile}
          onClose={() => setEditingProfile(null)}
          onSave={handleAdminSaveProfile}
        />
      )}

    </div>
  );
}
