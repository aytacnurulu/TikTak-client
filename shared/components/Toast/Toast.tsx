"use client";

import { useEffect } from "react";

interface ToastProps {
  id: number;
  open: boolean;
  title: string;
  description?: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
  duration?: number;
  exiting?: boolean;
}

const Toast = ({
  id,
  open,
  title,
  description,
  type = "success",
  onClose,
  duration = 2500,
  exiting = false,
}: ToastProps) => {
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [open, duration, onClose, id]);

  if (!open) return null;

  const accentClass =
    type === "error"
      ? "bg-red-100 text-red-600"
      : type === "info"
        ? "bg-blue-100 text-blue-600"
        : "bg-primary/20 text-primary";

  const icon =
    type === "error" ? (
      <path d="M18 6L6 18M6 6l12 12" />
    ) : (
      <path d="M20 6L9 17l-5-5" />
    );

  return (
    <div
      className={`w-full bg-white rounded-[10px] shadow-lg border border-gray-100 p-4 sm:p-5 ${
        exiting ? "toast-exit" : "toast-enter"
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${accentClass}`}
        >
          <svg
            viewBox="0 0 24 24"
            width={18}
            height={18}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            {icon}
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
