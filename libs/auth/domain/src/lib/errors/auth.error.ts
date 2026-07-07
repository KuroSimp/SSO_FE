export type AuthErrorCode =
  | 'invalid_credentials'
  | 'email_not_verified'
  | 'rate_limited'
  | 'network_error'
  | 'configuration_error'
  | 'unknown';

export class AuthError extends Error {
  constructor(
    public readonly code: AuthErrorCode,
    message = code
  ) {
    super(message);
    this.name = 'AuthError';
  }
}
