import React, { createContext, useContext, useState, useRef, useCallback } from 'react';

interface Toast {
  message: string;
  type: 'success' | 'error';
  id: number;
}

interface ToastContextValue {
  showToast: (message: string, type?: 'success' | 'error') => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside ToastProvider');
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<Toast | null>(null);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setToast({ message, type, id: Date.now() });
    setVisible(true);
    timerRef.current = setTimeout(() => setVisible(false), 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div
          className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-3 rounded-xl shadow-lg text-sm font-medium max-w-xs w-max text-center transition-all duration-300 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
          } ${
            toast.type === 'error'
              ? 'bg-red-900/90 text-red-200 border border-red-700'
              : 'bg-green-900/90 text-green-200 border border-green-700'
          }`}
          onTransitionEnd={() => { if (!visible) setToast(null); }}
        >
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
}
