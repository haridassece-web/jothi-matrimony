'use client';

import React from 'react';
import { PhoneCall, MessageCircle } from 'lucide-react';

export default function FloatingContactButtons() {
  return (
    <div 
      className="floating-contact-bar"
      style={{
        position: 'fixed',
        bottom: '22px',
        right: '22px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        alignItems: 'center'
      }}
    >
      {/* WhatsApp Symbol Only Button */}
      <a 
        href="https://wa.me/919043773977?text=Vanakkam!%20I%20am%20interested%20in%20Chennai%20Jothi%20Matrimony%20alliance%20registration."
        target="_blank"
        rel="noopener noreferrer"
        title="WhatsApp Us (+91 90437 73977)"
        style={{
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          background: '#25D366',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 6px 20px rgba(37, 211, 102, 0.5)',
          textDecoration: 'none',
          transition: 'transform 0.25s ease, boxShadow 0.25s ease'
        }}
        className="whatsapp-float-symbol"
      >
        <MessageCircle size={28} fill="#FFF" color="#25D366" />
      </a>

      {/* Direct Call Symbol Only Button */}
      <a 
        href="tel:9043773977"
        title="Call Chennai Jothi Matrimony (9043773977 / 9444934527)"
        style={{
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #7A0C2E 0%, #A11440 100%)',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 6px 20px rgba(122, 12, 46, 0.45)',
          border: '2px solid #D4AF37',
          textDecoration: 'none',
          transition: 'transform 0.25s ease, boxShadow 0.25s ease'
        }}
        className="call-float-symbol"
      >
        <PhoneCall size={24} color="#FBF5B7" />
      </a>
    </div>
  );
}
