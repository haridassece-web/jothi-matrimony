'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_PROFILES } from '@jothi-matrimony/shared';

const AuthContext = createContext();

const STORAGE_KEY = 'jothi_matrimony_state_v2';

export function AuthProvider({ children }) {
  const [isClient, setIsClient] = useState(false);

  const defaultState = {
    user: null,
    customProfiles: [],
    registrationStatus: 'UNREGISTERED',
    paymentStatus: 'UNPAID',
    paymentDetails: null,
    registrationId: null,
    language: 'en',
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

  const [state, setState] = useState(defaultState);

  useEffect(() => {
    setIsClient(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setState(prev => ({
          ...defaultState,
          ...parsed,
          customProfiles: parsed.customProfiles || []
        }));
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
    const cleanMob = (basicData.mobile || '').replace(/\D/g, '');
    const regId = 'JM202600' + Math.floor(1000 + Math.random() * 9000);
    const primaryId = cleanMob ? cleanMob : regId;

    const birthYear = basicData.dob ? new Date(basicData.dob).getFullYear() : 1996;
    const computedAge = Math.max(18, new Date().getFullYear() - birthYear);

    const defaultPhoto = basicData.gender === 'Female' 
      ? 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600'
      : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600';

    const newUser = {
      id: primaryId,
      regNo: regId,
      profileFor: basicData.profileFor || 'Myself',
      name: basicData.name || 'Valued Member',
      gender: basicData.gender || 'Male',
      dob: basicData.dob || '1996-05-20',
      age: computedAge,
      mobile: basicData.mobile || '+91 98765 43210',
      phone: basicData.mobile || '+91 98765 43210',
      email: basicData.email || `${primaryId}@jothimatrimony.com`,
      city: basicData.city || 'Chennai',
      state: 'Tamil Nadu',
      height: "5' 8\" (173 cm)",
      maritalStatus: 'Never Married',
      motherTongue: 'Tamil',
      religion: 'Hindu',
      caste: 'Iyer',
      subcaste: 'Vadama',
      gothram: 'Kashyapa',
      education: 'B.Tech / Graduate',
      institution: 'Anna University',
      profession: 'Software Engineer / Professional',
      company: 'Tech / MNC',
      annualIncome: '₹12,000,000 / annum',
      nativeTown: basicData.city || 'Chennai',
      houseProperty: 'Own House (சொந்த வீடு)',
      address: `${basicData.city || 'Chennai'}, Tamil Nadu`,
      family: {
        fatherOccupation: 'Government / Private Officer',
        motherOccupation: 'Homemaker',
        siblings: '1 Sibling',
        familyType: 'Nuclear Family',
        familyStatus: 'Upper Middle Class'
      },
      rasi: 'Thulaam (Libra)',
      nakshatra: 'Chithirai',
      lagnam: 'Dhanusu (Sagittarius)',
      chevvaiDosham: 'No',
      about: `${basicData.name || 'Member'} is an educated, cultured, family-oriented Tamil professional seeking a compatible life partner.`,
      photo: defaultPhoto,
      photos: [defaultPhoto],
      partnerPreferences: {
        ageMin: 21,
        ageMax: 32,
        heightMin: "4' 6\"",
        heightMax: "6' 2\"",
        education: 'Open to All Qualifications',
        profession: 'Working / Business / Professional',
        castePreference: 'Open to All Communities',
        maritalStatus: 'Never Married',
        location: 'Chennai / Tamil Nadu',
        notes: 'Looking for an educated, cultured, family-oriented partner with good moral values.'
      },
      registrationFee: 1000,
      registrationStatus: 'BASIC_REGISTERED',
      paymentStatus: 'UNPAID',
      is_paid_member: false,
      membershipStatus: 'Registered Member',
      createdAt: new Date().toISOString()
    };

    setState(prev => {
      const currentCustom = prev.customProfiles || [];
      const filteredCustom = currentCustom.filter(p => p.id !== newUser.id && p.regNo !== newUser.regNo && p.mobile !== newUser.mobile);
      return {
        ...prev,
        user: newUser,
        registrationId: newUser.id,
        registrationStatus: 'BASIC_REGISTERED',
        paymentStatus: 'UNPAID',
        customProfiles: [newUser, ...filteredCustom]
      };
    });

    // Background sync to backend API
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://jothi-matrimony.onrender.com';
      fetch(`${API_URL}/profiles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      }).catch(err => console.warn('Backend sync warning:', err));
    } catch (e) {}

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

    setState(prev => {
      const updatedUser = {
        ...prev.user,
        paymentStatus: 'PAID',
        membershipStatus: 'Active Paid Member',
        is_paid_member: true,
        registrationPaidAt: paymentRecord.paidAt,
        registrationStatus: 'PAID_ACTIVE'
      };

      const currentCustom = prev.customProfiles || [];
      const updatedCustom = currentCustom.map(p => {
        if (p.id === updatedUser.id || p.regNo === updatedUser.regNo) {
          return updatedUser;
        }
        return p;
      });

      if (!updatedCustom.some(p => p.id === updatedUser.id)) {
        updatedCustom.unshift(updatedUser);
      }

      return {
        ...prev,
        paymentStatus: 'SUCCESS',
        registrationStatus: 'PAID_ACTIVE',
        paymentDetails: paymentRecord,
        user: updatedUser,
        customProfiles: updatedCustom
      };
    });

    return paymentRecord;
  };

  const updateFullProfile = (profileData) => {
    setState(prev => {
      const updatedUser = {
        ...prev.user,
        ...profileData,
        isProfileComplete: true
      };

      const currentCustom = prev.customProfiles || [];
      const updatedCustom = currentCustom.map(p => {
        if (p.id === updatedUser.id || p.regNo === updatedUser.regNo || p.mobile === updatedUser.mobile) {
          return updatedUser;
        }
        return p;
      });

      if (!updatedCustom.some(p => p.id === updatedUser.id)) {
        updatedCustom.unshift(updatedUser);
      }

      return {
        ...prev,
        user: updatedUser,
        customProfiles: updatedCustom
      };
    });

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://jothi-matrimony.onrender.com';
      fetch(`${API_URL}/profiles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData)
      }).catch(err => console.warn('API profile save warning:', err));
    } catch (e) {}
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
      ...defaultState,
      customProfiles: state.customProfiles || []
    });
  };

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
      email: 'santhosh.jothi@gmail.com',
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

  const [liveProfiles, setLiveProfiles] = useState(MOCK_PROFILES);

  useEffect(() => {
    async function loadLiveProfiles() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://jothi-matrimony.onrender.com';
        const res = await fetch(`${apiUrl}/profiles`);
        if (res.ok) {
          const liveData = await res.json();
          if (Array.isArray(liveData) && liveData.length > 0) {
            setLiveProfiles(liveData);
          }
        }
      } catch (err) {
        console.warn('Backend live profiles fetch fallback:', err);
      }
    }
    loadLiveProfiles();
  }, []);

  const deletedSet = new Set(state.deletedProfileIds || []);
  const combinedMockAndLive = Array.isArray(liveProfiles) && liveProfiles.length > 0
    ? [...MOCK_PROFILES, ...liveProfiles.filter(lp => !MOCK_PROFILES.some(mp => mp.id === lp.id))]
    : MOCK_PROFILES;

  const filteredCombined = combinedMockAndLive.filter(p => !deletedSet.has(p.id));
  const customProfiles = (state.customProfiles || []).filter(p => !deletedSet.has(p.id));

  const allProfiles = (state.user && !deletedSet.has(state.user.id))
    ? [state.user, ...customProfiles.filter(cp => cp.id !== state.user.id), ...filteredCombined.filter(p => p.id !== state.user.id && !customProfiles.some(cp => cp.id === p.id))]
    : [...customProfiles, ...filteredCombined.filter(p => !customProfiles.some(cp => cp.id === p.id))];

  const login = async (identifier) => {
    const input = (identifier || '').trim().toLowerCase();
    if (!input) {
      return { success: false, message: 'Please enter your Registration ID or Registered Mobile number.' };
    }

    const cleanInput = input.replace(/[\s\-\+]/g, '');

    // 1. Check if user matches current registered state
    if (state.user) {
      const uId = (state.user.id || '').toLowerCase();
      const uRegNo = (state.user.regNo || '').toLowerCase();
      const uMob = (state.user.mobile || state.user.phone || '').replace(/[\s\-\+]/g, '');
      const uEmail = (state.user.email || '').toLowerCase();

      if (cleanInput === uId || cleanInput === uRegNo || cleanInput === uMob || cleanInput === uEmail || (uMob && uMob.includes(cleanInput))) {
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

    // 2. Look up in all profiles (customProfiles, MOCK_PROFILES, liveProfiles)
    const matched = (allProfiles || []).find(p => {
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

    return { 
      success: false, 
      requiresRegistration: true, 
      message: 'No active paid registration found for this Mobile Number / Registration ID. Please click Register to create your profile.' 
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

    setLiveProfiles(prev => (prev || []).filter(p => p.id !== profileId));

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://jothi-matrimony.onrender.com';
      await fetch(`${API_URL}/profiles/${profileId}`, { method: 'DELETE' });
    } catch (e) {
      // ignore offline/network errors
    }
  };

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
