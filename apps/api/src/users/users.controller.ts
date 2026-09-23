import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(
    @Body()
    body: {
      mobile: string;
      full_name?: string;
      email?: string;
      gender?: string;
      date_of_birth?: string;
    },
  ) {
    return this.usersService.registerUser(body);
  }
}
