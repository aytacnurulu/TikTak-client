import AccountOrderDetail from "@/features/account/components/AccountOrderDetail/AccountOrderDetail";
import { notFound } from "next/navigation";

export default async function AccountOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id) {
    notFound()
  }
  
  return <AccountOrderDetail orderId={id} />;
}
