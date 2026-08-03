import Link from "next/link";
import Modal from "@/shared/components/Modal";
import Button from "@/shared/components/Button";

interface AddressMissingModalProps {
  open: boolean;
  onClose: () => void;
}

const AddressMissingModal = ({ open, onClose }: AddressMissingModalProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex flex-col items-center text-center">
        <h3 className="text-lg font-bold text-[#2B3043] mb-2">
          Ünvan tapılmadı
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          Sifarişi tamamlamaq üçün profilinizə ünvan əlavə etməlisiniz.
        </p>
        <div className="flex gap-3 w-full">
          <Link href="/profile" className="flex-1">
            <Button variant="primary" size="lg" fullWidth>
              Profilə keç
            </Button>
          </Link>
          <Button variant="dark" size="lg" fullWidth onClick={onClose}>
            Bağla
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddressMissingModal;
