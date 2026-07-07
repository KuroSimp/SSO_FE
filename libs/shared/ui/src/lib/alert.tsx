import { AlertCircle } from 'lucide-react';

export function Alert({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
      role="alert"
      aria-live="polite"
    >
      <AlertCircle className="mt-0.5 h-4 w-4 flex-none" aria-hidden="true" />
      <span>{children}</span>
    </div>
  );
}
