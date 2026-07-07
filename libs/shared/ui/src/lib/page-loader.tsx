import { Loader2 } from 'lucide-react';

export function PageLoader() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-medium text-slate-700 shadow-soft">
        <Loader2 className="h-5 w-5 animate-spin text-blue-600" aria-hidden="true" />
        Loading secure session
      </div>
    </main>
  );
}
