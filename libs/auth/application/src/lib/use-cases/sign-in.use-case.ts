import type { AuthRepository, AuthUser, SignInCredentials } from '@sso/auth-domain';

export class SignInUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  execute(credentials: SignInCredentials): Promise<AuthUser> {
    return this.authRepository.signInWithPassword(credentials);
  }
}
