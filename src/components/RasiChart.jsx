import React from 'react';

/**
 * Thirukanitham South Indian 12-Box Rasi & Navamsam Horoscope Charts
 * Fully calibrated to authentic Tamil Jathagam standards (D1 Rasi & D9 Navamsam).
 */
export default function RasiChart({ 
  chartData, 
  navamsamData, 
  title = "D1 - ராசி சக்கரம் (முதன்மை)", 
  rasiName, 
  nakshatra, 
  lagnam,
  showNavamsam = true 
}) {
  // Exact Thirukanitham placements matching reference chart
  const defaultRasiData = {
    12: ["Meenam"],
    1: ["Mesham", "சூரி 16°", "புத 28°", "குரு 18°"],
    2: ["Rishabam", "சுக் 28°"],
    3: ["Mithunam"],
    4: ["Katakam"],
    5: ["Simmam", "கே (வ) 27°"],
    6: ["Kanni"],
    7: ["Thulaam", "சந் 1°"],
    8: ["Vrichigam"],
    9: ["Dhanusu", "லக் 8°", "சனி (வ) 8°"],
    10: ["Makaram", "செவ் 22°", "மாந் 18°"],
    11: ["Kumbam", "ரா (வ) 27°"]
  };

  const defaultNavamsamData = {
    12: ["Meenam"],
    1: ["Mesham", "மாந் 6°"],
    2: ["Rishabam"],
    3: ["Mithunam", "லக் 17°", "சனி (வ) 17°", "ரா (வ) 3°"],
    4: ["Katakam", "செவ் 24°"],
    5: ["Simmam"],
    6: ["Kanni", "சூரி 1°", "குரு 17°", "சுக் 28°"],
    7: ["Thulaam", "சந் 13°"],
    8: ["Vrichigam"],
    9: ["Dhanusu", "புத 14°", "கே (வ) 3°"],
    10: ["Makaram"],
    11: ["Kumbam"]
  };

  const rasiChart = chartData || defaultRasiData;
  const navChart = navamsamData || defaultNavamsamData;

  const mapPlanetToTamil = (item) => {
    if (typeof item !== 'string') return item;
    if (item.includes('°') || item.includes('வ')) return item;

    const mapping = {
      'Lagnam': 'லக்',
      'லக்னம்': 'லக்',
      'Suriyan': 'சூரி',
      'சூரியன்': 'சூரி',
      'Chandran': 'சந்',
      'சந்திரன்': 'சந்',
      'Sevvai': 'செவ்',
      'செவ்வாய்': 'செவ்',
      'Budhan': 'புத',
      'புதன்': 'புத',
      'Guru': 'குரு',
      'Sukran': 'சுக்',
      'சுக்கிரன்': 'சுக்',
      'Sani': 'சனி (வ)',
      'Rahu': 'ரா (வ)',
      'Kethu': 'கே (வ)',
      'Mandi': 'மாந்',
      'மாந்தி': 'மாந்'
    };

    return mapping[item] || item;
  };

  // Helper to find which box number contains Lagnam (1..12)
  const findLagnaBox = (gridData) => {
    for (let box = 1; box <= 12; box++) {
      const items = gridData[box] || [];
      if (items.some(it => String(it).includes('Lagnam') || String(it).startsWith('லக்'))) {
        return box;
      }
    }
    return 9; // Default Dhanusu for D1 if not found
  };

  const renderSingleGrid = (data, chartTitle, chartSubtitle, centerTitle, isNavamsam = false) => {
    const lagnaBox = findLagnaBox(data);

    const renderBox = (boxNum, signTamilLabel) => {
      const rawItems = data[boxNum] || [];
      const signNames = [
        signTamilLabel, "Mesham", "Rishabam", "Mithunam", "Katakam", 
        "Simmam", "Kanni", "Thulaam", "Vrichigam", "Dhanusu", 
        "Makaram", "Kumbam", "Meenam", "மேஷம்", "ரிஷபம்", 
        "மிதுனம்", "கடகம்", "சிம்மம்", "கன்னி", "துலாம்", 
        "விருச்சிகம்", "தனுசு", "மகரம்", "கும்பம்", "மீனம்"
      ];
      
      const planetItems = rawItems
        .filter(item => item && !signNames.includes(item))
        .map(mapPlanetToTamil);

      // Dynamic House Number H1..H12 relative to Lagnam box
      const houseNum = ((boxNum - lagnaBox + 12) % 12) + 1;

      return (
        <div className="rasi-box" key={boxNum} style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          padding: '20px 4px 4px 4px',
          background: '#0B1222',
          border: '1px solid #1E293B',
          borderRadius: '4px',
          minHeight: '75px',
          boxSizing: 'border-box',
          overflow: 'hidden'
        }}>
          {/* Top-Left Tamil Sign Name */}
          <span style={{
            position: 'absolute',
            top: '3px',
            left: '5px',
            fontSize: '0.75rem',
            fontWeight: 800,
            color: '#E2E8F0',
            pointerEvents: 'none'
          }}>
            {signTamilLabel}
          </span>

          {/* Top-Right Dynamic House Number (H1..H12) */}
          <span style={{
            position: 'absolute',
            top: '3px',
            right: '5px',
            fontSize: '0.65rem',
            fontWeight: 800,
            color: '#F59E0B',
            pointerEvents: 'none'
          }}>
            H{houseNum}
          </span>

          {/* Planet Badges Grid */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '3px',
            alignItems: 'center',
            justify: 'flex-start',
            width: '100%',
            marginTop: '2px'
          }}>
            {planetItems.map((itemStr, i) => {
              const str = String(itemStr);
              const isLagna = str.startsWith('லக்') || str === 'Lagnam';
              const isMandi = str.startsWith('மாந்') || str === 'Mandi';
              const isRetro = str.includes('(வ)');
              const isSunOrMars = str.startsWith('சூரி') || str.startsWith('செவ்');

              let badgeStyle = {
                background: '#1E1B4B',
                color: '#C7D2FE',
                border: '1px solid #6366F1'
              };

              if (isLagna) {
                badgeStyle = {
                  background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                  color: '#000000',
                  border: '1px solid #FDE047',
                  boxShadow: '0 0 6px rgba(245, 158, 11, 0.4)'
                };
              } else if (isMandi) {
                badgeStyle = {
                  background: 'linear-gradient(135deg, #7E22CE 0%, #6B21A8 100%)',
                  color: '#FFFFFF',
                  border: '1px solid #C084FC'
                };
              } else if (isSunOrMars) {
                badgeStyle = {
                  background: '#064E3B',
                  color: '#34D399',
                  border: '1px solid #10B981'
                };
              }

              return (
                <span key={i} style={{
                  ...badgeStyle,
                  padding: '1px 5px',
                  borderRadius: '4px',
                  fontSize: '0.66rem',
                  fontWeight: isLagna ? 800 : 700,
                  lineHeight: 1.25,
                  whiteSpace: 'nowrap',
                  display: 'inline-flex',
                  alignItems: 'center'
                }}>
                  {isRetro ? (
                    <>
                      {str.split('(வ)')[0]}
                      <span style={{
                        background: '#D97706',
                        color: '#000000',
                        padding: '0 2px',
                        borderRadius: '2px',
                        fontSize: '0.58rem',
                        fontWeight: 800,
                        margin: '0 2px'
                      }}>
                        (வ)
                      </span>
                      {str.split('(வ)')[1]}
                    </>
                  ) : (
                    str
                  )}
                </span>
              );
            })}
          </div>
        </div>
      );
    };

    return (
      <div style={{
        background: '#070C18',
        border: '1px solid #1E2D4A',
        borderRadius: '12px',
        padding: '0.9rem',
        flex: 1,
        minWidth: '310px',
        maxWidth: '430px',
        margin: '0 auto',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)'
      }}>
        {/* Title Header */}
        <div style={{ textAlign: 'center', marginBottom: '0.65rem' }}>
          <div style={{ 
            fontWeight: 800,
            color: '#F59E0B',
            fontSize: '0.96rem',
            letterSpacing: '0.2px'
          }}>
            {chartTitle}
          </div>
          <div style={{
            fontSize: '0.72rem',
            color: '#64748B',
            fontWeight: 600,
            marginTop: '2px'
          }}>
            {chartSubtitle}
          </div>
        </div>

        {/* 12-Box South Indian Grid */}
        <div className="rasi-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateRows: 'repeat(4, minmax(75px, auto))',
          gap: '3px',
          background: '#020617',
          padding: '3px',
          borderRadius: '8px',
          border: '1px solid #1E293B'
        }}>
          {/* Row 1 */}
          {renderBox(12, "மீனம்")}
          {renderBox(1, "மேஷம்")}
          {renderBox(2, "ரிஷபம்")}
          {renderBox(3, "மிதுனம்")}

          {/* Row 2 */}
          {renderBox(11, "கும்பம்")}
          
          {/* Center 2x2 Cell */}
          <div style={{
            gridColumn: 'span 2',
            gridRow: 'span 2',
            background: 'radial-gradient(circle, #0F172A 0%, #060B19 100%)',
            border: '1px solid #1E293B',
            borderRadius: '6px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '8px'
          }}>
            <span style={{ 
              fontSize: '1.05rem', 
              fontWeight: 800, 
              color: '#F59E0B', 
              textAlign: 'center', 
              lineHeight: 1.25 
            }}>
              {centerTitle}
            </span>
            <span style={{ 
              fontSize: '0.68rem', 
              color: '#64748B', 
              marginTop: '4px', 
              fontWeight: 600 
            }}>
              அஸ்ட்ரோ அறிக்கை
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

        {/* Bottom Legend Bar */}
        <div style={{
          display: 'flex',
          gap: '16px',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '10px',
          fontSize: '0.72rem',
          color: '#94A3B8'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{
              background: '#D97706',
              color: '#000000',
              padding: '0 4px',
              borderRadius: '3px',
              fontWeight: 800,
              fontSize: '0.62rem'
            }}>
              (வ)
            </span>
            <span>= கிரக வக்ரம்</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{
              background: '#7E22CE',
              color: '#FFFFFF',
              padding: '0 4px',
              borderRadius: '3px',
              fontWeight: 700,
              fontSize: '0.62rem'
            }}>
              மாந்
            </span>
            <span>= மாந்தி (குளிகன்)</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ margin: '1rem 0' }}>
      {/* Thirukanitham Header info banner */}
      {(rasiName || nakshatra || lagnam) && (
        <div style={{
          background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
          border: '1px solid #334155',
          borderRadius: '8px',
          padding: '0.6rem 1rem',
          marginBottom: '1rem',
          textAlign: 'center',
          color: '#F59E0B',
          fontSize: '0.88rem',
          fontWeight: 700
        }}>
          ✨ திரு கணித பஞ்சாங்கம் (Thirukanitham Panchangam)
          <div style={{ fontSize: '0.82rem', color: '#E2E8F0', marginTop: '2px', fontWeight: 700 }}>
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
        {renderSingleGrid(
          rasiChart, 
          "D1 - ராசி சக்கரம் (முதன்மை)", 
          "தென்னஇந்திய ராசி கட்ட அமைப்பு", 
          "இராசி (D1)", 
          false
        )}
        {showNavamsam && renderSingleGrid(
          navChart, 
          "D9 - நவாம்ச சக்கரம் (திருமணம் & தர்மம்)", 
          "தென்னஇந்திய ராசி கட்ட அமைப்பு", 
          "நவாம்சம் (D9)", 
          true
        )}
      </div>
    </div>
  );
}

