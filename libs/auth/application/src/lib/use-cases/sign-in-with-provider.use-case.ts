import type { AuthProvider, AuthRepository } from '@sso/auth-domain';

export class SignInWithProviderUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  execute(provider: AuthProvider): Promise<void> {
    return this.authRepository.signInWithProvider(provider);
  }
}
