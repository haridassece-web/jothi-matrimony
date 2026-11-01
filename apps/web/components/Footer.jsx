'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Phone, Mail, MapPin, Heart, Sparkles } from 'lucide-react';

export default function Footer() {
  const { language } = useAuth();

  return (
    <footer style={{
      background: 'linear-gradient(180deg, #3A0515 0%, #1A0208 100%)',
      color: '#FDF9F5',
      paddingTop: '1.25rem',
      paddingBottom: '0.75rem',
      marginTop: '1.5rem',
      borderTop: '2px solid var(--gold-dark)'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.2rem',
          paddingBottom: '0.85rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <img 
                src="/logo.jpg" 
                alt="Chennai Jothi Matrimony Logo" 
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  objectFit: 'cover',
                  border: '1.5px solid var(--gold-primary)'
                }}
              />
              <span style={{ 
                fontSize: '1.05rem', 
                fontWeight: 800, 
                color: '#FFF', 
                fontFamily: 'var(--font-heading)',
                whiteSpace: 'nowrap'
              }}>
                Chennai Jothi <span style={{ color: 'var(--gold-primary)' }}>Matrimony</span>
              </span>
            </div>
            <p style={{ fontSize: '0.76rem', color: '#D9C8BE', lineHeight: 1.4, marginBottom: '0.5rem' }}>
              {language === 'ta'
                ? 'சென்னை ஜோதி மேட்ரிமோனி (Dr. சந்திரபாபு): அனைத்து சமூகத்தினர்க்கும் பாரம்பரிய திருமண வரன்கள் மற்றும் ஜாதகப் பொருத்தம் அமைத்து தரும் மேட்ச்மேக்கிங் நிறுவனம். இது திருமண வரன்களுக்கான தளம் மட்டுமே (டேட்டிங் சேவை அல்ல).'
                : 'Chennai Jothi Matrimony (Dr. Chandrababu): Traditional matrimonial matchmaking business for all Tamil communities. Solely for marriage solemnization (Not a dating service).'}
            </p>
            <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
              <span className="badge badge-gold" style={{ fontSize: '0.65rem', padding: '1px 6px' }}>
                <ShieldCheck size={10} /> Verified
              </span>
              <span className="badge badge-gold" style={{ fontSize: '0.65rem', padding: '1px 6px' }}>
                <Sparkles size={10} /> Horoscope Match
              </span>
            </div>
          </div>

          {/* Quick Links & Policies */}
          <div>
            <h4 style={{ color: 'var(--gold-primary)', marginBottom: '0.4rem', fontSize: '0.88rem' }}>
              {language === 'ta' ? 'இணைப்புகள் & கொள்கைகள்' : 'Quick Links & Policies'}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.78rem', color: '#E8DCD3', padding: 0, margin: 0 }}>
              <li><Link href="/" style={linkStyle}>Home / முகப்பு</Link></li>
              <li><Link href="/register" style={linkStyle}>₹1,000 Registration</Link></li>
              <li><Link href="/payment" style={linkStyle}>Payment Options</Link></li>
              <li><Link href="/alliances" style={linkStyle}>Browse Tamil Alliances</Link></li>
              <li><Link href="/terms" style={linkStyle}>Terms & Conditions</Link></li>
              <li><Link href="/privacy" style={linkStyle}>Privacy Policy</Link></li>
              <li><Link href="/refund-policy" style={linkStyle}>Cancellation & Refund</Link></li>
            </ul>
          </div>

          {/* Tamil Nadu Coverage */}
          <div>
            <h4 style={{ color: 'var(--gold-primary)', marginBottom: '0.4rem', fontSize: '0.88rem' }}>
              {language === 'ta' ? 'நகரங்கள் & சமூகங்கள்' : 'Cities & Castes'}
            </h4>
            <div style={{ fontSize: '0.76rem', color: '#D9C8BE', lineHeight: 1.5 }}>
              <div>• Chennai • Coimbatore • Madurai</div>
              <div>• Trichy • Salem • Tirunelveli</div>
              <div>• Iyer • Gounder • Pillai • Mudaliar</div>
              <div>• Chettiar • Vanniyar • Nadar • Naidu</div>
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h4 style={{ color: 'var(--gold-primary)', marginBottom: '0.4rem', fontSize: '0.88rem' }}>
              {language === 'ta' ? 'தலைமை அலுவலகம்' : 'Office & Contact'}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.76rem', color: '#E8DCD3' }}>
              <div style={{ fontWeight: 700, color: 'var(--gold-primary)' }}>
                Proprietor: Dr. Chandrababu
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                <MapPin size={13} color="var(--gold-primary)" style={{ marginTop: '2px', flexShrink: 0 }} />
                <span>No.13/7, Muthukalathi St, Triplicane, Chennai - 600005</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', whiteSpace: 'nowrap' }}>
                <Phone size={13} color="var(--gold-primary)" style={{ flexShrink: 0 }} />
                <a href="tel:9043773977" style={{ color: '#E8DCD3', textDecoration: 'none' }}>+91 90437 73977</a>
                <span>/</span>
                <a href="tel:9445756377" style={{ color: '#E8DCD3', textDecoration: 'none' }}>+91 94457 56377</a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                <Mail size={13} color="var(--gold-primary)" style={{ flexShrink: 0 }} />
                <a href="mailto:arulbabuvalllalar@gmail.com" style={{ color: '#E8DCD3', textDecoration: 'none', whiteSpace: 'nowrap' }}>arulbabuvalllalar@gmail.com</a>
              </div>
              <div style={{ fontSize: '0.72rem', color: '#D9C8BE', marginTop: '0.15rem', borderTop: '1px dashed rgba(255,255,255,0.12)', paddingTop: '0.25rem' }}>
                ⏰ <strong>Mon-Sat:</strong> 9 AM-9 PM <span style={{ opacity: 0.8 }}>(Lunch 1-2 PM)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Policy Links */}
        <div style={{
          paddingTop: '0.6rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.5rem',
          fontSize: '0.72rem',
          color: '#B5A297'
        }}>
          <div>
            © 2026 Chennai Jothi Matrimony (Matchmaking Business). All rights reserved.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
            <Link href="/terms" style={{ color: '#D9C8BE', textDecoration: 'none' }}>Terms</Link>
            <span>•</span>
            <Link href="/privacy" style={{ color: '#D9C8BE', textDecoration: 'none' }}>Privacy</Link>
            <span>•</span>
            <Link href="/refund-policy" style={{ color: '#D9C8BE', textDecoration: 'none' }}>Refunds</Link>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <span>Made with</span>
            <Heart size={12} color="var(--gold-primary)" fill="var(--gold-primary)" />
            <span>for Tamil families.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

const linkStyle = {
  color: '#E8DCD3',
  fontSize: '0.78rem'
};
