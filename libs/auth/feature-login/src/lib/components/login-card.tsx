import { LoginForm } from './login-form';
import type { LoginState, useLogin } from '../hooks/use-login';

interface LoginCardProps {
  state: LoginState;
  actions: ReturnType<typeof useLogin>;
}

export function LoginCard({ state, actions }: LoginCardProps) {
  return (
    <div className="rounded-[28px] border border-white/80 bg-white/95 p-6 shadow-soft backdrop-blur sm:p-10">
      <div className="mb-8 space-y-3">
        <h1 className="text-4xl font-bold leading-tight text-slate-950">Welcome Back</h1>
        <p className="max-w-[340px] text-base leading-7 text-slate-500">
          Glad to see you again! Please sign in to continue.
        </p>
      </div>
      <LoginForm state={state} onSubmit={actions.submit} />
    </div>
  );
}
