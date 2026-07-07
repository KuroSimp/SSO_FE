import { ShieldCheck } from 'lucide-react';

export function BrandLogo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
        <ShieldCheck className="h-6 w-6" aria-hidden="true" />
      </div>
      <div>
        <p className="text-lg font-bold leading-5 text-slate-950">Identity</p>
        <p className="text-sm font-medium text-slate-500">Secure Access Portal</p>
      </div>
    </div>
  );
}
