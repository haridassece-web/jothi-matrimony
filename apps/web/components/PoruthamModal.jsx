'use client';

import React from 'react';
import { calculatePorutham } from '@jothi-matrimony/shared';
import { CheckCircle, AlertCircle, X, Sparkles, Heart } from 'lucide-react';

export default function PoruthamModal({ isOpen, onClose, userProfile, targetProfile, onSendInterest }) {
  if (!isOpen || !targetProfile) return null;

  const result = calculatePorutham(userProfile, targetProfile);

  return (
    <div className="modal-overlay" style={{ zIndex: 9998 }}>
      <div className="modal-content" style={{ maxWidth: '640px', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
        
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          background: 'var(--maroon-gradient)',
          color: '#FFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Sparkles color="var(--gold-light)" size={22} />
            <div>
              <h3 style={{ color: '#FFF', fontSize: '1.15rem', margin: 0 }}>
                Horoscope Compatibility Check
              </h3>
              <div style={{ fontSize: '0.8rem', color: '#F8E0E6' }}>
                {userProfile?.name || 'Your Horoscope'} ↔ {targetProfile.name} ({targetProfile.rasi} / {targetProfile.nakshatra})
              </div>
            </div>
          </div>

          <button 
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              color: '#FFF',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}>
            <X size={18} />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1 }}>
          
          {/* Match Score Summary Banner */}
          <div style={{
            background: 'linear-gradient(135deg, #FFFDF5 0%, #FFF5E0 100%)',
            border: '2px solid var(--border-gold)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            textAlign: 'center',
            marginBottom: '1.5rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Horoscope Compatibility Result
            </div>
            
            <div style={{
              fontSize: '2.5rem',
              fontWeight: 800,
              color: 'var(--primary-maroon-dark)',
              margin: '0.3rem 0'
            }}>
              {result.totalScore} <span style={{ fontSize: '1.4rem', color: 'var(--text-muted)' }}>/ 10</span>
            </div>

            <div style={{
              display: 'inline-block',
              padding: '0.4rem 1.2rem',
              borderRadius: 'var(--radius-full)',
              background: result.totalScore >= 8 ? '#15803D' : result.totalScore >= 6 ? '#B8860B' : '#7A0C2E',
              color: '#FFF',
              fontWeight: 700,
              fontSize: '0.92rem',
              marginBottom: '0.4rem'
            }}>
              {result.rating}
            </div>
            <div style={{ fontSize: '0.88rem', color: 'var(--primary-maroon-dark)', fontWeight: 600 }}>
              {result.ratingTamil}
            </div>
          </div>

          {/* Horoscope Breakdown Table */}
          <h4 style={{ marginBottom: '0.85rem', fontSize: '1rem', color: 'var(--primary-maroon-dark)' }}>
            Detailed Horoscope Analysis:
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {result.poruthams.map((p, idx) => (
              <div 
                key={idx}
                style={{
                  background: '#FFFFFF',
                  border: p.isCritical ? '2px solid #D4AF37' : '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.85rem 1rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '1rem'
                }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-main)' }}>
                      {idx + 1}. {p.name}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--gold-dark)', fontWeight: 600 }}>
                      ({p.tamil})
                    </span>
                    {p.isCritical && (
                      <span className="badge badge-gold" style={{ fontSize: '0.68rem' }}>
                        ⭐ Vital / முக்கியமானது
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>
                    {p.description}
                  </p>
                </div>

                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    padding: '0.25rem 0.65rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    background: p.score === 1 ? '#EAF8F0' : p.score === 0.5 ? '#FFF8E7' : '#FDF2F5',
                    color: p.score === 1 ? '#12753E' : p.score === 0.5 ? '#8C6A0A' : '#7A0C2E',
                    border: `1px solid ${p.score === 1 ? '#B4E8C9' : p.score === 0.5 ? '#F0D999' : '#F5C2D0'}`
                  }}>
                    {p.score === 1 ? <CheckCircle size={13} /> : <AlertCircle size={13} />}
                    {p.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Footer Action */}
        <div style={{
          padding: '1rem 1.5rem',
          background: 'var(--bg-surface)',
          borderTop: '1px solid var(--border-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <button onClick={onClose} className="btn btn-outline btn-sm">
            Close / மூடு
          </button>

          <button 
            onClick={() => {
              if (onSendInterest) onSendInterest(targetProfile.id);
              onClose();
            }} 
            className="btn btn-primary btn-sm">
            <Heart size={16} fill="#FFF" />
            <span>Send Interest to {targetProfile.name.split(' ')[0]}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
