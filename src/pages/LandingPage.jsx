import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  ShieldCheck, Sparkles, CreditCard, CheckCircle2, 
  ArrowRight, Lock, PhoneCall 
} from 'lucide-react';

export default function LandingPage({ setActivePage }) {
  const { language } = useAuth();

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        background: 'linear-gradient(135deg, #4A061B 0%, #7A0C2E 50%, #2A030F 100%)',
        color: '#FFFFFF',
        padding: '2.5rem 0 3.2rem',
        overflow: 'hidden',
        borderBottom: '4px solid var(--gold-dark)'
      }} className="kolam-bg">
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="hero-grid">
            {/* Left Content */}
            <div>
              <div className="badge badge-gold" style={{ marginBottom: '0.8rem', padding: '0.3rem 0.85rem', fontSize: '0.8rem' }}>
                <Sparkles size={13} /> Tamil Nadu's Premier Matrimony & Horoscope Service
              </div>

              <h1 style={{
                fontSize: '2.2rem',
                fontWeight: 800,
                color: '#FFF',
                lineHeight: 1.25,
                marginBottom: '0.9rem'
              }}>
                {language === 'ta' ? (
                  <>
                    உங்கள் <span className="gold-gradient-text">வாழ்க்கைத் துணையை</span> தேடுங்கள்
                  </>
                ) : (
                  <>
                    Find Your Perfect <span className="gold-gradient-text">Tamil Life Partner</span>
                  </>
                )}
              </h1>

              <p style={{
                fontSize: '1.02rem',
                color: '#FFFFFF',
                fontWeight: 500,
                lineHeight: 1.5,
                marginBottom: '1.25rem',
                maxWidth: '520px',
                textShadow: '0 1px 3px rgba(0,0,0,0.5)'
              }}>
                {language === 'ta'
                  ? 'நம்பகமான வரன் தேடலுக்கு சென்னை ஜோதி மேட்ரிமோனி. ஜாதகம் பார்த்து வரன்கள் அமைத்து தரப்படும்.'
                  : 'Trusted Chennai Jothi Matrimony platform with verified profiles, horoscope matching & 100% privacy.'}
              </p>

              {/* Call to Action Buttons */}
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.2rem' }}>
                <button 
                  onClick={() => setActivePage('register')}
                  className="btn btn-gold pulse-button"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.2rem', fontSize: '0.92rem', fontWeight: 700 }}>
                  <CreditCard size={18} />
                  <span>
                    {language === 'ta' ? '₹1,000 பதிவுக் கட்டணம் – பதிவு செய்ய' : '₹1,000 Registration – Register Now'}
                  </span>
                </button>
              </div>

              {/* Instant WhatsApp & Call Buttons Row */}
              <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                <a 
                  href="https://wa.me/919043773977?text=Vanakkam!%20I%20want%20to%20know%20more%20about%20Chennai%20Jothi%20Matrimony%20services"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                  style={{
                    background: '#25D366',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    padding: '0.5rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: '0 3px 10px rgba(37, 211, 102, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    textDecoration: 'none'
                  }}>
                  <span style={{ fontSize: '1.1rem' }}>💬</span>
                  <span>WhatsApp Us (9043773977)</span>
                </a>

                <a 
                  href="tel:9043773977"
                  className="btn"
                  style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    border: '1px solid #FFF',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    padding: '0.5rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    textDecoration: 'none'
                  }}>
                  <PhoneCall size={16} color="var(--gold-primary)" />
                  <span>Call: 9043773977 / 9444934527</span>
                </a>
              </div>

              {/* Trust Badges */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.2rem',
                fontSize: '0.8rem',
                color: '#E8D5C8',
                borderTop: '1px solid rgba(255,255,255,0.15)',
                paddingTop: '0.85rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <ShieldCheck size={16} color="var(--gold-primary)" />
                  <span>100% Verified Profiles</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Sparkles size={16} color="var(--gold-primary)" />
                  <span>Horoscope Match</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Lock size={16} color="var(--gold-primary)" />
                  <span>Private & Secure</span>
                </div>
              </div>

            </div>

            {/* Right Card / Interactive Preview */}
            <div style={{ position: 'relative' }}>
              <div className="card" style={{
                padding: '1.4rem',
                background: '#FFFFFF',
                borderRadius: 'var(--radius-lg)',
                border: '2px solid var(--gold-primary)',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
                color: '#1A0D03'
              }}>
                {/* Logo Showcase */}
                <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                  <img 
                    src="/logo.jpg" 
                    alt="Chennai Jothi Matrimony Official Emblem" 
                    style={{
                      width: '85px',
                      height: '85px',
                      borderRadius: '12px',
                      objectFit: 'cover',
                      border: '2px solid var(--gold-primary)',
                      boxShadow: '0 4px 12px rgba(122, 12, 46, 0.2)',
                      margin: '0 auto 0.4rem'
                    }}
                  />
                  <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#4A061B', fontWeight: 800 }}>
                    Chennai Jothi Matrimony
                  </h3>
                  <div style={{ fontSize: '0.8rem', color: '#8C6A0A', fontWeight: 700, marginTop: '2px' }}>
                    உரிமையாளர்: Dr. சந்திரபாபு • Triplicane, Chennai
                  </div>
                </div>

                {/* Paid Model Badge Box */}
                <div style={{
                  background: '#FFFDF5',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '1rem',
                  border: '1px solid #F3E5AB'
                }}>
                  <div style={{ fontSize: '0.72rem', color: '#718096', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                    Transparent Paid Registration Model
                  </div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#4A061B', margin: '0.1rem 0' }}>
                    ₹1,000 <span style={{ fontSize: '0.82rem', color: '#4A5568', fontWeight: 600 }}>/ 1 Year Access</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#B45309', fontWeight: 700 }}>
                    ✓ Complete Profile • View Alliances • Horoscope Check
                  </div>
                </div>

                {/* Checklist with Explicit Dark Text */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.86rem', color: '#1A202C', fontWeight: 600 }}>
                    <CheckCircle2 size={17} color="#15803D" style={{ flexShrink: 0 }} />
                    <span style={{ color: '#1A202C' }}>Access 1,000+ Verified Tamil Nadu Alliances</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.86rem', color: '#1A202C', fontWeight: 600 }}>
                    <CheckCircle2 size={17} color="#15803D" style={{ flexShrink: 0 }} />
                    <span style={{ color: '#1A202C' }}>Instant Horoscope Rasi & Nakshatra Match Check</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.86rem', color: '#1A202C', fontWeight: 600 }}>
                    <CheckCircle2 size={17} color="#15803D" style={{ flexShrink: 0 }} />
                    <span style={{ color: '#1A202C' }}>Send & Receive Unlimited Expressions of Interest</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.86rem', color: '#1A202C', fontWeight: 600 }}>
                    <CheckCircle2 size={17} color="#15803D" style={{ flexShrink: 0 }} />
                    <span style={{ color: '#1A202C' }}>Mutual Contact Sharing & Direct Phone Unlock</span>
                  </div>
                </div>

                <button 
                  onClick={() => setActivePage('register')}
                  className="btn btn-primary btn-full"
                  style={{
                    background: 'linear-gradient(135deg, #7A0C2E 0%, #4A061B 100%)',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    padding: '0.65rem 1rem',
                    boxShadow: '0 4px 12px rgba(122, 12, 46, 0.35)'
                  }}>
                  <span>
                    {language === 'ta' ? 'பதிவு செய்து தொடர்க' : 'Start Registration (Step 1)'}
                  </span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Chennai Jothi Matrimony Service Commitment Section */}
      <section style={{
        background: 'linear-gradient(135deg, #FFF9ED 0%, #FFF3D6 100%)',
        borderBottom: '1px solid var(--border-gold)',
        padding: '2.5rem 0'
      }}>
        <div className="container">
          <div className="card" style={{
            padding: '2rem 2.5rem',
            border: '2px solid var(--border-gold)',
            boxShadow: 'var(--shadow-md)',
            background: '#FFFFFF',
            borderRadius: 'var(--radius-lg)'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '2.5rem',
              alignItems: 'center'
            }}>
              {/* Tamil Section */}
              <div style={{ borderRight: '1px solid var(--border-light)', paddingRight: '1.5rem' }}>
                <span className="badge badge-maroon" style={{ marginBottom: '0.6rem' }}>
                  🏛️ சென்னை ஜோதி மேட்ரிமோனி
                </span>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-maroon-dark)', marginBottom: '0.75rem', lineHeight: 1.5 }}>
                  எங்களிடம் அனைத்து சமூகத்தினர்க்கும், திருமண வரன்கள் ஜோதிட முறையில் அமைத்து தருகிறோம். ஜாதகம் பார்த்து வரன்கள் அமைத்து தரப்படும்.
                </h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
                  சிறந்த சேவையை எங்கள் அனைத்து வாடிக்கையாளர்களுக்கும் வழங்க முனைப்புடன் செயல்படுகிறோம்.
                </p>
              </div>

              {/* English Section */}
              <div>
                <span className="badge badge-gold" style={{ marginBottom: '0.6rem' }}>
                  📍 Located in Chennai • Excellent Customer Service
                </span>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-maroon-dark)', marginBottom: '0.75rem', lineHeight: 1.5 }}>
                  Chennai Jothi Matrimony is located by Chennai. We work hard to provide excellent customer service to all our clients.
                </h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '0.6rem', lineHeight: 1.6 }}>
                  We provide astrological matchmaking for all communities. Horoscopes will be set and given.
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                  <span className="badge badge-green">✓ All Communities</span>
                  <span className="badge badge-gold">✓ Horoscopes Set & Given</span>
                  <span className="badge badge-maroon">✓ Excellent Customer Service</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Featured Alliances Blurred Preview for Visitors */}
      <section style={{ padding: '4rem 0', background: 'var(--bg-surface)', borderTop: '1px solid var(--border-light)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="badge badge-maroon" style={{ marginBottom: '0.5rem' }}>
              VERIFIED MEMBERS
            </span>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
              {language === 'ta' ? 'அண்மை வரன்கள்' : 'Recent Verified Alliances'}
            </h2>
            <p style={{ color: 'var(--text-muted)' }}>
              Complete ₹1,000 registration to unlock full names, photos, horoscope & direct contact info.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            position: 'relative'
          }}>
            {[
              { name: 'Priya S.', age: 27, city: 'Chennai', prof: 'Software Engineer', degree: 'M.S. IT', rasi: 'Simmam' },
              { name: 'Karthik R.', age: 29, city: 'Coimbatore', prof: 'Product Manager', degree: 'MBA', rasi: 'Rishabam' },
              { name: 'Dr. Anitha R.', age: 28, city: 'Madurai', prof: 'Pediatrician', degree: 'M.D.', rasi: 'Thulaam' },
              { name: 'Vignesh M.', age: 31, city: 'Chennai / Trichy', prof: 'VP Finance', degree: 'CA', rasi: 'Kanni' }
            ].map((candidate, idx) => (
              <div className="card" key={idx} style={{ padding: '1.25rem', textAlign: 'center' }}>
                <div style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  margin: '0 auto 1rem',
                  background: 'linear-gradient(135deg, #E2D5C8 0%, #C4B2A2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2.5rem',
                  boxShadow: 'var(--shadow-sm)',
                  border: '2px solid var(--border-gold)'
                }}>
                  👤
                </div>

                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>{candidate.name}</h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--gold-dark)', fontWeight: 600, marginBottom: '0.5rem' }}>
                  {candidate.age} Yrs • {candidate.city}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                  {candidate.prof} ({candidate.degree}) • Rasi: {candidate.rasi}
                </div>

                <div style={{
                  background: '#FFF8E7',
                  padding: '0.4rem',
                  borderRadius: '6px',
                  fontSize: '0.78rem',
                  color: '#8C6A0A',
                  fontWeight: 600,
                  marginBottom: '1rem'
                }}>
                  ⭐ Horoscope Available
                </div>

                <button 
                  onClick={() => setActivePage('register')}
                  className="btn btn-outline btn-sm btn-full">
                  <Lock size={14} /> View Full Profile
                </button>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <button 
              onClick={() => setActivePage('register')}
              className="btn btn-primary btn-lg">
              Unlock All 1,000+ Alliances (₹1,000 Registration) →
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '5rem 0', background: 'var(--bg-silk)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.2rem', color: 'var(--primary-maroon-dark)' }}>
              {language === 'ta' ? 'மகிழ்ச்சியான திருமணங்கள்' : 'Happy Matrimony Stories'}
            </h2>
            <p style={{ color: 'var(--text-muted)' }}>Real Tamil families who found their alliance through Jothi Matrimony.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            <div className="card" style={{ padding: '1.75rem' }}>
              <div style={{ color: 'var(--gold-dark)', fontSize: '1.2rem', marginBottom: '0.75rem' }}>⭐⭐⭐⭐⭐</div>
              <p style={{ fontStyle: 'italic', color: 'var(--text-main)', fontSize: '0.92rem', marginBottom: '1rem' }}>
                "Good matrimony. They provided excellent astrological matchmaking service for our family in Chennai."
              </p>
              <div style={{ fontWeight: 700, color: 'var(--primary-maroon)' }}>— Malliga (Verified Client Review)</div>
            </div>

            <div className="card" style={{ padding: '1.75rem' }}>
              <div style={{ color: 'var(--gold-dark)', fontSize: '1.2rem', marginBottom: '0.75rem' }}>⭐⭐⭐⭐⭐</div>
              <p style={{ fontStyle: 'italic', color: 'var(--text-main)', fontSize: '0.92rem', marginBottom: '1rem' }}>
                "We registered for our daughter. The ₹1,000 paid model ensures only serious profiles are present. The horoscope matching was extremely accurate. They got married in Guruvayur last month!"
              </p>
              <div style={{ fontWeight: 700, color: 'var(--primary-maroon)' }}>— Sundaram & Lakshmi (Kanchipuram)</div>
            </div>

            <div className="card" style={{ padding: '1.75rem' }}>
              <div style={{ color: 'var(--gold-dark)', fontSize: '1.2rem', marginBottom: '0.75rem' }}>⭐⭐⭐⭐⭐</div>
              <p style={{ fontStyle: 'italic', color: 'var(--text-main)', fontSize: '0.92rem', marginBottom: '1rem' }}>
                "As a software engineer in Chennai, privacy was very important to me. Jothi Matrimony does not broadcast phone numbers to unverified strangers. Only after mutual interest, contacts are shared."
              </p>
              <div style={{ fontWeight: 700, color: 'var(--primary-maroon)' }}>— Vignesh & Kirthika (Chennai)</div>
            </div>
          </div>
        </div>
      </section>

      {/* Official Contact & Office Location Section */}
      <section style={{ padding: '4rem 0', background: 'var(--bg-surface)', borderTop: '1px solid var(--border-light)' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <div className="card" style={{
            padding: '2.5rem',
            border: '2px solid var(--border-gold)',
            boxShadow: 'var(--shadow-md)',
            background: '#FFFFFF',
            borderRadius: 'var(--radius-lg)'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <span className="badge badge-gold" style={{ marginBottom: '0.5rem', padding: '0.4rem 1rem' }}>
                📍 CHENNAI HEAD OFFICE
              </span>
              <h2 style={{ fontSize: '2rem', color: 'var(--primary-maroon-dark)', marginBottom: '0.3rem' }}>
                {language === 'ta' ? 'எங்கள் அலுவலகம் & தொடர்புக்கு' : 'Chennai Jothi Matrimony Head Office'}
              </h2>
              <p style={{ color: 'var(--text-muted)' }}>
                {language === 'ta'
                  ? 'உரிமையாளர்: Dr. சந்திரபாபு • அனைத்து சமூகத்தினர்க்கும் ஜாதகம் பார்த்து வரன்கள் அமைத்து தரப்படும்.'
                  : 'Proprietor: Dr. Chandrababu • We provide astrological matchmaking for all communities.'}
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.75rem',
              alignItems: 'stretch'
            }}>
              {/* Address Box */}
              <div style={{
                background: '#FFFDF9',
                border: '1px solid var(--border-gold)',
                borderRadius: 'var(--radius-md)',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--primary-maroon-dark)', marginBottom: '0.75rem' }}>
                    🏢 Office Location:
                  </div>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: 1.6, margin: '0 0 1rem 0' }}>
                    <strong>Chennai Jothi Matrimony</strong><br />
                    <em>Proprietor: Dr. Chandrababu</em><br />
                    No.13/7, Muthukalathi Street,<br />
                    Triplicane, Chennai,<br />
                    Tamil Nadu - 600005, India
                  </p>
                </div>
                
                <a 
                  href="https://www.google.com/maps/dir/?api=1&travelmode=driving&layer=traffic&destination=13.05788820,80.27564150"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-gold btn-sm btn-full"
                  style={{ textDecoration: 'none', textAlign: 'center', marginTop: '0.5rem' }}>
                  🗺️ Get Directions on Google Maps
                </a>
              </div>

              {/* Phone & Hours Box */}
              <div style={{
                background: '#FFFDF9',
                border: '1px solid var(--border-gold)',
                borderRadius: 'var(--radius-md)',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--primary-maroon-dark)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <PhoneCall size={18} color="var(--primary-maroon)" />
                    <span>Phone & Email Contact:</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '1.05rem', fontWeight: 800, color: 'var(--primary-maroon)', marginBottom: '1rem' }}>
                    <a href="tel:9043773977" style={{ color: 'var(--primary-maroon)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      📞 +91 90437 73977
                    </a>
                    <a href="tel:9444934527" style={{ color: 'var(--primary-maroon)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      📞 +91 94449 34527
                    </a>
                    <a href="mailto:arulbabuvalllalar@gmail.com" style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      ✉️ arulbabuvalllalar@gmail.com
                    </a>
                  </div>
                </div>

                <div style={{
                  background: '#FFF8E7',
                  padding: '0.85rem',
                  borderRadius: '6px',
                  border: '1px solid var(--border-gold)',
                  fontSize: '0.85rem',
                  color: 'var(--primary-maroon-dark)'
                }}>
                  <div style={{ fontWeight: 700, marginBottom: '0.2rem' }}>⏰ Office Working Hours:</div>
                  <div>Mon – Sat: 09:00 AM – 09:00 PM</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Lunch Time: 01:00 PM – 02:00 PM | Sunday: Closed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
