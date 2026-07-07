import { describe, expect, it } from 'vitest';
import { SupabaseAuthMapper } from './supabase-auth.mapper';

describe('SupabaseAuthMapper', () => {
  it('maps Supabase user fields to the domain auth user', () => {
    const user = SupabaseAuthMapper.toDomainUser({
      id: 'user-1',
      email: 'person@company.com',
      user_metadata: {
        name: 'Person',
        avatar_url: 'https://example.com/avatar.png'
      },
      last_sign_in_at: '2026-07-07T05:00:00.000Z'
    } as Parameters<typeof SupabaseAuthMapper.toDomainUser>[0]);

    expect(user).toEqual({
      id: 'user-1',
      email: 'person@company.com',
      displayName: 'Person',
      avatarUrl: 'https://example.com/avatar.png',
      lastSignInAt: new Date('2026-07-07T05:00:00.000Z')
    });
  });
});
