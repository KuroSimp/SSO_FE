import { Navigate, Route, Routes } from 'react-router-dom';
import { DashboardPage } from '@sso/auth-feature-dashboard';
import { ForgotPasswordPage } from '@sso/auth-feature-forgot-password';
import { LoginPage } from '@sso/auth-feature-login';
import { ProtectedRoute, PublicOnlyRoute } from '@sso/core-routing';
import { authDependencies } from './dependencies';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicOnlyRoute />}>
        <Route path="/login" element={<LoginPage dependencies={authDependencies} />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage dependencies={authDependencies} />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
