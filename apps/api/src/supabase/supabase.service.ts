import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    const url = process.env.SUPABASE_URL || 'https://mjcbbjwttlteiqnntuet.supabase.co';
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || 'YOUR_SECRET_KEY';

    this.supabase = createClient(url, key);
  }

  getClient(): SupabaseClient {
    return this.supabase;
  }
}
