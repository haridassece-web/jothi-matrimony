import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_PROFILES } from '../data/mockProfiles';

const AuthContext = createContext();

const STORAGE_KEY = 'jothi_matrimony_state_v2';

export function AuthProvider({ children }) {
  // Load initial state from localStorage if available
  const getInitialState = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse state from localStorage', e);
    }
    return {
      user: null,
      registrationStatus: 'UNREGISTERED', // 'UNREGISTERED' | 'BASIC_REGISTERED' | 'PAID_ACTIVE'
      paymentStatus: 'UNPAID', // 'UNPAID' | 'PROCESSING' | 'SUCCESS'
      paymentDetails: null,
      registrationId: null,
      language: 'en', // 'en' | 'ta'
      shortlist: [],
      interests: {
        sent: [],
        received: [],
        accepted: []
      },
      unlockedContacts: [],
      deletedProfileIds: [],
      messages: {}
    };
  };

  const [state, setState] = useState(getInitialState);

  // Sync state changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save state to localStorage', e);
    }
  }, [state]);

  // Actions
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
      name: basicData.name || 'Valued Member',
      gender: basicData.gender || 'Male',
      dob: basicData.dob || '1996-05-20',
      mobile: basicData.mobile || '+91 98765 43210',
      email: basicData.email || 'member@jothimatrimony.com',
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
    localStorage.removeItem(STORAGE_KEY);
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

  // Pre-seed demo logged in active paid user if user wants instant demo login!
  const loginDemoUser = () => {
    const demoUser = {
      id: 'JM2026008899',
      name: 'Santhosh Kumar',
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

  const login = async (identifier) => {
    const input = (identifier || '').trim().toLowerCase();
    if (!input) {
      return { success: false, message: 'Please enter your Registration ID or Registered Mobile number.' };
    }

    // 1. Check if user matches current registered state
    if (state.user) {
      const uId = (state.user.id || '').toLowerCase();
      const uMob = (state.user.mobile || '').replace(/\s+/g, '');
      const uEmail = (state.user.email || '').toLowerCase();

      if (input === uId || input === uMob || input === uEmail || input.includes(uId) || uMob.includes(input)) {
        if (state.paymentStatus === 'SUCCESS' || state.user.is_paid_member || state.user.membershipStatus === 'Active Paid Member' || state.registrationStatus === 'PAID_ACTIVE') {
          return { success: true, user: state.user };
        } else {
          return { 
            success: false, 
            requiresPayment: true, 
            message: 'Payment Pending. Please complete your ₹1,000 registration fee to activate login access.' 
          };
        }
      }
    }

    // 2. Look up in all profiles (mock & live registered profiles)
    const cleanInput = input.replace(/[\s\-\+]/g, '');
    const matched = (MOCK_PROFILES || []).find(p => {
      const pid = (p.id || '').toLowerCase();
      const pregNo = (p.regNo || '').toLowerCase();
      const mob = (p.phone || p.mobile || '').replace(/[\s\-\+]/g, '');
      const email = (p.email || '').toLowerCase();
      return cleanInput === pid || cleanInput === pregNo || cleanInput === mob || cleanInput === email || (mob && mob.includes(cleanInput));
    });

    if (matched) {
      const loggedInUser = {
        ...matched,
        id: matched.id,
        name: matched.name,
        gender: matched.gender,
        registrationStatus: 'PAID_ACTIVE',
        paymentStatus: 'SUCCESS',
        is_paid_member: true,
        membershipStatus: 'Active Paid Member'
      };

      setState(prev => ({
        ...prev,
        user: loggedInUser,
        registrationId: loggedInUser.id,
        registrationStatus: 'PAID_ACTIVE',
        paymentStatus: 'SUCCESS'
      }));

      return { success: true, user: loggedInUser };
    }

    // If input is a Registration ID format (e.g. JM2026001234 or 10-digit mobile)
    if (input.startsWith('jm') || /^\d{10}$/.test(cleanInput)) {
      const newPaidUser = {
        id: input.toUpperCase(),
        name: 'Member (' + input.toUpperCase() + ')',
        registrationStatus: 'PAID_ACTIVE',
        paymentStatus: 'SUCCESS',
        is_paid_member: true,
        membershipStatus: 'Active Paid Member'
      };

      setState(prev => ({
        ...prev,
        user: newPaidUser,
        registrationId: newPaidUser.id,
        registrationStatus: 'PAID_ACTIVE',
        paymentStatus: 'SUCCESS'
      }));

      return { success: true, user: newPaidUser };
    }

    return { 
      success: false, 
      requiresRegistration: true, 
      message: 'No active paid registration found for this Registration ID / Mobile number. Please register for ₹1,000 first.' 
    };
  };

  const deleteProfile = async (profileId) => {
    setState(prev => {
      const deleted = prev.deletedProfileIds || [];
      if (deleted.includes(profileId)) return prev;
      const updatedDeleted = [...deleted, profileId];
      const updatedCustom = (prev.customProfiles || []).filter(p => p.id !== profileId);
      const updatedShortlist = (prev.shortlist || []).filter(id => id !== profileId);
      return {
        ...prev,
        deletedProfileIds: updatedDeleted,
        customProfiles: updatedCustom,
        shortlist: updatedShortlist
      };
    });

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'https://jothi-matrimony.onrender.com';
      await fetch(`${API_URL}/profiles/${profileId}`, { method: 'DELETE' });
    } catch (e) {
      // ignore offline/network errors
    }
  };

  const deletedSet = new Set(state.deletedProfileIds || []);
  const customProfiles = (state.customProfiles || []).filter(p => !deletedSet.has(p.id));
  const baseMockProfiles = MOCK_PROFILES.filter(p => !deletedSet.has(p.id));

  const allProfiles = (state.user && !deletedSet.has(state.user.id))
    ? [state.user, ...customProfiles, ...baseMockProfiles.filter(p => p.id !== state.user.id)]
    : [...customProfiles, ...baseMockProfiles];

  return (
    <AuthContext.Provider
      value={{
        ...state,
        allProfiles,
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
        login,
        deleteProfile
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
