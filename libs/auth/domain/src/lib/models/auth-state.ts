import type { AuthUser } from '../entities/auth-user';

export type AuthStatus = 'initializing' | 'authenticated' | 'unauthenticated';

export interface AuthState {
  status: AuthStatus;
  user: AuthUser | null;
}

export type AuthStateListener = (state: AuthState) => void;

export interface AuthSubscription {
  unsubscribe(): void;
}
