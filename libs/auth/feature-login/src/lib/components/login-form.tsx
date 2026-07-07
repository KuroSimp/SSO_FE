import { FormEvent, useState } from 'react';
import { ArrowRight, Eye, EyeOff, Lock, Mail } from 'lucide-react';
import type { SignInCredentials } from '@sso/auth-domain';
import { useToggle } from '@sso/shared-hooks';
import { isValidEmail, requiredMessage } from '@sso/shared-utils';
import { Alert, Button, Input } from '@sso/shared-ui';
import type { LoginState } from '../hooks/use-login';

interface LoginFormProps {
  state: LoginState;
  onSubmit(credentials: SignInCredentials): Promise<void>;
}

interface LoginFormErrors {
  email?: string;
  password?: string;
}

function validate(credentials: SignInCredentials): LoginFormErrors {
  const errors: LoginFormErrors = {};

  if (!credentials.email.trim()) {
    errors.email = requiredMessage('Email address');
  } else if (!isValidEmail(credentials.email)) {
    errors.email = 'Enter a valid work email address.';
  }

  if (!credentials.password) {
    errors.password = requiredMessage('Password');
  }

  return errors;
}

export function LoginForm({ state, onSubmit }: LoginFormProps) {
  const [showPassword, togglePassword] = useToggle(false);
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const isSubmitting = state.status === 'submitting';

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }

    const form = new FormData(event.currentTarget);
    const credentials = {
      email: String(form.get('email') ?? ''),
      password: String(form.get('password') ?? '')
    };
    const nextErrors = validate(credentials);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      await onSubmit(credentials);
    }
  }

  return (
    <form className="space-y-5" onSubmit={(event) => void handleSubmit(event)} noValidate>
      {state.status === 'error' ? <Alert>{state.message}</Alert> : null}

      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700" htmlFor="email">
          Email address
        </label>
        <Input
          className="h-[50px] rounded-xl border-slate-200 pl-12 text-base shadow-none"
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          hasError={Boolean(errors.email)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'email-error' : undefined}
          leftIcon={<Mail className="h-5 w-5" aria-hidden="true" />}
        />
        {errors.email ? (
          <p className="text-sm text-red-600" id="email-error">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700" htmlFor="password">
          Password
        </label>
        <Input
          className="h-[50px] rounded-xl border-slate-200 pl-12 text-base shadow-none"
          id="password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          autoComplete="current-password"
          hasError={Boolean(errors.password)}
          aria-invalid={Boolean(errors.password)}
          aria-describedby={errors.password ? 'password-error' : undefined}
          leftIcon={<Lock className="h-5 w-5" aria-hidden="true" />}
          rightElement={
            <button
              type="button"
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              onClick={togglePassword}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          }
        />
        {errors.password ? (
          <p className="text-sm text-red-600" id="password-error">
            {errors.password}
          </p>
        ) : null}
      </div>

      <div className="flex items-center justify-between gap-4">
        <label className="inline-flex items-center gap-2 text-sm font-medium text-slate-500" htmlFor="remember">
          <input
            id="remember"
            name="remember"
            type="checkbox"
            defaultChecked
            className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          Remember me
        </label>
        <a className="text-sm font-semibold text-blue-600 hover:text-blue-700" href="/forgot-password">
          Forgot password?
        </a>
      </div>

      <Button
        className="mt-2 h-[54px] w-full rounded-xl bg-[#039bf4] text-base shadow-[0_12px_24px_rgba(3,155,244,0.25)] hover:bg-[#028ce0]"
        type="submit"
        isLoading={isSubmitting}
      >
        <span>{isSubmitting ? 'Signing in...' : 'Sign in'}</span>
        {!isSubmitting ? <ArrowRight className="h-5 w-5" aria-hidden="true" /> : null}
      </Button>
    </form>
  );
}
