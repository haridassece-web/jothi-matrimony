import { Controller, Get, Post, Param, Query, Body, Delete } from '@nestjs/common';
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

  @Post()
  createOrUpdateProfile(@Body() profileData: any) {
    return this.profilesService.saveProfile(profileData);
  }

  @Delete(':id')
  deleteProfile(@Param('id') id: string) {
    return this.profilesService.remove(id);
  }
}
