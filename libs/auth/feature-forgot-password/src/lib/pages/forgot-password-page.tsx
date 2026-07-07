import { AuthLayout } from '@sso/auth-feature-login';
import { ForgotPasswordForm } from '../components/forgot-password-form';
import { type ForgotPasswordDependencies, useForgotPassword } from '../hooks/use-forgot-password';

export function ForgotPasswordPage({ dependencies }: { dependencies: ForgotPasswordDependencies }) {
  const actions = useForgotPassword(dependencies);

  return (
    <AuthLayout>
      <div className="rounded-[20px] border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
        <ForgotPasswordForm state={actions.state} onSubmit={actions.submit} />
      </div>
    </AuthLayout>
  );
}
