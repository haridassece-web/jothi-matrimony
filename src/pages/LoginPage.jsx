import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Lock, Eye, EyeOff, LogIn, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';

export default function LoginPage({ setActivePage }) {
  const { login, loginDemoUser, language } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setErrorMsg(language === 'ta' ? 'பயனர் பெயர் அல்லது மொபைல் எண்ணை உள்ளிடவும்' : 'Please enter your User Name, Mobile number, or Email');
      return;
    }
    if (!password.trim()) {
      setErrorMsg(language === 'ta' ? 'கடவுச்சொல்லை உள்ளிடவும்' : 'Please enter your password');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await login(username, password);
      if (res && res.success) {
        setSuccessMsg(language === 'ta' ? 'வெற்றிகரமாக உள்நுழைந்துவிட்டீர்கள்!' : 'Login successful! Redirecting to Dashboard...');
        setTimeout(() => {
          if (setActivePage) {
            setActivePage('dashboard');
          }
        }, 1000);
      } else {
        setErrorMsg(res?.message || (language === 'ta' ? 'தவறான பயனர் பெயர் அல்லது கடவுச்சொல்' : 'Invalid username or password. Please try again.'));
      }
    } catch (err) {
      setErrorMsg(language === 'ta' ? 'உள்நுழைவதில் பிழை ஏற்பட்டது. மீண்டும் முயலவும்.' : 'An error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    loginDemoUser();
    setSuccessMsg(language === 'ta' ? 'டெமோ பயனர் உள்நுழைவு வெற்றிகரம்!' : 'Demo Member logged in successfully!');
    setTimeout(() => {
      if (setActivePage) {
        setActivePage('dashboard');
      }
    }, 800);
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
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              width: '64px', height: '64px', borderRadius: '50%',
              background: 'var(--maroon-gradient)', color: '#FFF',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1.2rem', boxShadow: '0 4px 12px rgba(122, 12, 46, 0.2)',
              border: '2px solid var(--gold-primary)'
            }}>
              <LogIn size={28} />
            </div>

            <h2 style={{ fontSize: '1.8rem', color: 'var(--primary-maroon-dark)', marginBottom: '0.4rem', fontWeight: 800 }}>
              {language === 'ta' ? 'உறுப்பினர் உள்நுழைவு' : 'Member Login'}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', margin: 0 }}>
              {language === 'ta' ? 'உங்கள் பயனர் பெயர் மற்றும் கடவுச்சொல்லைப் பயன்படுத்தி உள்நுழையவும்' : 'Enter your User Name / Mobile & Password to access your profile'}
            </p>
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
              padding: '0.75rem 1rem',
              color: '#991B1B',
              fontWeight: 600,
              fontSize: '0.88rem',
              marginBottom: '1.5rem',
              textAlign: 'center'
            }}>
              ⚠️ {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* User Name / Mobile / Email Field */}
            <div className="form-group" style={{ marginBottom: '1.25rem' }}>
              <label className="form-label" style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.9rem', marginBottom: '0.4rem', display: 'block' }}>
                {language === 'ta' ? 'பயனர் பெயர் / மொபைல் எண் / மின்னஞ்சல்' : 'User Name / Mobile / Email'}
              </label>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="text"
                  className="form-input"
                  placeholder={language === 'ta' ? 'எ.கா. Haridass அல்லது 9840012345' : 'e.g. Haridass / 9840012345 / user@gmail.com'}
                  style={{ paddingLeft: '2.5rem', width: '100%', borderRadius: '8px', height: '46px' }}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <label className="form-label" style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.9rem', margin: 0 }}>
                  {language === 'ta' ? 'கடவுச்சொல் (Password)' : 'Password'}
                </label>
                <a 
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    alert(language === 'ta' ? 'கடவுச்சொல்லை மாற்ற +91 90437 73977 என்ற எண்ணிற்கு தொடர்பு கொள்ளவும்.' : 'For password assistance, please call/WhatsApp +91 90437 73977');
                  }}
                  style={{ fontSize: '0.8rem', color: 'var(--primary-maroon)', fontWeight: 600, textDecoration: 'none' }}>
                  {language === 'ta' ? 'கடவுச்சொல் மறந்துவிட்டதா?' : 'Forgot password?'}
                </a>
              </div>
              
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type={showPassword ? 'text' : 'password'}
                  className="form-input"
                  placeholder="••••••••"
                  style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem', width: '100%', borderRadius: '8px', height: '46px' }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    padding: 0
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isLoading}
              className="btn btn-primary btn-full btn-lg" 
              style={{ height: '48px', fontSize: '1.05rem', fontWeight: 700, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <span>{isLoading ? (language === 'ta' ? 'உள்நுழைகிறது...' : 'Signing In...') : (language === 'ta' ? 'உள்நுழைக' : 'Login Now')}</span>
              {!isLoading && <ArrowRight size={18} />}
            </button>
          </form>

          {/* Quick Demo Login Option */}
          <div style={{ margin: '1.5rem 0', textAlign: 'center', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'var(--border-light)' }}></div>
            <span style={{ position: 'relative', background: '#FFF', padding: '0 0.8rem', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              {language === 'ta' ? 'அல்லது உடனடி டெமோ அணுகல்' : 'OR INSTANT ACCESS'}
            </span>
          </div>

          <button 
            type="button"
            onClick={handleDemoLogin}
            className="btn btn-gold btn-full"
            style={{ 
              borderRadius: '8px',
              padding: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              fontWeight: 700,
              fontSize: '0.92rem'
            }}>
            <Sparkles size={18} />
            <span>{language === 'ta' ? 'உடனடி டெமோ உள்நுழைவு (Demo Login)' : 'Quick Demo Login (Haridass Ram)'}</span>
          </button>

          {/* Register Link */}
          <div style={{ textAlign: 'center', marginTop: '1.75rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            {language === 'ta' ? 'புதிய உறுப்பினரா?' : "Don't have an account yet?"}{' '}
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
          </div>

        </div>

      </div>
    </div>
  );
}
