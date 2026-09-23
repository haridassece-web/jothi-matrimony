'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { Star, Eye, Heart } from 'lucide-react';

export default function ShortlistPage() {
  const { allProfiles, shortlist, toggleShortlist, sendInterest } = useAuth();

  const savedProfiles = allProfiles.filter(p => shortlist.includes(p.id));

  return (
    <div style={{ padding: '3rem 0', minHeight: '85vh', background: 'var(--bg-silk)' }}>
      <div className="container" style={{ maxWidth: '840px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.2rem', color: 'var(--primary-maroon-dark)', marginBottom: '0.4rem' }}>
            Bookmarked Shortlist (புக்மார்க் வரன்கள்)
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Your saved alliance profiles for quick comparison and family discussion.
          </p>
        </div>

        {savedProfiles.length === 0 ? (
          <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
            <Star size={40} color="var(--gold-dark)" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>No saved profiles in your shortlist yet</h3>
            <Link href="/alliances" className="btn btn-primary btn-sm" style={{ marginTop: '1rem' }}>
              Browse Alliances →
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1.5rem' }}>
            {savedProfiles.map(p => (
              <div key={p.id} className="card" style={{ padding: '1.25rem', display: 'flex', gap: '1rem' }}>
                <img src={p.photo} alt={p.name} style={{ width: '90px', height: '110px', borderRadius: '8px', objectFit: 'cover' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3 style={{ fontSize: '1.1rem', color: 'var(--primary-maroon-dark)', margin: 0 }}>{p.name}, {p.age}</h3>
                    <button onClick={() => toggleShortlist(p.id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                      <Star size={18} color="#D4AF37" fill="#D4AF37" />
                    </button>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--gold-dark)', fontWeight: 600 }}>{p.city} • {p.profession}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>Rasi: {p.rasi}</div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Link 
                      href={`/alliances/${p.id}`}
                      className="btn btn-outline btn-sm">
                      <Eye size={14} /> View
                    </Link>
                    <button 
                      onClick={() => sendInterest(p.id)}
                      className="btn btn-primary btn-sm">
                      <Heart size={14} fill="#FFF" /> Interest
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
