import { LoginForm } from './login-form';
import type { LoginState, useLogin } from '../hooks/use-login';

interface LoginCardProps {
  state: LoginState;
  actions: ReturnType<typeof useLogin>;
}

export function LoginCard({ state, actions }: LoginCardProps) {
  return (
    <div className="rounded-[30px] border border-white/90 bg-white/95 px-8 py-9 shadow-[0_28px_90px_rgba(15,23,42,0.10)] backdrop-blur sm:px-12 lg:px-[4.2vw] lg:py-10">
      <div className="mb-9 flex items-center gap-4">
        <div className="relative h-12 w-16">
          <span className="absolute left-0 top-0 h-12 w-7 skew-x-[-25deg] rounded-sm bg-cyan-400" />
          <span className="absolute left-7 top-0 h-12 w-7 skew-x-[-25deg] rounded-sm bg-blue-600" />
          <span className="absolute left-[23px] top-0 h-12 w-5 skew-x-[25deg] rounded-sm bg-white" />
        </div>
        <span className="text-2xl font-extrabold tracking-[0.12em] text-slate-950">IDENTITY</span>
      </div>

      <div className="mb-7 space-y-3">
        <h1 className="text-[40px] font-extrabold leading-[1.1] tracking-normal text-slate-950">Welcome Back</h1>
        <p className="max-w-[360px] text-base leading-7 text-slate-500">
          Glad to see you again! Please sign in to continue.
        </p>
      </div>
      <LoginForm state={state} onSubmit={actions.submit} />
    </div>
  );
}
