import { useToastStore } from "@/shared/store/useToastStore";

export const useToast = () => {
  const showToast = useToastStore((s) => s.showToast);
  const hideToast = useToastStore((s) => s.hideToast);

  return { showToast, hideToast };
};

export const useToastState = () =>
  useToastStore((state) => ({
    open: state.open,
    title: state.title,
    description: state.description,
    type: state.type,
    duration: state.duration,
    hideToast: state.hideToast,
  }));
