import { Controller, Post, Body } from '@nestjs/common';
import { calculatePorutham } from '@jothi-matrimony/shared';

@Controller('horoscope')
export class HoroscopeController {
  @Post('calculate')
  calculateMatch(@Body() body: { profile1: any; profile2: any }) {
    const result = calculatePorutham(body.profile1, body.profile2);
    return {
      success: true,
      data: result,
    };
  }
}
