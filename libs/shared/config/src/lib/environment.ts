export interface AppEnvironment {
  supabaseUrl: string;
  supabasePublishableKey: string;
}

type EnvironmentSource = Record<string, string | undefined> & {
  VITE_SUPABASE_URL?: string;
  VITE_SUPABASE_PUBLISHABLE_KEY?: string;
  VITE_SUPABASE_ANON_KEY?: string;
};

export function readEnvironment(source: EnvironmentSource): AppEnvironment {
  const supabaseUrl = source.VITE_SUPABASE_URL?.trim();
  const supabasePublishableKey =
    source.VITE_SUPABASE_PUBLISHABLE_KEY?.trim() ?? source.VITE_SUPABASE_ANON_KEY?.trim();

  if (!supabaseUrl) {
    throw new Error('Missing required environment variable: VITE_SUPABASE_URL');
  }

  if (!supabasePublishableKey) {
    throw new Error('Missing required environment variable: VITE_SUPABASE_PUBLISHABLE_KEY');
  }

  return {
    supabaseUrl,
    supabasePublishableKey
  };
}

export function getEnvironment(): AppEnvironment {
  return readEnvironment(import.meta.env);
}
