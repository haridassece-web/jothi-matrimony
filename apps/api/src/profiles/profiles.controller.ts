import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get()
  getAllProfiles(
    @Query('caste') caste?: string,
    @Query('city') city?: string,
    @Query('gender') gender?: string,
  ) {
    return this.profilesService.findAll({ caste, city, gender });
  }

  @Get(':id')
  getProfileById(@Param('id') id: string) {
    return this.profilesService.findOne(id);
  }
}
