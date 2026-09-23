import { Injectable, Logger } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private readonly logger = new Logger(SupabaseService.name);
  private supabase: SupabaseClient | null = null;

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      this.logger.error('⚠️ SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variable is missing on server!');
    } else {
      try {
        this.supabase = createClient(supabaseUrl, supabaseKey);
        this.logger.log('✅ Supabase client initialized successfully.');
      } catch (err: any) {
        this.logger.error(`❌ Failed to initialize Supabase client: ${err.message}`);
      }
    }
  }

  getClient(): SupabaseClient {
    if (!this.supabase) {
      throw new Error('Supabase client is not initialized. Please ensure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables are set on Render.');
    }
    return this.supabase;
  }
}

