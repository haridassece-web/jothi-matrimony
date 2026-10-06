import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, LogIn, ShieldCheck, ArrowRight, CreditCard, UserPlus } from 'lucide-react';

export default function LoginPage({ setActivePage }) {
  const { login, language } = useAuth();

  const [identifier, setIdentifier] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [requiresPayment, setRequiresPayment] = useState(false);
  const [requiresRegistration, setRequiresRegistration] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setErrorMsg(language === 'ta' ? 'பதிவு எண் அல்லது மொபைல் எண்ணை உள்ளிடவும்' : 'Please enter your Registration ID or Registered Mobile number');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    setRequiresPayment(false);
    setRequiresRegistration(false);

    try {
      const res = await login(identifier);
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
              {language === 'ta' ? 'பதிவு செய்த உறுப்பினர் உள்நுழைவு' : 'Paid Member Login'}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', margin: 0 }}>
              {language === 'ta' ? 'உங்கள் பதிவு எண் (Registration ID) அல்லது மொபைல் எண்ணை உள்ளிடவும்' : 'Enter your Registration ID (e.g. JM202600709) or Registered Mobile Number'}
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

          <form onSubmit={handleSubmit}>
            {/* Registration ID / Mobile Field */}
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label className="form-label" style={{ fontWeight: 700, color: 'var(--primary-maroon-dark)', fontSize: '0.92rem', marginBottom: '0.5rem', display: 'block' }}>
                {language === 'ta' ? 'பதிவு எண் (Reg ID) அல்லது மொபைல் எண்' : 'Registration ID (e.g. JM202600709) or Mobile Number'}
              </label>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary-maroon)' }} />
                <input 
                  type="text"
                  className="form-input"
                  placeholder=""
                  style={{ paddingLeft: '2.5rem', width: '100%', borderRadius: '8px', height: '46px', fontSize: '1rem', fontWeight: 600 }}
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  autoFocus
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isLoading}
              className="btn btn-primary btn-full btn-lg" 
              style={{ height: '48px', fontSize: '1.05rem', fontWeight: 700, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <span>{isLoading ? (language === 'ta' ? 'சரிபார்க்கிறது...' : 'Verifying Account...') : (language === 'ta' ? 'உள்நுழைக' : 'Verify & Login')}</span>
              {!isLoading && <ArrowRight size={18} />}
            </button>
          </form>

          {/* Register Link */}
          <div style={{ textAlign: 'center', marginTop: '1.75rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
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
          </div>

        </div>

      </div>
    </div>
  );
}
