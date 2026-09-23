import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mjcbbjwttlteiqnntuet.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_SpidCY0sORh-ctxT2GC-xw_V_OqHnlZ';

export const createClient = () =>
  createBrowserClient(
    supabaseUrl,
    supabaseKey
  );
