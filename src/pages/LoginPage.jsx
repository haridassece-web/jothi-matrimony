import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, LogIn, ShieldCheck, ArrowRight, CreditCard, UserPlus, Lock, Key, Eye, EyeOff } from 'lucide-react';

export default function LoginPage({ setActivePage }) {
  const { login, language } = useAuth();

  const [loginMode, setLoginMode] = useState('member'); // 'member' | 'admin'
  const [identifier, setIdentifier] = useState('');
  const [adminUsername, setAdminUsername] = useState('admin');
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [requiresPayment, setRequiresPayment] = useState(false);
  const [requiresRegistration, setRequiresRegistration] = useState(false);

  const handleMemberSubmit = async (e) => {
    e.preventDefault();
    const cleanId = (identifier || '').trim();
    if (!cleanId) {
      setErrorMsg(language === 'ta' ? 'பதிவு எண் அல்லது மொபைல் எண்ணை உள்ளிடவும்' : 'Please enter your Registration ID or Registered Mobile number');
      return;
    }

    // Auto-detect admin passcode entry
    if (['admin', 'admin123', 'jothi2026', 'organizer'].includes(cleanId.toLowerCase())) {
      setLoginMode('admin');
      setAdminPassword(cleanId);
      setErrorMsg('');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    setRequiresPayment(false);
    setRequiresRegistration(false);

    try {
      const res = await login(cleanId);
      if (res && res.success) {
        setSuccessMsg(language === 'ta' ? 'வெற்றிகரமாக உள்நுழைந்துவிட்டீர்கள்!' : 'Paid Registration Verified! Logging in...');
        setTimeout(() => {
          if (setActivePage) {
            setActivePage('dashboard');
          }
        }, 800);
      } else {
        setErrorMsg(res?.message || (language === 'ta' ? 'பதிவு எண் அல்லது மொபைல் எண் காணப்படவில்லை' : 'No active paid registration found for this ID/Mobile.'));
        if (res?.requiresPayment) setRequiresPayment(true);
        if (res?.requiresRegistration) setRequiresRegistration(true);
      }
    } catch (err) {
      setErrorMsg(language === 'ta' ? 'உள்நுழைவதில் பிழை ஏற்பட்டது. மீண்டும் முயலவும்.' : 'An error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    const validUsernames = ['admin', 'chennaijothi', 'organizer', 'chandrababu'];
    const validPasswords = ['jothi2026', 'admin123', 'admin', 'chennaijothi', '73977'];

    const username = (adminUsername || '').trim().toLowerCase();
    const password = (adminPassword || '').trim();

    const isUserValid = !username || validUsernames.includes(username);
    const isPassValid = validPasswords.includes(password);

    if (isUserValid && isPassValid) {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('jothi_admin_authenticated', 'true');
        localStorage.setItem('jothi_admin_authenticated', 'true');
      }
      setSuccessMsg('Administrator Authorized! Opening Admin Management Panel...');
      setTimeout(() => {
        if (setActivePage) {
          setActivePage('admin');
        }
      }, 700);
    } else {
      setErrorMsg('Invalid Admin Username or Security Password. Please enter valid admin credentials.');
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '4rem 1rem', minHeight: '82vh', background: 'var(--bg-silk)' }}>
      <div className="container" style={{ maxWidth: '480px' }}>
        
        {/* Card */}
        <div className="card" style={{ 
          padding: '2.5rem 2rem', 
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-md)',
          border: '1.5px solid var(--border-gold)',
          background: '#FFFFFF'
        }}>
          
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div style={{
              width: '64px', height: '64px', borderRadius: '50%',
              background: loginMode === 'admin' ? 'linear-gradient(135deg, #7A0C2E 0%, #4A061B 100%)' : 'var(--maroon-gradient)', 
              color: '#FFF',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1.2rem', boxShadow: '0 4px 12px rgba(122, 12, 46, 0.2)',
              border: '2px solid var(--gold-primary)'
            }}>
              {loginMode === 'admin' ? <Lock size={28} /> : <LogIn size={28} />}
            </div>

            <h2 style={{ fontSize: '1.8rem', color: 'var(--primary-maroon-dark)', marginBottom: '0.4rem', fontWeight: 800 }}>
              {loginMode === 'admin' ? 'Administrator Login' : (language === 'ta' ? 'பதிவு செய்த உறுப்பினர் உள்நுழைவு' : 'Paid Member Login')}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', margin: 0 }}>
              {loginMode === 'admin'
                ? 'Organizer & Matrimony Admin Management Portal'
                : (language === 'ta' ? 'உங்கள் பதிவு எண் அல்லது மொபைல் எண்ணை உள்ளிடவும்' : 'Enter your Registration ID or Registered Mobile')}
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div style={{
            display: 'flex',
            background: '#F1F5F9',
            borderRadius: '10px',
            padding: '4px',
            marginBottom: '1.5rem',
            border: '1px solid #E2E8F0'
          }}>
            <button
              type="button"
              onClick={() => { setLoginMode('member'); setErrorMsg(''); setSuccessMsg(''); }}
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: '8px',
                border: 'none',
                background: loginMode === 'member' ? '#FFFFFF' : 'transparent',
                color: loginMode === 'member' ? 'var(--primary-maroon-dark)' : 'var(--text-muted)',
                fontWeight: loginMode === 'member' ? 800 : 600,
                fontSize: '0.88rem',
                cursor: 'pointer',
                boxShadow: loginMode === 'member' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}>
              <User size={15} /> Member Login
            </button>

            <button
              type="button"
              onClick={() => { setLoginMode('admin'); setErrorMsg(''); setSuccessMsg(''); }}
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: '8px',
                border: 'none',
                background: loginMode === 'admin' ? '#7A0C2E' : 'transparent',
                color: loginMode === 'admin' ? '#FFD700' : 'var(--text-muted)',
                fontWeight: loginMode === 'admin' ? 800 : 600,
                fontSize: '0.88rem',
                cursor: 'pointer',
                boxShadow: loginMode === 'admin' ? '0 2px 6px rgba(122, 12, 46, 0.25)' : 'none',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}>
              <Lock size={15} /> Admin Login
            </button>
          </div>

          {/* Success Banner */}
          {successMsg && (
            <div style={{
              background: '#ECFDF5',
              border: '1px solid #6EE7B7',
              borderRadius: '8px',
              padding: '0.75rem 1rem',
              color: '#065F46',
              fontWeight: 700,
              fontSize: '0.9rem',
              marginBottom: '1.5rem',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}>
              <ShieldCheck size={20} color="#059669" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Error Banner */}
          {errorMsg && (
            <div style={{
              background: '#FEF2F2',
              border: '1px solid #FCA5A5',
              borderRadius: '8px',
              padding: '0.88rem 1rem',
              color: '#991B1B',
              fontWeight: 600,
              fontSize: '0.88rem',
              marginBottom: '1.5rem',
              textAlign: 'center',
              lineHeight: 1.4
            }}>
              ⚠️ {errorMsg}

              {requiresPayment && (
                <div style={{ marginTop: '0.75rem' }}>
                  <button onClick={() => setActivePage && setActivePage('payment')} className="btn btn-gold btn-full btn-sm" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', fontWeight: 700 }}>
                    <CreditCard size={16} />
                    <span>Pay ₹1,000 Registration Fee Now</span>
                  </button>
                </div>
              )}

              {requiresRegistration && (
                <div style={{ marginTop: '0.75rem' }}>
                  <button onClick={() => setActivePage && setActivePage('register')} className="btn btn-primary btn-full btn-sm" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', fontWeight: 700 }}>
                    <UserPlus size={16} />
                    <span>Register New Account (₹1,000)</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* MEMBER LOGIN FORM */}
          {loginMode === 'member' && (
            <form onSubmit={handleMemberSubmit}>
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label className="form-label" style={{ fontWeight: 700, color: 'var(--primary-maroon-dark)', fontSize: '0.92rem', marginBottom: '0.5rem', display: 'block' }}>
                  {language === 'ta' ? 'பதிவு எண் (Reg ID) அல்லது மொபைல் எண்' : 'Registration ID (e.g. JM202600709) or Mobile Number'}
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary-maroon)' }} />
                  <input 
                    type="text"
                    className="form-input"
                    placeholder="e.g. JM202600709 or 9043773977"
                    style={{ paddingLeft: '2.5rem', width: '100%', borderRadius: '8px', height: '46px', fontSize: '1rem', fontWeight: 600 }}
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    autoFocus
                    required
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="btn btn-primary btn-full btn-lg" 
                style={{ height: '48px', fontSize: '1.05rem', fontWeight: 700, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <span>{isLoading ? (language === 'ta' ? 'சரிபார்க்கிறது...' : 'Verifying Account...') : (language === 'ta' ? 'உள்நுழைக' : 'Verify & Login')}</span>
                {!isLoading && <ArrowRight size={18} />}
              </button>
            </form>
          )}

          {/* ADMIN LOGIN FORM */}
          {loginMode === 'admin' && (
            <form onSubmit={handleAdminSubmit}>
              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label className="form-label" style={{ fontWeight: 700, color: 'var(--primary-maroon-dark)', fontSize: '0.90rem', marginBottom: '0.4rem', display: 'block' }}>
                  Admin Username:
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#7A0C2E' }} />
                  <input 
                    type="text"
                    className="form-input" 
                    placeholder="admin"
                    style={{ paddingLeft: '2.5rem', width: '100%', borderRadius: '8px', height: '44px', fontSize: '0.95rem', fontWeight: 600 }}
                    value={adminUsername}
                    onChange={(e) => setAdminUsername(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label className="form-label" style={{ fontWeight: 700, color: 'var(--primary-maroon-dark)', fontSize: '0.90rem', marginBottom: '0.4rem', display: 'block' }}>
                  Admin Security Password / PIN:
                </label>
                <div style={{ position: 'relative' }}>
                  <Key size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#7A0C2E' }} />
                  <input 
                    type={showAdminPassword ? "text" : "password"}
                    className="form-input" 
                    placeholder="Enter Admin PIN / Password"
                    style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem', width: '100%', borderRadius: '8px', height: '44px', fontSize: '0.95rem', fontWeight: 600 }}
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    autoFocus
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowAdminPassword(!showAdminPassword)}
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
                    }}>
                    {showAdminPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="btn btn-primary btn-full btn-lg" 
                style={{ height: '48px', fontSize: '1.05rem', fontWeight: 800, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: '#7A0C2E' }}>
                <span>{isLoading ? 'Authorizing Admin...' : '🔓 Unlock Admin Portal'}</span>
                {!isLoading && <ArrowRight size={18} />}
              </button>
            </form>
          )}

          {/* Footer Navigation */}
          <div style={{ textAlign: 'center', marginTop: '1.75rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            {loginMode === 'member' ? (
              <>
                {language === 'ta' ? 'புதிய உறுப்பினரா?' : "New Member?"}{' '}
                <button 
                  onClick={() => setActivePage && setActivePage('register')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--primary-maroon-dark)',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    padding: 0
                  }}>
                  {language === 'ta' ? 'இப்போதே பதிவு செய்யவும் (₹1,000)' : 'Register Here (₹1,000)'}
                </button>
                <div style={{ marginTop: '0.75rem', borderTop: '1px solid #E2E8F0', paddingTop: '0.75rem' }}>
                  <button
                    type="button"
                    onClick={() => setLoginMode('admin')}
                    style={{ background: 'none', border: 'none', color: '#7A0C2E', fontWeight: 700, cursor: 'pointer', fontSize: '0.82rem' }}>
                    👑 Are you an Administrator? Access Admin Panel ➔
                  </button>
                </div>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setLoginMode('member')}
                style={{ background: 'none', border: 'none', color: 'var(--primary-maroon)', fontWeight: 700, cursor: 'pointer', fontSize: '0.84rem' }}>
                👤 Switch to Paid Member Login ➔
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
