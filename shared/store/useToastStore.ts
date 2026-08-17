import { create } from "zustand";

export type ToastType = "success" | "error" | "info";

interface ToastState {
  id: number;
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
  hideToast: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  id: 0,
  open: false,
  title: "",
  description: undefined,
  type: "success",
  duration: 4000,
  showToast: (title, description, type = "success", duration = 4000) =>
    set((state) => ({
      id: state.id + 1,
      open: true,
      title,
      description,
      type,
      duration,
    })),
  hideToast: () => set({ open: false }),
}));