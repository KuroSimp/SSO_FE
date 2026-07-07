import { describe, expect, it } from 'vitest';
import { SupabaseAuthErrorMapper } from './supabase-auth-error.mapper';

describe('SupabaseAuthErrorMapper', () => {
  it('normalizes invalid credentials errors', () => {
    const error = SupabaseAuthErrorMapper.toDomainError({
      name: 'AuthApiError',
      message: 'Invalid login credentials',
      status: 400
    } as Parameters<typeof SupabaseAuthErrorMapper.toDomainError>[0]);

    expect(error.code).toBe('invalid_credentials');
  });
});
