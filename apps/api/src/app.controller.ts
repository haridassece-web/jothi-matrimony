import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHome() {
    return {
      message: 'Chennai Jothi Matrimony API is running',
      status: 'success',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('health')
  getHealth() {
    return {
      ok: true,
      service: 'jothi-matrimony-api',
      timestamp: new Date().toISOString(),
    };
  }
}

