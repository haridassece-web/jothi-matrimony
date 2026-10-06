import React from 'react';
import { Printer } from 'lucide-react';

export default function ChennaiJothiRegistrationForm({ profile, onPrint }) {
  if (!profile) return null;

  const nakshatraList = [
    { id: 1, name: "அஸ்வினி" }, { id: 2, name: "பரணி" }, { id: 3, name: "கார்த்திகை" },
    { id: 4, name: "ரோஹிணி" }, { id: 5, name: "மிருகசீரிடம்" }, { id: 6, name: "திருவாதிரை" },
    { id: 7, name: "புனர்பூசம்" }, { id: 8, name: "பூசம்" }, { id: 9, name: "ஆயில்யம்" },
    { id: 10, name: "மகம்" }, { id: 11, name: "பூரம்" }, { id: 12, name: "உத்திரம்" },
    { id: 13, name: "ஹஸ்தம்" }, { id: 14, name: "சித்திரை" }, { id: 15, name: "சுவாதி" },
    { id: 16, name: "விசாகம்" }, { id: 17, name: "அனுஷம்" }, { id: 18, name: "கேட்டை" },
    { id: 19, name: "மூலம்" }, { id: 20, name: "பூராடம்" }, { id: 21, name: "உத்திராடம்" },
    { id: 22, name: "திருவோணம்" }, { id: 23, name: "அவிட்டம்" }, { id: 24, name: "சதயம்" },
    { id: 25, name: "பூரட்டாதி" }, { id: 26, name: "உத்திரட்டாதி" }, { id: 27, name: "ரேவதி" }
  ];

  const handlePrint = () => {
    if (onPrint) {
      onPrint();
    } else {
      window.print();
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', fontFamily: "'Hind Madurai', 'Tiro Tamil', sans-serif" }}>
      
      {/* Action Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginBottom: '1rem' }} className="no-print">
        <button onClick={handlePrint} className="btn btn-maroon btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Printer size={16} /> அச்சு அச்சிடு (Print Sheet)
        </button>
      </div>

      {/* Digital Printable Sheet Container */}
      <div id="registration-sheet" style={{
        background: '#FFFFFF',
        border: '3px solid #0056B3',
        borderRadius: '8px',
        padding: '1.25rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        color: '#1E293B',
        position: 'relative'
      }}>
        
        {/* Top Attached Official Registration Header Banner Snap */}
        <div style={{ marginBottom: '1rem', width: '100%', overflow: 'hidden', borderRadius: '6px', border: '1.5px solid #0056B3' }}>
          <img 
            src="/registration_header.png" 
            alt="Chennai Jothi Matrimony Top Registration Form Header Snap" 
            style={{ width: '100%', height: 'auto', display: 'block' }} 
          />
        </div>

        {/* Form Body Layout: Left Dotted Details & Right Photo */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 240px', gap: '1.25rem', marginBottom: '1.25rem' }}>
          
          {/* Left Dotted Details Table */}
          <div style={{ fontSize: '0.86rem', lineHeight: '1.8' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <div>
                <span style={{ fontWeight: 700, color: '#800000' }}>பதிவு எண். : </span>
                <strong style={{ color: '#0056B3', fontSize: '1rem' }}>{profile.regNo || profile.id}</strong>
              </div>
              <div style={{ border: '1px solid #B91C1C', padding: '1px 12px', borderRadius: '3px' }}>
                <span style={{ fontWeight: 700, color: '#800000' }}>இனம் : </span>
                <strong>{profile.caste || profile.subcaste || ''}</strong>
              </div>
            </div>

            <div style={{ borderBottom: '1px dotted #94A3B8', paddingBottom: '2px', marginBottom: '4px' }}>
              <span style={{ fontWeight: 700, color: '#800000' }}>பெயர் : </span>
              <strong>{profile.name}</strong>
            </div>

            <div style={{ borderBottom: '1px dotted #94A3B8', paddingBottom: '2px', marginBottom: '4px' }}>
              <span style={{ fontWeight: 700, color: '#800000' }}>கல்வி : </span>
              <span>{profile.education}</span>
            </div>

            <div style={{ borderBottom: '1px dotted #94A3B8', paddingBottom: '2px', marginBottom: '4px' }}>
              <span style={{ fontWeight: 700, color: '#800000' }}>பிறந்த தேதி, நேரம் : </span>
              <strong>{profile.dob}</strong> {profile.birthTime ? `(${profile.birthTime})` : ''}
            </div>

            <div style={{ borderBottom: '1px dotted #94A3B8', paddingBottom: '2px', marginBottom: '4px' }}>
              <span style={{ fontWeight: 700, color: '#800000' }}>பிறந்த ஊர், வரிசை : </span>
              <span>{profile.birthPlace || profile.nativeTown || profile.city} {profile.siblingPosition ? `[${profile.siblingPosition}]` : ''}</span>
            </div>

            <div style={{ borderBottom: '1px dotted #94A3B8', paddingBottom: '2px', marginBottom: '4px' }}>
              <span style={{ fontWeight: 700, color: '#800000' }}>நிறம், உயரம் : </span>
              <span>{profile.complexion || 'Fair'} / {profile.height}</span>
            </div>

            <div style={{ borderBottom: '1px dotted #94A3B8', paddingBottom: '2px', marginBottom: '4px' }}>
              <span style={{ fontWeight: 700, color: '#800000' }}>நட்சத்திரம், ராசி : </span>
              <strong>{profile.nakshatra}</strong> ({profile.padam || '1'} ஆம் பாதம்), <strong>{profile.rasi}</strong> ராசி
            </div>

            <div style={{ borderBottom: '1px dotted #94A3B8', paddingBottom: '2px', marginBottom: '4px' }}>
              <span style={{ fontWeight: 700, color: '#800000' }}>பணி : </span>
              <span>{profile.profession} {profile.company ? `(${profile.company})` : ''}</span>
            </div>

            <div style={{ borderBottom: '1px dotted #94A3B8', paddingBottom: '2px', marginBottom: '4px' }}>
              <span style={{ fontWeight: 700, color: '#800000' }}>மாத வருமானம் ரூ. : </span>
              <strong>{profile.monthlyIncome || profile.annualIncome}</strong>
            </div>

            <div style={{ borderBottom: '1px dotted #94A3B8', paddingBottom: '2px', marginBottom: '4px' }}>
              <span style={{ fontWeight: 700, color: '#800000' }}>தந்தை பெயர் : திரு. </span>
              <span>{profile.family?.fatherName || profile.fatherName || ''}</span>
            </div>

            <div style={{ borderBottom: '1px dotted #94A3B8', paddingBottom: '2px', marginBottom: '4px' }}>
              <span style={{ fontWeight: 700, color: '#800000' }}>பணி : </span>
              <span>{profile.family?.fatherOccupation || ''}</span>
            </div>

            <div style={{ borderBottom: '1px dotted #94A3B8', paddingBottom: '2px', marginBottom: '4px' }}>
              <span style={{ fontWeight: 700, color: '#800000' }}>தாயார் பெயர் : திருமதி. </span>
              <span>{profile.family?.motherName || profile.motherName || ''}</span>
            </div>

            <div style={{ borderBottom: '1px dotted #94A3B8', paddingBottom: '2px', marginBottom: '4px' }}>
              <span style={{ fontWeight: 700, color: '#800000' }}>பணி : </span>
              <span>{profile.family?.motherOccupation || ''}</span>
            </div>

            <div style={{ borderBottom: '1px dotted #94A3B8', paddingBottom: '2px', marginBottom: '4px' }}>
              <span style={{ fontWeight: 700, color: '#800000' }}>உடன் பிறப்பு : </span>
              <span>{profile.family?.siblings || profile.siblings || 'Nil'}</span>
            </div>

            <div style={{ borderBottom: '1px dotted #94A3B8', paddingBottom: '2px', marginBottom: '4px' }}>
              <span style={{ fontWeight: 700, color: '#800000' }}>திருமணமானவர்கள் : </span>
              <span>{profile.marriedSiblings || profile.family?.marriedSiblings || 'Nil'}</span>
            </div>

            <div style={{ borderBottom: '1px dotted #94A3B8', paddingBottom: '2px', marginBottom: '4px' }}>
              <span style={{ fontWeight: 700, color: '#800000' }}>வாடகை வீடு / சொந்த வீடு : </span>
              <span>{profile.houseProperty || profile.family?.houseProperty || 'சொந்த வீடு'}</span>
            </div>

            <div style={{ borderBottom: '1px dotted #94A3B8', paddingBottom: '2px', marginBottom: '4px' }}>
              <span style={{ fontWeight: 700, color: '#800000' }}>இருப்பிடம் : </span>
              <strong>{profile.address || `${profile.city}, ${profile.state || 'Tamil Nadu'}`}</strong>
            </div>

            <div style={{ borderBottom: '1px dotted #94A3B8', paddingBottom: '2px', marginBottom: '4px' }}>
              <span style={{ fontWeight: 700, color: '#800000' }}>எதிர்பார்ப்பு / செய்வது : </span>
              <span>{profile.expectation || `${profile.partnerPreferences?.education || 'Degree'}, ${profile.partnerPreferences?.profession || 'Job'}, ${profile.partnerPreferences?.castePreference || 'Open'}`}</span>
            </div>

            <div style={{ borderBottom: '1px dotted #94A3B8', paddingBottom: '2px', marginBottom: '4px' }}>
              <span style={{ fontWeight: 700, color: '#800000' }}>குறிப்பு : </span>
              <span>{profile.notes || profile.about || ''}</span>
            </div>
          </div>

          {/* Right Photo Column Frame */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              border: '2px solid #B91C1C',
              borderRadius: '6px',
              padding: '6px',
              background: '#FFFFFF',
              height: '320px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justify: 'center'
            }}>
              {profile.photo ? (
                <img 
                  src={profile.photo} 
                  alt={profile.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }}
                />
              ) : (
                <div style={{ color: '#94A3B8', fontSize: '0.85rem' }}>புகைப்படம் (Photo)</div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Section: Horoscope Grids & Matching Nakshatras List */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1rem', borderTop: '2px solid #B91C1C', paddingTop: '0.75rem', marginBottom: '1rem' }}>
          
          {/* Horoscope Grids (Rasi & Navamsam) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            
            {/* Rasi Grid Box */}
            <div style={{ border: '1.5px solid #B91C1C', borderRadius: '4px', padding: '4px', background: '#FFFDF9' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gridTemplateRows: 'repeat(4, 30px)',
                gap: '1px',
                background: '#B91C1C',
                border: '1px solid #B91C1C',
                fontSize: '0.65rem',
                textAlign: 'center'
              }}>
                <div style={{ background: '#FFF', padding: '2px' }}>{profile.rasiChart?.[12]?.join(' ') || ''}</div>
                <div style={{ background: '#FFF', padding: '2px' }}>{profile.rasiChart?.[1]?.join(' ') || ''}</div>
                <div style={{ background: '#FFF', padding: '2px' }}>{profile.rasiChart?.[2]?.join(' ') || ''}</div>
                <div style={{ background: '#FFF', padding: '2px' }}>{profile.rasiChart?.[3]?.join(' ') || ''}</div>

                <div style={{ background: '#FFF', padding: '2px' }}>{profile.rasiChart?.[11]?.join(' ') || ''}</div>
                <div style={{ background: '#FFFDF9', gridColumn: 'span 2', gridRow: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#B91C1C', fontSize: '0.85rem' }}>
                  இராசி
                </div>
                <div style={{ background: '#FFF', padding: '2px' }}>{profile.rasiChart?.[4]?.join(' ') || ''}</div>

                <div style={{ background: '#FFF', padding: '2px' }}>{profile.rasiChart?.[10]?.join(' ') || ''}</div>
                <div style={{ background: '#FFF', padding: '2px' }}>{profile.rasiChart?.[5]?.join(' ') || ''}</div>

                <div style={{ background: '#FFF', padding: '2px' }}>{profile.rasiChart?.[9]?.join(' ') || ''}</div>
                <div style={{ background: '#FFF', padding: '2px' }}>{profile.rasiChart?.[8]?.join(' ') || ''}</div>
                <div style={{ background: '#FFF', padding: '2px' }}>{profile.rasiChart?.[7]?.join(' ') || ''}</div>
                <div style={{ background: '#FFF', padding: '2px' }}>{profile.rasiChart?.[6]?.join(' ') || ''}</div>
              </div>
            </div>

            {/* Navamsam Grid Box */}
            <div style={{ border: '1.5px solid #B91C1C', borderRadius: '4px', padding: '4px', background: '#FFFDF9' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gridTemplateRows: 'repeat(4, 30px)',
                gap: '1px',
                background: '#B91C1C',
                border: '1px solid #B91C1C',
                fontSize: '0.65rem',
                textAlign: 'center'
              }}>
                <div style={{ background: '#FFF', padding: '2px' }}></div>
                <div style={{ background: '#FFF', padding: '2px' }}></div>
                <div style={{ background: '#FFF', padding: '2px' }}></div>
                <div style={{ background: '#FFF', padding: '2px' }}></div>

                <div style={{ background: '#FFF', padding: '2px' }}></div>
                <div style={{ background: '#FFFDF9', gridColumn: 'span 2', gridRow: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#B91C1C', fontSize: '0.85rem' }}>
                  நவாம்சம்
                </div>
                <div style={{ background: '#FFF', padding: '2px' }}></div>

                <div style={{ background: '#FFF', padding: '2px' }}></div>
                <div style={{ background: '#FFF', padding: '2px' }}></div>

                <div style={{ background: '#FFF', padding: '2px' }}></div>
                <div style={{ background: '#FFF', padding: '2px' }}></div>
                <div style={{ background: '#FFF', padding: '2px' }}></div>
                <div style={{ background: '#FFF', padding: '2px' }}></div>
              </div>
            </div>

          </div>

          {/* Suitable Nakshatras List */}
          <div style={{ border: '1.5px solid #B91C1C', borderRadius: '4px', padding: '6px', background: '#FFFFFF' }}>
            <div style={{ textAlign: 'center', fontWeight: 800, fontSize: '0.8rem', color: '#B91C1C', marginBottom: '4px', borderBottom: '1px solid #FCA5A5', paddingBottom: '2px' }}>
              பொருந்தும் நட்சத்திரங்கள்
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '2px 6px',
              fontSize: '0.68rem',
              color: '#B91C1C'
            }}>
              {nakshatraList.map(n => (
                <div key={n.id} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>{n.id}. {n.name}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Legal Declaration & Signature Footer */}
        <div style={{ borderTop: '1px solid #CBD5E1', paddingTop: '0.5rem', fontSize: '0.68rem', color: '#334155', lineHeight: '1.4' }}>
          <p style={{ margin: '0 0 1rem 0' }}>
            வரன்களைப் பற்றி விவரங்களைத் தெரிந்துக் கொள்வதும் எங்களின் (பெண் - மாப்பிள்ளை வீட்டாரின்) பொறுப்பாகும். திருமண தகவல் மையம் பொறுப்பல்ல என்றும், மேற்கண்ட விவரங்கள் யாவும் உண்மை என்றும் உறுதியளிக்கிறேன். திருமண தகவல் மையத்தில் விதிமுறைகளை ஏற்று பதிவு செய்கிறேன். எக்காரணத்தைக் கொண்டும் பதிவுக் கட்டணம் திருப்பித் தரப்படமாட்டாது.
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: '#1E293B', padding: '0 1rem' }}>
            <div>கையொப்பம் : ....................................</div>
            <div>இடம் : ....................................</div>
          </div>
        </div>

      </div>
    </div>
  );
}
