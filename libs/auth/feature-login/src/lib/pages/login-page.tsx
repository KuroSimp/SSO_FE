import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/auth-layout';
import { LoginCard } from '../components/login-card';
import { type LoginDependencies, useLogin } from '../hooks/use-login';

export function LoginPage({ dependencies }: { dependencies: LoginDependencies }) {
  const navigate = useNavigate();
  const actions = useLogin(dependencies, () => navigate('/dashboard', { replace: true }));

  return (
    <AuthLayout>
      <LoginCard state={actions.state} actions={actions} />
    </AuthLayout>
  );
}
