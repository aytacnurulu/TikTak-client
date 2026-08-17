"use client";

import { useState, type FormEvent } from "react";
import Card from "@/shared/components/Card";
import Button from "@/shared/components/Button";
import type { PaymentMethod, UserProfile } from "@tiktak/types";

interface OrderFormProps {
  profile: UserProfile | undefined;
  isSubmitting: boolean;
  onSubmit: (payload: { paymentMethod: PaymentMethod; note: string }) => void;
}

interface PaymentOptionProps {
  icon: string;
  label: string;
  selected: boolean;
  onSelect: () => void;
}

const PaymentOption = ({
  icon,
  label,
  selected,
  onSelect,
}: PaymentOptionProps) => {
  return (
    <label
      onClick={onSelect}
      className={`flex items-center gap-3 p-4 rounded-[10px] border cursor-pointer transition-colors ${
        selected ? "border-transparent bg-[#00BE46]/5" : "border-gray-200"
      }`}
    >
      <span
        className="w-6 h-6 shrink-0"
        style={{
          maskImage: `url(${icon})`,
          maskSize: "contain",
          maskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskImage: `url(${icon})`,
          WebkitMaskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          backgroundColor: selected ? "#00BE46" : "#9CA3AF",
        }}
      />
      <span
        className={`text-sm flex-1 ${selected ? "text-[#00BE46] font-medium" : "text-[#2B3043]"}`}
      >
        {label}
      </span>
      <span
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
          selected ? "border-[#00BE46]" : "border-gray-300"
        }`}
      >
        {selected && <span className="w-2.5 h-2.5 rounded-full bg-[#00BE46]" />}
      </span>
    </label>
  );
};

const OrderForm = ({ profile, isSubmitting, onSubmit }: OrderFormProps) => {
  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("CASH");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ paymentMethod, note });
  };

  return (
    <Card className="p-4 sm:p-6">
      <form onSubmit={handleSubmit} className="space-y-6 text-[#2B3043]">
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold">Adınız</p>
              <p className="text-sm">{profile?.full_name ?? "—"}</p>
            </div>
            <div>
              <p className="text-sm font-semibold">Ünvanınız</p>
              <p className="text-sm">{profile?.address ?? "—"}</p>
            </div>
            <div>
              <p className="text-sm font-semibold">Telefon nömrəniz</p>
              <p className="text-sm">{profile?.phone ?? "—"}</p>
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold block mb-1.5">
              Əlavə qeyd
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Əlavə qeydiniz varsa buraya daxil edin"
              rows={4}
              className="w-full rounded-[10px] bg-gray-50 border border-gray-200 outline-none p-3 text-sm focus:border-[#00BE46]"
            />
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold mb-2">Ödəmə metodu seçin:</p>
          <div className="grid sm:grid-cols-2 gap-3">
            <PaymentOption
              icon="/icons/cashpay.svg"
              label="Qapıda nağd ödəmə"
              selected={paymentMethod === "CASH"}
              onSelect={() => setPaymentMethod("CASH")}
            />
            <PaymentOption
              icon="/icons/cardpay.svg"
              label="Qapıda kart ilə ödəmə"
              selected={paymentMethod === "CARD"}
              onSelect={() => setPaymentMethod("CARD")}
            />
          </div>
        </div>

        <div className="flex justify-center mt-8 sm:mt-[52px] mb-5 sm:mb-[28px]">
          <Button
            type="submit"
            variant="dark"
            size="lg"
            loading={isSubmitting}
            className="w-full sm:w-[484px]"
          >
            Sifarişi tamamla
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default OrderForm;
