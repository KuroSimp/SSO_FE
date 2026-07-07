import { useCallback, useEffect, useMemo, useState } from 'react';
import type { AuthState } from '@sso/auth-domain';
import { AuthContext, type AuthSessionDependencies } from './auth-context';

interface AuthProviderProps {
  dependencies: AuthSessionDependencies;
  children: React.ReactNode;
}

export function AuthProvider({ dependencies, children }: AuthProviderProps) {
  const [state, setState] = useState<AuthState>({ status: 'initializing', user: null });

  useEffect(() => {
    let active = true;

    dependencies
      .getCurrentUser()
      .then((user) => {
        if (active) {
          setState({ status: user ? 'authenticated' : 'unauthenticated', user });
        }
      })
      .catch(() => {
        if (active) {
          setState({ status: 'unauthenticated', user: null });
        }
      });

    const subscription = dependencies.subscribeToAuthChanges((nextState) => {
      if (active) {
        setState(nextState);
      }
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [dependencies]);

  const signOut = useCallback(async () => {
    await dependencies.signOut();
    setState({ status: 'unauthenticated', user: null });
  }, [dependencies]);

  const value = useMemo(() => ({ ...state, signOut }), [state, signOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
