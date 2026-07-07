import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { AppEnvironment } from '@sso/shared-config';

export function createSupabaseBrowserClient(environment: AppEnvironment): SupabaseClient {
  return createClient(environment.supabaseUrl, environment.supabasePublishableKey, {
    auth: {
      autoRefreshToken: true,
      detectSessionInUrl: true,
      persistSession: true
    }
  });
}
