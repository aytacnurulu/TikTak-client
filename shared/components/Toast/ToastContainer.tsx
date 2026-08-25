"use client";

import Toast from "./Toast";
import { useToastStore } from "@/shared/store/useToastStore";

export default function ToastContainer() {
  const toasts = useToastStore((state) => state.toasts);
  const closeToast = useToastStore((state) => state.closeToast);

  return (
    <div className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 flex w-[90%] max-w-[340px] flex-col gap-3">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          open
          onClose={() => closeToast(toast.id)}
        />
      ))}
    </div>
  );
}
