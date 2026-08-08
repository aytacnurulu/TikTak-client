import AccountOrderDetail from "@/features/profile/components/AccountOrderDetail/AccountOrderDetail";

export default async function AccountOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <AccountOrderDetail orderId={id} />;
}
