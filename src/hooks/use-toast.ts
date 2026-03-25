// Minimal useToast hook — compatible with the toast.tsx / toaster.tsx below
import { useState, useCallback } from "react";

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
  duration?: number;
}

type ToastState = Toast[];

let listeners: Array<(toasts: ToastState) => void> = [];
let toasts: ToastState = [];

function dispatch(toast: Toast) {
  toasts = [...toasts, toast];
  listeners.forEach((l) => l(toasts));

  setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== toast.id);
    listeners.forEach((l) => l(toasts));
  }, toast.duration ?? 4000);
}

export function toast(opts: Omit<Toast, "id">) {
  dispatch({ id: Math.random().toString(36).slice(2), ...opts });
}

export function useToast() {
  const [state, setState] = useState<ToastState>(toasts);

  const subscribe = useCallback(() => {
    const handler = (t: ToastState) => setState([...t]);
    listeners.push(handler);
    return () => {
      listeners = listeners.filter((l) => l !== handler);
    };
  }, []);

  // Subscribe on mount, unsubscribe on unmount
  if (typeof window !== "undefined") {
    const unsub = subscribe();
    // store cleanup ref lazily — Toaster will call this itself
    (useToast as unknown as { _unsub?: () => void })._unsub = unsub;
  }

  return { toasts: state, toast };
}
