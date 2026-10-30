import { Controller, Get, Post, Put, Patch, Param, Query, Body, Delete } from '@nestjs/common';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) { }

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

  @Put(':id')
  updateProfileById(@Param('id') id: string, @Body() profileData: any) {
    return this.profilesService.saveProfile({ ...profileData, id });
  }

  @Patch(':id')
  patchProfileById(@Param('id') id: string, @Body() profileData: any) {
    return this.profilesService.saveProfile({ ...profileData, id });
  }

  @Delete(':id')
  deleteProfile(@Param('id') id: string) {
    return this.profilesService.remove(id);
  }
}
