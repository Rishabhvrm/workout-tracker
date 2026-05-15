import { useEffect } from 'react';

interface ConfirmDialogProps {
  title: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  destructive = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  useEffect(() => {
    const main = document.querySelector<HTMLElement>('main');
    if (main) main.style.overflow = 'hidden';
    const prevent = (e: TouchEvent) => e.preventDefault();
    document.addEventListener('touchmove', prevent, { passive: false });
    return () => {
      if (main) main.style.overflow = '';
      document.removeEventListener('touchmove', prevent);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center px-6" onClick={onCancel}>
      <div className="absolute inset-0 bg-black/60" />
      <div
        className="relative w-full max-w-sm bg-gray-900 rounded-2xl p-6"
        onClick={e => e.stopPropagation()}
      >
        <h3 className="text-white font-semibold text-base">{title}</h3>
        {message && <p className="text-sm text-gray-400 mt-1">{message}</p>}
        <div className="flex gap-3 mt-5">
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-800 text-gray-300 py-3 rounded-xl text-sm font-medium"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-3 rounded-xl text-sm font-bold text-white ${
              destructive ? 'bg-red-500' : 'bg-orange-500'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
