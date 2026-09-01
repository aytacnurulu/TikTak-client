"use client";

import AccountOrderTable from "../components/AccountOrderTable/AccountOrderTable";
import { useOrdersQuery } from "../hooks/useProfile";
import AccountOrdersSkeleton from '../components/AccountOrderSkeleton'

const OrdersPage = () => {
  const { data: orders = [], isLoading, isError } = useOrdersQuery();

  return (
    <section className="bg-white rounded-[10px] border border-gray-100 p-4 sm:p-6 w-full">
      <h1 className="text-[28px] font-normal leading-none tracking-normal text-dark mb-5">
        Sifariş tarixçəsi
      </h1>

      {isLoading ? (
        <AccountOrdersSkeleton />
      ) : isError ? (
        <p className="py-10 text-center text-sm text-gray-500">
          Sifarişləri yükləmək mümkün olmadı.
        </p>
      ) : orders.length === 0 ? (
        <p className="py-10 text-center text-sm text-gray-500">
          Hələ sifarişiniz yoxdur.
        </p>
      ) : (
        <AccountOrderTable orders={orders} />
      )}
    </section>
  );
};

export default OrdersPage;
