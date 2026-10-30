import { Injectable } from '@nestjs/common';
import { MOCK_PROFILES } from '@jothi-matrimony/shared';

@Injectable()
export class ProfilesService {
  private profiles = [...MOCK_PROFILES];

  findAll(query?: { caste?: string; city?: string; gender?: string }) {
    return this.profiles.filter(p => {
      let matches = true;
      if (query?.caste && query.caste !== 'All Communities') {
        matches = matches && p.caste === query.caste;
      }
      if (query?.city && query.city !== 'All Cities') {
        matches = matches && p.city.includes(query.city);
      }
      if (query?.gender && query.gender !== 'All') {
        matches = matches && p.gender === query.gender;
      }
      return matches;
    });
  }

  findOne(id: string) {
    const cleanId = (id || '').replace(/[\s\-\+]/g, '').toLowerCase();
    return this.profiles.find(p => {
      const pid = (p.id || '').replace(/[\s\-\+]/g, '').toLowerCase();
      const pregNo = (p.regNo || '').replace(/[\s\-\+]/g, '').toLowerCase();
      const pmob = (p.phone || p.mobile || '').replace(/[\s\-\+]/g, '').toLowerCase();
      return cleanId === pid || cleanId === pregNo || cleanId === pmob;
    });
  }

  saveProfile(profileData: any) {
    if (!profileData || !profileData.id) {
      return { success: false, message: 'Invalid profile data' };
    }

    const cleanId = String(profileData.id || '').trim().toLowerCase();
    const cleanRegNo = String(profileData.regNo || '').trim().toLowerCase();
    const cleanMob = String(profileData.mobile || profileData.phone || '').replace(/\D/g, '');

    const existingIdx = this.profiles.findIndex(p => {
      const pId = String(p.id || '').trim().toLowerCase();
      const pRegNo = String(p.regNo || '').trim().toLowerCase();
      const pMob = String(p.mobile || p.phone || '').replace(/\D/g, '');

      if (cleanId && pId && cleanId === pId) return true;
      if (cleanRegNo && pRegNo && cleanRegNo === pRegNo) return true;
      if (cleanMob && pMob && cleanMob.length >= 7 && pMob.length >= 7 && cleanMob === pMob) return true;
      return false;
    });

    if (existingIdx >= 0) {
      this.profiles[existingIdx] = { ...this.profiles[existingIdx], ...profileData };
    } else {
      this.profiles.unshift(profileData);
    }

    return { success: true, profile: profileData };
  }

  remove(id: string) {
    this.profiles = this.profiles.filter(p => p.id !== id);
    return { success: true, deletedId: id };
  }
}
