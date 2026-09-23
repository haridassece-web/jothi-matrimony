import { Injectable, Logger } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private readonly logger = new Logger(SupabaseService.name);
  private supabase: SupabaseClient | null = null;

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL || 'https://mjcbbjwttlteiqnntuet.supabase.co';
    let supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseKey || supabaseKey.includes('YOUR_') || supabaseKey === '') {
      supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY || 
                    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 
                    'sb_publishable_SpidCY0sORh-ctxT2GC-xw_V_OqHnlZ';
    }

    try {
      this.supabase = createClient(supabaseUrl, supabaseKey);
      this.logger.log(`✅ Supabase client initialized with URL: ${supabaseUrl}`);
    } catch (err: any) {
      this.logger.error(`❌ Failed to initialize Supabase client: ${err.message}`);
    }
  }

  getClient(): SupabaseClient {
    if (!this.supabase) {
      throw new Error('Supabase client is not initialized.');
    }
    return this.supabase;
  }
}


