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
    return this.profiles.find(p => p.id === id);
  }
}
