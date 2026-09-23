import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  ShieldCheck, CreditCard, QrCode, Building, Wallet, 
  CheckCircle2, Loader2, X, Lock, ArrowRight 
} from 'lucide-react';

export default function RazorpayModal({ isOpen, onClose, onSuccess }) {
  const { user, processPaymentSuccess, language } = useAuth();
  
  const [tab, setTab] = useState('upi'); // 'upi' | 'card' | 'netbanking' | 'wallet'
  const [paymentState, setPaymentState] = useState('IDLE'); // 'IDLE' | 'PROCESSING' | 'VERIFYING' | 'SUCCESS'
  const [cardData, setCardData] = useState({
    number: '4532 8920 1122 3456',
    expiry: '08/28',
    cvv: '892',
    name: user?.name || 'Haridass Ram'
  });
  const [paymentInfo, setPaymentInfo] = useState(null);

  if (!isOpen) return null;

  const handleExecutePayment = (gatewayName = 'Razorpay UPI (GPay)') => {
    setPaymentState('PROCESSING');

    // Simulate Gateway bank response time
    setTimeout(() => {
      setPaymentState('VERIFYING');

      // Simulate Server-side Webhook verification
      setTimeout(() => {
        const record = processPaymentSuccess({ gateway: gatewayName });
        setPaymentInfo(record);
        setPaymentState('SUCCESS');
      }, 1500);
    }, 2000);
  };

  const handleFinish = () => {
    setPaymentState('IDLE');
    if (onSuccess) onSuccess();
    onClose();
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 9999 }}>
      <div className="modal-content" style={{ maxWidth: '460px', padding: 0, overflow: 'hidden', border: '1px solid #3399FF' }}>
        
        {/* Razorpay Top Header */}
        <div style={{
          background: 'linear-gradient(135deg, #0C2340 0%, #1A365D 100%)',
          color: '#FFFFFF',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '3px solid #3399FF'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
              <span style={{
                background: '#3399FF',
                color: '#FFF',
                fontSize: '0.68rem',
                fontWeight: 800,
                padding: '2px 6px',
                borderRadius: '4px',
                letterSpacing: '0.05em'
              }}>
                RAZORPAY SECURE
              </span>
              <span style={{ fontSize: '0.75rem', color: '#90CDF4' }}>256-bit SSL</span>
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFF' }}>
              Chennai Jothi Matrimony
            </div>
            <div style={{ fontSize: '0.8rem', color: '#CBD5E0' }}>
              Registration Fee • 1 Year Access
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#68D391' }}>
              ₹1,000
            </div>
            <button 
              onClick={onClose}
              disabled={paymentState !== 'IDLE'}
              style={{
                background: 'rgba(255,255,255,0.15)',
                border: 'none',
                color: '#FFF',
                borderRadius: '50%',
                width: '28px',
                height: '28px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '4px',
                cursor: 'pointer'
              }}>
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Modal Body depending on Payment State */}
        {paymentState === 'IDLE' && (
          <div style={{ padding: '1.25rem' }}>
            {/* Payment Method Tabs */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '6px',
              marginBottom: '1.25rem',
              background: '#F1F5F9',
              padding: '4px',
              borderRadius: '8px'
            }}>
              <button 
                onClick={() => setTab('upi')}
                style={tabBtnStyle(tab === 'upi')}>
                <QrCode size={16} />
                <span>UPI / QR</span>
              </button>
              <button 
                onClick={() => setTab('card')}
                style={tabBtnStyle(tab === 'card')}>
                <CreditCard size={16} />
                <span>Card</span>
              </button>
              <button 
                onClick={() => setTab('netbanking')}
                style={tabBtnStyle(tab === 'netbanking')}>
                <Building size={16} />
                <span>NetBank</span>
              </button>
              <button 
                onClick={() => setTab('wallet')}
                style={tabBtnStyle(tab === 'wallet')}>
                <Wallet size={16} />
                <span>Wallets</span>
              </button>
            </div>

            {/* Tab 1: UPI & QR Code */}
            {tab === 'upi' && (
              <div style={{ textAlign: 'center', padding: '0.5rem 0' }}>
                <div style={{ 
                  background: '#FFF', 
                  border: '2px dashed #CBD5E1', 
                  borderRadius: '12px', 
                  padding: '1rem', 
                  display: 'inline-block',
                  marginBottom: '1rem'
                }}>
                  <div style={{
                    width: '150px',
                    height: '150px',
                    margin: '0 auto',
                    background: 'linear-gradient(45deg, #1E293B 25%, transparent 25%, transparent 75%, #1E293B 75%, #1E293B), linear-gradient(45deg, #1E293B 25%, transparent 25%, transparent 75%, #1E293B 75%, #1E293B)',
                    backgroundSize: '20px 20px',
                    backgroundPosition: '0 0, 10px 10px',
                    opacity: 0.8,
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFF',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    textAlign: 'center'
                  }}>
                    [ SCAN WITH <br/> GPAY / PHONEPE ]
                  </div>
                </div>

                <div style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '1rem', fontWeight: 500 }}>
                  Scan using Google Pay, PhonePe, Paytm or BHIM UPI app
                </div>

                <button 
                  onClick={() => handleExecutePayment('Razorpay UPI Instant')}
                  className="btn btn-full"
                  style={{
                    background: '#3399FF',
                    color: '#FFF',
                    fontWeight: 700,
                    fontSize: '1rem',
                    borderRadius: '8px'
                  }}>
                  <span>Simulate GPay / PhonePe ₹1,000 Pay</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            )}

            {/* Tab 2: Cards */}
            {tab === 'card' && (
              <div>
                <div className="form-group">
                  <label className="form-label">Card Number</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={cardData.number}
                    onChange={(e) => setCardData({...cardData, number: e.target.value})}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Expiry (MM/YY)</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={cardData.expiry}
                      onChange={(e) => setCardData({...cardData, expiry: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">CVV</label>
                    <input 
                      type="password" 
                      className="form-input" 
                      value={cardData.cvv}
                      onChange={(e) => setCardData({...cardData, cvv: e.target.value})}
                    />
                  </div>
                </div>

                <button 
                  onClick={() => handleExecutePayment('Razorpay Card Gateway')}
                  className="btn btn-full"
                  style={{
                    background: '#3399FF',
                    color: '#FFF',
                    fontWeight: 700,
                    borderRadius: '8px',
                    marginTop: '0.5rem'
                  }}>
                  Pay ₹1,000 via Card
                </button>
              </div>
            )}

            {/* Tab 3: NetBanking */}
            {tab === 'netbanking' && (
              <div>
                <div style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '0.75rem', fontWeight: 600 }}>
                  Select Your Bank:
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', marginBottom: '1rem' }}>
                  {['SBI Bank', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Indian Overseas Bank', 'Canara Bank'].map((bank, idx) => (
                    <button 
                      key={idx}
                      onClick={() => handleExecutePayment(`Razorpay NetBanking (${bank})`)}
                      style={{
                        padding: '0.6rem',
                        borderRadius: '6px',
                        border: '1px solid #CBD5E1',
                        background: '#FFF',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        textAlign: 'left'
                      }}>
                      🏦 {bank}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 4: Wallet */}
            {tab === 'wallet' && (
              <div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1rem' }}>
                  {['Paytm Wallet', 'Amazon Pay', 'Mobikwik', 'Airtel Money'].map((wallet, idx) => (
                    <button 
                      key={idx}
                      onClick={() => handleExecutePayment(`Razorpay Wallet (${wallet})`)}
                      style={{
                        padding: '0.75rem',
                        borderRadius: '6px',
                        border: '1px solid #CBD5E1',
                        background: '#FFF',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}>
                      <span>💳 {wallet}</span>
                      <span style={{ color: '#3399FF', fontSize: '0.8rem' }}>Pay ₹1,000</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div style={{
              marginTop: '1rem',
              paddingTop: '0.75rem',
              borderTop: '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              fontSize: '0.75rem',
              color: '#64748B'
            }}>
              <Lock size={12} />
              <span>Verified 100% Server-side Encrypted Payment</span>
            </div>
          </div>
        )}

        {/* Processing State */}
        {(paymentState === 'PROCESSING' || paymentState === 'VERIFYING') && (
          <div style={{ padding: '3rem 1.5rem', textAlign: 'center' }}>
            <Loader2 size={48} className="spin-icon" style={{ color: '#3399FF', animation: 'spin 1s linear infinite', marginBottom: '1.25rem' }} />
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#0F172A' }}>
              {paymentState === 'PROCESSING' ? 'Processing Bank Payment...' : 'Verifying Server Signature...'}
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#64748B' }}>
              Please do not close this window or refresh the page.
            </p>
          </div>
        )}

        {/* Success State */}
        {paymentState === 'SUCCESS' && (
          <div style={{ padding: '2.5rem 1.5rem', textAlign: 'center' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#DCFCE7',
              color: '#15803D',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem'
            }}>
              <CheckCircle2 size={40} />
            </div>

            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#14532D', marginBottom: '0.3rem' }}>
              🎉 Registration Payment Successful!
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#374151', marginBottom: '1.25rem' }}>
              Your ₹1,000 payment has been verified server-side. Account activated!
            </p>

            <div style={{
              background: '#F0FDF4',
              border: '1px solid #BBF7D0',
              borderRadius: '8px',
              padding: '0.88rem',
              fontSize: '0.85rem',
              textAlign: 'left',
              marginBottom: '1.5rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ color: '#4B5563' }}>Registration ID:</span>
                <strong style={{ color: '#166534' }}>{user?.id || 'JM2026001234'}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ color: '#4B5563' }}>Payment ID:</span>
                <strong style={{ color: '#166534' }}>{paymentInfo?.id || 'PAY_98234729'}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#4B5563' }}>Membership:</span>
                <strong style={{ color: '#166534' }}>Active Member (1 Year)</strong>
              </div>
            </div>

            <button 
              onClick={handleFinish}
              className="btn btn-primary btn-full btn-lg">
              Proceed to Complete Profile & Browse Alliances →
            </button>
          </div>
        )}

      </div>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

function tabBtnStyle(isActive) {
  return {
    padding: '0.5rem',
    borderRadius: '6px',
    border: 'none',
    background: isActive ? '#FFFFFF' : 'transparent',
    color: isActive ? '#3399FF' : '#64748B',
    fontWeight: isActive ? 700 : 500,
    fontSize: '0.78rem',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '3px',
    boxShadow: isActive ? '0 1px 4px rgba(0,0,0,0.08)' : 'none'
  };
}
