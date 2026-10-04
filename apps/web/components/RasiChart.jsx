'use client';

import React from 'react';

/**
 * Renders Thirukanitham South Indian 12-Box Rasi & Navamsam Horoscope Charts
 */
export default function RasiChart({ 
  chartData, 
  navamsamData, 
  title = "ராசி கட்டம் (Rasi Chart)", 
  rasiName, 
  nakshatra, 
  lagnam,
  showNavamsam = true 
}) {
  const defaultRasiData = {
    12: ["Meenam"],
    1: ["Mesham", "Lagnam"],
    2: ["Rishabam", "Chandran"],
    3: ["Mithunam", "Budhan"],
    4: ["Katakam"],
    5: ["Simmam"],
    6: ["Kanni", "Suriyan"],
    7: ["Thulaam", "Sukran"],
    8: ["Vrichigam", "Rahu"],
    9: ["Dhanusu", "Guru"],
    10: ["Makaram", "Sani"],
    11: ["Kumbam", "Kethu"]
  };

  const defaultNavamsamData = {
    12: ["Meenam"],
    1: ["Mesham", "Suriyan"],
    2: ["Rishabam", "Sukran"],
    3: ["Mithunam", "Lagnam"],
    4: ["Katakam", "Guru"],
    5: ["Simmam", "Sevvai"],
    6: ["Kanni", "Chandran"],
    7: ["Thulaam", "Sani"],
    8: ["Vrichigam", "Kethu"],
    9: ["Dhanusu", "Budhan"],
    10: ["Makaram"],
    11: ["Kumbam", "Rahu"]
  };

  const rasiChart = chartData || defaultRasiData;
  const navChart = navamsamData || defaultNavamsamData;

  const renderSingleGrid = (data, chartTitle, centerSubtitle) => {
    const renderBox = (boxNum, defaultLabel) => {
      const items = data[boxNum] || [defaultLabel];
      return (
        <div className="rasi-box" key={boxNum}>
          <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '2px' }}>
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
                  fontSize: '0.66rem',
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
        padding: '0.85rem',
        flex: 1,
        minWidth: '280px',
        maxWidth: '420px',
        margin: '0 auto',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '0.6rem',
          fontWeight: 800,
          color: 'var(--primary-maroon-dark)',
          fontSize: '0.9rem'
        }}>
          {chartTitle}
        </div>

        <div className="rasi-grid">
          {/* Row 1 */}
          {renderBox(12, "மீனம்")}
          {renderBox(1, "மேஷம்")}
          {renderBox(2, "ரிஷபம்")}
          {renderBox(3, "மிதுனம்")}

          {/* Row 2 */}
          {renderBox(11, "கும்பம்")}
          
          {/* Center 2x2 Box */}
          <div className="rasi-center-box">
            <span style={{ fontSize: '1.1rem', marginBottom: '1px' }}>🕉️</span>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--primary-maroon)', textAlign: 'center', lineHeight: 1.1 }}>
              CHENNAI JOTHI
            </span>
            <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              {centerSubtitle}
            </span>
          </div>

          {renderBox(4, "கடகம்")}

          {/* Row 3 */}
          {renderBox(10, "மகரம்")}
          {renderBox(5, "சிம்மம்")}

          {/* Row 4 */}
          {renderBox(9, "தனுசு")}
          {renderBox(8, "விருச்சிகம்")}
          {renderBox(7, "துலாம்")}
          {renderBox(6, "கன்னி")}
        </div>
      </div>
    );
  };

  return (
    <div style={{ margin: '1rem 0' }}>
      {/* Thirukanitham Header info banner */}
      {(rasiName || nakshatra || lagnam) && (
        <div style={{
          background: 'linear-gradient(135deg, #FFF8E7 0%, #FEF3C7 100%)',
          border: '1px solid #F0D999',
          borderRadius: '8px',
          padding: '0.6rem 1rem',
          marginBottom: '1rem',
          textAlign: 'center',
          color: '#7A5200',
          fontSize: '0.88rem',
          fontWeight: 700
        }}>
          ✨ திரு கணித பஞ்சாங்கம் (Thirukanitham Panchangam)
          <div style={{ fontSize: '0.82rem', color: 'var(--primary-maroon-dark)', marginTop: '2px', fontWeight: 800 }}>
            {rasiName && <span>ராசி: {rasiName}</span>}
            {nakshatra && <span> • நட்சத்திரம்: {nakshatra}</span>}
            {lagnam && <span> • லக்னம்: {lagnam}</span>}
          </div>
        </div>
      )}

      {/* Side-by-side Rasi and Navamsam Charts */}
      <div style={{
        display: 'flex',
        gap: '1.25rem',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'stretch'
      }}>
        {renderSingleGrid(rasiChart, title, "ராசி கட்டம் (D1)")}
        {showNavamsam && renderSingleGrid(navChart, "நவாம்ச கட்டம் (Navamsam D9)", "நவாம்சம் (D9)")}
      </div>
    </div>
  );
}

