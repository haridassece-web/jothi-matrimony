'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { 
  Search, Heart, Star, ShieldCheck, 
  ArrowRight, Eye, Phone 
} from 'lucide-react';

export default function DashboardPage() {
  const { 
    user, allProfiles, shortlist, interests, 
    toggleShortlist, sendInterest, language 
  } = useAuth();

  const userName = user?.name ? user.name.split(' ')[0] : 'Member';
  const targetGender = user?.gender === 'Male' ? 'Female' : 'Male';
  const recommendedMatches = allProfiles.filter(p => p.gender === targetGender || !user?.gender);

  return (
    <div style={{ padding: '2.5rem 0', minHeight: '85vh', background: 'var(--bg-silk)' }}>
      <div className="container">
        
        {/* Top Welcome Card Header */}
        <div className="card" style={{
          background: 'linear-gradient(135deg, #7A0C2E 0%, #4A061B 100%)',
          color: '#FFF',
          padding: '2rem 2.5rem',
          borderRadius: 'var(--radius-lg)',
          marginBottom: '2rem',
          boxShadow: 'var(--shadow-lg)',
          border: '2px solid var(--border-gold)',
          position: 'relative'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                <span className="badge badge-gold">
                  <ShieldCheck size={14} /> Active Paid Member
                </span>
                <span style={{ fontSize: '0.82rem', color: '#F3E5AB' }}>
                  ID: {user?.id || 'JM2026001234'}
                </span>
              </div>

              <h1 style={{ fontSize: '2.4rem', color: '#FFF', fontWeight: 800, marginBottom: '0.3rem' }}>
                Welcome, {userName} 👋
              </h1>

              <p style={{ color: '#F8E0E6', fontSize: '1.05rem', margin: 0 }}>
                <strong>126 Matches Found</strong> matching your horoscope & partner preferences in Tamil Nadu.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link 
                href="/alliances"
                className="btn btn-gold btn-lg">
                <Search size={18} />
                <span>Search Alliances</span>
              </Link>

              <Link 
                href="/profile"
                className="btn btn-outline-gold btn-lg"
                style={{ color: '#FFF', borderColor: 'var(--gold-primary)' }}>
                <span>My Profile</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Stat Overview Boxes */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2.5rem'
        }}>
          <div className="card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '12px',
              background: '#FDF2F5', color: 'var(--primary-maroon)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Search size={24} />
            </div>
            <div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary-maroon-dark)' }}>126</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Matches Found</div>
            </div>
          </div>

          <div className="card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '12px',
              background: '#FFF8E7', color: 'var(--gold-dark)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Heart size={24} />
            </div>
            <div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary-maroon-dark)' }}>
                {(interests?.sent?.length || 0) + (interests?.received?.length || 0)}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Total Interests</div>
            </div>
          </div>

          <div className="card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '12px',
              background: '#EAF8F0', color: '#166534',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Phone size={24} />
            </div>
            <div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#166534' }}>
                {interests?.accepted?.length || 1}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Unlocked Contacts</div>
            </div>
          </div>

          <div className="card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '12px',
              background: '#F1F5F9', color: 'var(--primary-maroon)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Star size={24} />
            </div>
            <div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary-maroon-dark)' }}>
                {shortlist?.length || 0}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Saved Shortlist</div>
            </div>
          </div>
        </div>

        {/* Recommended For You Grid */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div>
              <h2 style={{ fontSize: '1.6rem', color: 'var(--primary-maroon-dark)', margin: 0 }}>
                Recommended Alliances For You
              </h2>
              <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                Based on your Rasi, Nakshatra, age range & community preferences
              </div>
            </div>

            <Link 
              href="/alliances"
              className="btn btn-outline btn-sm">
              <span>View All 126 Profiles</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem'
          }}>
            {recommendedMatches.slice(0, 4).map(profile => {
              const isSaved = shortlist.includes(profile.id);
              const isInterestSent = interests.sent.includes(profile.id);

              return (
                <div key={profile.id} className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem' }}>
                    <div style={{ position: 'relative' }}>
                      <img 
                        src={profile.photo} 
                        alt={profile.name} 
                        style={{
                          width: '90px',
                          height: '110px',
                          borderRadius: 'var(--radius-md)',
                          objectFit: 'cover',
                          border: '2px solid var(--border-gold)'
                        }}
                      />
                      <span className="badge badge-green" style={{
                        position: 'absolute',
                        bottom: '-8px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        fontSize: '0.65rem',
                        whiteSpace: 'nowrap'
                      }}>
                        ✓ Verified
                      </span>
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <h3 style={{ fontSize: '1.15rem', color: 'var(--primary-maroon-dark)', margin: 0 }}>
                          {profile.name}
                        </h3>
                        <button 
                          onClick={() => toggleShortlist(profile.id)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px' }}>
                          <Star size={20} color={isSaved ? '#D4AF37' : '#CBD5E1'} fill={isSaved ? '#D4AF37' : 'none'} />
                        </button>
                      </div>

                      <div style={{ fontSize: '0.88rem', color: 'var(--gold-dark)', fontWeight: 700, margin: '2px 0 6px' }}>
                        {profile.age} Yrs • {profile.height} • {profile.city}
                      </div>

                      <div style={{ fontSize: '0.82rem', color: 'var(--text-main)', marginBottom: '4px', fontWeight: 500 }}>
                        {profile.profession}
                      </div>

                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        {profile.education}
                      </div>
                    </div>
                  </div>

                  <div style={{
                    background: '#FFF8E7',
                    border: '1px solid #F0D999',
                    borderRadius: '6px',
                    padding: '0.45rem 0.75rem',
                    fontSize: '0.8rem',
                    color: '#8C6A0A',
                    fontWeight: 600,
                    marginBottom: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <span>⭐ Rasi: {profile.rasi} • {profile.nakshatra}</span>
                    <span style={{ color: '#166534', fontWeight: 700 }}>8.5/10 Match</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', marginTop: 'auto' }}>
                    <Link 
                      href={`/alliances/${profile.id}`}
                      className="btn btn-outline btn-sm">
                      <Eye size={15} />
                      <span>View Profile</span>
                    </Link>

                    <button 
                      onClick={() => sendInterest(profile.id)}
                      disabled={isInterestSent}
                      className={`btn btn-sm ${isInterestSent ? 'btn-secondary' : 'btn-primary'}`}>
                      <Heart size={15} fill={isInterestSent ? '#CBD5E1' : '#FFF'} />
                      <span>{isInterestSent ? 'Interest Sent' : 'Send Interest'}</span>
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
