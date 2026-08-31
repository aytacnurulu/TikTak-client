import CheckoutPage from "@/features/checkout/pages/CheckoutPage";

export default async function Page() {
   await new Promise((r) => setTimeout(r, 4000));
  return <CheckoutPage />;
}
