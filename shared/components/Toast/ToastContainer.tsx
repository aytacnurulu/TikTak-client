"use client";

import { useShallow } from "zustand/react/shallow";
import Toast from "./Toast";
import { useToastStore } from "@/shared/store/useToastStore";

export default function ToastContainer() {
  const { id, open, title, description, type, duration, hideToast } =
    useToastStore(
      useShallow((state) => ({
        id: state.id,
        open: state.open,
        title: state.title,
        description: state.description,
        type: state.type,
        duration: state.duration,
        hideToast: state.hideToast,
      })),
    );

  return (
    <Toast
      id={id}
      open={open}
      title={title}
      description={description}
      type={type}
      duration={duration}
      onClose={hideToast}
    />
  );
}
