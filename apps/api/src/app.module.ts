import { Module } from '@nestjs/common';
import { ProfilesController } from './profiles/profiles.controller';
import { ProfilesService } from './profiles/profiles.service';
import { HoroscopeController } from './horoscope/horoscope.controller';
import { PaymentsController } from './payments/payments.controller';
import { SupabaseService } from './supabase/supabase.service';

@Module({
  imports: [],
  controllers: [ProfilesController, HoroscopeController, PaymentsController],
  providers: [ProfilesService, SupabaseService],
})
export class AppModule {}

