'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft, FileText, CheckCircle2, AlertTriangle, Building2 } from 'lucide-react';

export default function TermsAndConditions() {
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
              <ShieldCheck size={14} /> Official Business Policies
            </div>
            <h1 style={{ color: 'var(--primary-maroon-dark)', fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              Terms & Conditions: Matrimonial Matchmaking Business
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
              Last Updated: November 2026 • Governing Business Entity: <strong>Chennai Jothi Matrimony</strong>
            </p>
          </div>

          {/* CRITICAL RAZORPAY / REGULATORY COMPLIANCE CALLOUT */}
          <div style={{
            background: '#FEF3C7',
            border: '2px solid #F59E0B',
            borderRadius: '10px',
            padding: '1.25rem',
            marginBottom: '2rem',
            display: 'flex',
            gap: '12px'
          }}>
            <AlertTriangle size={24} color="#D97706" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div style={{ fontSize: '0.92rem', color: '#92400E', lineHeight: 1.55 }}>
              <strong style={{ fontSize: '1rem', display: 'block', marginBottom: '4px' }}>
                Strict Classification: Traditional Matrimonial Matchmaking Business
              </strong>
              Chennai Jothi Matrimony is strictly a <strong>traditional matrimonial matchmaking business</strong> registered in Chennai, Tamil Nadu, helping prospective brides, grooms, and their families find life partners for legal marriage. <strong>We are NOT a dating service, casual dating app, escort directory, or social casual network.</strong> Registration is permitted solely for users genuinely seeking matrimony.
            </div>
          </div>

          {/* Policy Sections */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem', color: '#374151', fontSize: '0.95rem', lineHeight: 1.65 }}>
            
            <section>
              <h2 style={{ color: 'var(--primary-maroon)', fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Building2 size={18} /> 1. Business Identity & Nature of Services
              </h2>
              <p>
                <strong>Chennai Jothi Matrimony</strong> (Proprietor: Dr. Chandra Babu, M.A., B.L., Ph.D.) operates an authentic Indian matrimonial matchmaking business located at <em>No.13/7, Muthukalathi St, Triplicane, Chennai - 600005, Tamil Nadu, India</em>.
              </p>
              <p>
                The primary service rendered is verified candidate registration, traditional 10 Porutham Vedic astrological horoscope matching, alliance recommendations across all Tamil Hindu communities (including Iyer, Gounder, Pillai, Mudaliar, Chettiar, Vanniyar, Nadar, Naidu, and others), and family contact exchange for arranged marriage solemnization.
              </p>
            </section>

            <section>
              <h2 style={{ color: 'var(--primary-maroon)', fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={18} color="green" /> 2. Eligibility Requirements
              </h2>
              <p>To register or use our matrimonial matchmaking services, the candidate must:</p>
              <ul style={{ paddingLeft: '1.5rem', margin: '0.5rem 0' }}>
                <li>Be at least 18 years of age (for females) or 21 years of age (for males) as per Indian Marriage Laws.</li>
                <li>Be legally single, divorced (with valid court decree), or widowed, and legally eligible to enter into matrimony.</li>
                <li>Register solely for the objective of marriage and not for commercial advertising, casual dating, friendship, or solicitation.</li>
              </ul>
            </section>

            <section>
              <h2 style={{ color: 'var(--primary-maroon)', fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText size={18} /> 3. One-Time Registration Fee & Commercial Terms
              </h2>
              <p>
                Chennai Jothi Matrimony charges a <strong>one-time fee of ₹1,000 (INR)</strong> for 1-year active membership. This fee covers:
              </p>
              <ul style={{ paddingLeft: '1.5rem', margin: '0.5rem 0' }}>
                <li>Manual background verification of the candidate's registration details and photo.</li>
                <li>10 Porutham South Indian Vedic horoscope computation and Rasi/Navamsam planetary chart generation.</li>
                <li>Access to browse Tamil alliance profiles and coordinate directly with prospective alliances and families.</li>
              </ul>
              <p>
                All payments are processed securely via our licensed payment gateway partner (Razorpay Software Private Limited) in compliance with Reserve Bank of India (RBI) regulations.
              </p>
            </section>

            <section>
              <h2 style={{ color: 'var(--primary-maroon)', fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertTriangle size={18} color="#D97706" /> 4. Prohibition of Dating and Misuse
              </h2>
              <p>
                Any profile found utilizing this platform for casual dating, obscenity, financial fraud, impersonation, or solicitation will be permanently banned with immediate effect, and relevant details may be handed over to cybercrime authorities.
              </p>
            </section>

            <section>
              <h2 style={{ color: 'var(--primary-maroon)', fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                5. Contact & Grievance Redressal
              </h2>
              <p>
                For questions, clarifications, or grievance reporting regarding your matrimonial matchmaking registration, please contact:
              </p>
              <div style={{ background: '#F9FAFB', padding: '1rem', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
                <div><strong>Chennai Jothi Matrimony</strong></div>
                <div>Proprietor & Grievance Officer: Dr. Chandra Babu</div>
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
