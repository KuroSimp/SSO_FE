import loginVisual from '../assets/login-sso.png';

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="grid h-screen overflow-hidden bg-[#effbff] text-slate-950 lg:grid-cols-[43.75%_56.25%]">
      <section className="flex h-screen flex-col justify-between px-5 py-6 sm:px-10 lg:px-[4.2vw]">
        <div className="h-1" />
        <div className="mx-auto w-full max-w-[584px] animate-[fadeIn_220ms_ease-out]">
          {children}
        </div>
        <footer className="mx-auto flex w-full max-w-[584px] flex-col gap-3 text-xs font-medium text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>(c) 2026 Identity. All rights reserved.</span>
          <span className="flex gap-6">
            <a className="hover:text-blue-600" href="/login">
              Privacy Policy
            </a>
            <a className="hover:text-blue-600" href="/login">
              Terms of Service
            </a>
          </span>
        </footer>
      </section>

      <section className="relative hidden min-h-screen overflow-hidden bg-cyan-100 lg:block" aria-hidden="true">
        <img
          className="h-full w-full object-cover object-center"
          src={loginVisual}
          alt=""
          decoding="async"
          fetchPriority="high"
        />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#eefaff] to-transparent" />
      </section>
    </main>
  );
}
