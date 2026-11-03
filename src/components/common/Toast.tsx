'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { ToastMessage } from '@/lib/types';
import { soundManager } from '@/lib/audio';

interface ToastContextType {
  toast: (title: string, description?: string, variant?: ToastMessage['variant']) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const toast = useCallback(
    (title: string, description?: string, variant: ToastMessage['variant'] = 'default') => {
      const id = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      const newToast: ToastMessage = { id, title, description, variant };

      if (variant === 'success') {
        soundManager.playSuccess();
      } else if (variant === 'rose') {
        soundManager.playAlert();
      } else {
        soundManager.playClick(750, 0.02);
      }

      setToasts((prev) => [...prev.slice(-3), newToast]); // Keep maximum 4 active toasts

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4000);
    },
    []
  );

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0"
      >
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              role="status"
              className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-lg border shadow-xl backdrop-blur-md text-sm ${
                t.variant === 'success'
                  ? 'bg-[#101114]/95 border-[#10b981]/40 text-[#f3f4f6]'
                  : t.variant === 'rose'
                  ? 'bg-[#101114]/95 border-[#ef4444]/40 text-[#f3f4f6]'
                  : t.variant === 'amber'
                  ? 'bg-[#101114]/95 border-[#f59e0b]/40 text-[#f3f4f6]'
                  : 'bg-[#101114]/95 border-[#1f2127] text-[#f3f4f6]'
              }`}
            >
              <div className="shrink-0 mt-0.5">
                {t.variant === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
                ) : t.variant === 'rose' ? (
                  <AlertCircle className="w-4 h-4 text-[#ef4444]" />
                ) : t.variant === 'amber' ? (
                  <AlertCircle className="w-4 h-4 text-[#f59e0b]" />
                ) : (
                  <Info className="w-4 h-4 text-[#38bdf8]" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-xs sm:text-sm text-[#f3f4f6]">{t.title}</p>
                {t.description && (
                  <p className="text-xs text-[#9ca3af] mt-0.5 leading-snug">{t.description}</p>
                )}
              </div>
              <button
                onClick={() => dismiss(t.id)}
                aria-label="Dismiss notification"
                className="shrink-0 p-1 rounded hover:bg-[#1f2127] text-[#9ca3af] hover:text-[#f3f4f6] transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
