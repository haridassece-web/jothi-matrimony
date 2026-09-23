import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Phone, Mail, MapPin, Calendar, ShieldCheck, ArrowRight, CheckCircle } from 'lucide-react';

export default function RegisterPage({ setActivePage }) {
  const { registerBasicProfile, language } = useAuth();

  const [step, setStep] = useState(1); // 1: Profile For & Details, 2: OTP Modal
  const [formData, setFormData] = useState({
    profileFor: 'Myself',
    name: '',
    gender: 'Male',
    dob: '1997-06-15',
    mobile: '98401 23456',
    email: '',
    city: 'Chennai'
  });

  const [otp, setOtp] = useState(['1', '2', '3', '4', '5', '6']);
  const [otpError, setOtpError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleBasicSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Please enter your full name');
      return;
    }
    if (!formData.mobile.trim() || formData.mobile.length < 10) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }
    setStep(2); // Show OTP Modal
  };

  const handleVerifyOtp = () => {
    setIsVerifying(true);
    setOtpError('');
    setTimeout(() => {
      setIsVerifying(false);
      // Register basic profile
      registerBasicProfile(formData);
      // Redirect to Payment Page (Step 3: ₹1,000 Registration Payment)
      setActivePage('payment');
    }, 1200);
  };

  return (
    <div style={{ padding: '3.5rem 0', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '620px' }}>
        
        {/* Progress Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2rem',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            height: '2px',
            background: 'var(--border-light)',
            zIndex: 1
          }}></div>

          <div style={{ zIndex: 2, background: 'var(--bg-silk)', padding: '0 0.5rem', textAlign: 'center' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: 'var(--maroon-gradient)', color: '#FFF',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, margin: '0 auto 0.3rem'
            }}>1</div>
            <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--primary-maroon)' }}>
              {language === 'ta' ? 'அடிப்படை விவரங்கள்' : 'Basic Details'}
            </div>
          </div>

          <div style={{ zIndex: 2, background: 'var(--bg-silk)', padding: '0 0.5rem', textAlign: 'center' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: 'var(--bg-surface)', border: '2px solid var(--gold-dark)',
              color: 'var(--gold-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, margin: '0 auto 0.3rem'
            }}>2</div>
            <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--gold-dark)' }}>
              {language === 'ta' ? 'OTP சரிபார்ப்பு' : 'OTP Verification'}
            </div>
          </div>

          <div style={{ zIndex: 2, background: 'var(--bg-silk)', padding: '0 0.5rem', textAlign: 'center' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: '#E2D5C8', color: '#6B5E57',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, margin: '0 auto 0.3rem'
            }}>3</div>
            <div style={{ fontSize: '0.78rem', fontWeight: 500, color: 'var(--text-muted)' }}>
              {language === 'ta' ? '₹1,000 கட்டணம்' : '₹1,000 Payment'}
            </div>
          </div>
        </div>

        {/* Card Form */}
        <div className="card" style={{ padding: '2.5rem', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.8rem', color: 'var(--primary-maroon-dark)', marginBottom: '0.4rem' }}>
              {language === 'ta' ? 'ஜோதி மேட்ரிமோனி கணக்கு உருவாக்குக' : 'Create Your Matrimony Profile'}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
              Step 1 of 3: Provide basic contact information to begin.
            </p>
          </div>

          <form onSubmit={handleBasicSubmit}>
            
            {/* Step 1: Profile For */}
            <div className="form-group">
              <label className="form-label">
                {language === 'ta' ? 'யாருக்காக வரன் தேடுகிறீர்கள்?' : 'Who are you registering for?'}
              </label>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '0.6rem'
              }}>
                {['Myself', 'Son', 'Daughter', 'Brother', 'Sister', 'Relative'].map((rel, idx) => (
                  <button 
                    type="button"
                    key={idx}
                    onClick={() => {
                      let gen = formData.gender;
                      if (rel === 'Son' || rel === 'Brother') gen = 'Male';
                      if (rel === 'Daughter' || rel === 'Sister') gen = 'Female';
                      setFormData({...formData, profileFor: rel, gender: gen});
                    }}
                    style={{
                      padding: '0.65rem 0.5rem',
                      borderRadius: 'var(--radius-sm)',
                      border: formData.profileFor === rel ? '2px solid var(--primary-maroon)' : '1px solid var(--border-light)',
                      background: formData.profileFor === rel ? '#FDF2F5' : '#FFF',
                      color: formData.profileFor === rel ? 'var(--primary-maroon)' : 'var(--text-main)',
                      fontWeight: formData.profileFor === rel ? 700 : 500,
                      fontSize: '0.85rem',
                      cursor: 'pointer'
                    }}>
                    {rel}
                  </button>
                ))}
              </div>
            </div>

            {/* Basic Details */}
            <div className="form-group">
              <label className="form-label">Full Name of Bride / Groom</label>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Haridass Ram / Priya Sundaram"
                  style={{ paddingLeft: '2.5rem' }}
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Gender</label>
                <select 
                  className="form-select"
                  value={formData.gender}
                  onChange={(e) => setFormData({...formData, gender: e.target.value})}>
                  <option value="Male">Male (ஆண்)</option>
                  <option value="Female">Female (பெண்)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Date of Birth</label>
                <input 
                  type="date" 
                  className="form-input"
                  value={formData.dob}
                  onChange={(e) => setFormData({...formData, dob: e.target.value})}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Mobile Number (For OTP)</label>
                <div style={{ position: 'relative' }}>
                  <Phone size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input 
                    type="tel" 
                    className="form-input" 
                    placeholder="+91 98400 12345"
                    style={{ paddingLeft: '2.5rem' }}
                    value={formData.mobile}
                    onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">City / Town</label>
                <div style={{ position: 'relative' }}>
                  <MapPin size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. Chennai, Coimbatore, Madurai"
                    style={{ paddingLeft: '2.5rem' }}
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="email" 
                  className="form-input" 
                  placeholder="e.g. user@gmail.com"
                  style={{ paddingLeft: '2.5rem' }}
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-full btn-lg" style={{ marginTop: '1rem' }}>
              <span>Continue to Mobile OTP Verification</span>
              <ArrowRight size={18} />
            </button>
          </form>
        </div>

        {/* OTP Modal */}
        {step === 2 && (
          <div className="modal-overlay" style={{ zIndex: 9999 }}>
            <div className="modal-content" style={{ padding: '2rem', textAlign: 'center' }}>
              <div style={{
                width: '56px', height: '56px', borderRadius: '50%',
                background: '#FFF8E7', color: 'var(--gold-dark)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 1rem', border: '1px solid var(--border-gold)'
              }}>
                <ShieldCheck size={32} />
              </div>

              <h3 style={{ fontSize: '1.4rem', color: 'var(--primary-maroon-dark)', marginBottom: '0.4rem' }}>
                Mobile OTP Verification
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                We sent a 6-digit OTP code to <strong>{formData.mobile}</strong>
              </p>

              {/* 6 OTP boxes */}
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '1.5rem' }}>
                {otp.map((digit, i) => (
                  <input 
                    key={i}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => {
                      const newOtp = [...otp];
                      newOtp[i] = e.target.value;
                      setOtp(newOtp);
                    }}
                    style={{
                      width: '44px',
                      height: '48px',
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      textAlign: 'center',
                      borderRadius: '8px',
                      border: '2px solid var(--primary-maroon)',
                      background: '#FFFDF9'
                    }}
                  />
                ))}
              </div>

              <button 
                onClick={handleVerifyOtp} 
                disabled={isVerifying}
                className="btn btn-primary btn-full btn-lg"
                style={{ marginBottom: '1rem' }}>
                {isVerifying ? 'Verifying OTP Code...' : 'Verify OTP & Proceed to Payment →'}
              </button>

              <button 
                type="button" 
                onClick={() => setStep(1)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.85rem' }}>
                ← Edit Mobile Number
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
