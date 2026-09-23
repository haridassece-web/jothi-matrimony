import { Injectable, OnModuleInit } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService implements OnModuleInit {
  private supabaseClient: SupabaseClient;

  onModuleInit() {
    const supabaseUrl = process.env.SUPABASE_URL || 'https://mjcbbjwttlteiqnntuet.supabase.co';
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'service_role_key_placeholder';
    this.supabaseClient = createClient(supabaseUrl, supabaseKey);
    console.log(`⚡ Connected to Supabase PostgreSQL project: ${supabaseUrl}`);
  }

  getClient(): SupabaseClient {
    return this.supabaseClient;
  }
}
