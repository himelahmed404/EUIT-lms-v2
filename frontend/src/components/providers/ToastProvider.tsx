"use client";

import { ToastContext, useToastState } from "@/hooks/useToast";

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const value = useToastState();
  return (
    <ToastContext.Provider value={value}>
      {children}
      {value.message ? (
        <div className="p-toast" role="status" aria-live="polite">
          {value.message}
        </div>
      ) : null}
    </ToastContext.Provider>
  );
}
