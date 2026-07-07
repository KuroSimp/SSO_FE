import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@sso/auth-feature-session';
import { PageLoader } from '@sso/shared-ui';

export function ProtectedRoute() {
  const auth = useAuth();
  const location = useLocation();

  if (auth.status === 'initializing') {
    return <PageLoader />;
  }

  if (auth.status === 'unauthenticated') {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}

export function PublicOnlyRoute() {
  const auth = useAuth();

  if (auth.status === 'initializing') {
    return <PageLoader />;
  }

  if (auth.status === 'authenticated') {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
