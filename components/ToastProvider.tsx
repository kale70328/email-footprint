"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { CheckCircle, XCircle, Info, AlertTriangle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Toast, ToastType } from "@/lib/types";

interface ToastContextValue {
  addToast: (message: string, type?: ToastType, duration?: number) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

const icons: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle className="w-4 h-4 text-brand-green" />,
  error: <XCircle className="w-4 h-4 text-red-500" />,
  info: <Info className="w-4 h-4 text-brand-indigo" />,
  warning: <AlertTriangle className="w-4 h-4 text-amber-500" />,
};

const styles: Record<ToastType, string> = {
  success: "border-green-200 bg-green-50",
  error: "border-red-200 bg-red-50",
  info: "border-indigo-200 bg-indigo-50",
  warning: "border-amber-200 bg-amber-50",
};

function ToastItem({ toast, onRemove }: { toast: Toast & { visible: boolean }; onRemove: () => void }) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-xl border px-4 py-3 shadow-card min-w-[260px] max-w-[360px] transition-all duration-300",
        styles[toast.type],
        toast.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}
      role="alert"
      aria-live="polite"
    >
      <span className="mt-0.5 flex-shrink-0">{icons[toast.type]}</span>
      <p className="text-sm text-brand-text flex-1 font-body leading-snug">{toast.message}</p>
      <button
        onClick={onRemove}
        className="flex-shrink-0 text-brand-sub hover:text-brand-text transition-colors mt-0.5"
        aria-label="Dismiss notification"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Array<Toast & { visible: boolean }>>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, visible: false } : t))
    );
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 300);
  }, []);

  const addToast = useCallback(
    (message: string, type: ToastType = "info", duration: number = 4000) => {
      const id = Math.random().toString(36).slice(2);
      setToasts((prev) => [...prev, { id, type, message, visible: false }]);
      // Trigger animation on next tick
      setTimeout(() => {
        setToasts((prev) =>
          prev.map((t) => (t.id === id ? { ...t, visible: true } : t))
        );
      }, 20);
      setTimeout(() => removeToast(id), duration);
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div
        className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 items-end"
        aria-label="Notifications"
      >
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}
