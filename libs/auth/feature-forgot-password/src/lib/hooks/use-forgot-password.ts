import { useState } from 'react';
import { toUserFacingAuthError } from '@sso/auth-feature-login';

export type ForgotPasswordState =
  | { status: 'idle' }
  | { status: 'submitting' }
  | { status: 'success' }
  | { status: 'error'; message: string };

export interface ForgotPasswordDependencies {
  requestPasswordReset(email: string): Promise<void>;
}

export function useForgotPassword(dependencies: ForgotPasswordDependencies) {
  const [state, setState] = useState<ForgotPasswordState>({ status: 'idle' });

  async function submit(email: string): Promise<void> {
    setState({ status: 'submitting' });
    try {
      await dependencies.requestPasswordReset(email);
      setState({ status: 'success' });
    } catch (error) {
      setState({ status: 'error', message: toUserFacingAuthError(error) });
    }
  }

  return { state, submit };
}
