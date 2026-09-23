import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import RasiChart from '../components/RasiChart';
import { CASTE_LIST, CITIES_LIST } from '../data/mockProfiles';
import { NAKSHATRAS, RASIS } from '../utils/horoscopeCalculator';
import { CheckCircle2, User, Briefcase, Users, Sparkles, Image, Heart, ArrowRight, ArrowLeft } from 'lucide-react';

export default function ProfileSetupPage({ setActivePage }) {
  const { user, updateFullProfile, language } = useAuth();

  const [activeStep, setActiveStep] = useState(1);

  const [form, setForm] = useState({
    height: "5' 9\" (175 cm)",
    maritalStatus: 'Never Married',
    motherTongue: 'Tamil',
    religion: 'Hindu',
    caste: 'Iyer',
    subcaste: 'Vadama',
    gothram: 'Kashyapa',
    
    education: 'M.S. / B.Tech / MBA',
    institution: 'Anna University / CEG',
    profession: 'Software Engineer / Professional',
    company: 'Tech / MNC',
    annualIncome: '₹18,000,000 / annum',
    city: 'Chennai',
    nativeTown: 'Kanchipuram',
    
    fatherName: 'S. Ramachandran',
    fatherOccupation: 'Government Senior Officer (Retd)',
    motherName: 'Meenakshi',
    motherOccupation: 'Homemaker',
    siblings: '1 Elder Brother (Married)',
    familyType: 'Nuclear Family',
    familyStatus: 'Upper Middle Class',

    rasi: 'Simmam (Leo)',
    nakshatra: 'Magam',
    lagnam: 'Kanni',
    chevvaiDosham: 'No',

    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
    about: 'Educated, family-oriented Tamil professional with modern values and deep respect for culture.',
    
    prefAgeMin: 24,
    prefAgeMax: 30,
    prefCaste: 'Iyer / Open',
    prefLocation: 'Chennai / Tamil Nadu'
  });

  const handleSave = () => {
    updateFullProfile(form);
    alert('🎉 Profile updated successfully!');
    setActivePage('dashboard');
  };

  return (
    <div style={{ padding: '3.5rem 0', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        
        {/* Step Indicator Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="badge badge-gold" style={{ marginBottom: '0.5rem', padding: '0.4rem 1rem' }}>
            <Sparkles size={14} /> COMPLETE YOUR MATRIMONY PROFILE
          </span>
          <h2 style={{ fontSize: '2.2rem', color: 'var(--primary-maroon-dark)', marginBottom: '0.4rem' }}>
            {language === 'ta' ? 'முழுமையான வரன் விவரங்களை நிரப்புக' : 'Full Profile Setup'}
          </h2>
          <p style={{ color: 'var(--text-muted)' }}>
            Complete all sections to enable 100% horoscope match score and high response rates.
          </p>
        </div>

        {/* Wizard Navigation Tabs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: '4px',
          marginBottom: '2rem',
          background: '#F1F5F9',
          padding: '4px',
          borderRadius: 'var(--radius-md)',
          overflowX: 'auto'
        }}>
          {[
            { id: 1, label: 'Personal', icon: User },
            { id: 2, label: 'Career', icon: Briefcase },
            { id: 3, label: 'Family', icon: Users },
            { id: 4, label: 'Horoscope', icon: Sparkles },
            { id: 5, label: 'Photos', icon: Image },
            { id: 6, label: 'Expectations', icon: Heart }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeStep === tab.id;
            return (
              <button 
                key={tab.id}
                onClick={() => setActiveStep(tab.id)}
                style={{
                  padding: '0.65rem 0.4rem',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  background: isActive ? 'var(--maroon-gradient)' : 'transparent',
                  color: isActive ? '#FFF' : 'var(--text-main)',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '3px'
                }}>
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Card Body */}
        <div className="card" style={{ padding: '2.5rem', borderRadius: 'var(--radius-lg)' }}>
          
          {/* Step 1: Personal */}
          {activeStep === 1 && (
            <div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-maroon)', marginBottom: '1.25rem' }}>
                Personal & Community Details
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Height</label>
                  <select 
                    className="form-select"
                    value={form.height}
                    onChange={(e) => setForm({...form, height: e.target.value})}>
                    <option value="5' 2&quot; (157 cm)">5' 2" (157 cm)</option>
                    <option value="5' 4&quot; (163 cm)">5' 4" (163 cm)</option>
                    <option value="5' 6&quot; (168 cm)">5' 6" (168 cm)</option>
                    <option value="5' 8&quot; (173 cm)">5' 8" (173 cm)</option>
                    <option value="5' 10&quot; (178 cm)">5' 10" (178 cm)</option>
                    <option value="6' 0&quot; (183 cm)">6' 0" (183 cm)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Marital Status</label>
                  <select 
                    className="form-select"
                    value={form.maritalStatus}
                    onChange={(e) => setForm({...form, maritalStatus: e.target.value})}>
                    <option value="Never Married">Never Married (மணமாகாதவர்)</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Community / Caste</label>
                  <select 
                    className="form-select"
                    value={form.caste}
                    onChange={(e) => setForm({...form, caste: e.target.value})}>
                    {CASTE_LIST.filter(c => c !== 'All Communities').map((c, i) => (
                      <option key={i} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Subcaste</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={form.subcaste}
                    onChange={(e) => setForm({...form, subcaste: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Gothram</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={form.gothram}
                  onChange={(e) => setForm({...form, gothram: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label className="form-label">About Me (Bio)</label>
                <textarea 
                  rows={4} 
                  className="form-textarea"
                  value={form.about}
                  onChange={(e) => setForm({...form, about: e.target.value})}
                />
              </div>
            </div>
          )}

          {/* Step 2: Education & Career */}
          {activeStep === 2 && (
            <div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-maroon)', marginBottom: '1.25rem' }}>
                Education & Career Details
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Education / Degree</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={form.education}
                    onChange={(e) => setForm({...form, education: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">College / Institution</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={form.institution}
                    onChange={(e) => setForm({...form, institution: e.target.value})}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Profession / Job Title</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={form.profession}
                    onChange={(e) => setForm({...form, profession: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Employer / Company Name</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={form.company}
                    onChange={(e) => setForm({...form, company: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Annual Income</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={form.annualIncome}
                  onChange={(e) => setForm({...form, annualIncome: e.target.value})}
                />
              </div>
            </div>
          )}

          {/* Step 3: Family */}
          {activeStep === 3 && (
            <div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-maroon)', marginBottom: '1.25rem' }}>
                Family Background
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Father's Name & Occupation</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={form.fatherOccupation}
                    onChange={(e) => setForm({...form, fatherOccupation: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Mother's Name & Occupation</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={form.motherOccupation}
                    onChange={(e) => setForm({...form, motherOccupation: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Siblings Details</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={form.siblings}
                  onChange={(e) => setForm({...form, siblings: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Native Town / Village</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={form.nativeTown}
                  onChange={(e) => setForm({...form, nativeTown: e.target.value})}
                />
              </div>
            </div>
          )}

          {/* Step 4: Horoscope & 12 Rasi Chart */}
          {activeStep === 4 && (
            <div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-maroon)', marginBottom: '1.25rem' }}>
                Horoscope & 12-Box Rasi Chart (ஜாதக விவரங்கள்)
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div className="form-group">
                  <label className="form-label">Rasi (ராசி)</label>
                  <select 
                    className="form-select"
                    value={form.rasi}
                    onChange={(e) => setForm({...form, rasi: e.target.value})}>
                    {RASIS.map((r, i) => (
                      <option key={i} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Nakshatra / Star (நட்சத்திரம்)</label>
                  <select 
                    className="form-select"
                    value={form.nakshatra}
                    onChange={(e) => setForm({...form, nakshatra: e.target.value})}>
                    {NAKSHATRAS.map((n, i) => (
                      <option key={i} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <RasiChart rasiName={form.rasi} nakshatra={form.nakshatra} />
              </div>

              <div className="form-group">
                <label className="form-label">Upload Horoscope PDF / Image (Optional)</label>
                <input type="file" className="form-input" accept="image/*,.pdf" />
              </div>
            </div>
          )}

          {/* Step 5: Photos */}
          {activeStep === 5 && (
            <div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-maroon)', marginBottom: '1.25rem' }}>
                Profile Photos & Gallery
              </h3>

              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <div style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  margin: '0 auto 1rem',
                  border: '3px solid var(--border-gold)',
                  boxShadow: 'var(--shadow-md)'
                }}>
                  <img src={form.photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                <div className="form-group" style={{ maxWidth: '400px', margin: '0 auto' }}>
                  <label className="form-label">Photo Image URL</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={form.photo}
                    onChange={(e) => setForm({...form, photo: e.target.value})}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Expectations */}
          {activeStep === 6 && (
            <div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-maroon)', marginBottom: '1.25rem' }}>
                Partner Expectations (எதிர்பார்ப்புகள்)
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Preferred Community / Caste</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={form.prefCaste}
                    onChange={(e) => setForm({...form, prefCaste: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Preferred Location</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={form.prefLocation}
                    onChange={(e) => setForm({...form, prefLocation: e.target.value})}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Wizard Footer Buttons */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '2rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid var(--border-light)'
          }}>
            {activeStep > 1 ? (
              <button 
                type="button" 
                onClick={() => setActiveStep(activeStep - 1)}
                className="btn btn-outline btn-sm">
                <ArrowLeft size={16} /> Back
              </button>
            ) : <div />}

            {activeStep < 6 ? (
              <button 
                type="button" 
                onClick={() => setActiveStep(activeStep + 1)}
                className="btn btn-primary btn-sm">
                <span>Next Step</span>
                <ArrowRight size={16} />
              </button>
            ) : (
              <button 
                type="button" 
                onClick={handleSave}
                className="btn btn-gold btn-lg">
                <CheckCircle2 size={18} />
                <span>Save Profile & View Dashboard →</span>
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
