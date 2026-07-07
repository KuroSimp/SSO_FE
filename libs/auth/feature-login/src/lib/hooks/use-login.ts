import { useState } from 'react';
import type { AuthProvider, SignInCredentials } from '@sso/auth-domain';
import { toUserFacingAuthError } from './auth-error-message.mapper';

export type LoginState =
  | { status: 'idle' }
  | { status: 'submitting' }
  | { status: 'oauth_redirecting'; provider: AuthProvider }
  | { status: 'error'; message: string };

export interface LoginDependencies {
  signIn(credentials: SignInCredentials): Promise<unknown>;
  signInWithProvider(provider: AuthProvider): Promise<void>;
}

export function useLogin(dependencies: LoginDependencies, onSuccess: () => void) {
  const [state, setState] = useState<LoginState>({ status: 'idle' });

  async function submit(credentials: SignInCredentials): Promise<void> {
    setState({ status: 'submitting' });
    try {
      await dependencies.signIn(credentials);
      onSuccess();
    } catch (error) {
      setState({ status: 'error', message: toUserFacingAuthError(error) });
    }
  }

  async function submitProvider(provider: AuthProvider): Promise<void> {
    setState({ status: 'oauth_redirecting', provider });
    try {
      await dependencies.signInWithProvider(provider);
    } catch (error) {
      setState({ status: 'error', message: toUserFacingAuthError(error) });
    }
  }

  return {
    state,
    submit,
    submitProvider
  };
}
