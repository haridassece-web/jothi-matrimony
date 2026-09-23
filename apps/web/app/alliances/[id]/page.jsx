'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import RasiChart from '../../../components/RasiChart';
import PoruthamModal from '../../../components/PoruthamModal';
import { 
  Star, Heart, Phone, Mail, MapPin, Briefcase, GraduationCap, 
  Users, Sparkles, ShieldCheck, Lock, CheckCircle2, ArrowLeft, MessageSquare 
} from 'lucide-react';

export default function AllianceDetailPage({ params }) {
  const router = useRouter();
  const unwrappedParams = use(params);
  const profileId = unwrappedParams.id;

  const { 
    user, allProfiles, shortlist, interests, unlockedContacts,
    toggleShortlist, sendInterest, unlockContact, language 
  } = useAuth();

  const [isPoruthamModalOpen, setIsPoruthamModalOpen] = useState(false);

  const profile = allProfiles.find(p => p.id === profileId) || allProfiles[0];

  const isSaved = shortlist.includes(profile.id);
  const isInterestSent = interests.sent.includes(profile.id);
  const isMutualAccepted = interests.accepted.includes(profile.id);
  const isContactUnlocked = unlockedContacts.includes(profile.id) || isMutualAccepted;

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
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
            
            {/* Profile Photo */}
            <div style={{ position: 'relative' }}>
              <img 
                src={profile.photo} 
                alt={profile.name} 
                style={{
                  width: '150px',
                  height: '180px',
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
              </div>
            </div>

          </div>
        </div>

        {/* Grid Sections */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            
            {/* ABOUT */}
            <div className="card" style={{ padding: '1.75rem' }}>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--primary-maroon)', marginBottom: '0.75rem', borderBottom: '2px solid var(--border-gold)', paddingBottom: '0.4rem' }}>
                ABOUT ME
              </h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: 1.7 }}>
                {profile.about}
              </p>
            </div>

            {/* EDUCATION & CAREER */}
            <div className="card" style={{ padding: '1.75rem' }}>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--primary-maroon)', marginBottom: '1rem', borderBottom: '2px solid var(--border-gold)', paddingBottom: '0.4rem' }}>
                EDUCATION & PROFESSION
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Education</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>{profile.education}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{profile.institution}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Profession</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>{profile.profession}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{profile.company}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Annual Income</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#166534' }}>{profile.annualIncome}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Work Location</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>{profile.city}, {profile.state}</div>
                </div>
              </div>
            </div>

            {/* FAMILY DETAILS */}
            <div className="card" style={{ padding: '1.75rem' }}>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--primary-maroon)', marginBottom: '1rem', borderBottom: '2px solid var(--border-gold)', paddingBottom: '0.4rem' }}>
                FAMILY BACKGROUND
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.92rem' }}>
                <div><strong>Father:</strong> {profile.family?.fatherOccupation}</div>
                <div><strong>Mother:</strong> {profile.family?.motherOccupation}</div>
                <div><strong>Siblings:</strong> {profile.family?.siblings}</div>
                <div><strong>Native Town:</strong> {profile.nativeTown}</div>
                <div><strong>Family Status:</strong> {profile.family?.familyStatus}</div>
                <div><strong>Family Type:</strong> {profile.family?.familyType}</div>
              </div>
            </div>

            {/* HOROSCOPE DETAILS */}
            <div className="card" style={{ padding: '1.75rem' }}>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--primary-maroon)', marginBottom: '1rem', borderBottom: '2px solid var(--border-gold)', paddingBottom: '0.4rem' }}>
                HOROSCOPE DETAILS (ஜாதகம்)
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                <div><strong>Rasi:</strong> {profile.rasi}</div>
                <div><strong>Nakshatra:</strong> {profile.nakshatra} (Padam {profile.padam})</div>
                <div><strong>Lagnam:</strong> {profile.lagnam}</div>
                <div><strong>DOB / Time:</strong> {profile.dob} ({profile.birthTime})</div>
                <div><strong>Birth Place:</strong> {profile.birthPlace}</div>
                <div><strong>Chevvai Dosham:</strong> {profile.chevvaiDosham}</div>
              </div>

              <RasiChart chartData={profile.rasiChart} rasiName={profile.rasi} nakshatra={profile.nakshatra} />
            </div>

            {/* PARTNER EXPECTATIONS */}
            <div className="card" style={{ padding: '1.75rem' }}>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--primary-maroon)', marginBottom: '1rem', borderBottom: '2px solid var(--border-gold)', paddingBottom: '0.4rem' }}>
                PARTNER EXPECTATIONS
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.9rem' }}>
                <div><strong>Age Preference:</strong> {profile.partnerPreferences?.ageMin} - {profile.partnerPreferences?.ageMax} Yrs</div>
                <div><strong>Education:</strong> {profile.partnerPreferences?.education}</div>
                <div><strong>Location:</strong> {profile.partnerPreferences?.location}</div>
                <div><strong>Community:</strong> {profile.partnerPreferences?.castePreference}</div>
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
