'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft, RefreshCw, AlertCircle, Clock, CheckCircle2 } from 'lucide-react';

export default function RefundPolicy() {
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
              <RefreshCw size={14} /> Commercial Policies
            </div>
            <h1 style={{ color: 'var(--primary-maroon-dark)', fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              Cancellation & Refund Policy: Matchmaking Business
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
              Last Updated: November 2026 • Governing Business Entity: <strong>Chennai Jothi Matrimony</strong>
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem', color: '#374151', fontSize: '0.95rem', lineHeight: 1.65 }}>
            
            <section>
              <h2 style={{ color: 'var(--primary-maroon)', fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={18} /> 1. Fee Structure & Scope of Service
              </h2>
              <p>
                Chennai Jothi Matrimony charges a <strong>one-time registration and verification fee of ₹1,000 (INR)</strong> valid for 1 year of matrimonial matchmaking and alliance services.
              </p>
              <p>
                This fee covers the manual labor of biodata verification, astrological chart compilation (10 Porutham), system hosting, and facilitating direct contact with compatible alliances.
              </p>
            </section>

            <section>
              <h2 style={{ color: 'var(--primary-maroon)', fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={18} /> 2. Cancellation & Refund Eligibility
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', padding: '1rem', borderRadius: '8px' }}>
                  <strong style={{ color: '#166534', display: 'block', marginBottom: '4px' }}>
                    A. Eligible for Full Refund (100%):
                  </strong>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#14532D' }}>
                    <li><strong>Duplicate Payment:</strong> If your card/account was debited more than once for the same registration due to technical error.</li>
                    <li><strong>Cancellation within 24 Hours:</strong> If you request cancellation within 24 hours of payment before manual verification and horoscope chart generation has commenced.</li>
                  </ul>
                </div>

                <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', padding: '1rem', borderRadius: '8px' }}>
                  <strong style={{ color: '#92400E', display: 'block', marginBottom: '4px' }}>
                    B. Non-Refundable Scenarios:
                  </strong>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#78350F' }}>
                    <li>Once profile verification is completed and the user has unlocked access to alliance profiles and contact numbers.</li>
                    <li>If a user's account is suspended or terminated for violating Terms (e.g. attempting to use the service for casual dating, harassment, or providing falsified documents).</li>
                    <li>Marriage settlement happens outside our portal before the 1-year membership expiry (no pro-rata refunds).</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 style={{ color: 'var(--primary-maroon)', fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <RefreshCw size={18} /> 3. Refund Processing Timeline
              </h2>
              <p>
                Approved refunds are initiated within <strong>2 business days</strong> and will be credited directly back to the original payment source (UPI ID, NetBanking account, or Credit/Debit Card) via Razorpay within <strong>5 to 7 banking business days</strong>.
              </p>
            </section>

            <section>
              <h2 style={{ color: 'var(--primary-maroon)', fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertCircle size={18} /> 4. How to Request a Refund
              </h2>
              <p>
                To request a refund for duplicate charges or immediate cancellation, send an email to <a href="mailto:arulbabuvalllalar@gmail.com" style={{ color: 'var(--primary-maroon)' }}>arulbabuvalllalar@gmail.com</a> or call <strong>+91 90437 73977</strong> with:
              </p>
              <ul style={{ paddingLeft: '1.5rem', margin: '0.5rem 0' }}>
                <li>Your Registered Name and Mobile Number</li>
                <li>Registration ID (e.g., JM2026...)</li>
                <li>Razorpay Payment ID (e.g., pay_...)</li>
                <li>Reason for cancellation or screenshot of duplicate debit</li>
              </ul>
            </section>

          </div>

        </div>

      </div>
    </div>
  );
}

