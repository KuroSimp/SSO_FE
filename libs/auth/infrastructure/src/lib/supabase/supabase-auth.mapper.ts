import type { User } from '@supabase/supabase-js';
import type { AuthUser } from '@sso/auth-domain';

export class SupabaseAuthMapper {
  static toDomainUser(user: User): AuthUser {
    const metadata = user.user_metadata;
    const displayName =
      typeof metadata.name === 'string'
        ? metadata.name
        : typeof metadata.full_name === 'string'
          ? metadata.full_name
          : null;
    const avatarUrl = typeof metadata.avatar_url === 'string' ? metadata.avatar_url : null;

    return {
      id: user.id,
      email: user.email ?? null,
      displayName,
      avatarUrl,
      lastSignInAt: user.last_sign_in_at ? new Date(user.last_sign_in_at) : null
    };
  }
}
