import type { AuthRepository } from '@sso/auth-domain';

export class RequestPasswordResetUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  execute(email: string): Promise<void> {
    return this.authRepository.requestPasswordReset(email);
  }
}
