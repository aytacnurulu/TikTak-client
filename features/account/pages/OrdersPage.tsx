"use client";

import Spinner from "@/shared/components/Spinner";
import AccountOrderTable from "../components/AccountOrderTable/AccountOrderTable";
import { useOrdersQuery } from "../hooks/useProfile";

const OrdersPage = () => {
  const { data: orders = [], isLoading, isError } = useOrdersQuery();

  return (
    <section className="bg-white rounded-[10px] border border-gray-100 p-4 sm:p-6 w-full">
      <h1 className="text-lg font-bold text-[#2B3043] mb-5">
        Sifariş tarixçəsi
      </h1>

      {isLoading ? (
        <div className="flex justify-center py-16">
          <Spinner size="lg" color="primary" />
        </div>
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
