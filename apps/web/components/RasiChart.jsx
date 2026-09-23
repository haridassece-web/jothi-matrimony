'use client';

import React from 'react';

/**
 * Renders South Indian 12-Box Rasi & Navamsam Horoscope Chart
 */
export default function RasiChart({ chartData, title = "ராசி கட்டம் (Rasi Chart)", rasiName, nakshatra }) {
  const defaultData = {
    12: ["Meenam"],
    1: ["Mesham", "Lagnam"],
    2: ["Rishabam", "Chandran"],
    3: ["Mithunam", "Budhan"],
    4: ["Katakamd"],
    5: ["Simmam"],
    6: ["Kanni", "Suriyan"],
    7: ["Thulaam", "Sukran"],
    8: ["Vrichigam", "Rahu"],
    9: ["Dhanusu", "Guru"],
    10: ["Makaram", "Sani"],
    11: ["Kumbam", "Kethu"]
  };

  const data = chartData || defaultData;

  const renderRasiBox = (boxNum, defaultLabel) => {
    const items = data[boxNum] || [defaultLabel];
    return (
      <div className="rasi-box" key={boxNum}>
        <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '2px' }}>
          {defaultLabel}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px', justifyContent: 'center' }}>
          {items.map((item, i) => {
            if (item === defaultLabel) return null;
            const isLagna = item === 'Lagnam';
            return (
              <span key={i} style={{
                background: isLagna ? 'var(--maroon-gradient)' : '#FFF3D6',
                color: isLagna ? '#FFF' : '#7A5200',
                padding: '1px 4px',
                borderRadius: '3px',
                fontSize: '0.68rem',
                fontWeight: 700,
                border: isLagna ? 'none' : '1px solid #E5C578'
              }}>
                {item}
              </span>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div style={{
      background: '#FFFDF9',
      border: '1.5px solid var(--border-gold)',
      borderRadius: 'var(--radius-md)',
      padding: '1rem',
      maxWidth: '420px',
      margin: '0 auto',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '0.75rem',
        fontWeight: 700,
        color: 'var(--primary-maroon-dark)',
        fontSize: '0.95rem'
      }}>
        {title}
        {rasiName && <div style={{ fontSize: '0.8rem', color: 'var(--gold-dark)', fontWeight: 600 }}>{rasiName} • {nakshatra}</div>}
      </div>

      <div className="rasi-grid">
        {/* Row 1 */}
        {renderRasiBox(12, "மீனம்")}
        {renderRasiBox(1, "மேஷம்")}
        {renderRasiBox(2, "ரிஷபம்")}
        {renderRasiBox(3, "மிதுனம்")}

        {/* Row 2 */}
        {renderRasiBox(11, "கும்பம்")}
        
        {/* Center 2x2 Box */}
        <div className="rasi-center-box">
          <span style={{ fontSize: '1.2rem', marginBottom: '2px' }}>🕉️</span>
          <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--primary-maroon)' }}>
            JOTHI
          </span>
          <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
            ஜாதகக் கட்டம்
          </span>
        </div>

        {renderRasiBox(4, "கடகம்")}

        {/* Row 3 */}
        {renderRasiBox(10, "மகரம்")}
        {renderRasiBox(5, "சிம்மம்")}

        {/* Row 4 */}
        {renderRasiBox(9, "தனுசு")}
        {renderRasiBox(8, "விருச்சிகம்")}
        {renderRasiBox(7, "துலாம்")}
        {renderRasiBox(6, "கன்னி")}
      </div>
    </div>
  );
}
