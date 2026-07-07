import { BrandLogo } from '@sso/shared-ui';

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4 py-8">
      <div className="absolute left-1/2 top-[-180px] h-[360px] w-[640px] -translate-x-1/2 rounded-full bg-blue-200/40 blur-3xl" />
      <div className="absolute bottom-[-220px] right-[-120px] h-[420px] w-[420px] rounded-full bg-cyan-200/40 blur-3xl" />
      <section className="relative w-full max-w-[460px] animate-[fadeIn_220ms_ease-out]">
        <div className="mb-8 flex justify-center">
          <BrandLogo />
        </div>
        {children}
      </section>
    </main>
  );
}
