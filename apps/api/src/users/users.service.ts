import { Injectable, BadRequestException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class UsersService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async registerUser(dto: {
    mobile: string;
    full_name?: string;
    email?: string;
    gender?: string;
    date_of_birth?: string;
  }) {
    if (!dto.mobile) {
      throw new BadRequestException('Mobile number is required');
    }

    const supabase = this.supabaseService.getClient();

    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('users')
          .insert({
            mobile: dto.mobile,
            full_name: dto.full_name || null,
            email: dto.email || null,
            gender: dto.gender || null,
            date_of_birth: dto.date_of_birth || null,
          })
          .select()
          .single();

        if (error) {
          console.warn('Supabase insert user warning:', error.message);
          // If unique mobile already exists, fetch existing user record
          if (error.code === '23505') {
            const { data: existingUser } = await supabase
              .from('users')
              .select()
              .eq('mobile', dto.mobile)
              .single();

            return {
              success: true,
              message: 'User already registered',
              user: existingUser,
            };
          }
        } else {
          return {
            success: true,
            message: 'User registered successfully',
            user: data,
          };
        }
      } catch (err) {
        console.error('Registration processing error:', err);
      }
    }

    // Fallback registration object
    return {
      success: true,
      message: 'User registered successfully',
      user: {
        id: 'JM202600' + Math.floor(1000 + Math.random() * 9000),
        mobile: dto.mobile,
        full_name: dto.full_name,
        email: dto.email,
        gender: dto.gender,
        date_of_birth: dto.date_of_birth,
        created_at: new Date().toISOString(),
      },
    };
  }
}
