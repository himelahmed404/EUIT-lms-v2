"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

type ToastCtx = {
  message: string | null;
  toast: (msg: string) => void;
  clear: () => void;
};

const Ctx = createContext<ToastCtx | null>(null);

export function useToastState() {
  const [message, setMessage] = useState<string | null>(null);
  const toast = useCallback((msg: string) => {
    setMessage(msg);
    window.setTimeout(() => setMessage(null), 2400);
  }, []);
  const clear = useCallback(() => setMessage(null), []);
  return useMemo(() => ({ message, toast, clear }), [message, toast, clear]);
}

export const ToastContext = Ctx;

export function useToast() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
