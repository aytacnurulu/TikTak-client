import { create } from "zustand";

export type ToastType = "success" | "error" | "info";

export interface ToastItem {
  id: number;
  title: string;
  description?: string;
  type: ToastType;
  duration: number;
}

interface ToastState {
  id: number;
  toasts: ToastItem[];
  open: boolean;
  title: string;
  description?: string;
  type: ToastType;
  duration: number;
  showToast: (
    title: string,
    description?: string,
    type?: ToastType,
    duration?: number,
  ) => void;
  closeToast: (id: number) => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  id: 0,
  toasts: [],
  open: false,
  title: "",
  description: undefined,
  type: "success",
  duration: 2500,
  showToast: (title, description, type = "success", duration = 2500) =>
    set((state) => {
      const id = state.id + 1;
      const toast = { id, title, description, type, duration };

      return {
        id,
        toasts: [...state.toasts, toast],
        open: true,
        title,
        description,
        type,
        duration,
      };
    }),
  closeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
      open: state.toasts.some((toast) => toast.id !== id),
    })),
  hideToast: () => set({ toasts: [], open: false }),
}));
