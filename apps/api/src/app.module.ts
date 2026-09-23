import { Module } from '@nestjs/common';
import { ProfilesController } from './profiles/profiles.controller';
import { ProfilesService } from './profiles/profiles.service';
import { HoroscopeController } from './horoscope/horoscope.controller';
import { PaymentsController } from './payments/payments.controller';
import { PaymentsService } from './payments/payments.service';
import { SupabaseService } from './supabase/supabase.service';

@Module({
  imports: [],
  controllers: [ProfilesController, HoroscopeController, PaymentsController],
  providers: [ProfilesService, PaymentsService, SupabaseService],
})
export class AppModule {}
