import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Heart, Search, User, ShieldCheck, CreditCard, 
  MessageSquare, Star, Globe, LogOut, Lock, Sparkles, Menu, X
} from 'lucide-react';

export default function Navbar({ activePage, setActivePage }) {
  const { 
    user, registrationStatus, language, toggleLanguage, 
    logout, shortlist, interests 
  } = useAuth();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isPaidMember = registrationStatus === 'PAID_ACTIVE';

  const navigateTo = (page) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pendingInterestsCount = (interests?.received?.length || 0);

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 900,
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid var(--border-light)',
      boxShadow: 'var(--shadow-sm)'
    }}>
      {/* Top Banner Notice for Unpaid visitors */}
      {!isPaidMember && (
        <div style={{
          background: 'var(--maroon-gradient)',
          color: '#FFF',
          padding: '0.25rem 0.8rem',
          fontSize: '0.78rem',
          textAlign: 'center',
          fontWeight: 500,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.4rem'
        }}>
          <Sparkles size={13} color="#F3E5AB" />
          <span>
            {language === 'ta' 
              ? 'தமிழ்நாட்டின் நம்பகமான மேட்ரிமோனி சேவையில் இணையும் ₹1,000 கட்டணம் செலுத்தி உடனடி வரன் பார்க்க!' 
              : 'Join Tamil Nadu’s trusted Matrimony platform for ₹1,000 & get full alliance access!'}
          </span>
          <button 
            onClick={() => navigateTo('register')} 
            style={{
              background: 'var(--gold-gradient)',
              border: 'none',
              borderRadius: '20px',
              padding: '1px 8px',
              fontSize: '0.72rem',
              fontWeight: 700,
              color: '#1A0D03',
              cursor: 'pointer',
              marginLeft: '4px'
            }}>
            {language === 'ta' ? 'பதிவு செய்க' : 'Register Now'}
          </button>
        </div>
      )}

      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '0.4rem',
        paddingBottom: '0.4rem'
      }}>
        {/* Logo */}
        <div 
          onClick={() => navigateTo('home')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', flexShrink: 0 }}
        >
          <img 
            src="/logo.jpg" 
            alt="Chennai Jothi Matrimony Logo" 
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '8px',
              objectFit: 'cover',
              boxShadow: '0 2px 6px rgba(122, 12, 46, 0.15)',
              border: '1.5px solid var(--gold-primary)',
              flexShrink: 0
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ 
              fontSize: '1.15rem', 
              fontWeight: 800, 
              fontFamily: 'var(--font-heading)',
              letterSpacing: '-0.01em',
              color: 'var(--primary-maroon-dark)',
              lineHeight: 1.1,
              whiteSpace: 'nowrap'
            }}>
              Chennai Jothi <span style={{ color: 'var(--gold-dark)' }}>Matrimony</span>
            </div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 600, whiteSpace: 'nowrap' }}>
              சென்னை ஜோதி மேட்ரிமோனி • Triplicane, Chennai
            </div>
          </div>
        {/* Mobile Hamburger Toggle Button */}
        <button 
          className="mobile-menu-btn" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation Links */}
        <nav className={`nav-desktop ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <button 
            onClick={() => navigateTo('home')} 
            className={`nav-link ${activePage === 'home' ? 'active' : ''}`}
            style={navLinkStyle(activePage === 'home')}
          >
            {language === 'ta' ? 'முகப்பு' : 'Home'}
          </button>

          {isPaidMember ? (
            <>
              <button 
                onClick={() => navigateTo('dashboard')} 
                className={`nav-link ${activePage === 'dashboard' ? 'active' : ''}`}
                style={navLinkStyle(activePage === 'dashboard')}
              >
                {language === 'ta' ? 'டாஷ்போர்டு' : 'Dashboard'}
              </button>

              <button 
                onClick={() => navigateTo('alliances')} 
                className={`nav-link ${activePage === 'alliances' ? 'active' : ''}`}
                style={navLinkStyle(activePage === 'alliances')}
              >
                <Search size={16} />
                {language === 'ta' ? 'வரன்கள்' : 'Alliances'}
              </button>

              <button 
                onClick={() => navigateTo('interests')} 
                className={`nav-link ${activePage === 'interests' ? 'active' : ''}`}
                style={navLinkStyle(activePage === 'interests')}
              >
                <Heart size={16} />
                {language === 'ta' ? 'விருப்பங்கள்' : 'Interests'}
                {pendingInterestsCount > 0 && (
                  <span style={{
                    background: 'var(--primary-maroon)',
                    color: '#FFF',
                    borderRadius: '10px',
                    padding: '1px 6px',
                    fontSize: '0.7rem',
                    fontWeight: 700
                  }}>{pendingInterestsCount}</span>
                )}
              </button>

              <button 
                onClick={() => navigateTo('shortlist')} 
                className={`nav-link ${activePage === 'shortlist' ? 'active' : ''}`}
                style={navLinkStyle(activePage === 'shortlist')}
              >
                <Star size={16} />
                {language === 'ta' ? 'புக்மார்க்' : 'Shortlist'}
                {shortlist?.length > 0 && (
                  <span style={{
                    background: 'var(--gold-dark)',
                    color: '#FFF',
                    borderRadius: '10px',
                    padding: '1px 6px',
                    fontSize: '0.7rem',
                    fontWeight: 700
                  }}>{shortlist.length}</span>
                )}
              </button>

              <button 
                onClick={() => navigateTo('messages')} 
                className={`nav-link ${activePage === 'messages' ? 'active' : ''}`}
                style={navLinkStyle(activePage === 'messages')}
              >
                <MessageSquare size={16} />
                {language === 'ta' ? 'செய்திகள்' : 'Messages'}
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => navigateTo('about')} 
                style={navLinkStyle(activePage === 'about')}
              >
                {language === 'ta' ? 'எங்களைப் பற்றி' : 'About Us'}
              </button>
            </>
          )}

          {/* Language Toggle Button */}
          <button 
            onClick={toggleLanguage}
            title="Toggle Tamil / English"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.4rem 0.75rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-light)',
              background: '#FFF',
              fontSize: '0.82rem',
              fontWeight: 600,
              color: 'var(--text-main)'
            }}>
            <Globe size={14} color="var(--primary-maroon)" />
            <span>{language === 'en' ? 'தமிழ்' : 'English'}</span>
          </button>

          {/* User Auth CTAs */}
          {isPaidMember ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button 
                onClick={() => navigateTo('profile')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.45rem 0.9rem',
                  borderRadius: 'var(--radius-md)',
                  background: '#FFF8E7',
                  border: '1px solid var(--border-gold)',
                  color: 'var(--primary-maroon-dark)',
                  fontWeight: 600,
                  fontSize: '0.88rem'
                }}>
                <ShieldCheck size={16} color="var(--gold-dark)" />
                <span>{user?.name ? user.name.split(' ')[0] : 'Member'}</span>
                <span style={{ fontSize: '0.72rem', opacity: 0.7 }}>({user?.id || 'JM2026'})</span>
              </button>
              
              <button 
                onClick={logout}
                title="Logout"
                style={{
                  padding: '0.5rem',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  background: 'transparent',
                  color: 'var(--text-muted)',
                  cursor: 'pointer'
                }}>
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <button 
                onClick={() => navigateTo('payment')} 
                className="btn btn-gold btn-sm"
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CreditCard size={15} />
                <span>₹1,000 {language === 'ta' ? 'கட்டணம்' : 'Register'}</span>
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

function navLinkStyle(isActive) {
  return {
    background: 'none',
    border: 'none',
    fontSize: '0.86rem',
    fontWeight: isActive ? 700 : 500,
    color: isActive ? 'var(--primary-maroon)' : 'var(--text-main)',
    cursor: 'pointer',
    padding: '0.3rem 0.5rem',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    gap: '0.35rem',
    transition: 'all 0.2s'
  };
}
