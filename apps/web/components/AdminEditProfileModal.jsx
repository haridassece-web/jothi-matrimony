'use client';

import React, { useState, useEffect } from 'react';
import { 
  CASTE_LIST, SUBCASTE_MAP, HEIGHT_LIST, RELIGION_LIST, 
  EDUCATION_LIST, PROFESSION_LIST, INCOME_LIST,
  NAKSHATRAS, RASIS, LAGNAMS, calculateThirukanithamHoroscope, 
  getDisplayRegNo 
} from '@jothi-matrimony/shared';
import { 
  X, Save, User, MapPin, Briefcase, Users, Sparkles, 
  ShieldCheck, Check, Upload
} from 'lucide-react';

export default function AdminEditProfileModal({ profile, onClose, onSave }) {
  if (!profile) return null;

  const [activeTab, setActiveTab] = useState('basic');
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const createInitialForm = (p) => ({
    id: p?.id || '',
    regNo: p?.regNo || getDisplayRegNo(p),
    name: p?.name || '',
    gender: p?.gender || 'Male',
    dob: p?.dob || '1995-05-15',
    birthTime: p?.birthTime || '07:30 AM',
    birthPlace: p?.birthPlace || p?.city || 'Chennai',
    age: p?.age || 29,
    maritalStatus: p?.maritalStatus || 'Never Married',
    motherTongue: p?.motherTongue || 'Tamil',
    religion: p?.religion || 'Hindu',
    height: p?.height || "5' 8\" (173 cm)",

    // Contact & Location
    mobile: p?.mobile || p?.phone || '',
    phone: p?.phone || p?.mobile || '',
    email: p?.email || '',
    city: p?.city || 'Chennai',
    nativeTown: p?.nativeTown || p?.city || 'Chennai',
    address: p?.address || '',
    houseProperty: p?.houseProperty || 'Own House (சொந்த வீடு)',

    // Caste & Horoscope
    caste: p?.caste || 'Iyer',
    subcaste: p?.subcaste || '',
    gothram: p?.gothram || '',
    rasi: p?.rasi || 'Mesham (Aries)',
    nakshatra: p?.nakshatra || 'Ashwini',
    lagnam: p?.lagnam || 'Mesham (Aries)',
    chevvaiDosham: p?.chevvaiDosham || 'No',
    rasiChart: p?.rasiChart || null,
    navamsamChart: p?.navamsamChart || null,

    // Education & Career
    education: p?.education || 'B.Tech / Graduate',
    institution: p?.institution || '',
    profession: p?.profession || 'Software Engineer',
    company: p?.company || '',
    annualIncome: p?.annualIncome || '₹12,00,000 / annum',

    // Family
    fatherName: p?.fatherName || p?.family?.fatherName || '',
    fatherOccupation: p?.fatherOccupation || p?.family?.fatherOccupation || 'Government / Private Employee',
    motherName: p?.motherName || p?.family?.motherName || '',
    motherOccupation: p?.motherOccupation || p?.family?.motherOccupation || 'Homemaker',
    siblings: p?.siblings || p?.family?.siblings || '1 Brother',
    familyType: p?.familyType || p?.family?.familyType || 'Nuclear Family',
    familyStatus: p?.familyStatus || p?.family?.familyStatus || 'Upper Middle Class',

    // Status & Photos
    photo: p?.photo || '',
    photos: Array.isArray(p?.photos) && p.photos.length > 0 
      ? p.photos 
      : [p?.photo || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600'],
    about: p?.about || '',
    verified: p?.verified !== false && p?.isVerified !== false,
    paymentStatus: p?.paymentStatus || 'PAID',
    membershipStatus: p?.membershipStatus || 'Active Paid Member'
  });

  const [form, setForm] = useState(() => createInitialForm(profile));

  useEffect(() => {
    if (profile) {
      setForm(createInitialForm(profile));
    }
  }, [profile]);

  // Calculate age when DOB changes
  const handleDobChange = (e) => {
    const val = e.target.value;
    let computedAge = form.age;
    if (val) {
      const birthYear = new Date(val).getFullYear();
      if (!isNaN(birthYear)) {
        computedAge = Math.max(18, new Date().getFullYear() - birthYear);
      }
    }
    setForm(prev => ({
      ...prev,
      dob: val,
      age: computedAge
    }));
  };

  // Auto-calculate Horoscope using Thirukanitham
  const handleAutoCalculateHoroscope = () => {
    if (!form.dob) {
      alert('Please enter Date of Birth first to calculate horoscope.');
      return;
    }
    try {
      const res = calculateThirukanithamHoroscope({
        dob: form.dob,
        birthTime: form.birthTime || '06:00 AM',
        birthPlace: form.birthPlace || form.city || 'Chennai'
      });
      if (res) {
        setForm(prev => ({
          ...prev,
          rasi: res.rasi || prev.rasi,
          nakshatra: res.nakshatra || prev.nakshatra,
          lagnam: res.lagnam || prev.lagnam,
          rasiChart: res.rasiChart || prev.rasiChart,
          navamsamChart: res.navamsamChart || prev.navamsamChart
        }));
        alert(`✨ Horoscope Computed: Rasi: ${res.rasi}, Nakshatra: ${res.nakshatra}, Lagnam: ${res.lagnam}`);
      }
    } catch (e) {
      alert('Could not compute horoscope automatically. You can choose manually from the dropdowns.');
    }
  };

  // Photo file upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const newPhoto = event.target.result;
          setForm(prev => ({
            ...prev,
            photo: newPhoto,
            photos: [newPhoto, ...(prev.photos || []).filter(p => p !== newPhoto)]
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit edits
  const handleSave = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    if (!form.name || !form.name.trim()) {
      alert('Please enter the profile Name before saving.');
      setActiveTab('basic');
      return;
    }

    setIsSaving(true);
    setSuccessMsg('');

    const updatedProfile = {
      ...profile,
      ...form,
      name: form.name.trim(),
      phone: form.mobile || form.phone,
      mobile: form.mobile || form.phone,
      isVerified: form.verified,
      verified: form.verified,
      family: {
        ...(profile.family || {}),
        fatherName: form.fatherName,
        fatherOccupation: form.fatherOccupation,
        motherName: form.motherName,
        motherOccupation: form.motherOccupation,
        siblings: form.siblings,
        familyType: form.familyType,
        familyStatus: form.familyStatus
      }
    };

    try {
      if (onSave) {
        await onSave(updatedProfile);
      }
      setSuccessMsg('✅ Profile updated and saved successfully!');
      setTimeout(() => {
        if (onClose) onClose();
      }, 700);
    } catch (err) {
      console.error('Failed to save profile:', err);
      alert('Error updating profile: ' + (err.message || 'Please try again.'));
    } finally {
      setIsSaving(false);
    }
  };

  const availableSubcastes = (form.caste && SUBCASTE_MAP[form.caste]) ? SUBCASTE_MAP[form.caste] : [];

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(15, 23, 42, 0.85)',
      backdropFilter: 'blur(6px)',
      zIndex: 10000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      overflowY: 'auto'
    }}>
      <div style={{
        background: '#FFF',
        borderRadius: '16px',
        maxWidth: '960px',
        width: '100%',
        maxHeight: '92vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
        overflow: 'hidden',
        border: '2px solid var(--gold-dark, #D4AF37)'
      }}>
        
        {/* Modal Header */}
        <div style={{
          background: 'linear-gradient(135deg, #7A0C2E 0%, #4A061B 100%)',
          color: '#FFF',
          padding: '1.25rem 1.75rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '2px solid #FFD700',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ background: '#FFD700', color: '#1A0D03', padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 800 }}>
                👑 MASTER ADMIN EDIT ACCESS
              </span>
              <span style={{ fontSize: '0.85rem', color: '#F8FAFC', fontWeight: 600 }}>
                ID: {form.regNo || form.id}
              </span>
            </div>
            <h2 style={{ fontSize: '1.4rem', margin: '0.3rem 0 0 0', fontWeight: 800, color: '#FFF' }}>
              Editing: {form.name || 'Member'}
            </h2>
          </div>

          <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              style={{
                background: '#FFD700',
                color: '#1A0D03',
                border: 'none',
                borderRadius: '8px',
                padding: '6px 14px',
                fontWeight: 800,
                fontSize: '0.88rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
              }}>
              <Save size={15} />
              <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
            </button>

            <button 
              type="button"
              onClick={onClose}
              style={{
                background: 'rgba(255,255,255,0.15)',
                border: 'none',
                color: '#FFF',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Tab Buttons */}
        <div style={{
          display: 'flex',
          gap: '4px',
          background: '#F1F5F9',
          padding: '8px 16px',
          borderBottom: '1px solid #E2E8F0',
          overflowX: 'auto',
          flexShrink: 0
        }}>
          {[
            { id: 'basic', label: 'Basic Info', icon: User },
            { id: 'contact', label: 'Contact & Location', icon: MapPin },
            { id: 'horoscope', label: 'Caste & Horoscope', icon: Sparkles },
            { id: 'career', label: 'Education & Career', icon: Briefcase },
            { id: 'family', label: 'Family Details', icon: Users },
            { id: 'status', label: 'Photos & Status', icon: ShieldCheck }
          ].map(tab => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 14px',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  background: isSelected ? 'var(--primary-maroon, #7A0C2E)' : 'transparent',
                  color: isSelected ? '#FFF' : 'var(--text-main, #334155)',
                  boxShadow: isSelected ? '0 2px 6px rgba(122, 12, 46, 0.25)' : 'none',
                  transition: 'all 0.15s ease'
                }}>
                <Icon size={15} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Form Body - Scrollable */}
        <form onSubmit={handleSave} style={{ overflowY: 'auto', padding: '1.75rem', flex: 1 }}>
          
          {successMsg && (
            <div style={{
              background: '#DCFCE7',
              border: '1px solid #86EFAC',
              color: '#166534',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: 700
            }}>
              <Check size={18} /> {successMsg}
            </div>
          )}

          {/* TAB 1: BASIC INFO */}
          {activeTab === 'basic' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 700 }}>Full Name (பெயர்) *</label>
                <input 
                  type="text" 
                  className="form-input"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 700 }}>Gender (பாலினம்)</label>
                <select 
                  className="form-select"
                  value={form.gender}
                  onChange={(e) => setForm({ ...form, gender: e.target.value })}>
                  <option value="Male">Male (மணமகன்)</option>
                  <option value="Female">Female (மணமகள்)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 700 }}>Date of Birth (பிறந்த தேதி)</label>
                <input 
                  type="date" 
                  className="form-input"
                  value={form.dob}
                  onChange={handleDobChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 700 }}>Age (வயது)</label>
                <input 
                  type="number" 
                  className="form-input"
                  value={form.age}
                  onChange={(e) => setForm({ ...form, age: parseInt(e.target.value) || 25 })}
                  min={18}
                  max={80}
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 700 }}>Marital Status (திருமண நிலை)</label>
                <select 
                  className="form-select"
                  value={form.maritalStatus}
                  onChange={(e) => setForm({ ...form, maritalStatus: e.target.value })}>
                  <option value="Never Married">Never Married</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                  <option value="Awaiting Divorce">Awaiting Divorce</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 700 }}>Height (உயரம்)</label>
                <select 
                  className="form-select"
                  value={form.height}
                  onChange={(e) => setForm({ ...form, height: e.target.value })}>
                  {HEIGHT_LIST.map((h, i) => (
                    <option key={i} value={h}>{h}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 700 }}>Mother Tongue (தாய்மொழி)</label>
                <select 
                  className="form-select"
                  value={form.motherTongue}
                  onChange={(e) => setForm({ ...form, motherTongue: e.target.value })}>
                  <option value="Tamil">Tamil (தமிழ்)</option>
                  <option value="Telugu">Telugu (தெலுங்கு)</option>
                  <option value="Malayalam">Malayalam (மலையாளம்)</option>
                  <option value="Kannada">Kannada (கன்னடம்)</option>
                  <option value="Hindi">Hindi (இந்தி)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 700 }}>Religion (மதம்)</label>
                <select 
                  className="form-select"
                  value={form.religion}
                  onChange={(e) => setForm({ ...form, religion: e.target.value })}>
                  {RELIGION_LIST.map((r, i) => (
                    <option key={i} value={r}>{r}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* TAB 2: CONTACT & LOCATION */}
          {activeTab === 'contact' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 700 }}>Mobile / Phone Number</label>
                <input 
                  type="text" 
                  className="form-input"
                  value={form.mobile}
                  onChange={(e) => setForm({ ...form, mobile: e.target.value, phone: e.target.value })}
                  placeholder="+91 98400 12345"
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 700 }}>Email Address</label>
                <input 
                  type="email" 
                  className="form-input"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="member@gmail.com"
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 700 }}>Living City (வசிக்கும் நகரம்)</label>
                <input 
                  type="text" 
                  className="form-input"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  placeholder="Chennai"
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 700 }}>Native Town / Place (சொந்த ஊர்)</label>
                <input 
                  type="text" 
                  className="form-input"
                  value={form.nativeTown}
                  onChange={(e) => setForm({ ...form, nativeTown: e.target.value })}
                  placeholder="Kanchipuram, Madurai, etc."
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 700 }}>House Property (வீட்டு வசதி)</label>
                <select 
                  className="form-select"
                  value={form.houseProperty}
                  onChange={(e) => setForm({ ...form, houseProperty: e.target.value })}>
                  <option value="Own House (சொந்த வீடு)">Own House (சொந்த வீடு)</option>
                  <option value="Rented House (வாடகை வீடு)">Rented House (வாடகை வீடு)</option>
                  <option value="Own House & Plots (சொந்த வீடு & நிலங்கள்)">Own House & Plots (சொந்த வீடு & நிலங்கள்)</option>
                </select>
              </div>

              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label" style={{ fontWeight: 700 }}>Full Residential Address (முழு முகவரி)</label>
                <textarea 
                  className="form-input"
                  rows={2}
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="Door No, Street Name, Area, Pincode"
                />
              </div>
            </div>
          )}

          {/* TAB 3: COMMUNITY & HOROSCOPE */}
          {activeTab === 'horoscope' && (
            <div>
              <div style={{
                background: '#FFF8E7',
                border: '1px solid #F0D999',
                padding: '0.85rem 1rem',
                borderRadius: '8px',
                marginBottom: '1.25rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0.75rem'
              }}>
                <div>
                  <div style={{ fontWeight: 800, color: 'var(--primary-maroon-dark, #4A061B)', fontSize: '0.9rem' }}>
                    ✨ Traditional Thirukanitham Panchangam Calculator
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#8C6A0A' }}>
                    Auto-determines Rasi, Nakshatra, and Lagnam from Date of Birth & Birth Time.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleAutoCalculateHoroscope}
                  className="btn btn-gold btn-sm"
                  style={{ fontWeight: 700 }}>
                  <Sparkles size={14} /> Auto-Compute Thirukanitham
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 700 }}>Community / Caste (இனம் / சாதி)</label>
                  <select 
                    className="form-select"
                    value={form.caste}
                    onChange={(e) => setForm({ ...form, caste: e.target.value, subcaste: '' })}>
                    {CASTE_LIST.map((c, i) => (
                      <option key={i} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 700 }}>Subcaste (உட்பிரிவு)</label>
                  {availableSubcastes.length > 0 ? (
                    <select 
                      className="form-select"
                      value={form.subcaste}
                      onChange={(e) => setForm({ ...form, subcaste: e.target.value })}>
                      <option value="">Select Subcaste</option>
                      {availableSubcastes.map((sc, i) => (
                        <option key={i} value={sc}>{sc}</option>
                      ))}
                    </select>
                  ) : (
                    <input 
                      type="text" 
                      className="form-input"
                      value={form.subcaste}
                      onChange={(e) => setForm({ ...form, subcaste: e.target.value })}
                      placeholder="Enter subcaste"
                    />
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 700 }}>Gothram (கோத்திரம்)</label>
                  <input 
                    type="text" 
                    className="form-input"
                    value={form.gothram}
                    onChange={(e) => setForm({ ...form, gothram: e.target.value })}
                    placeholder="Kashyapa, Shiva, Bharadwaja, etc."
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 700 }}>Rasi (ராசி)</label>
                  <select 
                    className="form-select"
                    value={form.rasi}
                    onChange={(e) => setForm({ ...form, rasi: e.target.value })}>
                    {RASIS.map((r, i) => (
                      <option key={i} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 700 }}>Nakshatra (நட்சத்திரம்)</label>
                  <select 
                    className="form-select"
                    value={form.nakshatra}
                    onChange={(e) => setForm({ ...form, nakshatra: e.target.value })}>
                    {NAKSHATRAS.map((n, i) => (
                      <option key={i} value={n}>{n}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 700 }}>Lagnam (லக்னம்)</label>
                  <select 
                    className="form-select"
                    value={form.lagnam}
                    onChange={(e) => setForm({ ...form, lagnam: e.target.value })}>
                    {LAGNAMS.map((l, i) => (
                      <option key={i} value={l}>{l}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 700 }}>Birth Time (பிறந்த நேரம்)</label>
                  <input 
                    type="text" 
                    className="form-input"
                    value={form.birthTime}
                    onChange={(e) => setForm({ ...form, birthTime: e.target.value })}
                    placeholder="07:30 AM"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 700 }}>Chevvai Dosham (செவ்வாய் தோஷம்)</label>
                  <select 
                    className="form-select"
                    value={form.chevvaiDosham}
                    onChange={(e) => setForm({ ...form, chevvaiDosham: e.target.value })}>
                    <option value="No">No (தோஷம் இல்லை)</option>
                    <option value="Yes">Yes (தோஷம் உண்டு)</option>
                    <option value="Parigara Chevvai">Parigara Chevvai (பரிகார செவ்வாய்)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: EDUCATION & CAREER */}
          {activeTab === 'career' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 700 }}>Education / Degree (கல்வி)</label>
                <select 
                  className="form-select"
                  value={form.education}
                  onChange={(e) => setForm({ ...form, education: e.target.value })}>
                  {EDUCATION_LIST.map((edu, i) => (
                    <option key={i} value={edu}>{edu}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 700 }}>College / Institution (படித்த கல்லூரி)</label>
                <input 
                  type="text" 
                  className="form-input"
                  value={form.institution}
                  onChange={(e) => setForm({ ...form, institution: e.target.value })}
                  placeholder="Anna University / IIT / CEG"
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 700 }}>Profession / Job Role (தொழில்)</label>
                <select 
                  className="form-select"
                  value={form.profession}
                  onChange={(e) => setForm({ ...form, profession: e.target.value })}>
                  {PROFESSION_LIST.map((prof, i) => (
                    <option key={i} value={prof}>{prof}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 700 }}>Company / Organization (நிறுவனம்)</label>
                <input 
                  type="text" 
                  className="form-input"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  placeholder="MNC / Govt / TCS / Infosys / Own Business"
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 700 }}>Annual Income (ஆண்டு வருமானம்)</label>
                <select 
                  className="form-select"
                  value={form.annualIncome}
                  onChange={(e) => setForm({ ...form, annualIncome: e.target.value })}>
                  {INCOME_LIST.map((inc, i) => (
                    <option key={i} value={inc}>{inc}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* TAB 5: FAMILY DETAILS */}
          {activeTab === 'family' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 700 }}>Father's Name (தந்தை பெயர்)</label>
                <input 
                  type="text" 
                  className="form-input"
                  value={form.fatherName}
                  onChange={(e) => setForm({ ...form, fatherName: e.target.value })}
                  placeholder="Father's Name"
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 700 }}>Father's Occupation (தந்தை தொழில்)</label>
                <input 
                  type="text" 
                  className="form-input"
                  value={form.fatherOccupation}
                  onChange={(e) => setForm({ ...form, fatherOccupation: e.target.value })}
                  placeholder="Government Officer / Business / Retired"
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 700 }}>Mother's Name (தாய் பெயர்)</label>
                <input 
                  type="text" 
                  className="form-input"
                  value={form.motherName}
                  onChange={(e) => setForm({ ...form, motherName: e.target.value })}
                  placeholder="Mother's Name"
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 700 }}>Mother's Occupation (தாய் தொழில்)</label>
                <input 
                  type="text" 
                  className="form-input"
                  value={form.motherOccupation}
                  onChange={(e) => setForm({ ...form, motherOccupation: e.target.value })}
                  placeholder="Homemaker / Teacher / Officer"
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 700 }}>Siblings Details (சகோதரர்கள்)</label>
                <input 
                  type="text" 
                  className="form-input"
                  value={form.siblings}
                  onChange={(e) => setForm({ ...form, siblings: e.target.value })}
                  placeholder="1 Elder Brother (Married), 1 Younger Sister"
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 700 }}>Family Type (குடும்ப அமைப்பு)</label>
                <select 
                  className="form-select"
                  value={form.familyType}
                  onChange={(e) => setForm({ ...form, familyType: e.target.value })}>
                  <option value="Nuclear Family">Nuclear Family (தனி குடும்பம்)</option>
                  <option value="Joint Family">Joint Family (கூட்டு குடும்பம்)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 700 }}>Family Status (குடும்ப நிலை)</label>
                <select 
                  className="form-select"
                  value={form.familyStatus}
                  onChange={(e) => setForm({ ...form, familyStatus: e.target.value })}>
                  <option value="Middle Class">Middle Class (நடுத்தர குடும்பம்)</option>
                  <option value="Upper Middle Class">Upper Middle Class (உயர் நடுத்தர குடும்பம்)</option>
                  <option value="Rich / Affluent">Rich / Affluent (செல்வந்தர்)</option>
                </select>
              </div>
            </div>
          )}

          {/* TAB 6: PHOTOS & STATUS */}
          {activeTab === 'status' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
              
              {/* Photo Preview & Upload */}
              <div style={{
                gridColumn: '1 / -1',
                display: 'flex',
                gap: '1.5rem',
                alignItems: 'center',
                flexWrap: 'wrap',
                background: '#F8FAFC',
                padding: '1.25rem',
                borderRadius: '12px',
                border: '1px solid #E2E8F0'
              }}>
                <img 
                  src={form.photo || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600'} 
                  alt={form.name} 
                  style={{
                    width: '90px',
                    height: '110px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    border: '2px solid var(--gold-dark, #D4AF37)',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                />

                <div style={{ flex: 1, minWidth: '220px' }}>
                  <div style={{ fontWeight: 700, marginBottom: '0.4rem', color: 'var(--primary-maroon-dark, #4A061B)' }}>
                    Profile Photo Management
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    <label className="btn btn-outline btn-sm" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Upload size={14} /> Upload From Computer
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handlePhotoUpload}
                        style={{ display: 'none' }}
                      />
                    </label>

                    <input 
                      type="text" 
                      className="form-input"
                      style={{ fontSize: '0.82rem', flex: 1, minWidth: '180px' }}
                      value={form.photo}
                      onChange={(e) => setForm({ ...form, photo: e.target.value })}
                      placeholder="Or enter Image URL"
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 700 }}>Official Verification Status</label>
                <select 
                  className="form-select"
                  value={form.verified ? 'true' : 'false'}
                  onChange={(e) => setForm({ ...form, verified: e.target.value === 'true' })}>
                  <option value="true">✓ Verified (சான்றிதழ் சரிபார்க்கப்பட்டது)</option>
                  <option value="false">⚠️ Pending Verification (சரிபார்ப்பு நிலுவையில்)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 700 }}>Razorpay Payment Status</label>
                <select 
                  className="form-select"
                  value={form.paymentStatus}
                  onChange={(e) => setForm({ ...form, paymentStatus: e.target.value })}>
                  <option value="PAID">PAID (₹1,000 Fee Completed)</option>
                  <option value="UNPAID">UNPAID (Registration Fee Pending)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 700 }}>Membership Tier</label>
                <select 
                  className="form-select"
                  value={form.membershipStatus}
                  onChange={(e) => setForm({ ...form, membershipStatus: e.target.value })}>
                  <option value="Active Paid Member">Active Paid Member</option>
                  <option value="Registered Member">Registered Member</option>
                  <option value="VIP Priority Member">VIP Priority Member</option>
                </select>
              </div>

              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label" style={{ fontWeight: 700 }}>About Profile / Bio (சுய விவரக் குறிப்பு)</label>
                <textarea 
                  className="form-input"
                  rows={3}
                  value={form.about}
                  onChange={(e) => setForm({ ...form, about: e.target.value })}
                  placeholder="Enter details about personality, lifestyle, family values, and expectations..."
                />
              </div>

            </div>
          )}

          {/* Modal Footer */}
          <div style={{
            marginTop: '2rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid #E2E8F0',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '0.75rem',
            alignItems: 'center'
          }}>
            <button 
              type="button" 
              onClick={onClose}
              className="btn btn-outline"
              disabled={isSaving}>
              Cancel (ரத்து செய்)
            </button>

            <button 
              type="button" 
              onClick={handleSave}
              className="btn btn-primary"
              disabled={isSaving}
              style={{
                background: 'linear-gradient(135deg, #166534 0%, #15803D 100%)',
                borderColor: '#15803D',
                fontWeight: 800,
                padding: '0.65rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer'
              }}>
              <Save size={16} />
              <span>{isSaving ? 'Saving Changes...' : '💾 Save Profile Changes'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
