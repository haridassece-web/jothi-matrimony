import React from 'react';
import { Printer } from 'lucide-react';

export default function ChennaiJothiRegistrationForm({ profile, onPrint }) {
  if (!profile) return null;

  const nakshatrasCol1 = [
    { id: 1, name: "அஸ்வினி" }, { id: 2, name: "பரணி" }, { id: 3, name: "கார்த்திகை" },
    { id: 4, name: "ரோகிணி" }, { id: 5, name: "மிருகசீரிஷம்" }, { id: 6, name: "திருவாதிரை" },
    { id: 7, name: "புனர்பூசம்" }, { id: 8, name: "பூசம்" }, { id: 9, name: "ஆயில்யம்" },
    { id: 10, name: "மகம்" }, { id: 11, name: "பூரம்" }, { id: 12, name: "உத்திரம்" },
    { id: 13, name: "ஹஸ்தம்" }, { id: 14, name: "சித்திரை" }
  ];

  const nakshatrasCol2 = [
    { id: 15, name: "சுவாதி" }, { id: 16, name: "விசாகம்" }, { id: 17, name: "அனுஷம்" },
    { id: 18, name: "கேட்டை" }, { id: 19, name: "மூலம்" }, { id: 20, name: "பூராடம்" },
    { id: 21, name: "உத்திராடம்" }, { id: 22, name: "திருவோணம்" }, { id: 23, name: "அவிட்டம்" },
    { id: 24, name: "சதயம்" }, { id: 25, name: "பூரட்டாதி" }, { id: 26, name: "உத்திரட்டாதி" },
    { id: 27, name: "ரேவதி" }
  ];

  const houseNames = [
    "Mesham", "Rishabam", "Mithunam", "Katakam",
    "Simmam", "Kanni", "Thulaam", "Vrichigam",
    "Dhanusu", "Makaram", "Kumbam", "Meenam"
  ];

  const planetTamilMap = {
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
    'Sani': 'சனி',
    'Rahu': 'ரா',
    'ராகு': 'ரா',
    'Kethu': 'கே',
    'கேது': 'கே',
    'Lagnam': 'லக்',
    'லக்னம்': 'லக்',
    'Mandi': 'மாந்',
    'மாந்தி': 'மாந்'
  };

  const formatPlanets = (planets) => {
    if (!planets || !Array.isArray(planets)) return '';
    return planets
      .filter((item, idx) => !(idx === 0 && houseNames.includes(item)))
      .map(p => planetTamilMap[p] || p)
      .join(' ');
  };

  const handlePrint = () => {
    if (onPrint) {
      onPrint();
      return;
    }

    const sheetElement = document.getElementById('registration-sheet');
    if (!sheetElement) {
      window.print();
      return;
    }

    // Isolate into dedicated invisible iframe to guarantee EXACTLY 1 SINGLE PAGE
    let printIframe = document.getElementById('print-registration-iframe');
    if (!printIframe) {
      printIframe = document.createElement('iframe');
      printIframe.id = 'print-registration-iframe';
      printIframe.style.position = 'fixed';
      printIframe.style.top = '-9999px';
      printIframe.style.left = '-9999px';
      printIframe.style.width = '210mm';
      printIframe.style.height = '297mm';
      printIframe.style.border = '0';
      document.body.appendChild(printIframe);
    }

    const iframeDoc = printIframe.contentDocument || printIframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Chennai Jothi Matrimony - Reg Sheet ${profile.regNo || profile.id} - ${profile.name}</title>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Hind+Madurai:wght@400;600;700;800&display=swap" rel="stylesheet">
          <style>
            @page {
              size: A4 portrait;
              margin: 4mm 6mm !important;
            }
            * {
              box-sizing: border-box;
              margin: 0;
              padding: 0;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            html, body {
              width: 100%;
              height: 100%;
              max-height: 100%;
              background: #FFF;
              font-family: 'Hind Madurai', 'Tiro Tamil', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              color: #1E293B;
              overflow: hidden;
            }
            #registration-sheet {
              width: 100% !important;
              max-width: 100% !important;
              margin: 0 auto !important;
              padding: 6px 10px !important;
              border: 2px solid #0056B3 !important;
              border-radius: 4px !important;
              box-shadow: none !important;
              page-break-inside: avoid !important;
              break-inside: avoid !important;
              page-break-after: avoid !important;
              break-after: avoid !important;
            }
            @media print {
              html, body {
                height: 100% !important;
                max-height: 100% !important;
                overflow: hidden !important;
              }
              #registration-sheet {
                page-break-inside: avoid !important;
                break-inside: avoid !important;
                page-break-after: avoid !important;
                break-after: avoid !important;
              }
            }
          </style>
        </head>
        <body>
          ${sheetElement.outerHTML}
        </body>
      </html>
    `);
    iframeDoc.close();

    setTimeout(() => {
      try {
        printIframe.contentWindow.focus();
        printIframe.contentWindow.print();
      } catch (err) {
        window.print();
      }
    }, 450);
  };

  return (
    <div style={{ maxWidth: '850px', margin: '0 auto', fontFamily: "'Hind Madurai', 'Tiro Tamil', sans-serif" }}>
      
      {/* Print isolation styles embedded for browser Ctrl+P fallback */}
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 4mm 6mm !important;
          }
          html, body {
            width: 100% !important;
            height: 100% !important;
            max-height: 100% !important;
            overflow: hidden !important;
            background: #FFF !important;
            color: #1E293B !important;
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          body > * {
            visibility: hidden !important;
          }
          .no-print, header, nav, footer, button, .btn,
          .registration-modal-backdrop > *:not(.registration-modal-content),
          .registration-modal-content > *:not(#registration-sheet) {
            display: none !important;
            visibility: hidden !important;
          }
          .registration-modal-backdrop {
            position: static !important;
            background: transparent !important;
            padding: 0 !important;
            margin: 0 !important;
            overflow: visible !important;
            width: 100% !important;
            height: auto !important;
          }
          .registration-modal-content {
            background: transparent !important;
            padding: 0 !important;
            margin: 0 !important;
            max-width: 100% !important;
            max-height: none !important;
            overflow: visible !important;
            border: none !important;
            box-shadow: none !important;
            width: 100% !important;
          }
          #registration-sheet, #registration-sheet * {
            visibility: visible !important;
          }
          #registration-sheet {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 6px 10px !important;
            border: 2px solid #0056B3 !important;
            border-radius: 4px !important;
            box-shadow: none !important;
            box-sizing: border-box !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            page-break-after: avoid !important;
            break-after: avoid !important;
          }
        }
      `}</style>

      {/* Action Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginBottom: '0.75rem' }} className="no-print">
        <button 
          onClick={handlePrint} 
          className="btn btn-maroon btn-sm" 
          style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, padding: '0.5rem 1rem' }}>
          <Printer size={16} /> அச்சு அச்சிடு (Print 1-Page Sheet)
        </button>
      </div>

      {/* Digital Printable Sheet Container - Calibrated strictly for 1 A4 Page */}
      <div id="registration-sheet" style={{
        background: '#FFFFFF',
        border: '2.5px solid #0056B3',
        borderRadius: '6px',
        padding: '8px 12px',
        boxShadow: 'none',
        color: '#1E293B',
        position: 'relative',
        boxSizing: 'border-box',
        pageBreakInside: 'avoid',
        breakInside: 'avoid',
        pageBreakAfter: 'avoid',
        breakAfter: 'avoid'
      }}>
        
        {/* Top Attached Official Registration Header Banner Snap */}
        <div style={{ marginBottom: '6px', width: '100%', overflow: 'hidden', borderRadius: '4px', border: '1px solid #0056B3' }}>
          <img 
            src="/registration_header.png" 
            alt="Chennai Jothi Matrimony Header" 
            style={{ width: '100%', height: 'auto', maxHeight: '110px', objectFit: 'contain', display: 'block' }} 
          />
        </div>

        {/* Form Body Layout: Left Dotted Details & Right Photo */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 190px', gap: '10px', marginBottom: '6px' }}>
          
          {/* Left Dotted Details Table */}
          <div style={{ fontSize: '0.79rem', lineHeight: '1.42' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px', borderBottom: '1px dotted #94A3B8', paddingBottom: '1px' }}>
              <div>
                <span style={{ fontWeight: 700, color: '#800000' }}>பதிவு எண். : </span>
                <strong style={{ color: '#0056B3', fontSize: '0.92rem' }}>{profile.regNo || profile.id}</strong>
              </div>
              <div style={{ border: '1px solid #B91C1C', padding: '0px 8px', borderRadius: '3px' }}>
                <span style={{ fontWeight: 700, color: '#800000' }}>இனம் : </span>
                <strong>{profile.caste || profile.subcaste || ''}</strong>
              </div>
            </div>

            <div style={{ borderBottom: '1px dotted #94A3B8', paddingBottom: '1px', marginBottom: '2px' }}>
              <span style={{ fontWeight: 700, color: '#800000' }}>பெயர் : </span>
              <strong>{profile.name} {profile.tamilName ? `(${profile.tamilName})` : ''}</strong>
            </div>

            <div style={{ borderBottom: '1px dotted #94A3B8', paddingBottom: '1px', marginBottom: '2px' }}>
              <span style={{ fontWeight: 700, color: '#800000' }}>கல்வி : </span>
              <span>{profile.education}</span>
            </div>

            <div style={{ borderBottom: '1px dotted #94A3B8', paddingBottom: '1px', marginBottom: '2px' }}>
              <span style={{ fontWeight: 700, color: '#800000' }}>பிறந்த தேதி, நேரம் : </span>
              <strong>{profile.dob}</strong> {profile.birthTime ? `(${profile.birthTime})` : ''} {profile.tamilMonth ? `[${profile.tamilMonth}]` : ''}
            </div>

            <div style={{ borderBottom: '1px dotted #94A3B8', paddingBottom: '1px', marginBottom: '2px' }}>
              <span style={{ fontWeight: 700, color: '#800000' }}>பிறந்த ஊர், வரிசை : </span>
              <span>{profile.birthPlace || profile.nativeTown || profile.city} {profile.siblingPosition ? `[${profile.siblingPosition}]` : ''}</span>
            </div>

            <div style={{ borderBottom: '1px dotted #94A3B8', paddingBottom: '1px', marginBottom: '2px' }}>
              <span style={{ fontWeight: 700, color: '#800000' }}>நிறம், உயரம் : </span>
              <span>{profile.complexion || 'Fair'} / {profile.height}</span>
            </div>

            <div style={{ borderBottom: '1px dotted #94A3B8', paddingBottom: '1px', marginBottom: '2px' }}>
              <span style={{ fontWeight: 700, color: '#800000' }}>நட்சத்திரம், ராசி : </span>
              <strong>{profile.nakshatra}</strong> ({profile.padam || '1'} ஆம் பாதம்), <strong>{profile.rasi}</strong>
            </div>

            <div style={{ borderBottom: '1px dotted #94A3B8', paddingBottom: '1px', marginBottom: '2px' }}>
              <span style={{ fontWeight: 700, color: '#800000' }}>பணி : </span>
              <span>{profile.profession} {profile.company ? `(${profile.company})` : ''}</span>
            </div>

            <div style={{ borderBottom: '1px dotted #94A3B8', paddingBottom: '1px', marginBottom: '2px' }}>
              <span style={{ fontWeight: 700, color: '#800000' }}>மாத வருமானம் ரூ. : </span>
              <strong>{profile.monthlyIncome || profile.annualIncome}</strong>
            </div>

            <div style={{ borderBottom: '1px dotted #94A3B8', paddingBottom: '1px', marginBottom: '2px' }}>
              <span style={{ fontWeight: 700, color: '#800000' }}>தந்தை பெயர் : திரு. </span>
              <span>{profile.family?.fatherName || profile.fatherName || ''}</span>
            </div>

            <div style={{ borderBottom: '1px dotted #94A3B8', paddingBottom: '1px', marginBottom: '2px' }}>
              <span style={{ fontWeight: 700, color: '#800000' }}>பணி : </span>
              <span>{profile.family?.fatherOccupation || ''}</span>
            </div>

            <div style={{ borderBottom: '1px dotted #94A3B8', paddingBottom: '1px', marginBottom: '2px' }}>
              <span style={{ fontWeight: 700, color: '#800000' }}>தாயார் பெயர் : திருமதி. </span>
              <span>{profile.family?.motherName || profile.motherName || ''}</span>
            </div>

            <div style={{ borderBottom: '1px dotted #94A3B8', paddingBottom: '1px', marginBottom: '2px' }}>
              <span style={{ fontWeight: 700, color: '#800000' }}>பணி : </span>
              <span>{profile.family?.motherOccupation || 'குடும்ப நிர்வாகம்'}</span>
            </div>

            <div style={{ borderBottom: '1px dotted #94A3B8', paddingBottom: '1px', marginBottom: '2px' }}>
              <span style={{ fontWeight: 700, color: '#800000' }}>உடன் பிறப்பு : </span>
              <span>{profile.family?.siblings || profile.siblings || 'Nil'}</span>
            </div>

            <div style={{ borderBottom: '1px dotted #94A3B8', paddingBottom: '1px', marginBottom: '2px' }}>
              <span style={{ fontWeight: 700, color: '#800000' }}>வாடகை வீடு / சொந்த வீடு : </span>
              <span>{profile.houseProperty || profile.family?.houseProperty || 'சொந்த வீடு'}</span>
            </div>

            <div style={{ borderBottom: '1px dotted #94A3B8', paddingBottom: '1px', marginBottom: '2px' }}>
              <span style={{ fontWeight: 700, color: '#800000' }}>இருப்பிடம் : </span>
              <strong>{profile.address || `${profile.city}, ${profile.state || 'Tamil Nadu'}`}</strong>
            </div>

            <div style={{ borderBottom: '1px dotted #94A3B8', paddingBottom: '1px', marginBottom: '2px' }}>
              <span style={{ fontWeight: 700, color: '#800000' }}>எதிர்பார்ப்பு : </span>
              <span>{profile.expectation || `${profile.partnerPreferences?.education || 'Degree'}, ${profile.partnerPreferences?.profession || 'Job'}, ${profile.partnerPreferences?.castePreference || 'Open'}`}</span>
            </div>

            <div style={{ borderBottom: '1px dotted #94A3B8', paddingBottom: '1px', marginBottom: '2px' }}>
              <span style={{ fontWeight: 700, color: '#800000' }}>குறிப்பு : </span>
              <span>{profile.notes || profile.about || 'வரன் பற்றிய மேலதிக தகவல்களுக்கு தொடர்பு கொள்ளவும்.'}</span>
            </div>
          </div>

          {/* Right Photo Column Frame */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              border: '2px solid #B91C1C',
              borderRadius: '4px',
              padding: '3px',
              background: '#FFFFFF',
              height: '255px',
              width: '180px',
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {profile.photo ? (
                <img 
                  src={profile.photo} 
                  alt={profile.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '2px' }}
                />
              ) : (
                <div style={{ color: '#94A3B8', fontSize: '0.8rem' }}>புகைப்படம் (Photo)</div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Section: Horoscope Grids & Matching Nakshatras List */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '8px', borderTop: '1.5px solid #B91C1C', paddingTop: '5px', marginBottom: '5px' }}>
          
          {/* Horoscope Grids (Rasi & Navamsam) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
            
            {/* Rasi Grid Box */}
            <div style={{ border: '1.5px solid #B91C1C', borderRadius: '3px', padding: '2px', background: '#FFFDF9' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gridTemplateRows: 'repeat(4, 25px)',
                gap: '1px',
                background: '#B91C1C',
                border: '1px solid #B91C1C',
                fontSize: '0.60rem',
                textAlign: 'center'
              }}>
                <div style={{ background: '#FFF', padding: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{formatPlanets(profile.rasiChart?.[12])}</div>
                <div style={{ background: '#FFF', padding: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{formatPlanets(profile.rasiChart?.[1])}</div>
                <div style={{ background: '#FFF', padding: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{formatPlanets(profile.rasiChart?.[2])}</div>
                <div style={{ background: '#FFF', padding: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{formatPlanets(profile.rasiChart?.[3])}</div>

                <div style={{ background: '#FFF', padding: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{formatPlanets(profile.rasiChart?.[11])}</div>
                <div style={{ background: '#FFFDF9', gridColumn: 'span 2', gridRow: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#B91C1C', fontSize: '0.80rem' }}>
                  இராசி
                </div>
                <div style={{ background: '#FFF', padding: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{formatPlanets(profile.rasiChart?.[4])}</div>

                <div style={{ background: '#FFF', padding: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{formatPlanets(profile.rasiChart?.[10])}</div>
                <div style={{ background: '#FFF', padding: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{formatPlanets(profile.rasiChart?.[5])}</div>

                <div style={{ background: '#FFF', padding: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{formatPlanets(profile.rasiChart?.[9])}</div>
                <div style={{ background: '#FFF', padding: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{formatPlanets(profile.rasiChart?.[8])}</div>
                <div style={{ background: '#FFF', padding: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{formatPlanets(profile.rasiChart?.[7])}</div>
                <div style={{ background: '#FFF', padding: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{formatPlanets(profile.rasiChart?.[6])}</div>
              </div>
            </div>

            {/* Navamsam Grid Box */}
            <div style={{ border: '1.5px solid #B91C1C', borderRadius: '3px', padding: '2px', background: '#FFFDF9' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gridTemplateRows: 'repeat(4, 25px)',
                gap: '1px',
                background: '#B91C1C',
                border: '1px solid #B91C1C',
                fontSize: '0.60rem',
                textAlign: 'center'
              }}>
                <div style={{ background: '#FFF', padding: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{formatPlanets(profile.navamsamChart?.[12])}</div>
                <div style={{ background: '#FFF', padding: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{formatPlanets(profile.navamsamChart?.[1])}</div>
                <div style={{ background: '#FFF', padding: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{formatPlanets(profile.navamsamChart?.[2])}</div>
                <div style={{ background: '#FFF', padding: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{formatPlanets(profile.navamsamChart?.[3])}</div>

                <div style={{ background: '#FFF', padding: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{formatPlanets(profile.navamsamChart?.[11])}</div>
                <div style={{ background: '#FFFDF9', gridColumn: 'span 2', gridRow: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#B91C1C', fontSize: '0.80rem' }}>
                  நவாம்சம்
                </div>
                <div style={{ background: '#FFF', padding: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{formatPlanets(profile.navamsamChart?.[4])}</div>

                <div style={{ background: '#FFF', padding: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{formatPlanets(profile.navamsamChart?.[10])}</div>
                <div style={{ background: '#FFF', padding: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{formatPlanets(profile.navamsamChart?.[5])}</div>

                <div style={{ background: '#FFF', padding: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{formatPlanets(profile.navamsamChart?.[9])}</div>
                <div style={{ background: '#FFF', padding: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{formatPlanets(profile.navamsamChart?.[8])}</div>
                <div style={{ background: '#FFF', padding: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{formatPlanets(profile.navamsamChart?.[7])}</div>
                <div style={{ background: '#FFF', padding: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{formatPlanets(profile.navamsamChart?.[6])}</div>
              </div>
            </div>

          </div>

          {/* Suitable Nakshatras List */}
          <div style={{ border: '1.5px solid #B91C1C', borderRadius: '3px', padding: '4px 6px', background: '#FFFFFF' }}>
            <div style={{ textAlign: 'center', fontWeight: 800, fontSize: '0.72rem', color: '#B91C1C', marginBottom: '2px', borderBottom: '1px solid #FCA5A5', paddingBottom: '1px' }}>
              பொருந்தும் நட்சத்திரங்கள்
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1px 4px',
              fontSize: '0.60rem',
              color: '#B91C1C',
              lineHeight: '1.25'
            }}>
              <div>
                {nakshatrasCol1.map(n => (
                  <div key={n.id}>{n.id}. {n.name}</div>
                ))}
              </div>
              <div>
                {nakshatrasCol2.map(n => (
                  <div key={n.id}>{n.id}. {n.name}</div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Legal Declaration & Signature Footer */}
        <div style={{ borderTop: '1px solid #CBD5E1', paddingTop: '4px', fontSize: '0.60rem', color: '#334155', lineHeight: '1.2' }}>
          <p style={{ margin: '0 0 6px 0', textAlign: 'justify' }}>
            வரன்களைப் பற்றி விவரங்களைத் தெரிந்துக் கொள்வதும் எங்களின் (பெண் - மாப்பிள்ளை வீட்டாரின்) பொறுப்பாகும். திருமண தகவல் மையம் பொறுப்பல்ல என்றும், மேற்கண்ட விவரங்கள் யாவும் உண்மை என்றும் உறுதியளிக்கிறேன். திருமண தகவல் மையத்தில் விதிமுறைகளை ஏற்று பதிவு செய்கிறேன். எக்காரணத்தைக் கொண்டும் பதிவுக் கட்டணம் திருப்பித் தரப்படமாட்டாது.
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: '#1E293B', padding: '0 0.5rem', fontSize: '0.68rem' }}>
            <div>கையொப்பம் : ....................................</div>
            <div>இடம் : ....................................</div>
            <div>தேதி : ....................................</div>
          </div>
        </div>

      </div>
    </div>
  );
}
