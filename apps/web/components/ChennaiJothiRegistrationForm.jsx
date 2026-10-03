import React from 'react';
import { Printer, Download, Sparkles, CheckCircle2 } from 'lucide-react';

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
        <button onClick={handlePrint} className="btn btn-maroon btn-sm">
          <Printer size={16} /> Print Registration Form (அச்சு)
        </button>
      </div>

      {/* Printable Sheet Container */}
      <div id="registration-sheet" style={{
        background: '#FFFFFF',
        border: '3px solid #0056B3',
        borderRadius: '8px',
        padding: '1.25rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        color: '#1E293B',
        position: 'relative'
      }}>
        
        {/* Header Title Banner */}
        <div style={{
          border: '2px solid #0056B3',
          borderRadius: '6px',
          padding: '0.75rem 1rem',
          textAlign: 'center',
          background: 'linear-gradient(180deg, #FFFFFF 0%, #F0F7FF 100%)',
          marginBottom: '1rem',
          position: 'relative'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
            {/* Lord Venkateswara / Temple Emblem */}
            <div style={{ width: '70px', height: '80px', borderRadius: '4px', overflow: 'hidden', border: '1px solid #CBD5E1' }}>
              <img 
                src="https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&q=80&w=200" 
                alt="Temple Icon" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>

            {/* Main Header Text */}
            <div style={{ flex: 1, textAlign: 'center' }}>
              <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#800000', margin: '0 0 2px 0', letterSpacing: '0.5px' }}>
                சென்னை ஜோதி திருமண தகவல் மையம்
              </h2>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0056B3', margin: '0 0 4px 0', letterSpacing: '1px' }}>
                CHENNAI JOTHI MATRIMONY
              </h3>
              <div style={{ fontSize: '0.78rem', color: '#334155', fontWeight: 600 }}>
                THE GROUP OF THE ARUTPER RELIGION TRUST,
              </div>
              <div style={{ fontSize: '0.75rem', color: '#475569' }}>
                No. 13/7, MUTHUKALATHI STREET, TRIPLICANE, CHENNAI - 600 005.
              </div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1E293B', marginTop: '2px' }}>
                ORGANIZER DR. CHANDRA BABU, REGD-332/2008.
              </div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#800000', marginTop: '2px' }}>
                CELL : 90437 73977 / 94449 34527 / 044 - 47898399
              </div>
            </div>

            {/* Saint Arutper / Vallalar Emblem */}
            <div style={{ width: '70px', height: '80px', borderRadius: '4px', overflow: 'hidden', border: '1px solid #CBD5E1' }}>
              <img 
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=200" 
                alt="Arutper Icon" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>
          </div>
        </div>

        {/* Sub Header Ribbon */}
        <div style={{
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          borderBottom: '2px dashed #0056B3',
          paddingBottom: '0.5rem',
          marginBottom: '1rem',
          fontSize: '0.85rem',
          fontWeight: 700
        }}>
          <div>
            அமைப்பாளர். <span style={{ color: '#800000' }}>Dr. சந்திரபாபு சித்தா</span> | 📞 94449 34527 / 90437 73977
          </div>
          <div style={{ background: '#FFFBEB', border: '1px solid #FCD34D', padding: '2px 8px', borderRadius: '4px', color: '#92400E' }}>
            VIP - Family Pay : <strong>90437 73977</strong>
          </div>
        </div>

        {/* Form Body Layout: Left Details Table & Right Photo */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 240px', gap: '1.25rem', marginBottom: '1.25rem' }}>
          
          {/* Details Table */}
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem', lineHeight: '1.6' }}>
            <tbody>
              <tr>
                <td style={{ width: '140px', fontWeight: 700, color: '#800000' }}>பதிவு எண் (Reg No.) :</td>
                <td><strong style={{ fontSize: '1rem', color: '#0056B3' }}>{profile.regNo || profile.id}</strong></td>
                <td style={{ width: '80px', fontWeight: 700, color: '#800000' }}>இனம் :</td>
                <td><strong>{profile.caste || profile.subcaste || 'VIP'}</strong></td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, color: '#800000' }}>பெயர் (Name) :</td>
                <td colSpan={3}><strong style={{ fontSize: '0.98rem' }}>{profile.name}</strong></td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, color: '#800000' }}>கல்வி (Education) :</td>
                <td colSpan={3}>{profile.education}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, color: '#800000' }}>பிறந்த தேதி, நேரம் :</td>
                <td colSpan={3}>{profile.dob} {profile.birthTime ? `(${profile.birthTime})` : ''}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, color: '#800000' }}>பிறந்த ஊர், வரிசை :</td>
                <td colSpan={3}>{profile.birthPlace || profile.nativeTown} {profile.siblingPosition ? `[${profile.siblingPosition}]` : ''}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, color: '#800000' }}>நிறம், உயரம் :</td>
                <td colSpan={3}>{profile.complexion || 'Fair'} / {profile.height}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, color: '#800000' }}>நட்சத்திரம், ராசி :</td>
                <td colSpan={3}><strong>{profile.nakshatra}</strong> ({profile.padam || '1'} ஆம் பாதம்), <strong>{profile.rasi}</strong></td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, color: '#800000' }}>பணி (Occupation) :</td>
                <td colSpan={3}>{profile.profession} {profile.company ? `(${profile.company})` : ''}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, color: '#800000' }}>மாத வருமானம் ரூ. :</td>
                <td colSpan={3}><strong>{profile.monthlyIncome || profile.annualIncome}</strong></td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, color: '#800000' }}>தந்தை பெயர் :</td>
                <td colSpan={3}>திரு. {profile.family?.fatherName} {profile.family?.fatherOccupation ? `(${profile.family.fatherOccupation})` : ''}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, color: '#800000' }}>தாயார் பெயர் :</td>
                <td colSpan={3}>திருமதி. {profile.family?.motherName} {profile.family?.motherOccupation ? `(${profile.family.motherOccupation})` : ''}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, color: '#800000' }}>உடன் பிறப்பு :</td>
                <td colSpan={3}>{profile.family?.siblings || 'Nil'}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, color: '#800000' }}>சொந்த / வாடகை வீடு :</td>
                <td colSpan={3}>{profile.family?.houseProperty || 'சொந்த வீடு'}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, color: '#800000' }}>இருப்பிடம் (Address) :</td>
                <td colSpan={3}>{profile.address || `${profile.city}, ${profile.state || 'Tamil Nadu'}`}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, color: '#800000' }}>எதிர்பார்ப்பு :</td>
                <td colSpan={3}>{profile.partnerPreferences?.education || profile.about}</td>
              </tr>
            </tbody>
          </table>

          {/* Photo Frame Column */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              border: '2px solid #0056B3',
              borderRadius: '6px',
              padding: '6px',
              background: '#F8FAFC',
              height: '280px',
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
            <div style={{ marginTop: '0.5rem', fontSize: '0.78rem', color: '#0056B3', fontWeight: 700 }}>
              உறுதி செய்யப்பட்ட வரன் 🔒
            </div>
          </div>
        </div>

        {/* Bottom Section: Horoscope Grids & Matching Nakshatras */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1rem', borderTop: '2px solid #CBD5E1', paddingTop: '1rem' }}>
          
          {/* Horoscope Grids (Rasi & Navamsam) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            
            {/* Rasi Box */}
            <div style={{ border: '1.5px solid #0056B3', borderRadius: '4px', padding: '4px', background: '#FFFDF9' }}>
              <div style={{ textAlign: 'center', fontWeight: 800, fontSize: '0.8rem', color: '#800000', marginBottom: '4px' }}>
                ராசி
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gridTemplateRows: 'repeat(4, 32px)',
                gap: '1px',
                background: '#0056B3',
                border: '1px solid #0056B3',
                fontSize: '0.65rem',
                textAlign: 'center'
              }}>
                {/* 12 South Indian chart cells */}
                <div style={{ background: '#FFF', padding: '2px' }}>{profile.rasiChart?.[12]?.join(' ') || ''}</div>
                <div style={{ background: '#FFF', padding: '2px' }}>{profile.rasiChart?.[1]?.join(' ') || ''}</div>
                <div style={{ background: '#FFF', padding: '2px' }}>{profile.rasiChart?.[2]?.join(' ') || ''}</div>
                <div style={{ background: '#FFF', padding: '2px' }}>{profile.rasiChart?.[3]?.join(' ') || ''}</div>

                <div style={{ background: '#FFF', padding: '2px' }}>{profile.rasiChart?.[11]?.join(' ') || ''}</div>
                <div style={{ background: '#F1F5F9', gridColumn: 'span 2', gridRow: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#800000' }}>
                  ராசி
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

            {/* Navamsam Box */}
            <div style={{ border: '1.5px solid #0056B3', borderRadius: '4px', padding: '4px', background: '#FFFDF9' }}>
              <div style={{ textAlign: 'center', fontWeight: 800, fontSize: '0.8rem', color: '#800000', marginBottom: '4px' }}>
                நவாம்சம்
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gridTemplateRows: 'repeat(4, 32px)',
                gap: '1px',
                background: '#0056B3',
                border: '1px solid #0056B3',
                fontSize: '0.65rem',
                textAlign: 'center'
              }}>
                <div style={{ background: '#FFF', padding: '2px' }}></div>
                <div style={{ background: '#FFF', padding: '2px' }}></div>
                <div style={{ background: '#FFF', padding: '2px' }}></div>
                <div style={{ background: '#FFF', padding: '2px' }}></div>

                <div style={{ background: '#FFF', padding: '2px' }}></div>
                <div style={{ background: '#F1F5F9', gridColumn: 'span 2', gridRow: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#800000' }}>
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

          {/* Suitable Nakshatras 27 Checklist */}
          <div style={{ border: '1.5px solid #0056B3', borderRadius: '4px', padding: '6px', background: '#F8FAFC' }}>
            <div style={{ textAlign: 'center', fontWeight: 800, fontSize: '0.78rem', color: '#0056B3', marginBottom: '4px' }}>
              பொருந்தும் நட்சத்திரங்கள்
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '2px 8px',
              fontSize: '0.68rem',
              height: '140px',
              overflowY: 'auto'
            }}>
              {nakshatraList.map(n => (
                <div key={n.id} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <input type="checkbox" readOnly checked={n.id % 2 === 0} style={{ margin: 0, width: '10px', height: '10px' }} />
                  <span>{n.id}. {n.name}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
