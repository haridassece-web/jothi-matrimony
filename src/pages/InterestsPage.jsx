import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Heart, CheckCircle2, Phone, MessageSquare, UserCheck, Clock } from 'lucide-react';

export default function InterestsPage({ setActivePage, onSelectProfile }) {
  const { 
    allProfiles, interests, acceptInterest, language 
  } = useAuth();

  const [tab, setTab] = useState('received'); // 'received' | 'sent' | 'mutual'

  const receivedProfiles = allProfiles.filter(p => interests.received.includes(p.id));
  const sentProfiles = allProfiles.filter(p => interests.sent.includes(p.id));
  const mutualProfiles = allProfiles.filter(p => interests.accepted.includes(p.id));

  return (
    <div style={{ padding: '3rem 0', minHeight: '85vh', background: 'var(--bg-silk)' }}>
      <div className="container" style={{ maxWidth: '840px' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.2rem', color: 'var(--primary-maroon-dark)', marginBottom: '0.4rem' }}>
            {language === 'ta' ? 'விருப்பங்கள் & தொடர்புகள்' : 'Interests & Connections'}
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Manage received expressions of interest, track sent interests & access mutual contacts.
          </p>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '8px',
          marginBottom: '2rem',
          background: '#F1F5F9',
          padding: '4px',
          borderRadius: 'var(--radius-md)'
        }}>
          <button 
            onClick={() => setTab('received')}
            style={tabBtnStyle(tab === 'received')}>
            <span>Received Interests ({receivedProfiles.length})</span>
          </button>

          <button 
            onClick={() => setTab('sent')}
            style={tabBtnStyle(tab === 'sent')}>
            <span>Sent Interests ({sentProfiles.length})</span>
          </button>

          <button 
            onClick={() => setTab('mutual')}
            style={tabBtnStyle(tab === 'mutual')}>
            <span>Mutual Matches ({mutualProfiles.length})</span>
          </button>
        </div>

        {/* Tab 1: Received */}
        {tab === 'received' && (
          <div>
            {receivedProfiles.length === 0 ? (
              <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
                <Heart size={40} color="var(--gold-dark)" style={{ marginBottom: '1rem' }} />
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>No new received interests</h3>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {receivedProfiles.map(p => (
                  <div key={p.id} className="card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <img src={p.photo} alt={p.name} style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover' }} />
                      <div>
                        <h4 style={{ fontSize: '1.1rem', color: 'var(--primary-maroon-dark)', margin: 0 }}>{p.name}, {p.age}</h4>
                        <div style={{ fontSize: '0.85rem', color: 'var(--gold-dark)', fontWeight: 600 }}>{p.city} • {p.profession}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Rasi: {p.rasi} • {p.nakshatra}</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button 
                        onClick={() => acceptInterest(p.id)}
                        className="btn btn-primary btn-sm">
                        <CheckCircle2 size={16} />
                        <span>Accept & Unlock Phone</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Sent */}
        {tab === 'sent' && (
          <div>
            {sentProfiles.length === 0 ? (
              <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>You haven't sent any interests yet</h3>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {sentProfiles.map(p => (
                  <div key={p.id} className="card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <img src={p.photo} alt={p.name} style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover' }} />
                      <div>
                        <h4 style={{ fontSize: '1.1rem', color: 'var(--primary-maroon-dark)', margin: 0 }}>{p.name}, {p.age}</h4>
                        <div style={{ fontSize: '0.85rem', color: 'var(--gold-dark)', fontWeight: 600 }}>{p.city} • {p.profession}</div>
                      </div>
                    </div>

                    <span className="badge badge-gold" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Clock size={14} /> Pending Response
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Mutual Matches */}
        {tab === 'mutual' && (
          <div>
            {mutualProfiles.length === 0 ? (
              <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>No mutual acceptances yet</h3>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {mutualProfiles.map(p => (
                  <div key={p.id} className="card" style={{ padding: '1.5rem', background: '#F0FDF4', border: '1px solid #BBF7D0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                        <img src={p.photo} alt={p.name} style={{ width: '75px', height: '75px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #166534' }} />
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <h4 style={{ fontSize: '1.2rem', color: '#14532D', margin: 0 }}>{p.name}, {p.age}</h4>
                            <span className="badge badge-green">Mutual Match</span>
                          </div>
                          <div style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 600, margin: '2px 0' }}>
                            📞 Phone: <span style={{ color: '#166534' }}>{p.phone}</span>
                          </div>
                          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                            ✉️ {p.email} • {p.city}
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button 
                          onClick={() => setActivePage('messages')}
                          className="btn btn-primary btn-sm">
                          <MessageSquare size={16} />
                          <span>Chat Now</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

function tabBtnStyle(isActive) {
  return {
    padding: '0.75rem',
    borderRadius: 'var(--radius-sm)',
    border: 'none',
    background: isActive ? 'var(--maroon-gradient)' : 'transparent',
    color: isActive ? '#FFF' : 'var(--text-main)',
    fontWeight: isActive ? 700 : 500,
    fontSize: '0.88rem',
    cursor: 'pointer'
  };
}
