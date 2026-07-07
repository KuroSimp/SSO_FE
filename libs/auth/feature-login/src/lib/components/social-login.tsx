import { Github } from 'lucide-react';
import type { AuthProvider } from '@sso/auth-domain';
import { Button } from '@sso/shared-ui';
import type { LoginState } from '../hooks/use-login';

interface SocialLoginProps {
  state: LoginState;
  onProvider(provider: AuthProvider): Promise<void>;
}

function GoogleIcon() {
  return (
    <span className="grid h-4 w-4 place-items-center rounded-full border border-slate-300 text-[10px] font-bold text-blue-600">
      G
    </span>
  );
}

export function SocialLogin({ state, onProvider }: SocialLoginProps) {
  const isBusy = state.status === 'submitting' || state.status === 'oauth_redirecting';

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <Button
        type="button"
        variant="secondary"
        isLoading={state.status === 'oauth_redirecting' && state.provider === 'google'}
        disabled={isBusy}
        onClick={() => void onProvider('google')}
      >
        <GoogleIcon />
        Google
      </Button>
      <Button
        type="button"
        variant="secondary"
        isLoading={state.status === 'oauth_redirecting' && state.provider === 'github'}
        disabled={isBusy}
        onClick={() => void onProvider('github')}
      >
        <Github className="h-4 w-4" aria-hidden="true" />
        GitHub
      </Button>
    </div>
  );
}
