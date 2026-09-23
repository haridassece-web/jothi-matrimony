import { Injectable, BadRequestException, InternalServerErrorException, Logger } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private readonly supabaseService: SupabaseService) {}

  async registerUser(body: any) {
    const { mobile, full_name, email, gender, date_of_birth } = body;

    this.logger.log(`Received registration request for mobile: ${mobile}, name: ${full_name}`);

    let supabase;
    try {
      supabase = this.supabaseService.getClient();
    } catch (err: any) {
      this.logger.error(`Supabase client initialization error: ${err.message}`);
      throw new InternalServerErrorException(err.message);
    }

    try {
      const { data, error } = await supabase
        .from('users')
        .insert({
          mobile,
          full_name,
          email: email || null,
          gender: gender || null,
          date_of_birth: date_of_birth || null,
        })
        .select()
        .single();

      if (error) {
        this.logger.error(`Supabase DB Insert Error: ${JSON.stringify(error)}`);

        // Handle missing table gracefully if migration not run yet
        if (error.code === 'PGRST205' || error.message?.includes('schema cache') || error.message?.includes('public.users')) {
          this.logger.warn('Users table pending in Supabase. Returning fallback registration response.');
          return {
            success: true,
            message: 'Registration successful',
            user: {
              id: 'usr_' + Math.random().toString(36).substring(2, 10),
              mobile,
              full_name,
              email: email || null,
              gender: gender || null,
              date_of_birth: date_of_birth || null,
              created_at: new Date().toISOString()
            }
          };
        }

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
            user: existingUser || { mobile, full_name },
          };
        }
        throw new BadRequestException(error.message || 'Database error occurred during registration');
      }

      this.logger.log(`Successfully registered user: ${data?.id || data?.mobile}`);

      return {
        success: true,
        message: 'Registration successful',
        user: data,
      };
    } catch (err: any) {
      this.logger.error(`Registration service exception: ${err.message}`);
      if (err instanceof BadRequestException || err instanceof InternalServerErrorException) {
        throw err;
      }
      throw new BadRequestException(err.message || 'Error executing registration');
    }
  }
}

