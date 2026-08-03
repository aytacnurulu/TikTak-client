"use client";

import { useState } from "react";
import OrderForm from "../components/OrderForm/OrderForm";
import OrderSummary from "../components/OrderSummary/OrderSummary";
import ConfirmOrderModal from "../components/ConfirmOrderModal/ConfirmOrderModal";
import AddressMissingModal from "../components/AddressMissingModal/AddressMissingModal";
import {
  useProfileQuery,
  useBasketQuery,
  useCheckoutMutation,
} from "../hooks/useCheckout";
import type { PaymentMethod } from "@tiktak/types";

const CheckoutPage = () => {
  const { data: profile } = useProfileQuery();
  const { data: basket, isLoading: isBasketLoading } = useBasketQuery();
  const { mutate, isPending } = useCheckoutMutation();

  const [pendingPayload, setPendingPayload] = useState<{
    paymentMethod: PaymentMethod;
    note: string;
  } | null>(null);
  const [showAddressMissing, setShowAddressMissing] = useState(false);

  const handleFormSubmit = (payload: {
    paymentMethod: PaymentMethod;
    note: string;
  }) => {
    if (!profile?.address || !profile?.phone) {
      setShowAddressMissing(true);
      return;
    }
    setPendingPayload(payload);
  };

  const handleConfirm = () => {
    if (!pendingPayload || !profile?.address || !profile?.phone) return;
    mutate({
      paymentMethod: pendingPayload.paymentMethod,
      note: pendingPayload.note,
      address: profile.address,
      phone: profile.phone,
    });
  };

  return (
    <div className="py-8">
      <p className="text-sm text-gray-400 mb-4">Ana səhifə / Meyvələr</p>
      <div className="grid lg:grid-cols-[1fr_360px] gap-6 items-start">
        <div className="max-w-[750px]">
          <h1 className="text-xl font-bold text-[#2B3043] mb-4">
            Sifarişin tamamlanması
          </h1>
          <OrderForm
            profile={profile}
            isSubmitting={isPending}
            onSubmit={handleFormSubmit}
          />
        </div>
        <OrderSummary basket={basket} isLoading={isBasketLoading} />
      </div>

      <ConfirmOrderModal
        open={pendingPayload !== null}
        isSubmitting={isPending}
        onConfirm={handleConfirm}
        onCancel={() => setPendingPayload(null)}
      />

      <AddressMissingModal
        open={showAddressMissing}
        onClose={() => setShowAddressMissing(false)}
      />
    </div>
  );
};

export default CheckoutPage;
