export * from './horoscopeCalculator.js';
export * from './mockProfiles.js';
export * from './types.js';

export const getDisplayRegNo = (profile) => {
  if (!profile) return 'JM2026001001';
  
  let reg = typeof profile === 'string' ? profile : (profile.regNo || profile.id || '');
  const cleanReg = reg.replace(/[\s\-\+]/g, '');

  if (!reg || /^\d{10,12}$/.test(cleanReg)) {
    const mobDigits = (profile.mobile || profile.phone || profile.id || cleanReg).replace(/\D/g, '');
    if (mobDigits.length >= 4) {
      reg = 'JM2026' + mobDigits.slice(-4);
    } else {
      reg = 'JM2026001001';
    }
  }

  if (!reg.toUpperCase().startsWith('JM')) {
    reg = 'JM' + reg;
  }

  return reg;
};
