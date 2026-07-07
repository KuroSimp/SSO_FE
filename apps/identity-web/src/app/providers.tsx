import { AuthProvider } from '@sso/auth-feature-session';
import { authDependencies } from './dependencies';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <AuthProvider dependencies={authDependencies}>{children}</AuthProvider>;
}
