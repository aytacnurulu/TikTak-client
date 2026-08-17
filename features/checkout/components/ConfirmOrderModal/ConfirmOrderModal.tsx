"use client";

import { startTransition, useEffect, useState } from "react";
import Modal from "@/shared/components/Modal";
import Button from "@/shared/components/Button";

interface ConfirmOrderModalProps {
  open: boolean;
  isSubmitting: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  durationSeconds?: number;
}

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
};

const ConfirmOrderModal = ({
  open,
  isSubmitting,
  onConfirm,
  onCancel,
  durationSeconds = 180,
}: ConfirmOrderModalProps) => {
  const [secondsLeft, setSecondsLeft] = useState(durationSeconds);

  useEffect(() => {
    if (open) {
      startTransition(() => setSecondsLeft(durationSeconds));
    }
  }, [open, durationSeconds]);

  useEffect(() => {
    if (!open || secondsLeft <= 0) return;
    const timer = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [open, secondsLeft]);

  useEffect(() => {
    if (open && secondsLeft === 0) onCancel();
  }, [secondsLeft, open, onCancel]);

  return (
    <Modal open={open} onClose={onCancel}>
      <div className="flex flex-col items-center text-center">
        <div className="w-40 h-40 flex items-center justify-center mb-6">
          <img
            src="/icons/waiting.modal.svg"
            alt=""
            className="w-full h-full"
          />
        </div>
        <h3 className="text-lg font-bold text-[#2B3043] mb-1">
          Sifarişinizi tesdiqləyiniz
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          vaxtın bitməsinə {formatTime(secondsLeft)} qaldı
        </p>
        <div className="flex gap-3 w-full">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            loading={isSubmitting}
            onClick={onConfirm}
            className="text-2xl font-bold"
          >
            Təsdiqlə
          </Button>
          <Button
            variant="dark"
            size="lg"
            fullWidth
            className="opacity-40 text-2xl font-bold"
            onClick={onCancel}
          >
            İndi yox
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmOrderModal;
