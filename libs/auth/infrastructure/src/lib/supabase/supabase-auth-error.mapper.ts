import type { AuthError as SupabaseAuthError } from '@supabase/supabase-js';
import { AuthError, type AuthErrorCode } from '@sso/auth-domain';

export class SupabaseAuthErrorMapper {
  static toDomainError(error: SupabaseAuthError | Error | null): AuthError {
    if (!error) {
      return new AuthError('unknown');
    }

    const status = 'status' in error && typeof error.status === 'number' ? error.status : undefined;
    const code = 'code' in error && typeof error.code === 'string' ? error.code : undefined;
    const message = error.message.toLowerCase();

    return new AuthError(SupabaseAuthErrorMapper.resolveCode({ status, code, message }));
  }

  private static resolveCode(input: {
    status: number | undefined;
    code: string | undefined;
    message: string;
  }): AuthErrorCode {
    if (input.status === 400 || input.code === 'invalid_credentials') {
      return 'invalid_credentials';
    }

    if (input.status === 429 || input.message.includes('rate limit')) {
      return 'rate_limited';
    }

    if (input.message.includes('email not confirmed') || input.message.includes('email not verified')) {
      return 'email_not_verified';
    }

    if (input.message.includes('network') || input.message.includes('fetch')) {
      return 'network_error';
    }

    return 'unknown';
  }
}
