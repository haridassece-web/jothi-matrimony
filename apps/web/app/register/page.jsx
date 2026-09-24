'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import {
  User,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  'https://jothi-matrimony.onrender.com';

export default function RegisterPage() {
  const router = useRouter();
  const { registerBasicProfile, language } = useAuth();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    profileFor: 'Myself',
    name: '',
    gender: 'Male',
    dob: '',
    mobile: '',
    email: '',
    city: 'Chennai'
  });

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpError, setOtpError] = useState('');
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendSeconds, setResendSeconds] = useState(0);

  const cleanMobile = () => formData.mobile.replace(/\D/g, '');

  const startResendTimer = () => {
    setResendSeconds(60);

    const timer = setInterval(() => {
      setResendSeconds((seconds) => {
        if (seconds <= 1) {
          clearInterval(timer);
          return 0;
        }
        return seconds - 1;
      });
    }, 1000);
  };

  const handleBasicSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert('Please enter your full name');
      return;
    }

    if (!formData.dob) {
      alert('Please select date of birth');
      return;
    }

    const mobile = cleanMobile();

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      alert('Please enter a valid 10-digit Indian mobile number');
      return;
    }

    await sendOtp();
  };

  const sendOtp = async () => {
    const mobile = cleanMobile();

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setOtpError('Please enter a valid 10-digit mobile number.');
      return;
    }

    try {
      setIsSendingOtp(true);
      setOtpError('');

      const response = await fetch(`${API_URL}/auth/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          mobile: `+91${mobile}`
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Unable to send OTP.');
      }

      setOtp(['', '', '', '', '', '']);
      setStep(2);
      startResendTimer();

      setTimeout(() => {
        document.getElementById('jothi-reg-otp-0')?.focus();
      }, 100);
    } catch (error) {
      setOtpError(error.message || 'Failed to send OTP.');
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleOtpChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setOtpError('');

    if (value && index < 5) {
      document.getElementById(`jothi-reg-otp-${index + 1}`)?.focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`jothi-reg-otp-${index - 1}`)?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    const pasted = e.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, 6);

    if (!pasted) return;

    e.preventDefault();

    const newOtp = ['', '', '', '', '', ''];
    pasted.split('').forEach((digit, index) => {
      newOtp[index] = digit;
    });

    setOtp(newOtp);
    setOtpError('');

    const focusIndex = Math.min(pasted.length, 5);
    document.getElementById(`jothi-reg-otp-${focusIndex}`)?.focus();
  };

  const registerUser = async () => {
    const response = await fetch(`${API_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        mobile: `+91${cleanMobile()}`,
        full_name: formData.name.trim(),
        email: formData.email.trim() || null,
        gender: formData.gender,
        date_of_birth: formData.dob,
        city: formData.city.trim()
      })
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Registration failed.');
    }

    registerBasicProfile(formData);
    router.push('/payment');
  };

  const handleVerifyOtp = async () => {
    const entered = otp.join('');

    if (!/^\d{6}$/.test(entered)) {
      setOtpError('Please enter all 6 digits of the OTP.');
      return;
    }

    try {
      setIsVerifying(true);
      setOtpError('');

      const response = await fetch(`${API_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          mobile: `+91${cleanMobile()}`,
          otp: entered
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Invalid OTP.');
      }

      await registerUser();
    } catch (error) {
      setOtpError(error.message || 'OTP verification failed.');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div style={{ padding: '3.5rem 0', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '620px' }}>

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
          }} />

          {[
            [1, language === 'ta' ? 'அடிப்படை விவரங்கள்' : 'Basic Details'],
            [2, language === 'ta' ? 'OTP சரிபார்ப்பு' : 'OTP Verification'],
            [3, language === 'ta' ? '₹1,000 கட்டணம்' : '₹1,000 Payment']
          ].map(([number, label]) => (
            <div
              key={number}
              style={{
                zIndex: 2,
                background: 'var(--bg-silk)',
                padding: '0 0.5rem',
                textAlign: 'center'
              }}
            >
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background:
                  step >= number
                    ? 'var(--maroon-gradient)'
                    : '#E2D5C8',
                color: step >= number ? '#FFF' : '#6B5E57',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                margin: '0 auto 0.3rem'
              }}>
                {number}
              </div>
              <div style={{
                fontSize: '0.78rem',
                fontWeight: 600,
                color:
                  step >= number
                    ? 'var(--primary-maroon)'
                    : 'var(--text-muted)'
              }}>
                {label}
              </div>
            </div>
          ))}
        </div>

        <div className="card" style={{
          padding: '2.5rem',
          borderRadius: 'var(--radius-lg)'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            <h2 style={{
              fontSize: '1.8rem',
              color: 'var(--primary-maroon-dark)',
              marginBottom: '0.4rem'
            }}>
              {language === 'ta'
                ? 'ஜோதி மேட்ரிமோனி கணக்கு உருவாக்குக'
                : 'Create Your Matrimony Profile'}
            </h2>

            <p style={{
              color: 'var(--text-muted)',
              fontSize: '0.92rem'
            }}>
              {step === 1
                ? 'Step 1 of 3: Provide basic contact information.'
                : 'Step 2 of 3: Verify your mobile number.'}
            </p>
          </div>

          <form onSubmit={handleBasicSubmit}>
            <div className="form-group">
              <label className="form-label">
                Who are you registering for?
              </label>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '0.6rem'
              }}>
                {['Myself', 'Son', 'Daughter', 'Brother', 'Sister', 'Relative']
                  .map((rel) => (
                    <button
                      type="button"
                      key={rel}
                      onClick={() => {
                        let gen = formData.gender;

                        if (rel === 'Son' || rel === 'Brother') {
                          gen = 'Male';
                        }

                        if (rel === 'Daughter' || rel === 'Sister') {
                          gen = 'Female';
                        }

                        setFormData({
                          ...formData,
                          profileFor: rel,
                          gender: gen
                        });
                      }}
                      style={{
                        padding: '0.65rem 0.5rem',
                        borderRadius: 'var(--radius-sm)',
                        border:
                          formData.profileFor === rel
                            ? '2px solid var(--primary-maroon)'
                            : '1px solid var(--border-light)',
                        background:
                          formData.profileFor === rel
                            ? '#FDF2F5'
                            : '#FFF',
                        color:
                          formData.profileFor === rel
                            ? 'var(--primary-maroon)'
                            : 'var(--text-main)',
                        fontWeight:
                          formData.profileFor === rel ? 700 : 500,
                        fontSize: '0.85rem',
                        cursor: 'pointer'
                      }}
                    >
                      {rel}
                    </button>
                  ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                Full Name of Bride / Groom
              </label>

              <div style={{ position: 'relative' }}>
                <User size={18} style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)'
                }} />

                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Haridass Ram / Priya Sundaram"
                  style={{ paddingLeft: '2.5rem' }}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value
                    })
                  }
                  required
                />
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem'
            }}>
              <div className="form-group">
                <label className="form-label">Gender</label>

                <select
                  className="form-select"
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      gender: e.target.value
                    })
                  }
                >
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
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      dob: e.target.value
                    })
                  }
                  required
                />
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem'
            }}>
              <div className="form-group">
                <label className="form-label">
                  Mobile Number (For OTP)
                </label>

                <div style={{ position: 'relative' }}>
                  <Phone size={18} style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--text-muted)'
                  }} />

                  <input
                    type="tel"
                    className="form-input"
                    placeholder="+91 98400 12345"
                    style={{ paddingLeft: '2.5rem' }}
                    value={formData.mobile}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        mobile: e.target.value
                      })
                    }
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">City / Town</label>

                <div style={{ position: 'relative' }}>
                  <MapPin size={18} style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--text-muted)'
                  }} />

                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Chennai, Coimbatore, Madurai"
                    style={{ paddingLeft: '2.5rem' }}
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        city: e.target.value
                      })
                    }
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>

              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)'
                }} />

                <input
                  type="email"
                  className="form-input"
                  placeholder="e.g. user@gmail.com"
                  style={{ paddingLeft: '2.5rem' }}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value
                    })
                  }
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSendingOtp}
              className="btn btn-primary btn-full btn-lg"
              style={{ marginTop: '1rem' }}
            >
              <span>
                {isSendingOtp
                  ? 'Sending OTP...'
                  : 'Send Mobile OTP'}
              </span>
              <ArrowRight size={18} />
            </button>
          </form>
        </div>

        {step === 2 && (
          <div className="modal-overlay" style={{ zIndex: 9999 }}>
            <div className="modal-content" style={{
              padding: '2rem',
              textAlign: 'center'
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: '#F0FDF4',
                color: '#166534',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                border: '1px solid #BBF7D0'
              }}>
                <ShieldCheck size={32} />
              </div>

              <h3 style={{
                fontSize: '1.4rem',
                color: 'var(--primary-maroon-dark)',
                marginBottom: '0.4rem'
              }}>
                Mobile OTP Verification
              </h3>

              <p style={{
                fontSize: '0.88rem',
                color: 'var(--text-muted)',
                marginBottom: '1rem'
              }}>
                Enter the 6-digit OTP sent by SMS to{' '}
                <strong>+91 {cleanMobile()}</strong>
              </p>

              {otpError && (
                <div style={{
                  background: '#FEF2F2',
                  border: '1px solid #FCA5A5',
                  borderRadius: '8px',
                  padding: '0.6rem 0.85rem',
                  fontSize: '0.82rem',
                  color: '#991B1B',
                  fontWeight: 600,
                  marginBottom: '1rem'
                }}>
                  ⚠️ {otpError}
                </div>
              )}

              <div style={{
                display: 'flex',
                gap: '0.5rem',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`jothi-reg-otp-${i}`}
                    type="text"
                    inputMode="numeric"
                    autoComplete={i === 0 ? 'one-time-code' : 'off'}
                    maxLength={1}
                    value={digit}
                    onChange={(e) =>
                      handleOtpChange(e.target.value, i)
                    }
                    onKeyDown={(e) =>
                      handleOtpKeyDown(e, i)
                    }
                    onPaste={i === 0 ? handleOtpPaste : undefined}
                    style={{
                      width: '44px',
                      height: '48px',
                      fontSize: '1.3rem',
                      fontWeight: 800,
                      textAlign: 'center',
                      borderRadius: '8px',
                      border: digit
                        ? '2.5px solid var(--primary-maroon)'
                        : '1.5px solid var(--border-light)',
                      background: digit ? '#FFFDF9' : '#FFFFFF',
                      color: 'var(--primary-maroon-dark)'
                    }}
                  />
                ))}
              </div>

              <button
                onClick={handleVerifyOtp}
                disabled={isVerifying}
                className="btn btn-primary btn-full btn-lg"
                style={{ marginBottom: '1rem' }}
              >
                {isVerifying
                  ? 'Verifying OTP...'
                  : 'Verify OTP & Proceed to Payment →'}
              </button>

              <div style={{
                display: 'flex',
                justify.content: 'space-between',
                alignItems: 'center',
                fontSize: '0.82rem'
              }}>
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setOtpError('');
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer'
                  }}
                >
                  ← Edit Mobile Number
                </button>

                <button
                  type="button"
                  disabled={resendSeconds > 0 || isSendingOtp}
                  onClick={sendOtp}
                  style={{
                    background: 'none',
                    border: 'none',
                    color:
                      resendSeconds > 0
                        ? 'var(--text-muted)'
                        : 'var(--primary-maroon)',
                    fontWeight: 700,
                    cursor:
                      resendSeconds > 0
                        ? 'not-allowed'
                        : 'pointer'
                  }}
                >
                  {resendSeconds > 0
                    ? `Resend in ${resendSeconds}s`
                    : 'Resend OTP 🔄'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
