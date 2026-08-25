import type { PaymentMethod } from "@tiktak/types";

const statusLabels: Record<string, string> = {
  new: "Yeni sifariş",
  pending: "Gözləyir",
  awaiting: "Gözləyir",
  awaiting_payment: "Ödəniş gözlənilir",
  payment_pending: "Ödəniş gözlənilir",
  confirmed: "Təsdiqlənib",
  processing: "Hazırlanır",
  shipped: "Yoldadır",
  in_transit: "Yoldadır",
  out_for_delivery: "Çatdırılır",
  delivered: "Çatdırılıb",
  completed: "Tamamlanıb",
  cancelled: "Ləğv edilib",
  rejected: "Rədd edilib",
  failed: "Uğursuz oldu",
};

export const getPaymentMethodLabel = (paymentMethod?: PaymentMethod) => {
  if (paymentMethod === "CASH") return "Nağd ödəniş";
  if (paymentMethod === "CARD") return "Kartla ödəniş";
  return "-";
};

export const getOrderStatusLabel = (status: string) =>
  statusLabels[status.trim().toLowerCase()] ?? status;
