import { LogOut, ShieldCheck, UserRound } from 'lucide-react';
import { useAuth } from '@sso/auth-feature-session';
import { BrandLogo, Button } from '@sso/shared-ui';
import { initialsFromEmail } from '@sso/shared-utils';

export function DashboardPage() {
  const auth = useAuth();
  const user = auth.user;

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <BrandLogo />
          <Button variant="secondary" onClick={() => void auth.signOut()}>
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Sign out
          </Button>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-8 md:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[20px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="grid h-14 w-14 flex-none place-items-center rounded-2xl bg-blue-50 text-lg font-bold text-blue-700">
              {initialsFromEmail(user?.email ?? null)}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-blue-600">Authentication status</p>
              <h1 className="mt-1 text-2xl font-bold text-slate-950">Welcome back</h1>
              <p className="mt-2 break-words text-sm text-slate-600">{user?.email ?? 'Signed in user'}</p>
            </div>
          </div>

          <dl className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 p-4">
              <dt className="text-sm font-medium text-slate-500">Status</dt>
              <dd className="mt-1 font-semibold text-emerald-700">Authenticated</dd>
            </div>
            <div className="rounded-2xl border border-slate-200 p-4">
              <dt className="text-sm font-medium text-slate-500">User ID</dt>
              <dd className="mt-1 break-all font-mono text-sm text-slate-800">{user?.id}</dd>
            </div>
            <div className="rounded-2xl border border-slate-200 p-4 sm:col-span-2">
              <dt className="text-sm font-medium text-slate-500">Last sign in</dt>
              <dd className="mt-1 text-sm font-semibold text-slate-800">
                {user?.lastSignInAt ? user.lastSignInAt.toLocaleString() : 'Not available'}
              </dd>
            </div>
          </dl>
        </div>

        <aside className="rounded-[20px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
            <ShieldCheck className="h-6 w-6" aria-hidden="true" />
          </div>
          <h2 className="mt-5 text-xl font-bold text-slate-950">Your session is active</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">Your identity is securely authenticated.</p>
          <div className="mt-6 flex items-center gap-3 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
            <UserRound className="h-5 w-5 text-slate-500" aria-hidden="true" />
            Protected route resolved after session initialization.
          </div>
        </aside>
      </section>
    </main>
  );
}
