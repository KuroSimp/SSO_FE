import type { AuthUser } from '../entities/auth-user';
import type { AuthError } from '../errors/auth.error';
import type { AuthStateListener, AuthSubscription } from '../models/auth-state';
import type { SignInCredentials } from '../models/sign-in-credentials';

export interface AuthRepository {
  signInWithPassword(credentials: SignInCredentials): Promise<AuthUser>;
  signOut(): Promise<void>;
  getCurrentUser(): Promise<AuthUser | null>;
  subscribeToAuthChanges(listener: AuthStateListener): AuthSubscription;
  requestPasswordReset(email: string): Promise<void>;
}

export type AuthResult<T> = Promise<T | AuthError>;
