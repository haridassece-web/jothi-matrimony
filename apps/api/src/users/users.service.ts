import { Injectable, BadRequestException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class UsersService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async registerUser(body: any) {
    const { mobile, full_name, email, gender, date_of_birth } = body;

    const supabase = this.supabaseService.getClient();

    if (!supabase) {
      throw new BadRequestException('Supabase client is not initialized');
    }

    const { data, error } = await supabase
      .from('users')
      .insert({
        mobile,
        full_name,
        email,
        gender,
        date_of_birth,
      })
      .select()
      .single();

    if (error) {
      // Handle unique mobile constraint gracefully
      if (error.code === '23505') {
        const { data: existingUser } = await supabase
          .from('users')
          .select()
          .eq('mobile', mobile)
          .single();

        return {
          success: true,
          message: 'User already registered',
          user: existingUser,
        };
      }
      throw new BadRequestException(error.message);
    }

    return {
      success: true,
      message: 'Registration successful',
      user: data,
    };
  }
}
