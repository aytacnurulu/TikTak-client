"use client";

import { useEffect, useRef, useState } from "react";
import Toast from "./Toast";
import { useToastStore, type ToastItem } from "@/shared/store/useToastStore";

const EXIT_DURATION = 250;

export default function ToastContainer() {
  const toasts = useToastStore((state) => state.toasts);
  const closeToast = useToastStore((state) => state.closeToast);

  const [current, setCurrent] = useState<ToastItem | null>(null);
  const [isExiting, setIsExiting] = useState(false);
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const incoming = toasts[0] ?? null;

  useEffect(() => {
    if (exitTimer.current) {
      clearTimeout(exitTimer.current);
      exitTimer.current = null;
    }

    if (!incoming) {
      if (current) {
        setIsExiting(true);
        exitTimer.current = setTimeout(() => {
          setCurrent(null);
          setIsExiting(false);
        }, EXIT_DURATION);
      }
      return;
    }

    if (!current) {
      setCurrent(incoming);
      setIsExiting(false);
      return;
    }

    if (current.id === incoming.id) return;

    setIsExiting(true);
    exitTimer.current = setTimeout(() => {
      setCurrent(incoming);
      setIsExiting(false);
    }, EXIT_DURATION);
  }, [incoming, current]);

  useEffect(() => {
    return () => {
      if (exitTimer.current) clearTimeout(exitTimer.current);
    };
  }, []);

  if (!current) return null;

  return (
    <div className="fixed top-4 sm:top-6 right-4 sm:right-6 z-50 flex w-[90%] max-w-[340px] flex-col gap-3">
      <Toast
        key={current.id}
        {...current}
        open
        exiting={isExiting}
        onClose={() => closeToast(current.id)}
      />
    </div>
  );
}
