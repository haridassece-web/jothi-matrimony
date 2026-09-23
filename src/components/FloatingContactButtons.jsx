import React from 'react';
import { PhoneCall, MessageCircle } from 'lucide-react';

export default function FloatingContactButtons() {
  return (
    <div 
      className="floating-contact-bar"
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        alignItems: 'flex-end'
      }}
    >
      {/* WhatsApp Floating CTA */}
      <a 
        href="https://wa.me/919043773977?text=Vanakkam!%20I%20am%20interested%20in%20Chennai%20Jothi%20Matrimony%20alliance%20registration."
        target="_blank"
        rel="noopener noreferrer"
        title="Chat on WhatsApp"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: '#25D366',
          color: '#FFFFFF',
          padding: '10px 16px',
          borderRadius: '30px',
          fontWeight: 700,
          fontSize: '0.88rem',
          boxShadow: '0 6px 20px rgba(37, 211, 102, 0.4)',
          textDecoration: 'none',
          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
        className="whatsapp-float"
      >
        <MessageCircle size={20} fill="#FFF" color="#25D366" />
        <span>WhatsApp Us</span>
      </a>

      {/* Direct Call Floating CTA */}
      <a 
        href="tel:9043773977"
        title="Call Chennai Jothi Matrimony"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'linear-gradient(135deg, #7A0C2E 0%, #A11440 100%)',
          color: '#FFFFFF',
          padding: '10px 16px',
          borderRadius: '30px',
          fontWeight: 700,
          fontSize: '0.88rem',
          boxShadow: '0 6px 20px rgba(122, 12, 46, 0.35)',
          border: '1.5px solid #D4AF37',
          textDecoration: 'none',
          transition: 'all 0.3s ease'
        }}
        className="call-float"
      >
        <PhoneCall size={18} color="#FBF5B7" />
        <span>Call: 9043773977</span>
      </a>
    </div>
  );
}
