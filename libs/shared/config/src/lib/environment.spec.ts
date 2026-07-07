import { describe, expect, it } from 'vitest';
import { readEnvironment } from './environment';

describe('readEnvironment', () => {
  it('returns typed Supabase configuration', () => {
    expect(
      readEnvironment({
        VITE_SUPABASE_URL: 'https://project.supabase.co',
        VITE_SUPABASE_PUBLISHABLE_KEY: 'publishable-key'
      })
    ).toEqual({
      supabaseUrl: 'https://project.supabase.co',
      supabasePublishableKey: 'publishable-key'
    });
  });

  it('fails fast without leaking values when configuration is missing', () => {
    expect(() => readEnvironment({})).toThrow('VITE_SUPABASE_URL');
  });
});
