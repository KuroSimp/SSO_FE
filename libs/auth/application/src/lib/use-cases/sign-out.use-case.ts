import type { AuthRepository } from '@sso/auth-domain';

export class SignOutUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  execute(): Promise<void> {
    return this.authRepository.signOut();
  }
}
