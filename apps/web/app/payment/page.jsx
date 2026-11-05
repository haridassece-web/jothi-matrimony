'use client';

export const dynamic = 'force-dynamic';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import RazorpayStandardCheckout from '../../components/RazorpayStandardCheckout';
import RazorpayPaymentButton from '../../components/RazorpayPaymentButton';
import PayUMembership from '../../components/PayUMembership';
import { ShieldCheck, CheckCircle2, Lock, Sparkles, CreditCard, Landmark, Copy, Check, AlertCircle } from 'lucide-react';

export default function PaymentPage() {
  const router = useRouter();
  const { user, registrationId, language, processPaymentSuccess } = useAuth();
  const [copiedField, setCopiedField] = useState(null);

  const handlePaymentSuccess = (paymentResult) => {
    if (processPaymentSuccess) {
      processPaymentSuccess({
        paymentId: paymentResult.paymentId,
        orderId: paymentResult.orderId,
        gateway: 'Razorpay Standard Checkout (rzp_test_Tuz6CvkXYtRSA2)'
      });
    }
    if (typeof document !== 'undefined') {
      try {
        document.querySelectorAll('.razorpay-container').forEach(el => el.remove());
        document.body.style.overflow = 'auto';
      } catch (e) {}
    }
    window.location.assign(`/payment/success?razorpay_payment_id=${paymentResult.paymentId}&razorpay_order_id=${paymentResult.orderId}`);
  };

  const bankDetails = {
    bankName: 'State Bank of India',
    accountName: 'Chandra babu M',
    accountNo: '10146632327',
    ifsc: 'SBIN0003275',
    branch: 'Vivekananda house (Chennai)'
  };

  const handleCopy = (field, text) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const displayRegId = registrationId || user?.regNo || user?.id || 'JM2026001234';

  return (
    <div style={{ padding: '3.5rem 0 5rem', minHeight: '85vh', background: 'var(--bg-silk)' }}>
      <div className="container" style={{ maxWidth: '560px' }}>
        
        {/* Header Notice */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span className="badge badge-gold" style={{ marginBottom: '0.6rem', padding: '0.4rem 1rem', fontWeight: 800 }}>
            <Sparkles size={14} /> STEP 3: OFFICIAL REGISTRATION PAYMENT
          </span>
          <h2 style={{ fontSize: '2.1rem', color: 'var(--primary-maroon-dark)', marginBottom: '0.4rem', fontWeight: 800 }}>
            {language === 'ta' ? 'பதிவுக் கட்டணம் ₹1,000 செலுத்தவும்' : 'Online Registration Payment (₹1,000)'}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Registration ID: <strong style={{ color: 'var(--primary-maroon)' }}>{displayRegId}</strong>
          </p>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: '#FEF3C7',
            border: '1px solid #FCD34D',
            color: '#92400E',
            padding: '6px 14px',
            borderRadius: '20px',
            fontSize: '0.82rem',
            fontWeight: 700,
            marginTop: '0.5rem'
          }}>
            <AlertCircle size={15} />
            <span>Payment Status: Pending • Online payment required to unlock alliances</span>
          </div>
        </div>

        {/* Official Registration Payment Box */}
        <div className="card" style={{
          padding: '2.5rem 2rem',
          borderRadius: 'var(--radius-lg)',
          border: '2px solid var(--border-gold)',
          boxShadow: 'var(--shadow-lg)',
          textAlign: 'center',
          background: 'linear-gradient(180deg, #FFFFFF 0%, #FFFDF9 100%)',
          position: 'relative',
          marginBottom: '2rem'
        }}>
          
          <div style={{
            fontSize: '1.25rem',
            fontWeight: 800,
            fontFamily: 'var(--font-heading)',
            color: 'var(--primary-maroon-dark)',
            letterSpacing: '0.05em',
            marginBottom: '0.4rem'
          }}>
            CHENNAI JOTHI MATRIMONY
          </div>

          <div style={{
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '0.5rem'
          }}>
            Official Matrimonial Matchmaking 1-Year Registration Fee
          </div>

          {/* Amount Badge */}
          <div style={{
            fontSize: '3.2rem',
            fontWeight: 900,
            color: 'var(--primary-maroon-dark)',
            margin: '0.5rem 0 1.25rem',
            lineHeight: 1
          }}>
            ₹1,000
          </div>

          {/* Benefits List */}
          <div style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem 1.5rem',
            textAlign: 'left',
            marginBottom: '2rem'
          }}>
            {[
              'Unlock & Browse All Available Bride / Groom Alliances',
              'View Original Photographs & Detailed Profile Sheets',
              'Thirukanitham Horoscope Match & Rasi/Navamsam Charts',
              'Mutual Contact Number & Parent Details Sharing',
              'Day-by-Day WhatsApp Updates via +91 90437 73977',
              'Personal Guidance by Organizer Dr. Chandra Babu'
            ].map((feature, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                fontSize: '0.90rem',
                color: 'var(--text-main)',
                fontWeight: 600,
                marginBottom: i === 5 ? 0 : '0.65rem'
              }}>
                <CheckCircle2 size={18} color="#166534" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* OFFICIAL RAZORPAY STANDARD WEB CHECKOUT */}
          <div style={{
            background: '#F0F9FF',
            border: '2px solid #0284C7',
            borderRadius: '12px',
            padding: '1.5rem 1.25rem',
            marginBottom: '1.5rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: '#0369A1', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <CreditCard size={18} />
              <span>Razorpay Standard Web Checkout (Instant Verification)</span>
            </div>
            
            <p style={{ fontSize: '0.84rem', color: '#475569', margin: '0 0 1.25rem 0' }}>
              Pay securely with instant activation via UPI (GPay, PhonePe, Paytm), Cards & NetBanking:
            </p>

            {/* Standard Checkout Integration */}
            <RazorpayStandardCheckout
              amount={1000 * 100}
              currency="INR"
              userId={displayRegId}
              userName={user?.name || 'Valued Member'}
              userEmail={user?.email || 'member@chennaijothimatrimony.com'}
              userPhone={user?.mobile || user?.phone || '9043773977'}
              buttonText="Pay ₹1,000 via Razorpay Standard Checkout"
              onSuccess={handlePaymentSuccess}
            />

            <div style={{ margin: '1.5rem 0 0.85rem', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '50%', left: '10%', right: '10%', height: '1px', background: '#BAE6FD' }}></div>
              <span style={{ position: 'relative', background: '#F0F9FF', padding: '0 12px', fontSize: '0.74rem', color: '#64748B', fontWeight: 700 }}>
                OR USE DIRECT PAYMENT BUTTON
              </span>
            </div>

            {/* Direct Razorpay Button pl_TuQgSgXdvzHPKY */}
            <div style={{ minHeight: '48px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <RazorpayPaymentButton paymentButtonId="pl_TuQgSgXdvzHPKY" />
            </div>

            {/* PayU Hosted Integration Button */}
            <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px dashed #CBD5E1' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#065F46', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <ShieldCheck size={16} /> Pay via PayU Hosted Checkout (Cards, NetBanking, UPI)
              </div>
              <PayUMembership 
                user={user || { 
                  id: displayRegId, 
                  full_name: user?.fullName || 'Valued Member', 
                  email: user?.email || 'member@chennaijothimatrimony.com', 
                  mobile: user?.mobile || '9043773977' 
                }} 
              />
            </div>
          </div>

          <div style={{
            background: '#FFFBEB',
            border: '1px solid #FCD34D',
            borderRadius: '8px',
            padding: '0.85rem 1rem',
            fontSize: '0.84rem',
            color: '#B45309',
            lineHeight: 1.5,
            textAlign: 'left'
          }}>
            📌 <strong>Important Notice:</strong> Once your ₹1,000 online payment is completed on the Razorpay screen above, Razorpay will issue your receipt and automatically redirect you to complete your horoscope and browse alliances.
          </div>

        </div>

        
        {/* PhonePe & UPI Instant Scan & Pay Card */}
        <div className="card" style={{
          padding: '2rem 1.75rem',
          borderRadius: 'var(--radius-lg)',
          border: '2.5px solid #5f259f',
          background: 'linear-gradient(180deg, #FAF5FF 0%, #FFFFFF 100%)',
          boxShadow: 'var(--shadow-md)',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: '#5f259f',
            color: '#FFFFFF',
            padding: '6px 16px',
            borderRadius: '20px',
            fontSize: '0.88rem',
            fontWeight: 800,
            marginBottom: '0.85rem'
          }}>
            <span>PhonePe & GPay Accepted Here</span>
          </div>

          <h3 style={{ fontSize: '1.4rem', color: '#3B0764', margin: '0 0 0.35rem', fontWeight: 800 }}>
            Scan & Pay Using PhonePe / GPay App
          </h3>
          <p style={{ color: '#6B7280', fontSize: '0.9rem', margin: '0 0 1.25rem' }}>
            Instant Registration Fee Payment (₹1,000) • Official Account: <strong>CHANDRA BABU M</strong>
          </p>

          {/* Official PhonePe QR Code Image */}
          <div style={{
            background: '#FFFFFF',
            padding: '1rem',
            borderRadius: '16px',
            border: '2px dashed #A855F7',
            display: 'inline-block',
            maxWidth: '280px',
            margin: '0 auto 1.25rem',
            boxShadow: '0 4px 15px rgba(95, 37, 159, 0.12)'
          }}>
            <img 
              src="/phonepe-qr.jpg" 
              alt="PhonePe QR Code - Chandra Babu M" 
              style={{
                width: '100%',
                maxWidth: '240px',
                height: 'auto',
                display: 'block',
                borderRadius: '8px'
              }}
            />
            <div style={{ marginTop: '0.5rem', fontSize: '0.78rem', color: '#6B21A8', fontWeight: 700 }}>
              CHANDRA BABU M • 9043773977@ybl
            </div>
          </div>

          {/* PhonePe Details with One-Click Copy */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.65rem',
            maxWidth: '440px',
            margin: '0 auto 1.25rem',
            textAlign: 'left'
          }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FFFFFF', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #E9D5FF' }}>
              <div>
                <span style={{ fontSize: '0.76rem', color: '#6B7280', display: 'block' }}>PhonePe / Mobile Number for Registration:</span>
                <strong style={{ fontSize: '1.1rem', color: '#5f259f', letterSpacing: '0.03em' }}>+91 90437 73977</strong>
              </div>
              <button
                type="button"
                onClick={() => handleCopy('phonepe_no', '9043773977')}
                style={copyBtnStyle}>
                {copiedField === 'phonepe_no' ? <Check size={14} color="#166534" /> : <Copy size={14} />}
                <span>{copiedField === 'phonepe_no' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FFFFFF', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #E9D5FF' }}>
              <div>
                <span style={{ fontSize: '0.76rem', color: '#6B7280', display: 'block' }}>PhonePe UPI ID:</span>
                <strong style={{ fontSize: '1rem', color: '#5f259f' }}>9043773977@ybl</strong>
              </div>
              <button
                type="button"
                onClick={() => handleCopy('phonepe_upi', '9043773977@ybl')}
                style={copyBtnStyle}>
                {copiedField === 'phonepe_upi' ? <Check size={14} color="#166534" /> : <Copy size={14} />}
                <span>{copiedField === 'phonepe_upi' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FFFFFF', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #E9D5FF' }}>
              <div>
                <span style={{ fontSize: '0.76rem', color: '#6B7280', display: 'block' }}>Payee Name:</span>
                <strong style={{ fontSize: '0.98rem', color: '#1F2937' }}>CHANDRA BABU M</strong>
              </div>
            </div>

          </div>

          {/* Direct Pay Link for Mobile */}
          <div style={{ marginBottom: '1rem' }}>
            <a 
              href={`upi://pay?pa=9043773977@ybl&pn=CHANDRA%20BABU%20%20M&am=1000&cu=INR&tn=Reg%20Fee%20${displayRegId}`}
              className="btn btn-full"
              style={{
                background: 'linear-gradient(135deg, #5f259f 0%, #7c3aed 100%)',
                color: '#FFFFFF',
                fontWeight: 700,
                padding: '0.85rem',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontSize: '0.98rem',
                boxShadow: '0 4px 12px rgba(95, 37, 159, 0.3)',
                textDecoration: 'none'
              }}>
              <span>📱 Open in PhonePe / GPay App (Pay ₹1,000)</span>
            </a>
          </div>

          {/* WhatsApp Confirmation Banner */}
          <div style={{
            background: '#F0FDF4',
            border: '1px solid #BBF7D0',
            borderRadius: '8px',
            padding: '0.85rem 1rem',
            fontSize: '0.84rem',
            color: '#166534',
            lineHeight: 1.5,
            textAlign: 'left',
            marginBottom: '1rem'
          }}>
            ✅ <strong>Instant Activation:</strong> After paying ₹1,000 via PhonePe or UPI, take a screenshot and send it with your Registration ID (<strong>{displayRegId}</strong>) to WhatsApp: <strong>+91 90437 73977</strong>. Dr. Chandra Babu will verify and activate your alliance browsing immediately.
          </div>

          <a 
            href={`https://wa.me/919043773977?text=Vanakkam!%20I%20have%20paid%20Rs.1000%20via%20PhonePe%20for%20Registration%20ID:%20${displayRegId}.%20Please%20find%20my%20screenshot%20and%20activate%20my%20account.`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-full"
            style={{
              background: '#25D366',
              color: '#FFF',
              fontWeight: 700,
              padding: '0.75rem',
              borderRadius: '8px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              textDecoration: 'none'
            }}>
            <span>📲 Send PhonePe Screenshot to WhatsApp (+91 90437 73977)</span>
          </a>

        </div>

        {/* Direct Bank Account Transfer Card (Alternative) */}
        <div className="card" style={{
          padding: '1.75rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-light)',
          background: '#FFFFFF',
          boxShadow: 'var(--shadow-md)',
          marginBottom: '2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
            <Landmark size={22} color="var(--primary-maroon)" />
            <h3 style={{ fontSize: '1.15rem', color: 'var(--primary-maroon-dark)', margin: 0, fontWeight: 700 }}>
              Direct Bank Account Transfer (IMPS / NEFT / RTGS)
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            
            <div style={bankRowStyle}>
              <span style={labelStyle}>Bank Name:</span>
              <strong style={valueStyle}>{bankDetails.bankName}</strong>
            </div>

            <div style={bankRowStyle}>
              <span style={labelStyle}>Account Holder:</span>
              <strong style={valueStyle}>{bankDetails.accountName}</strong>
            </div>

            <div style={bankRowStyle}>
              <span style={labelStyle}>Account Number:</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <strong style={{ ...valueStyle, letterSpacing: '0.05em' }}>{bankDetails.accountNo}</strong>
                <button
                  type="button"
                  onClick={() => handleCopy('acc', bankDetails.accountNo)}
                  style={copyBtnStyle}>
                  {copiedField === 'acc' ? <Check size={14} color="#166534" /> : <Copy size={14} />}
                  <span>{copiedField === 'acc' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            <div style={bankRowStyle}>
              <span style={labelStyle}>IFSC Code:</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <strong style={{ ...valueStyle, letterSpacing: '0.05em' }}>{bankDetails.ifsc}</strong>
                <button
                  type="button"
                  onClick={() => handleCopy('ifsc', bankDetails.ifsc)}
                  style={copyBtnStyle}>
                  {copiedField === 'ifsc' ? <Check size={14} color="#166534" /> : <Copy size={14} />}
                  <span>{copiedField === 'ifsc' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            <div style={bankRowStyle}>
              <span style={labelStyle}>Branch:</span>
              <strong style={valueStyle}>{bankDetails.branch}</strong>
            </div>

          </div>

          <div style={{
            marginTop: '1.25rem',
            padding: '0.75rem 1rem',
            background: '#F0FDF4',
            border: '1px solid #BBF7D0',
            borderRadius: '6px',
            fontSize: '0.84rem',
            color: '#166534',
            lineHeight: 1.5
          }}>
            💬 <strong>Bank Transfer / GPay Verification:</strong> If you paid directly to SBI Bank account or GPay (<strong>90437 73977</strong>), please send your payment screenshot with your Registration ID (<strong>{displayRegId}</strong>) to WhatsApp: <strong>+91 90437 73977</strong> or Helpline: <strong>+91 94457 56377</strong> to activate your account.
          </div>

          <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            <a 
              href={`https://wa.me/919043773977?text=Vanakkam!%20I%20have%20transferred%20the%20Rs.1000%20registration%20fee%20for%20Registration%20ID:%20${displayRegId}.%20Please%20verify%20and%20activate%20my%20matrimony%20account.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-full"
              style={{ background: '#25D366', color: '#FFF', fontWeight: 700, padding: '0.65rem', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <span>📲 Send Payment Confirmation via WhatsApp (+91 90437 73977)</span>
            </a>
          </div>
        </div>

        {/* Navigation to Alliances with Locked Paywall Notice */}
        <div style={{ textAlign: 'center', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
          <span>Already paid and verified by Organizer?</span>{' '}
          <Link href="/alliances" style={{ color: 'var(--primary-maroon-dark)', fontWeight: 700, textDecoration: 'underline' }}>
            Check Alliance Profiles Access ➔
          </Link>
        </div>

      </div>
    </div>
  );
}

const bankRowStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0.5rem 0.75rem',
  background: '#F8FAFC',
  borderRadius: '6px',
  border: '1px solid #F1F5F9'
};

const labelStyle = {
  fontSize: '0.85rem',
  color: 'var(--text-muted)',
  fontWeight: 500
};

const valueStyle = {
  fontSize: '0.92rem',
  color: 'var(--text-main)',
  fontWeight: 700
};

const copyBtnStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.3rem',
  background: '#E0F2FE',
  color: '#0284C7',
  border: '1px solid #7DD3FC',
  borderRadius: '4px',
  padding: '2px 8px',
  fontSize: '0.75rem',
  fontWeight: 700,
  cursor: 'pointer'
};

