import { FormEvent, useState } from 'react';
import { Mail } from 'lucide-react';
import { Alert, Button, Input } from '@sso/shared-ui';
import { isValidEmail, requiredMessage } from '@sso/shared-utils';
import type { ForgotPasswordState } from '../hooks/use-forgot-password';

interface ForgotPasswordFormProps {
  state: ForgotPasswordState;
  onSubmit(email: string): Promise<void>;
}

export function ForgotPasswordForm({ state, onSubmit }: ForgotPasswordFormProps) {
  const [error, setError] = useState<string | null>(null);
  const isSubmitting = state.status === 'submitting';

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get('email') ?? '');

    if (!email.trim()) {
      setError(requiredMessage('Email address'));
      return;
    }

    if (!isValidEmail(email)) {
      setError('Enter a valid work email address.');
      return;
    }

    setError(null);
    await onSubmit(email);
  }

  if (state.status === 'success') {
    return (
      <div className="space-y-5 text-center">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-slate-950">Check your email</h1>
          <p className="text-sm leading-6 text-slate-500">
            We sent password recovery instructions if an account exists for this email.
          </p>
        </div>
        <Button className="w-full" type="button" onClick={() => (window.location.href = '/login')}>
          Back to sign in
        </Button>
      </div>
    );
  }

  return (
    <form className="space-y-5" onSubmit={(event) => void handleSubmit(event)} noValidate>
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold text-slate-950">Reset password</h1>
        <p className="text-sm leading-6 text-slate-500">Enter your email to receive recovery instructions.</p>
      </div>
      {state.status === 'error' ? <Alert>{state.message}</Alert> : null}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700" htmlFor="email">
          Email address
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="name@company.com"
          hasError={Boolean(error)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'reset-email-error' : undefined}
          leftIcon={<Mail className="h-4 w-4" aria-hidden="true" />}
        />
        {error ? (
          <p className="text-sm text-red-600" id="reset-email-error">
            {error}
          </p>
        ) : null}
      </div>
      <Button className="w-full" type="submit" isLoading={isSubmitting}>
        {isSubmitting ? 'Sending instructions...' : 'Send recovery email'}
      </Button>
      <Button className="w-full" type="button" variant="ghost" onClick={() => (window.location.href = '/login')}>
        Back to sign in
      </Button>
    </form>
  );
}
