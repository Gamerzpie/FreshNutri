import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, Info, AlertCircle } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg border text-xs font-medium text-stone-900 transition-all transform translate-y-0 ${
            toast.type === 'success'
              ? 'bg-white border-emerald-300'
              : toast.type === 'warning'
              ? 'bg-white border-amber-300'
              : 'bg-white border-stone-200'
          }`}
        >
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : toast.type === 'warning' ? (
            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
          ) : (
            <Info className="w-4 h-4 text-stone-500 shrink-0" />
          )}
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
};
