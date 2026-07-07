import type { AuthRepository, AuthUser } from '@sso/auth-domain';

export class GetCurrentUserUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  execute(): Promise<AuthUser | null> {
    return this.authRepository.getCurrentUser();
  }
}
