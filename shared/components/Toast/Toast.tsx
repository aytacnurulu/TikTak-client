"use client";

import { useEffect } from "react";

interface ToastProps {
  open: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  duration?: number;
}

const Toast = ({
  open,
  title,
  description,
  onClose,
  duration = 4000,
}: ToastProps) => {
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [open, duration, onClose]);

  if (!open) return null;

  return (
    <div className="fixed top-4 right-4 left-4 sm:left-auto sm:top-6 sm:right-6 z-50 bg-white rounded-[10px] shadow-lg border border-gray-100 p-4 sm:p-5 w-auto sm:w-[340px] animate-in slide-in-from-right">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
          <svg
            viewBox="0 0 24 24"
            width={18}
            height={18}
            fill="none"
            stroke="#00BE46"
            strokeWidth={2}
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-semibold text-[#2B3043]">{title}</p>
          {description && (
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Toast;
