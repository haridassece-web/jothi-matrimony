'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import RasiChart from '../../components/RasiChart';
import { CASTE_LIST, SUBCASTE_MAP, HEIGHT_LIST, RELIGION_LIST, EDUCATION_LIST, PROFESSION_LIST, INCOME_LIST } from '@jothi-matrimony/shared';
import { NAKSHATRAS, RASIS, LAGNAMS } from '@jothi-matrimony/shared';
import { CheckCircle2, User, Briefcase, Users, Sparkles, Image as ImageIcon, Heart, ArrowRight, ArrowLeft, Upload, Trash2, Plus, Star } from 'lucide-react';

export default function ProfileSetupPage() {
  const router = useRouter();
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
    address: 'No. 14, 2nd Cross Street, Mylapore, Chennai - 600004',
    houseProperty: 'Own House (சொந்த வீடு)',
    
    fatherName: 'S. Ramachandran',
    fatherOccupation: 'Government Senior Officer (Retd)',
    motherName: 'Meenakshi',
    motherOccupation: 'Homemaker',
    siblings: '1 Elder Brother (Married)',
    familyType: 'Nuclear Family',
    familyStatus: 'Upper Middle Class',

    rasi: 'Simmam (Leo)',
    nakshatra: 'Magam',
    lagnam: 'Kanni (Virgo)',
    chevvaiDosham: 'No',

    photo: user?.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
    photos: Array.isArray(user?.photos) && user.photos.length > 0 
      ? user.photos 
      : Array.isArray(user?.gallery) && user.gallery.length > 0 
        ? user.gallery 
        : [user?.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600'],
    about: 'Educated, family-oriented Tamil professional with modern values and deep respect for culture.',
    
    prefAgeMin: 24,
    prefAgeMax: 30,
    prefCaste: 'Iyer / Open',
    prefLocation: 'Chennai / Tamil Nadu'
  });

  const handlePhotoFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const currentPhotos = form.photos && form.photos.length ? form.photos : [form.photo || ''];
    const remainingSlots = 10 - currentPhotos.length;
    if (remainingSlots <= 0) {
      alert('⚠️ Maximum 10 photos limit reached! Please remove an existing photo to upload new ones.');
      return;
    }

    const filesToUpload = files.slice(0, remainingSlots);
    let loadedCount = 0;
    const newBase64Photos = [];

    filesToUpload.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          newBase64Photos.push(event.target.result);
        }
        loadedCount++;
        if (loadedCount === filesToUpload.length) {
          const updatedPhotos = [...currentPhotos, ...newBase64Photos].slice(0, 10);
          setForm(prev => ({
            ...prev,
            photos: updatedPhotos,
            photo: updatedPhotos[0] || prev.photo
          }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleAddPhotoUrl = () => {
    const currentPhotos = form.photos && form.photos.length ? form.photos : [form.photo || ''];
    if (currentPhotos.length >= 10) {
      alert('⚠️ Maximum 10 photos limit reached!');
      return;
    }
    const url = prompt('Enter image URL (e.g. https://...):');
    if (url && url.trim()) {
      const updatedPhotos = [...currentPhotos, url.trim()].slice(0, 10);
      setForm(prev => ({
        ...prev,
        photos: updatedPhotos,
        photo: updatedPhotos[0] || prev.photo
      }));
    }
  };

  const handleRemovePhoto = (index) => {
    const currentPhotos = form.photos && form.photos.length ? form.photos : [form.photo || ''];
    if (currentPhotos.length <= 1) {
      alert('⚠️ Profile must have at least 1 photo!');
      return;
    }
    const updatedPhotos = currentPhotos.filter((_, i) => i !== index);
    setForm(prev => ({
      ...prev,
      photos: updatedPhotos,
      photo: updatedPhotos[0] || ''
    }));
  };

  const handleSetPrimaryPhoto = (index) => {
    const currentPhotos = [...(form.photos || [form.photo || ''])];
    if (index === 0) return;
    const selected = currentPhotos.splice(index, 1)[0];
    currentPhotos.unshift(selected);
    setForm(prev => ({
      ...prev,
      photos: currentPhotos,
      photo: currentPhotos[0]
    }));
  };

  const handleSave = () => {
    updateFullProfile(form);
    alert('🎉 Profile updated successfully!');
    router.push('/dashboard');
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
            { id: 5, label: 'Photos', icon: ImageIcon },
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
                    {HEIGHT_LIST.map((h, i) => (
                      <option key={i} value={h}>{h}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Religion (மதம்)</label>
                  <select 
                    className="form-select"
                    value={form.religion}
                    onChange={(e) => setForm({...form, religion: e.target.value})}>
                    {RELIGION_LIST.filter(r => r !== 'All Religions').map((r, i) => (
                      <option key={i} value={r}>{r}</option>
                    ))}
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
                    onChange={(e) => {
                      const newCaste = e.target.value;
                      const subOpt = SUBCASTE_MAP[newCaste]?.[0] || '';
                      setForm({...form, caste: newCaste, subcaste: subOpt});
                    }}>
                    {CASTE_LIST.filter(c => c !== 'All Communities').map((c, i) => (
                      <option key={i} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Subcaste (உட்பிரிவு)</label>
                  <select 
                    className="form-select"
                    value={form.subcaste}
                    onChange={(e) => setForm({...form, subcaste: e.target.value})}>
                    <option value="">Select Subcaste...</option>
                    {(SUBCASTE_MAP[form.caste] || []).map((sc, i) => (
                      <option key={i} value={sc}>{sc}</option>
                    ))}
                    <option value="Other / Not Specified">Other / Not Specified</option>
                  </select>
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

          {activeStep === 2 && (
            <div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-maroon)', marginBottom: '1.25rem' }}>
                Education & Career Details
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Education / Qualification (8th Std to Ph.D.)</label>
                  <select 
                    className="form-select" 
                    value={form.education}
                    onChange={(e) => setForm({...form, education: e.target.value})}>
                    <option value="">Select Qualification...</option>
                    {EDUCATION_LIST.map((edu, i) => (
                      <option key={i} value={edu}>{edu}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">College / Institution</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. Anna University, Madras University..."
                    value={form.institution}
                    onChange={(e) => setForm({...form, institution: e.target.value})}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Profession / Career Field</label>
                  <select 
                    className="form-select" 
                    value={form.profession}
                    onChange={(e) => setForm({...form, profession: e.target.value})}>
                    <option value="">Select Profession...</option>
                    {PROFESSION_LIST.map((prof, i) => (
                      <option key={i} value={prof}>{prof}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Employer / Company Name</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. TCS, Govt Sector, Self..."
                    value={form.company}
                    onChange={(e) => setForm({...form, company: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Annual Income / Salary Range</label>
                <select 
                  className="form-select" 
                  value={form.annualIncome}
                  onChange={(e) => setForm({...form, annualIncome: e.target.value})}>
                  <option value="">Select Annual Income...</option>
                  {INCOME_LIST.map((inc, i) => (
                    <option key={i} value={inc}>{inc}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

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

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Native Town / Village (சொந்த ஊர் / கிராமம்)</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. Kanchipuram / Thanjavur / Village..."
                    value={form.nativeTown}
                    onChange={(e) => setForm({...form, nativeTown: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">House Property (வீட்டு வசதி)</label>
                  <select 
                    className="form-select"
                    value={form.houseProperty}
                    onChange={(e) => setForm({...form, houseProperty: e.target.value})}>
                    <option value="Own House (சொந்த வீடு)">Own House (சொந்த வீடு)</option>
                    <option value="Rented House (வாடகை வீடு)">Rented House (வாடகை வீடு)</option>
                    <option value="Lease / Company Quarter">Lease / Company Quarter</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Current Residential Address (தற்போதைய இருப்பிடம் / முகவரி)</label>
                <textarea 
                  rows={3} 
                  className="form-textarea"
                  placeholder="Door No, Street Name, Landmark, City, Pincode..."
                  value={form.address}
                  onChange={(e) => setForm({...form, address: e.target.value})}
                />
              </div>
            </div>
          )}

          {activeStep === 4 && (
            <div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-maroon)', marginBottom: '1.25rem' }}>
                Birth & Horoscope Details (பிறந்த விவரங்கள் & ஜாதகம்)
              </h3>

              {/* DOB, TOB, Place of Birth */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                <div className="form-group">
                  <label className="form-label">Date of Birth (பிறந்த தேதி)</label>
                  <input 
                    type="date" 
                    className="form-input" 
                    value={form.dob || ''} 
                    onChange={(e) => setForm({...form, dob: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Time of Birth / TOB (பிறந்த நேரம்)</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. 08:30 AM / 14:45"
                    value={form.birthTime || ''} 
                    onChange={(e) => setForm({...form, birthTime: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Place of Birth (பிறந்த இடம்)</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. Chennai / Madurai"
                    value={form.birthPlace || ''} 
                    onChange={(e) => setForm({...form, birthPlace: e.target.value})}
                  />
                </div>
              </div>

              {/* Rasi, Nakshatram, Lagnam */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
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

                <div className="form-group">
                  <label className="form-label">Lagnam / Lakanam (லக்னம்)</label>
                  <select 
                    className="form-select"
                    value={form.lagnam || 'Kanni (Virgo)'}
                    onChange={(e) => setForm({...form, lagnam: e.target.value})}>
                    {LAGNAMS.map((l, i) => (
                      <option key={i} value={l}>{l}</option>
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

          {activeStep === 5 && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem', borderBottom: '2px solid var(--border-gold)', paddingBottom: '0.75rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-maroon)', margin: 0 }}>
                    Profile Photos & Gallery (புகைப்படங்கள் - 10 வரை)
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0.25rem 0 0' }}>
                    Upload up to 10 photos from your device or paste image URLs. Photo 1 is your Main Profile Picture.
                  </p>
                </div>
                <div className="badge badge-gold" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>
                  📸 {(form.photos || []).length} / 10 Photos Uploaded
                </div>
              </div>

              {/* Upload Controls Bar */}
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem', background: '#FFFDF9', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1.5px dashed var(--border-gold)' }}>
                <label className="btn btn-primary" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Upload size={18} />
                  <span>Upload Photos from Device (Max 10)</span>
                  <input 
                    type="file" 
                    multiple 
                    accept="image/*" 
                    onChange={handlePhotoFileUpload} 
                    style={{ display: 'none' }} 
                  />
                </label>

                <button 
                  type="button"
                  onClick={handleAddPhotoUrl}
                  className="btn btn-outline"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Plus size={18} />
                  <span>Add Photo via Image URL</span>
                </button>
              </div>

              {/* 10 Photo Slots Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                {Array.from({ length: 10 }).map((_, index) => {
                  const photoUrl = (form.photos || [])[index];
                  const isPrimary = index === 0;

                  return (
                    <div 
                      key={index}
                      style={{
                        position: 'relative',
                        height: '160px',
                        borderRadius: 'var(--radius-md)',
                        overflow: 'hidden',
                        border: isPrimary ? '3px solid var(--gold-dark)' : '1.5px solid var(--border-gold)',
                        background: '#F8FAFC',
                        boxShadow: isPrimary ? 'var(--shadow-md)' : 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                      
                      {photoUrl ? (
                        <>
                          <img 
                            src={photoUrl} 
                            alt={`Photo ${index + 1}`} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                          />
                          
                          {/* Slot Tag */}
                          <div style={{
                            position: 'absolute',
                            top: '4px',
                            left: '4px',
                            background: isPrimary ? 'var(--primary-maroon)' : 'rgba(0,0,0,0.65)',
                            color: '#FFF',
                            fontSize: '0.68rem',
                            fontWeight: 700,
                            padding: '2px 6px',
                            borderRadius: '4px'
                          }}>
                            {isPrimary ? '⭐ Main' : `#${index + 1}`}
                          </div>

                          {/* Hover / Overlay Action Bar */}
                          <div style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            background: 'rgba(0,0,0,0.75)',
                            display: 'flex',
                            justify: 'space-around',
                            alignItems: 'center',
                            padding: '4px'
                          }}>
                            {!isPrimary && (
                              <button 
                                type="button"
                                title="Make Main Profile Picture"
                                onClick={() => handleSetPrimaryPhoto(index)}
                                style={{ background: 'none', border: 'none', color: '#FFD700', cursor: 'pointer', padding: '2px' }}>
                                <Star size={14} fill="#FFD700" />
                              </button>
                            )}
                            <button 
                              type="button"
                              title="Delete Photo"
                              onClick={() => handleRemovePhoto(index)}
                              style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '2px' }}>
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </>
                      ) : (
                        <label style={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          color: 'var(--text-muted)',
                          gap: '6px',
                          padding: '0.5rem',
                          textAlign: 'center'
                        }}>
                          <Plus size={22} style={{ color: 'var(--gold-dark)' }} />
                          <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>
                            Add Slot #{index + 1}
                          </span>
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handlePhotoFileUpload} 
                            style={{ display: 'none' }} 
                          />
                        </label>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

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
