'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import RasiChart from '../../../components/RasiChart';
import PoruthamModal from '../../../components/PoruthamModal';
import { 
  Star, Heart, Phone, Mail, MapPin, Briefcase, GraduationCap, 
  Users, Sparkles, ShieldCheck, Lock, CheckCircle2, ArrowLeft, MessageSquare, Trash2 
} from 'lucide-react';

export default function AllianceDetailPage({ params }) {
  const router = useRouter();
  const unwrappedParams = use(params);
  const profileId = unwrappedParams.id;

  const { 
    user, allProfiles, shortlist, interests, unlockedContacts,
    toggleShortlist, sendInterest, unlockContact, language, deleteProfile 
  } = useAuth();

  const [isPoruthamModalOpen, setIsPoruthamModalOpen] = useState(false);

  const isAdmin = user?.role === 'ADMIN' || user?.isAdmin || user?.id === 'ADMIN_001';
  const isRegistered = !!user && (user.registrationStatus === 'BASIC_REGISTERED' || user.registrationStatus === 'PAID_ACTIVE' || !!user.name);
  const isPaid = (user?.paymentStatus === 'PAID' || user?.membershipStatus === 'Active Paid Member' || user?.registrationStatus === 'PAID_ACTIVE');
  const canViewProfiles = isAdmin || isPaid;

  const profile = allProfiles.find(p => p.id === profileId) || allProfiles[0];
  const photoList = (profile.photos && profile.photos.length) ? profile.photos : (profile.gallery && profile.gallery.length) ? profile.gallery : [profile.photo];

  const [selectedPhoto, setSelectedPhoto] = useState(profile.photo);

  React.useEffect(() => {
    setSelectedPhoto(profile.photo);
  }, [profile]);

  const isSaved = shortlist.includes(profile.id);
  const isInterestSent = interests.sent.includes(profile.id);
  const isMutualAccepted = interests.accepted.includes(profile.id);
  const isContactUnlocked = unlockedContacts.includes(profile.id) || isMutualAccepted;

  if (!canViewProfiles) {
    return (
      <div style={{ padding: '3.5rem 0', minHeight: '85vh', background: 'var(--bg-silk)' }}>
        <div className="container" style={{ maxWidth: '720px' }}>
          <Link 
            href="/alliances"
            className="btn btn-outline btn-sm"
            style={{ marginBottom: '1.5rem' }}>
            <ArrowLeft size={16} /> Back to Alliances
          </Link>

          <div className="card" style={{
            padding: '3rem 2rem',
            textAlign: 'center',
            borderRadius: '16px',
            border: '2px solid var(--border-gold)',
            background: 'linear-gradient(135deg, #FFFFFF 0%, #FFFDF9 100%)',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <div style={{
              width: '72px', height: '72px', borderRadius: '50%',
              background: 'var(--maroon-gradient)', color: '#FFF',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1.5rem', border: '3px solid var(--gold-primary)',
              boxShadow: '0 4px 12px rgba(122, 12, 46, 0.25)'
            }}>
              <Lock size={36} />
            </div>

            <span className="badge badge-gold" style={{ marginBottom: '1rem', background: '#FFD700', color: '#1A0D03', fontWeight: 800 }}>
              🔒 MANDATORY PROFILE VIEW ACCESS GATE
            </span>

            <h2 style={{ fontSize: '1.9rem', color: 'var(--primary-maroon-dark)', marginBottom: '0.75rem', fontWeight: 800 }}>
              Profile Registration & ₹1,000 Fee Required
            </h2>

            <p style={{ color: 'var(--text-main)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '2rem' }}>
              To view full profile details, photo galleries, horoscope charts, and family background of alliance <strong>{profile?.name || 'Member'}</strong>, you must first register your profile and complete the official <strong>₹1,000 Registration Fee</strong>.
            </p>

            <div style={{
              background: '#FFF8E7', border: '1px solid #F0D999', borderRadius: '12px',
              padding: '1.25rem', marginBottom: '2rem', textAlign: 'left'
            }}>
              <div style={{ fontWeight: 800, color: 'var(--primary-maroon-dark)', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                📋 3-Step Verification Process:
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-main)', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <div>1️⃣ <strong>Step 1:</strong> Register Basic Profile Details ({isRegistered ? '✅ Completed' : '⏳ Pending'})</div>
                <div>2️⃣ <strong>Step 2:</strong> Pay ₹1,000 Official Registration Fee ({isPaid ? '✅ Paid' : '⏳ Unpaid'})</div>
                <div>3️⃣ <strong>Step 3:</strong> Access & View All Matrimony Profiles & Contacts ({canViewProfiles ? '🔓 Unlocked' : '🔒 Locked'})</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              {!isRegistered ? (
                <Link href="/register" className="btn btn-gold btn-lg">
                  <Sparkles size={18} />
                  <span>Step 1: Register Profile Now</span>
                </Link>
              ) : (
                <Link href="/payment" className="btn btn-gold btn-lg">
                  <ShieldCheck size={18} />
                  <span>Step 2: Pay ₹1,000 Registration Fee</span>
                </Link>
              )}
              <Link href="/login" className="btn btn-outline btn-lg">
                <span>Already Paid? Login</span>
              </Link>
            </div>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '3rem 0', minHeight: '85vh', background: 'var(--bg-silk)' }}>
      <div className="container" style={{ maxWidth: '960px' }}>
        
        {/* Top Back Navigation */}
        <Link 
          href="/alliances"
          className="btn btn-outline btn-sm"
          style={{ marginBottom: '1.5rem' }}>
          <ArrowLeft size={16} /> Back to Alliances
        </Link>

        {/* Main Hero Header Card */}
        <div className="card" style={{
          padding: '2rem',
          borderRadius: 'var(--radius-lg)',
          marginBottom: '2rem',
          border: '2px solid var(--border-gold)',
          boxShadow: 'var(--shadow-md)'
        }}>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
            
            {/* Profile Photo & Interactive 10-Photo Gallery */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ position: 'relative' }}>
                <img 
                  src={selectedPhoto || profile.photo} 
                  alt={profile.name} 
                  style={{
                    width: '160px',
                    height: '190px',
                    borderRadius: 'var(--radius-md)',
                    objectFit: 'cover',
                    border: '3px solid var(--gold-dark)',
                    boxShadow: 'var(--shadow-md)'
                  }}
                />
                <span className="badge badge-green" style={{
                  position: 'absolute',
                  bottom: '-10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  fontSize: '0.75rem',
                  whiteSpace: 'nowrap'
                }}>
                  <ShieldCheck size={12} /> Verified Profile
                </span>
              </div>

              {/* Photo Thumbnails (Up to 10 photos) */}
              {photoList.length > 1 && (
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', maxWidth: '170px', justifyContent: 'center', marginTop: '0.5rem' }}>
                  {photoList.map((img, idx) => (
                    <img 
                      key={idx}
                      src={img}
                      alt={`Photo ${idx + 1}`}
                      onClick={() => setSelectedPhoto(img)}
                      style={{
                        width: '32px',
                        height: '38px',
                        borderRadius: '4px',
                        objectFit: 'cover',
                        cursor: 'pointer',
                        border: selectedPhoto === img ? '2px solid var(--primary-maroon)' : '1px solid #CBD5E1',
                        opacity: selectedPhoto === img ? 1 : 0.7
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Profile Summary */}
            <div style={{ flex: 1, minWidth: '280px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.2rem' }}>
                <h1 style={{ fontSize: '2.2rem', color: 'var(--primary-maroon-dark)', margin: 0 }}>
                  {profile.name}
                </h1>
                <span style={{ fontSize: '1.1rem', color: 'var(--gold-dark)', fontWeight: 700 }}>
                  ({profile.id})
                </span>
              </div>

              <div style={{ fontSize: '1.1rem', color: 'var(--gold-dark)', fontWeight: 700, marginBottom: '0.75rem' }}>
                {profile.age} Years • {profile.height} • {profile.city}
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                <span className="badge badge-gold">
                  <ShieldCheck size={13} /> Registered Member
                </span>
                <span className="badge badge-green">
                  <CheckCircle2 size={13} /> Mobile Verified
                </span>
                <span className="badge badge-maroon">
                  <Sparkles size={13} /> Horoscope Available
                </span>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button 
                  onClick={() => sendInterest(profile.id)}
                  disabled={isInterestSent}
                  className={`btn btn-lg ${isInterestSent ? 'btn-secondary' : 'btn-primary'}`}>
                  <Heart size={18} fill={isInterestSent ? '#CBD5E1' : '#FFF'} />
                  <span>{isInterestSent ? 'Interest Sent ❤️' : '❤️ SEND INTEREST'}</span>
                </button>

                <button 
                  onClick={() => setIsPoruthamModalOpen(true)}
                  className="btn btn-gold btn-lg">
                  <Sparkles size={18} />
                  <span>Check Horoscope Match</span>
                </button>

                <button 
                  onClick={() => toggleShortlist(profile.id)}
                  className={`btn btn-lg ${isSaved ? 'btn-gold' : 'btn-outline'}`}>
                  <Star size={18} fill={isSaved ? '#D4AF37' : 'none'} />
                  <span>{isSaved ? 'Shortlisted' : '♡ SHORTLIST'}</span>
                </button>

                <button 
                  onClick={async () => {
                    if (window.confirm(`Admin Action: Delete profile "${profile.name}" (${profile.id}) permanently from live site? It will NOT show again on any list.`)) {
                      await deleteProfile(profile.id);
                      router.push('/alliances');
                    }
                  }}
                  className="btn btn-lg"
                  style={{ background: '#FEE2E2', color: '#991B1B', border: '1px solid #FCA5A5' }}>
                  <Trash2 size={18} />
                  <span>Delete Profile</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Grid Sections */}
        <div className="detail-grid">
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            
            {/* ABOUT */}
            <div className="card" style={{ padding: '1.75rem' }}>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--primary-maroon)', marginBottom: '0.75rem', borderBottom: '2px solid var(--border-gold)', paddingBottom: '0.4rem', fontWeight: 800 }}>
                சுய விவரம் (About Me)
              </h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: 1.7 }}>
                {profile.about}
              </p>
            </div>

            {/* EDUCATION & CAREER */}
            <div className="card" style={{ padding: '1.75rem' }}>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--primary-maroon)', marginBottom: '1rem', borderBottom: '2px solid var(--border-gold)', paddingBottom: '0.4rem', fontWeight: 800 }}>
                கல்வி மற்றும் தொழில் (Education & Profession)
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>கல்வி (Education)</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>{profile.education}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{profile.institution}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>தொழில் (Profession)</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>{profile.profession}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{profile.company}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>ஆண்டு வருமானம் (Annual Income)</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#166534' }}>{profile.annualIncome}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>பணிபுரியும் இடம் (Work Location)</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>{profile.city}, {profile.state}</div>
                </div>
              </div>
            </div>

            {/* FAMILY DETAILS */}
            <div className="card" style={{ padding: '1.75rem' }}>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--primary-maroon)', marginBottom: '1rem', borderBottom: '2px solid var(--border-gold)', paddingBottom: '0.4rem', fontWeight: 800 }}>
                குடும்ப பின்னணி (Family Background)
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', fontSize: '0.92rem' }}>
                <div><strong>தந்தை (Father):</strong> {profile.family?.fatherOccupation}</div>
                <div><strong>தாய் (Mother):</strong> {profile.family?.motherOccupation}</div>
                <div><strong>உடன்பிறப்புகள் (Siblings):</strong> {profile.family?.siblings}</div>
                <div><strong>சொந்த ஊர் (Native Town):</strong> {profile.nativeTown}</div>
                <div><strong>குடும்ப நிலை (Family Status):</strong> {profile.family?.familyStatus}</div>
                <div><strong>குடும்ப வகை (Family Type):</strong> {profile.family?.familyType}</div>
              </div>
            </div>

            {/* HOROSCOPE DETAILS */}
            <div className="card" style={{ padding: '1.75rem' }}>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--primary-maroon)', marginBottom: '1rem', borderBottom: '2px solid var(--border-gold)', paddingBottom: '0.4rem', fontWeight: 800 }}>
                ஜாதக விவரங்கள் (Horoscope Details)
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                <div><strong>ராசி (Rasi):</strong> {profile.rasi}</div>
                <div><strong>நட்சத்திரம் (Nakshatra):</strong> {profile.nakshatra} (Padam {profile.padam})</div>
                <div><strong>லக்னம் (Lagnam):</strong> {profile.lagnam}</div>
                <div><strong>பிறந்த தேதி/நேரம் (DOB / Time):</strong> {profile.dob} ({profile.birthTime})</div>
                <div><strong>பிறந்த இடம் (Birth Place):</strong> {profile.birthPlace}</div>
                <div><strong>செவ்வாய் தோஷம் (Chevvai Dosham):</strong> {profile.chevvaiDosham}</div>
              </div>

              <RasiChart 
                chartData={profile.rasiChart} 
                navamsamData={profile.navamsamChart} 
                rasiName={profile.rasi} 
                nakshatra={profile.nakshatra} 
                lagnam={profile.lagnam} 
              />
            </div>

            {/* PARTNER EXPECTATIONS */}
            <div className="card" style={{ padding: '1.75rem' }}>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--primary-maroon)', marginBottom: '1rem', borderBottom: '2px solid var(--border-gold)', paddingBottom: '0.4rem', fontWeight: 800 }}>
                எதிர்பார்ப்புகள் (Partner Expectations)
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', fontSize: '0.9rem' }}>
                <div><strong>வயது விருப்பம் (Age):</strong> {profile.partnerPreferences?.ageMin || 21} - {profile.partnerPreferences?.ageMax || 32} Yrs</div>
                <div><strong>உயர விருப்பம் (Height):</strong> {profile.partnerPreferences?.heightMin || "4' 6\""} - {profile.partnerPreferences?.heightMax || "6' 2\""}</div>
                <div><strong>கல்வி (Qualification):</strong> {profile.partnerPreferences?.education || 'Any Qualification / Open'}</div>
                <div><strong>தொழில் (Profession):</strong> {profile.partnerPreferences?.profession || 'Any Working / Business'}</div>
                <div><strong>சாதி விருப்பம் (Community):</strong> {profile.partnerPreferences?.castePreference || 'Open to All Communities'}</div>
                <div><strong>திருமண நிலை (Status):</strong> {profile.partnerPreferences?.maritalStatus || 'Never Married'}</div>
                <div><strong>வசிப்பிடம் (Location):</strong> {profile.partnerPreferences?.location || 'Chennai / Tamil Nadu / Open'}</div>
                {profile.partnerPreferences?.notes && (
                  <div style={{ gridColumn: 'span 2', marginTop: '0.5rem', background: '#FFFDF9', padding: '0.75rem', borderRadius: '4px', borderLeft: '3px solid var(--gold-dark)' }}>
                    <strong>சிறப்பு எதிர்பார்ப்புகள் (Specific Notes):</strong> {profile.partnerPreferences.notes}
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Right Sidebar: Contact Privacy Card */}
          <aside>
            <div className="card" style={{
              padding: '1.75rem',
              border: '2px solid var(--border-gold)',
              background: 'linear-gradient(180deg, #FFFFFF 0%, #FFFDF9 100%)',
              position: 'sticky',
              top: '100px'
            }}>
              <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '50%',
                  background: isContactUnlocked ? '#DCFCE7' : '#FFF8E7',
                  color: isContactUnlocked ? '#166534' : 'var(--gold-dark)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 0.75rem'
                }}>
                  {isContactUnlocked ? <Phone size={24} /> : <Lock size={24} />}
                </div>

                <h4 style={{ fontSize: '1.1rem', color: 'var(--primary-maroon-dark)', marginBottom: '0.2rem' }}>
                  Contact Privacy Status
                </h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  Phone number is protected until interest acceptance or unlock request.
                </p>
              </div>

              {isContactUnlocked ? (
                <div style={{
                  background: '#F0FDF4',
                  border: '1px solid #BBF7D0',
                  borderRadius: 'var(--radius-sm)',
                  padding: '1rem',
                  fontSize: '0.9rem'
                }}>
                  <div style={{ fontSize: '0.8rem', color: '#166534', fontWeight: 700, marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                    ✓ Contact Unlocked
                  </div>
                  <div style={{ marginBottom: '0.4rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Phone size={16} color="#166534" />
                    <span>{profile.phone}</span>
                  </div>
                  <div style={{ fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Mail size={16} color="#166534" />
                    <span>{profile.email}</span>
                  </div>

                  <Link 
                    href="/messages"
                    className="btn btn-primary btn-sm btn-full"
                    style={{ marginTop: '1rem' }}>
                    <MessageSquare size={16} />
                    <span>Send Chat Message</span>
                  </Link>
                </div>
              ) : (
                <div>
                  <button 
                    onClick={() => unlockContact(profile.id)}
                    className="btn btn-gold btn-full btn-sm"
                    style={{ marginBottom: '0.75rem' }}>
                    <Phone size={16} />
                    <span>Request / Unlock Contact</span>
                  </button>

                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', margin: 0 }}>
                    Clicking unlocks direct phone & email details securely.
                  </p>
                </div>
              )}
            </div>
          </aside>

        </div>

      </div>

      <PoruthamModal 
        isOpen={isPoruthamModalOpen}
        onClose={() => setIsPoruthamModalOpen(false)}
        userProfile={user}
        targetProfile={profile}
        onSendInterest={(id) => sendInterest(id)}
      />

    </div>
  );
}
