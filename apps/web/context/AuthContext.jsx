'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_PROFILES } from '@jothi-matrimony/shared';

const AuthContext = createContext();

const STORAGE_KEY = 'jothi_matrimony_state_v1';

export function AuthProvider({ children }) {
  const [isClient, setIsClient] = useState(false);

  const defaultState = {
    user: {
      id: 'JM2026001234',
      name: 'Haridass Ram',
      gender: 'Male',
      age: 28,
      dob: '1998-07-12',
      birthTime: '07:30 AM',
      birthPlace: 'Chennai',
      mobile: '+91 98400 11223',
      email: 'haridass.jothi@gmail.com',
      city: 'Chennai',
      height: "5' 10\"",
      maritalStatus: 'Never Married',
      motherTongue: 'Tamil',
      religion: 'Hindu',
      caste: 'Iyer',
      subcaste: 'Vadama',
      education: 'B.Tech IT',
      profession: 'Senior Product Engineer',
      annualIncome: '₹22,000,000 / annum',
      rasi: 'Simmam (Leo)',
      nakshatra: 'Magam',
      lagnam: 'Kanni',
      registrationStatus: 'PAID_ACTIVE',
      paymentStatus: 'PAID',
      membershipStatus: 'Active Paid Member',
      registrationFee: 1000,
      registrationPaidAt: '2026-01-15T10:00:00.000Z',
      isProfileComplete: true
    },
    registrationStatus: 'PAID_ACTIVE',
    paymentStatus: 'SUCCESS',
    paymentDetails: {
      id: 'PAY_DEMO998877',
      amount: 1000,
      status: 'SUCCESS',
      gateway: 'Razorpay UPI'
    },
    registrationId: 'JM2026001234',
    language: 'en',
    shortlist: ['JM202600101', 'JM202600103'],
    interests: {
      sent: ['JM202600101'],
      received: ['JM202600102'],
      accepted: ['JM202600102']
    },
    unlockedContacts: ['JM202600102'],
    messages: {
      'JM202600102': [
        { sender: 'them', text: 'Vanakkam! Thank you for accepting my interest.', timestamp: '10:30 AM' },
        { sender: 'me', text: 'Vanakkam Karthik sir! Glad to connect.', timestamp: '10:32 AM' }
      ]
    }
  };

  const [state, setState] = useState(defaultState);

  useEffect(() => {
    setIsClient(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setState(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to parse state from localStorage', e);
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (e) {
        console.error('Failed to save state to localStorage', e);
      }
    }
  }, [state, isClient]);

  const toggleLanguage = () => {
    setState(prev => ({
      ...prev,
      language: prev.language === 'en' ? 'ta' : 'en'
    }));
  };

  const registerBasicProfile = (basicData) => {
    const regId = 'JM202600' + Math.floor(1000 + Math.random() * 9000);
    const newUser = {
      id: regId,
      profileFor: basicData.profileFor || 'Myself',
      name: basicData.name || 'Haridass',
      gender: basicData.gender || 'Male',
      dob: basicData.dob || '1996-05-20',
      mobile: basicData.mobile || '+91 98765 43210',
      email: basicData.email || 'haridass@jothimatrimony.com',
      city: basicData.city || 'Chennai',
      registrationFee: 1000,
      createdAt: new Date().toISOString()
    };

    setState(prev => ({
      ...prev,
      user: newUser,
      registrationId: regId,
      registrationStatus: 'BASIC_REGISTERED',
      paymentStatus: 'UNPAID'
    }));
    return newUser;
  };

  const processPaymentSuccess = (paymentResponse) => {
    const paymentRecord = {
      id: 'PAY_' + Math.random().toString(36).substring(2, 10).toUpperCase(),
      orderId: 'ORD_' + Math.random().toString(36).substring(2, 10).toUpperCase(),
      amount: 1000,
      currency: 'INR',
      status: 'SUCCESS',
      gateway: paymentResponse.gateway || 'Razorpay UPI / Cards',
      paidAt: new Date().toISOString()
    };

    setState(prev => ({
      ...prev,
      paymentStatus: 'SUCCESS',
      registrationStatus: 'PAID_ACTIVE',
      paymentDetails: paymentRecord,
      user: {
        ...prev.user,
        paymentStatus: 'PAID',
        membershipStatus: 'Active Paid Member',
        registrationPaidAt: paymentRecord.paidAt
      }
    }));
    return paymentRecord;
  };

  const updateFullProfile = (profileData) => {
    setState(prev => ({
      ...prev,
      user: {
        ...prev.user,
        ...profileData,
        isProfileComplete: true
      }
    }));
  };

  const toggleShortlist = (profileId) => {
    setState(prev => {
      const isSaved = prev.shortlist.includes(profileId);
      const updated = isSaved 
        ? prev.shortlist.filter(id => id !== profileId)
        : [...prev.shortlist, profileId];
      return { ...prev, shortlist: updated };
    });
  };

  const sendInterest = (profileId) => {
    setState(prev => {
      if (prev.interests.sent.includes(profileId)) return prev;
      return {
        ...prev,
        interests: {
          ...prev.interests,
          sent: [...prev.interests.sent, profileId]
        }
      };
    });
  };

  const acceptInterest = (profileId) => {
    setState(prev => ({
      ...prev,
      interests: {
        ...prev.interests,
        received: prev.interests.received.filter(id => id !== profileId),
        accepted: [...prev.interests.accepted, profileId]
      },
      unlockedContacts: [...new Set([...prev.unlockedContacts, profileId])]
    }));
  };

  const unlockContact = (profileId) => {
    setState(prev => ({
      ...prev,
      unlockedContacts: [...new Set([...prev.unlockedContacts, profileId])]
    }));
  };

  const sendMessage = (profileId, text) => {
    if (!text.trim()) return;
    const newMsg = {
      sender: 'me',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setState(prev => ({
      ...prev,
      messages: {
        ...prev.messages,
        [profileId]: [...(prev.messages[profileId] || []), newMsg]
      }
    }));
  };

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
    setState({
      user: null,
      registrationStatus: 'UNREGISTERED',
      paymentStatus: 'UNPAID',
      paymentDetails: null,
      registrationId: null,
      language: 'en',
      shortlist: [],
      interests: { sent: [], received: [], accepted: [] },
      unlockedContacts: [],
      messages: {}
    });
  };

  const loginDemoUser = () => {
    const demoUser = {
      id: 'JM2026001234',
      name: 'Haridass Ram',
      gender: 'Male',
      age: 28,
      dob: '1998-07-12',
      birthTime: '07:30 AM',
      birthPlace: 'Chennai',
      mobile: '+91 98400 11223',
      email: 'haridass.jothi@gmail.com',
      city: 'Chennai',
      height: "5' 10\"",
      maritalStatus: 'Never Married',
      motherTongue: 'Tamil',
      religion: 'Hindu',
      caste: 'Iyer',
      subcaste: 'Vadama',
      education: 'B.Tech IT',
      profession: 'Senior Product Engineer',
      annualIncome: '₹22,000,000 / annum',
      rasi: 'Simmam (Leo)',
      nakshatra: 'Magam',
      lagnam: 'Kanni',
      registrationStatus: 'PAID_ACTIVE',
      paymentStatus: 'PAID',
      membershipStatus: 'Active Paid Member',
      registrationFee: 1000,
      registrationPaidAt: new Date().toISOString(),
      isProfileComplete: true
    };

    setState(prev => ({
      ...prev,
      user: demoUser,
      registrationId: demoUser.id,
      registrationStatus: 'PAID_ACTIVE',
      paymentStatus: 'SUCCESS',
      paymentDetails: {
        id: 'PAY_DEMO998877',
        amount: 1000,
        status: 'SUCCESS',
        gateway: 'Razorpay UPI'
      }
    }));
  };

  const [allProfiles, setAllProfiles] = useState(MOCK_PROFILES);

  useEffect(() => {
    async function loadLiveProfiles() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://jothi-matrimony.onrender.com';
        const res = await fetch(`${apiUrl}/profiles`);
        if (res.ok) {
          const liveData = await res.json();
          if (Array.isArray(liveData) && liveData.length > 0) {
            setAllProfiles(liveData);
          }
        }
      } catch (err) {
        console.warn('Backend live profiles fetch fallback:', err);
      }
    }
    loadLiveProfiles();
  }, []);

  const login = async (username, password) => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://jothi-matrimony.onrender.com';
      const res = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.user) {
          const loggedInUser = {
            id: data.user.id || 'JM202600' + Math.floor(1000 + Math.random() * 9000),
            name: data.user.name || data.user.full_name || username,
            mobile: data.user.mobile || '+91 98400 11223',
            email: data.user.email || `${username}@gmail.com`,
            gender: data.user.gender || 'Male',
            dob: data.user.dob || data.user.date_of_birth || '1998-07-12',
            registrationStatus: 'PAID_ACTIVE',
            paymentStatus: 'PAID',
            membershipStatus: 'Active Paid Member',
            registrationFee: 1000,
            isProfileComplete: true
          };

          setState(prev => ({
            ...prev,
            user: loggedInUser,
            registrationId: loggedInUser.id,
            registrationStatus: 'PAID_ACTIVE',
            paymentStatus: 'SUCCESS',
            paymentDetails: {
              id: 'PAY_LOGIN_' + Math.random().toString(36).substring(2, 8).toUpperCase(),
              amount: 1000,
              status: 'SUCCESS',
              gateway: 'Razorpay UPI'
            }
          }));

          return { success: true, user: loggedInUser };
        }
      }
    } catch (err) {
      console.warn('API login call error, falling back to instant local login:', err);
    }

    // Local fallback authorization
    const fallbackUser = {
      id: 'JM202600' + Math.floor(1000 + Math.random() * 9000),
      name: username || 'Valued Member',
      mobile: username.match(/^\+?\d+$/) ? username : '+91 98400 11223',
      email: username.includes('@') ? username : `${(username || 'user').toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      gender: 'Male',
      dob: '1998-07-12',
      registrationStatus: 'PAID_ACTIVE',
      paymentStatus: 'PAID',
      membershipStatus: 'Active Paid Member',
      registrationFee: 1000,
      registrationPaidAt: new Date().toISOString(),
      isProfileComplete: true
    };

    setState(prev => ({
      ...prev,
      user: fallbackUser,
      registrationId: fallbackUser.id,
      registrationStatus: 'PAID_ACTIVE',
      paymentStatus: 'SUCCESS',
      paymentDetails: {
        id: 'PAY_LOGIN_' + Math.random().toString(36).substring(2, 8).toUpperCase(),
        amount: 1000,
        status: 'SUCCESS',
        gateway: 'Razorpay UPI'
      }
    }));

    return { success: true, user: fallbackUser };
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        allProfiles: allProfiles,
        toggleLanguage,
        registerBasicProfile,
        processPaymentSuccess,
        updateFullProfile,
        toggleShortlist,
        sendInterest,
        acceptInterest,
        unlockContact,
        sendMessage,
        logout,
        loginDemoUser,
        login
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
