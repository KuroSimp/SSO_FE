import type { AuthRepository, AuthStateListener, AuthSubscription, AuthUser, SignInCredentials } from '@sso/auth-domain';
import { describe, expect, it } from 'vitest';
import { SignInUseCase } from './sign-in.use-case';

class FakeAuthRepository implements AuthRepository {
  public receivedCredentials: SignInCredentials | null = null;
  private readonly user: AuthUser = {
    id: 'user-1',
    email: 'person@company.com',
    displayName: 'Person',
    avatarUrl: null,
    lastSignInAt: null
  };

  signInWithPassword(credentials: SignInCredentials): Promise<AuthUser> {
    this.receivedCredentials = credentials;
    return Promise.resolve(this.user);
  }

  signOut(): Promise<void> {
    return Promise.resolve();
  }

  getCurrentUser(): Promise<AuthUser | null> {
    return Promise.resolve(this.user);
  }

  subscribeToAuthChanges(listener: AuthStateListener): AuthSubscription {
    void listener;
    return { unsubscribe: () => undefined };
  }

  requestPasswordReset(email: string): Promise<void> {
    void email;
    return Promise.resolve();
  }
}

describe('SignInUseCase', () => {
  it('delegates password sign in to the auth repository abstraction', async () => {
    const repository = new FakeAuthRepository();
    const useCase = new SignInUseCase(repository);

    const user = await useCase.execute({ email: 'person@company.com', password: 'correct-horse' });

    expect(user.email).toBe('person@company.com');
    expect(repository.receivedCredentials).toEqual({
      email: 'person@company.com',
      password: 'correct-horse'
    });
  });
});
