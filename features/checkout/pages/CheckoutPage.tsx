"use client";

import { useEffect, useState } from "react";
import Spinner from "@/shared/components/Spinner";
import { useRequireAuth } from "@/shared/hooks/useRequireAuth";
import OrderForm from "../components/OrderForm/OrderForm";
import OrderSummary from "../components/OrderSummary";
import Breadcrumb from "@/shared/components/Breadcrumb";
import ConfirmOrderModal from "../components/ConfirmOrderModal/ConfirmOrderModal";
import AddressMissingModal from "../components/AddressMissingModal/AddressMissingModal";
import OrderSuccessModal from "../components/OrderSuccessModal/OrderSuccessModal";
import {
  useProfileQuery,
  useBasketQuery,
  useCheckoutMutation,
} from "../hooks/useCheckout";
import type { PaymentMethod } from "@tiktak/types";

const CheckoutPage = () => {
  const { requireAuth, isAuthenticated, hasHydrated } = useRequireAuth();

  useEffect(() => {
    if (!hasHydrated) return;
    requireAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasHydrated]);

  const { data: profile } = useProfileQuery();
  const { data: basket, isLoading: isBasketLoading } = useBasketQuery();
  const { mutate, isPending } = useCheckoutMutation();

  const [pendingPayload, setPendingPayload] = useState<{
    paymentMethod: PaymentMethod;
    note: string;
  } | null>(null);
  const [showAddressMissing, setShowAddressMissing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

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
    mutate(
      {
        paymentMethod: pendingPayload.paymentMethod,
        note: pendingPayload.note,
        address: profile.address,
        phone: profile.phone,
      },
      {
        onSuccess: () => {
          setPendingPayload(null);
          setShowSuccess(true);
        },
      },
    );
  };

  if (!hasHydrated || !isAuthenticated) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Ana səhifə", href: "/category" },
          { label: "Sifarişim" },
        ]}
        className="mb-4 pt-2 lg:col-span-2"
      />

      <div className="">
        <h1 className="text-lg font-bold text-[#2B3043] mb-4">
          Sifarişin tamamlanması
        </h1>
        <OrderForm
          profile={profile}
          isSubmitting={isPending}
          onSubmit={handleFormSubmit}
        />
      </div>

      <OrderSummary basket={basket} isLoading={isBasketLoading} />

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

      <OrderSuccessModal open={showSuccess} onClose={() => setShowSuccess(false)} />
    </>
  );
};

export default CheckoutPage;
