import { AuthError } from '@sso/auth-domain';

export function toUserFacingAuthError(error: unknown): string {
  if (error instanceof AuthError) {
    switch (error.code) {
      case 'invalid_credentials':
        return 'Email or password is incorrect.';
      case 'email_not_verified':
        return 'Please verify your email before signing in.';
      case 'rate_limited':
        return 'Too many sign-in attempts. Please try again later.';
      case 'network_error':
        return 'Unable to connect. Check your internet connection and try again.';
      case 'configuration_error':
        return 'Authentication is not configured correctly.';
      case 'unknown':
        return 'Something went wrong. Please try again.';
    }
  }

  return 'Something went wrong. Please try again.';
}
