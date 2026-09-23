import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { ProfilesController } from './profiles/profiles.controller';
import { ProfilesService } from './profiles/profiles.service';
import { HoroscopeController } from './horoscope/horoscope.controller';
import { PaymentsController } from './payments/payments.controller';
import { PaymentsService } from './payments/payments.service';
import { SupabaseService } from './supabase/supabase.service';

@Module({
  imports: [],
  controllers: [AppController, UsersController, ProfilesController, HoroscopeController, PaymentsController],
  providers: [UsersService, ProfilesService, PaymentsService, SupabaseService],
})
export class AppModule {}
