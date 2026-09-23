import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RazorpayModal from './components/RazorpayModal';
import FloatingContactButtons from './components/FloatingContactButtons';

// Pages
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import PaymentPage from './pages/PaymentPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import ProfileSetupPage from './pages/ProfileSetupPage';
import DashboardPage from './pages/DashboardPage';
import AlliancesPage from './pages/AlliancesPage';
import AllianceDetailPage from './pages/AllianceDetailPage';
import InterestsPage from './pages/InterestsPage';
import ShortlistPage from './pages/ShortlistPage';
import MessagesPage from './pages/MessagesPage';
import ProfilePage from './pages/ProfilePage';

import { Lock, Sparkles } from 'lucide-react';

function AppContent() {
  const { registrationStatus, language } = useAuth();
  
  const [activePage, setActivePage] = useState('home'); // 'home' | 'register' | 'payment' | 'payment-success' | 'profile-setup' | 'dashboard' | 'alliances' | 'alliance-detail' | 'interests' | 'shortlist' | 'messages' | 'profile' | 'how-it-works' | 'about'
  const [selectedProfileId, setSelectedProfileId] = useState('JM202600101');
  const [isRazorpayOpen, setIsRazorpayOpen] = useState(false);

  const isPaidMember = registrationStatus === 'PAID_ACTIVE';

  const handleSelectProfile = (id) => {
    setSelectedProfileId(id);
    setActivePage('alliance-detail');
  };

  const handleRazorpaySuccess = () => {
    setActivePage('payment-success');
  };

  // Protected pages logic
  const isProtectedPage = ['dashboard', 'alliances', 'alliance-detail', 'interests', 'shortlist', 'messages', 'profile'].includes(activePage);
  const showAccessRestricted = isProtectedPage && !isPaidMember;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      <main style={{ flex: 1 }}>
        {showAccessRestricted ? (
          <div style={{ padding: '5rem 1rem', textAlign: 'center' }}>
            <div className="container" style={{ maxWidth: '560px' }}>
              <div className="card" style={{ padding: '3rem 2rem', borderRadius: 'var(--radius-lg)', border: '2px solid var(--border-gold)' }}>
                <div style={{
                  width: '64px', height: '64px', borderRadius: '50%',
                  background: '#FFF8E7', color: 'var(--gold-dark)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 1.25rem', border: '1px solid var(--border-gold)'
                }}>
                  <Lock size={32} />
                </div>

                <h2 style={{ fontSize: '1.8rem', color: 'var(--primary-maroon-dark)', marginBottom: '0.5rem' }}>
                  {language === 'ta' ? '₹1,000 பதிவுக் கட்டணம் தேவை' : '₹1,000 Registration Fee Required'}
                </h2>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: 1.6 }}>
                  To access alliance profiles, search filters, horoscope check, and send interests, please complete your ₹1,000 active membership registration.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <button 
                    onClick={() => setIsRazorpayOpen(true)} 
                    className="btn btn-gold btn-lg btn-full pulse-button">
                    <Sparkles size={18} />
                    <span>[ Pay ₹1,000 via Razorpay ]</span>
                  </button>

                  <button 
                    onClick={() => setActivePage('register')} 
                    className="btn btn-outline btn-full">
                    Complete Step 1 Registration
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {activePage === 'home' && (
              <LandingPage 
                setActivePage={setActivePage} 
                onOpenRazorpay={() => setIsRazorpayOpen(true)} 
              />
            )}

            {activePage === 'register' && (
              <RegisterPage setActivePage={setActivePage} />
            )}

            {activePage === 'payment' && (
              <PaymentPage 
                setActivePage={setActivePage} 
                onOpenRazorpay={() => setIsRazorpayOpen(true)} 
              />
            )}

            {activePage === 'payment-success' && (
              <PaymentSuccessPage setActivePage={setActivePage} />
            )}

            {activePage === 'profile-setup' && (
              <ProfileSetupPage setActivePage={setActivePage} />
            )}

            {activePage === 'dashboard' && (
              <DashboardPage 
                setActivePage={setActivePage} 
                onSelectProfile={handleSelectProfile} 
              />
            )}

            {activePage === 'alliances' && (
              <AlliancesPage 
                setActivePage={setActivePage} 
                onSelectProfile={handleSelectProfile} 
              />
            )}

            {activePage === 'alliance-detail' && (
              <AllianceDetailPage 
                selectedProfileId={selectedProfileId} 
                setActivePage={setActivePage} 
              />
            )}

            {activePage === 'interests' && (
              <InterestsPage 
                setActivePage={setActivePage} 
                onSelectProfile={handleSelectProfile} 
              />
            )}

            {activePage === 'shortlist' && (
              <ShortlistPage 
                setActivePage={setActivePage} 
                onSelectProfile={handleSelectProfile} 
              />
            )}

            {activePage === 'messages' && (
              <MessagesPage />
            )}

            {activePage === 'profile' && (
              <ProfilePage setActivePage={setActivePage} />
            )}

            {activePage === 'about' && (
              <div style={{ padding: '4rem 0', minHeight: '70vh', background: 'var(--bg-surface)' }}>
                <div className="container" style={{ maxWidth: '900px' }}>
                  <div className="card" style={{ padding: '3rem', border: '2px solid var(--border-gold)', boxShadow: 'var(--shadow-lg)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                      <span style={{ fontSize: '2rem' }}>💍</span>
                      <div>
                        <h1 style={{ color: 'var(--primary-maroon-dark)', fontSize: '2.2rem', margin: 0 }}>
                          Chennai Jothi Matrimony
                        </h1>
                        <div style={{ color: 'var(--gold-dark)', fontWeight: 700, fontSize: '1rem', marginTop: '2px' }}>
                          Proprietor: Dr. Chandrababu
                        </div>
                      </div>
                    </div>

                    <hr style={{ border: 'none', borderTop: '1px solid var(--border-light)', margin: '1.5rem 0' }} />

                    <h3 style={{ color: 'var(--primary-maroon)', marginBottom: '0.75rem' }}>About Our Service</h3>
                    <p style={{ lineHeight: 1.8, fontSize: '1rem', color: 'var(--text-main)', marginBottom: '1.5rem' }}>
                      Chennai Jothi Matrimony is located in Chennai, Tamil Nadu. We work hard to provide excellent customer service to all our clients. We provide authentic astrological matchmaking and horoscope checking for all communities across Tamil Nadu and abroad. Horoscopes will be set and provided with complete privacy and care.
                    </p>

                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                      gap: '1.5rem',
                      background: '#FFFDF9',
                      padding: '1.5rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-gold)',
                      marginBottom: '2rem'
                    }}>
                      <div>
                        <h4 style={{ color: 'var(--primary-maroon-dark)', marginBottom: '0.5rem' }}>🏢 Office Address</h4>
                        <p style={{ margin: 0, lineHeight: 1.6, fontSize: '0.92rem', color: 'var(--text-main)' }}>
                          <strong>Chennai Jothi Matrimony</strong><br />
                          No.13/7, Muthukalathi Street,<br />
                          Triplicane, Chennai,<br />
                          Tamil Nadu - 600005, India
                        </p>
                        <a 
                          href="https://www.google.com/maps/dir/?api=1&travelmode=driving&layer=traffic&destination=13.05788820,80.27564150"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ fontSize: '0.85rem', color: 'var(--gold-dark)', fontWeight: 700, textDecoration: 'underline', display: 'inline-block', marginTop: '0.5rem' }}>
                          📍 View Directions on Google Maps
                        </a>
                      </div>

                      <div>
                        <h4 style={{ color: 'var(--primary-maroon-dark)', marginBottom: '0.5rem' }}>📞 Contact Details</h4>
                        <div style={{ lineHeight: 1.8, fontSize: '0.92rem' }}>
                          <div><strong>Phone 1:</strong> <a href="tel:9043773977" style={{ color: 'var(--primary-maroon)' }}>+91 90437 73977</a></div>
                          <div><strong>Phone 2:</strong> <a href="tel:9444934527" style={{ color: 'var(--primary-maroon)' }}>+91 94449 34527</a></div>
                          <div><strong>Email:</strong> <a href="mailto:arulbabuvalllalar@gmail.com" style={{ color: 'var(--primary-maroon)' }}>arulbabuvalllalar@gmail.com</a></div>
                        </div>
                      </div>

                      <div>
                        <h4 style={{ color: 'var(--primary-maroon-dark)', marginBottom: '0.5rem' }}>⏰ Working Hours</h4>
                        <div style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
                          <div><strong>Mon – Sat:</strong> 09:00 AM – 09:00 PM</div>
                          <div><strong>Lunch Break:</strong> 01:00 PM – 02:00 PM</div>
                          <div><strong>Sunday:</strong> Closed</div>
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                      <button onClick={() => setActivePage('register')} className="btn btn-gold btn-lg">
                        Register Now (₹1,000 Fee) →
                      </button>
                      <button onClick={() => setActivePage('home')} className="btn btn-outline btn-lg">
                        Back to Home
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      <Footer setActivePage={setActivePage} />

      <FloatingContactButtons />

      {/* Simulated Razorpay Modal */}
      <RazorpayModal 
        isOpen={isRazorpayOpen}
        onClose={() => setIsRazorpayOpen(false)}
        onSuccess={handleRazorpaySuccess}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
