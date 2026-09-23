'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { CASTE_LIST, CITIES_LIST } from '@jothi-matrimony/shared';
import { Search, Filter, Star, Heart, Eye, Sparkles } from 'lucide-react';

export default function AlliancesPage() {
  const router = useRouter();
  const { 
    allProfiles, shortlist, interests, 
    toggleShortlist, sendInterest, language 
  } = useAuth();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCaste, setSelectedCaste] = useState('All Communities');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [genderFilter, setGenderFilter] = useState('All');
  const [minAge, setMinAge] = useState(20);
  const [maxAge, setMaxAge] = useState(40);

  const filteredProfiles = allProfiles.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        p.profession.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        p.caste.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        p.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCaste = selectedCaste === 'All Communities' || p.caste === selectedCaste;
    const matchCity = selectedCity === 'All Cities' || p.city.includes(selectedCity);
    const matchGender = genderFilter === 'All' || p.gender === genderFilter;
    const matchAge = p.age >= minAge && p.age <= maxAge;

    return matchSearch && matchCaste && matchCity && matchGender && matchAge;
  });

  return (
    <div style={{ padding: '2.5rem 0', minHeight: '85vh', background: 'var(--bg-silk)' }}>
      <div className="container">
        
        {/* Page Header */}
        <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', color: 'var(--primary-maroon-dark)', marginBottom: '0.3rem' }}>
              {language === 'ta' ? 'கிடைக்கக்கூடிய வரன்கள்' : 'Available Alliances'}
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Showing <strong>{filteredProfiles.length}</strong> active verified profiles
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {['All', 'Female', 'Male'].map(g => (
              <button 
                key={g}
                onClick={() => setGenderFilter(g)}
                style={{
                  padding: '0.45rem 0.9rem',
                  borderRadius: 'var(--radius-full)',
                  border: genderFilter === g ? '1.5px solid var(--primary-maroon)' : '1px solid var(--border-light)',
                  background: genderFilter === g ? 'var(--maroon-gradient)' : '#FFF',
                  color: genderFilter === g ? '#FFF' : 'var(--text-main)',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}>
                {g === 'All' ? 'All Genders' : g === 'Female' ? 'Brides (பெண்)' : 'Grooms (ஆண்)'}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '2rem' }}>
          
          {/* Left Filters Sidebar */}
          <aside className="card" style={{ padding: '1.5rem', height: 'fit-content' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', color: 'var(--primary-maroon-dark)', fontWeight: 700 }}>
              <Filter size={18} />
              <span>Search & Filters 🔍</span>
            </div>

            <div className="form-group">
              <label className="form-label">Keyword / Registration ID</label>
              <div style={{ position: 'relative' }}>
                <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="text"
                  className="form-input"
                  placeholder="Name, CA, Engineer..."
                  style={{ paddingLeft: '2.2rem', fontSize: '0.88rem' }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Community / Caste</label>
              <select 
                className="form-select" 
                style={{ fontSize: '0.88rem' }}
                value={selectedCaste}
                onChange={(e) => setSelectedCaste(e.target.value)}>
                {CASTE_LIST.map((c, i) => (
                  <option key={i} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Location / City</label>
              <select 
                className="form-select" 
                style={{ fontSize: '0.88rem' }}
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}>
                {CITIES_LIST.map((c, i) => (
                  <option key={i} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Age Range ({minAge} - {maxAge} Yrs)</label>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input 
                  type="number" 
                  className="form-input" 
                  value={minAge} 
                  onChange={(e) => setMinAge(Number(e.target.value))} 
                />
                <span>to</span>
                <input 
                  type="number" 
                  className="form-input" 
                  value={maxAge} 
                  onChange={(e) => setMaxAge(Number(e.target.value))} 
                />
              </div>
            </div>

            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCaste('All Communities');
                setSelectedCity('All Cities');
                setGenderFilter('All');
                setMinAge(20);
                setMaxAge(40);
              }}
              className="btn btn-outline btn-sm btn-full"
              style={{ marginTop: '1rem' }}>
              Reset All Filters
            </button>
          </aside>

          {/* Right Profiles Listing */}
          <div>
            {filteredProfiles.length === 0 ? (
              <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>No matching alliance profiles found</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>Try broadening your search or resetting filters.</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {filteredProfiles.map(profile => {
                  const isSaved = shortlist.includes(profile.id);
                  const isInterestSent = interests.sent.includes(profile.id);

                  return (
                    <div key={profile.id} className="card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column' }}>
                      <div style={{ position: 'relative', marginBottom: '1rem' }}>
                        <img 
                          src={profile.photo} 
                          alt={profile.name} 
                          style={{
                            width: '100%',
                            height: '220px',
                            objectFit: 'cover',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--border-light)'
                          }}
                        />
                        <button 
                          onClick={() => toggleShortlist(profile.id)}
                          style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            background: 'rgba(255,255,255,0.9)',
                            border: 'none',
                            borderRadius: '50%',
                            width: '36px',
                            height: '36px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            boxShadow: 'var(--shadow-sm)'
                          }}>
                          <Star size={18} color={isSaved ? '#D4AF37' : '#94A3B8'} fill={isSaved ? '#D4AF37' : 'none'} />
                        </button>

                        <div style={{
                          position: 'absolute',
                          bottom: '10px',
                          left: '10px',
                          background: 'rgba(0,0,0,0.7)',
                          backdropFilter: 'blur(4px)',
                          color: '#FFF',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          padding: '3px 8px',
                          borderRadius: '4px'
                        }}>
                          {profile.id}
                        </div>
                      </div>

                      <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-maroon-dark)', marginBottom: '0.2rem' }}>
                        {profile.name}, {profile.age}
                      </h3>

                      <div style={{ fontSize: '0.88rem', color: 'var(--gold-dark)', fontWeight: 700, marginBottom: '0.4rem' }}>
                        {profile.city} • {profile.height}
                      </div>

                      <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', fontWeight: 600, marginBottom: '2px' }}>
                        {profile.profession}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                        {profile.education} • {profile.caste}
                      </div>

                      <div style={{
                        background: '#FFF8E7',
                        border: '1px solid #F0D999',
                        borderRadius: '6px',
                        padding: '0.4rem 0.65rem',
                        fontSize: '0.78rem',
                        color: '#8C6A0A',
                        fontWeight: 600,
                        marginBottom: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem'
                      }}>
                        <Sparkles size={14} color="#D4AF37" />
                        <span>Rasi: {profile.rasi} • {profile.nakshatra}</span>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: 'auto' }}>
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
                          <span>{isInterestSent ? 'Sent ❤️' : '❤️ Interest'}</span>
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
