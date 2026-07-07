import { AuthDivider } from './auth-divider';
import { LoginForm } from './login-form';
import { SocialLogin } from './social-login';
import type { LoginState, useLogin } from '../hooks/use-login';

interface LoginCardProps {
  state: LoginState;
  actions: ReturnType<typeof useLogin>;
}

export function LoginCard({ state, actions }: LoginCardProps) {
  return (
    <div className="rounded-[20px] border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
      <div className="mb-7 space-y-2 text-center">
        <h1 className="text-2xl font-bold text-slate-950">Welcome back</h1>
        <p className="text-sm leading-6 text-slate-500">Sign in to continue to your workspace</p>
      </div>
      <LoginForm state={state} onSubmit={actions.submit} />
      <div className="my-5">
        <AuthDivider />
      </div>
      <SocialLogin state={state} onProvider={actions.submitProvider} />
    </div>
  );
}
