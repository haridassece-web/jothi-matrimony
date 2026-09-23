'use client';

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Send } from 'lucide-react';

export default function MessagesPage() {
  const { allProfiles, messages, sendMessage, interests } = useAuth();

  const chatProfiles = allProfiles.filter(p => interests.accepted.includes(p.id) || p.id === 'JM202600102');
  const [selectedId, setSelectedId] = useState(chatProfiles[0]?.id || 'JM202600102');
  const [textInput, setTextInput] = useState('');

  const activeProfile = allProfiles.find(p => p.id === selectedId) || chatProfiles[0];
  const conversation = messages[selectedId] || [
    { sender: 'them', text: 'Vanakkam! Glad to connect with your profile.', timestamp: '10:30 AM' }
  ];

  const handleSend = (e) => {
    e.preventDefault();
    if (!textInput.trim()) return;
    sendMessage(selectedId, textInput);
    setTextInput('');
  };

  return (
    <div style={{ padding: '2.5rem 0', minHeight: '85vh', background: 'var(--bg-silk)' }}>
      <div className="container" style={{ maxWidth: '960px' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '1.5rem', height: '650px' }}>
          
          {/* Left Thread List */}
          <div className="card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--primary-maroon-dark)', marginBottom: '1rem' }}>
              Messages ({chatProfiles.length})
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', overflowY: 'auto', flex: 1 }}>
              {chatProfiles.map(p => {
                const isSelected = p.id === selectedId;
                return (
                  <div 
                    key={p.id}
                    onClick={() => setSelectedId(p.id)}
                    style={{
                      padding: '0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      background: isSelected ? '#FDF2F5' : '#FFF',
                      border: isSelected ? '1.5px solid var(--primary-maroon)' : '1px solid var(--border-light)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      cursor: 'pointer'
                    }}>
                    <img src={p.photo} alt={p.name} style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {p.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{p.city}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Chat Panel */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {activeProfile && (
              <div style={{
                padding: '1rem 1.25rem',
                borderBottom: '1px solid var(--border-light)',
                background: 'var(--bg-surface)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.88rem'
              }}>
                <img src={activeProfile.photo} alt={activeProfile.name} style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <h4 style={{ fontSize: '1.05rem', margin: 0, color: 'var(--primary-maroon-dark)' }}>{activeProfile.name}</h4>
                  <div style={{ fontSize: '0.78rem', color: '#166534', fontWeight: 600 }}>📞 {activeProfile.phone} • Verified Member</div>
                </div>
              </div>
            )}

            <div style={{ flex: 1, padding: '1.25rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.88rem', background: '#FFFDF9' }}>
              {conversation.map((msg, i) => {
                const isMe = msg.sender === 'me';
                return (
                  <div 
                    key={i}
                    style={{
                      alignSelf: isMe ? 'flex-end' : 'flex-start',
                      maxWidth: '75%',
                      background: isMe ? 'var(--maroon-gradient)' : '#F1F5F9',
                      color: isMe ? '#FFF' : 'var(--text-main)',
                      padding: '0.75rem 1rem',
                      borderRadius: isMe ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                      boxShadow: 'var(--shadow-sm)'
                    }}>
                    <div style={{ fontSize: '0.92rem', lineHeight: 1.5 }}>{msg.text}</div>
                    <div style={{ fontSize: '0.68rem', textAlign: 'right', marginTop: '2px', opacity: 0.7 }}>{msg.timestamp}</div>
                  </div>
                );
              })}
            </div>

            <form onSubmit={handleSend} style={{ padding: '1rem', borderTop: '1px solid var(--border-light)', display: 'flex', gap: '0.5rem' }}>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Type your message here..."
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">
                <Send size={16} />
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
