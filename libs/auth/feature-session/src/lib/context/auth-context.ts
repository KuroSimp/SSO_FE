import { createContext } from 'react';
import type { AuthState, AuthUser } from '@sso/auth-domain';

export interface AuthContextValue extends AuthState {
  signOut(): Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export interface AuthSessionDependencies {
  getCurrentUser(): Promise<AuthUser | null>;
  signOut(): Promise<void>;
  subscribeToAuthChanges(listener: (state: AuthState) => void): { unsubscribe(): void };
}
