"use client";

import { useRouter } from "next/navigation";
import Modal from "@/shared/components/Modal";
import Button from "@/shared/components/Button";

interface OrderSuccessModalProps {
  open: boolean;
  onClose: () => void;
}

const OrderSuccessModal = ({ open, onClose }: OrderSuccessModalProps) => {
  const router = useRouter();

  const handleClose = () => {
    onClose();
    router.push("/home");
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="flex flex-col items-center text-center">
        <div className="w-24 h-24 flex items-center justify-center mb-6">
          <img
            src="/icons/successfully.completed.svg"
            alt=""
            className="w-full h-full"
          />
        </div>
        <h3 className="text-lg font-bold text-[#2B3043] mb-6">
          Sifariş uğurla tamamlandı
        </h3>
        <Button variant="primary" size="lg" fullWidth onClick={handleClose}>
          Bağla
        </Button>
      </div>
    </Modal>
  );
};

export default OrderSuccessModal;
