'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft, Lock, Database, EyeOff, UserCheck } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div style={{ background: 'var(--bg-silk)', minHeight: '85vh', padding: '3rem 0 5rem' }}>
      <div className="container" style={{ maxWidth: '850px' }}>
        
        {/* Navigation Breadcrumb */}
        <div style={{ marginBottom: '1.5rem' }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--primary-maroon)', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none' }}>
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>

        <div className="card" style={{
          background: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-gold)',
          padding: '2.5rem',
          boxShadow: 'var(--shadow-md)'
        }}>
          
          {/* Header */}
          <div style={{ borderBottom: '2px solid var(--gold-primary)', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
            <div className="badge badge-gold" style={{ marginBottom: '0.6rem' }}>
              <Lock size={14} /> Data Protection & Privacy
            </div>
            <h1 style={{ color: 'var(--primary-maroon-dark)', fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              Privacy Policy: Matrimonial Matchmaking Services
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
              Last Updated: November 2026 • Governing Business Entity: <strong>Chennai Jothi Matrimony</strong>
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem', color: '#374151', fontSize: '0.95rem', lineHeight: 1.65 }}>
            
            <section>
              <h2 style={{ color: 'var(--primary-maroon)', fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={18} /> 1. Commitment to Family Privacy
              </h2>
              <p>
                Chennai Jothi Matrimony recognizes that matrimonial details, family backgrounds, and horoscopes are highly sensitive and private. We treat all candidate information with strict confidentiality. <strong>We do not sell, rent, or lease personal matrimonial biodata to third-party telemarketers or external advertisers.</strong>
              </p>
            </section>

            <section>
              <h2 style={{ color: 'var(--primary-maroon)', fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Database size={18} /> 2. Information Collected for Matchmaking
              </h2>
              <p>To assist in authentic matchmaking and horoscope matching, we collect:</p>
              <ul style={{ paddingLeft: '1.5rem', margin: '0.5rem 0' }}>
                <li><strong>Candidate Details:</strong> Full name, gender, date of birth, time of birth, place of birth, height, educational qualifications, profession, and marital status.</li>
                <li><strong>Astrological Data:</strong> Rasi, Nakshatram (Star), Dosham status (Chevvai/Rahu-Ketu), and planetary placements for 10 Porutham calculations.</li>
                <li><strong>Community & Family:</strong> Sub-caste/community, parent names, occupation, and native place.</li>
                <li><strong>Contact Information:</strong> Phone numbers, email address, and residential address solely for verified alliance coordination.</li>
                <li><strong>Photographs:</strong> User-submitted photos strictly used to showcase prospective brides and grooms to interested families.</li>
              </ul>
            </section>

            <section>
              <h2 style={{ color: 'var(--primary-maroon)', fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <EyeOff size={18} /> 3. Data Usage & Matchmaking Purpose
              </h2>
              <p>
                Information collected is solely utilized to recommend compatible matrimonial profiles, verify authenticity, compute astrological compatibility, and facilitate matrimonial introductions between respective families.
              </p>
            </section>

            <section>
              <h2 style={{ color: 'var(--primary-maroon)', fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Lock size={18} /> 4. Payment Security (Razorpay)
              </h2>
              <p>
                All online transactions are processed through <strong>Razorpay Software Private Limited</strong> using 256-bit SSL encryption adhering to PCI-DSS standards. Chennai Jothi Matrimony does NOT store user credit card numbers, debit card details, CVV, or banking passwords on our servers.
              </p>
            </section>

            <section>
              <h2 style={{ color: 'var(--primary-maroon)', fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <UserCheck size={18} /> 5. Account Deletion & Data Rights
              </h2>
              <p>
                Once a candidate's marriage is fixed or solemnized, or at the request of the member, their profile will be deactivated or permanently removed from our active database within 48 hours upon request to our support team.
              </p>
            </section>

            <section>
              <h2 style={{ color: 'var(--primary-maroon)', fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                6. Privacy Officer Contact
              </h2>
              <div style={{ background: '#F9FAFB', padding: '1rem', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
                <div><strong>Chennai Jothi Matrimony</strong></div>
                <div>Grievance & Privacy Officer: Dr. Chandra Babu</div>
                <div>Address: No.13/7, Muthukalathi St, Triplicane, Chennai - 600005, Tamil Nadu</div>
                <div>Phone: +91 90437 73977 / +91 94457 56377</div>
                <div>Email: <a href="mailto:arulbabuvalllalar@gmail.com" style={{ color: 'var(--primary-maroon)' }}>arulbabuvalllalar@gmail.com</a></div>
              </div>
            </section>

          </div>

        </div>

      </div>
    </div>
  );
}

