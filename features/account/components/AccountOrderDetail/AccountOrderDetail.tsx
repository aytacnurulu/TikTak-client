"use client";

import Image from "next/image";
import Link from "next/link";
import Spinner from "@/shared/components/Spinner";
import type { Order } from "@tiktak/types";
import { useOrdersQuery } from "../../hooks/useProfile";

const formatDateTime = (value?: string | null) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";

  return new Intl.DateTimeFormat("az-AZ", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
};

const getOrderNumber = (order: Order) => `#${order.order_number ?? order.id}`;

const getTotal = (item: { total_price?: string | number }) =>
  `${Number(item.total_price ?? 0).toFixed(2)} ₼`;

interface AccountOrderDetailProps {
  orderId: string;
}

const AccountOrderDetail = ({ orderId }: AccountOrderDetailProps) => {
  const { data: orders = [], isLoading, isError } = useOrdersQuery();
  const order = orders.find((item) => String(item.id) === orderId);

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="rounded-[10px] border border-gray-100 bg-white p-10 text-center">
        <p className="text-sm text-gray-500">Sifariş tapılmadı.</p>
        <Link
          href="/account/orders"
          className="mt-4 inline-block text-sm text-primary"
        >
          Sifarişlərə qayıt
        </Link>
      </div>
    );
  }

  return (
      <section className="bg-white rounded-[10px] border border-gray-100 p-4 sm:p-6 w-full">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
        <div>
          <Link
            href="/account/orders"
            className="text-xs text-gray-400 hover:text-primary"
          >
            Sifarişlərimə qayıt
          </Link>
          <h1 className="mt-2 text-lg font-bold text-[#2B3043]">
            Sifariş {getOrderNumber(order)}
          </h1>
        </div>
        <span className="text-sm text-gray-500">{order.status}</span>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-sm">
        <div>
          <p className="text-gray-500">Sifariş nömrəsi</p>
          <p className="mt-2 text-[#687080]">{getOrderNumber(order)}</p>
        </div>
        <div>
          <p className="text-gray-500">Sifariş vaxtı</p>
          <p className="mt-2 text-[#687080]">
            {formatDateTime(order.created_at)}
          </p>
        </div>
        <div>
          <p className="text-gray-500">Ödəniş üsulu</p>
          <p className="mt-2 text-[#687080]">{order.payment_method ?? "-"}</p>
        </div>
        <div>
          <p className="text-gray-500">Çatdırılma ünvanı</p>
          <p className="mt-2 text-[#687080] whitespace-pre-line">
            {order.delivery_address ?? order.address ?? "-"}
          </p>
        </div>
        <div>
          <p className="text-gray-500">Məhsul sayı</p>
          <p className="mt-2 text-[#687080]">
            {order.item_count ??
              order.items?.reduce((sum, item) => sum + item.quantity, 0) ??
              0}
          </p>
        </div>
        <div>
          <p className="text-gray-500">Ümumi məbləğ</p>
          <p className="mt-2 text-[#687080]">{order.total ?? "-"} ₼</p>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="mb-4 text-sm font-semibold text-[#2B3043]">
          Məhsullar
        </h2>
        <div className="divide-y divide-gray-100 border-y border-gray-100">
          {(order.items ?? []).map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 py-4 text-sm text-[#687080]"
            >
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-gray-50">
                <Image
                  src={item.product.img_url || "/image/apple.svg"}
                  alt={item.product.title}
                  fill
                  sizes="56px"
                  className="object-contain"
                />
              </div>
              <p className="min-w-0 flex-1 truncate">{item.product.title}</p>
              <span className="w-16 text-center">{item.quantity}</span>
              <span className="w-24 text-right">{getTotal(item)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AccountOrderDetail;
