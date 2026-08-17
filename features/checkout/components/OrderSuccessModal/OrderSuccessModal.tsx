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
    router.push("/category");
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="flex flex-col items-center text-center">
        <div className="w-40 h-40 flex items-center justify-center mb-6">
          <img
            src="/icons/successfully.completed.svg"
            alt=""
            className="w-full h-full"
          />
        </div>
        <h3 className="text-[28px] font-medium text-[#1A1D28] mb-2">
          Sifariş uğurla tamamlandı
        </h3>
        <p className="text-2xl font-light leading-[136%] text-[#1A1D28] mb-6">
          Əməkdaşlarımız sizinlə əlaqə saxlayıb sifarişinizi göndərəcəklər.
        </p>
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={handleClose}
          className="text-2xl font-bold"
        >
          Bağla
        </Button>
      </div>
    </Modal>
  );
};

export default OrderSuccessModal;
