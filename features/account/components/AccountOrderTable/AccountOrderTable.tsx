import Link from "next/link";
import type { Order } from "@tiktak/types";
import {
  getOrderStatusLabel,
  getPaymentMethodLabel,
} from "../../utils/orderLabels";

const formatDate = (value?: string | null) => {
  if (!value) return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";

  return new Intl.DateTimeFormat("az-AZ").format(date);
};

const getOrderNumber = (id: number, orderNumber?: string | number) =>
  `#${orderNumber ?? id}`;

const getItemCount = (order: Order) =>
  order.item_count ??
  order.items?.reduce((total, item) => total + item.quantity, 0) ??
  0;

const getOrderTotal = (order: Order) => {
  if (order.total !== undefined) return `${order.total} ₼`;

  const subtotal = Number(order.subtotal ?? 0);
  const deliveryFee = Number(order.deliveryFee ?? 0);
  return `${(subtotal + deliveryFee).toFixed(2)} ₼`;
};

const TruncatedCell = ({ value }: { value: string | number }) => {
  const text = String(value);

  return (
    <span className="block truncate" title={text}>
      {text}
    </span>
  );
};

interface AccountOrderTableProps {
  orders: Order[];
}

const AccountOrderTable = ({ orders }: AccountOrderTableProps) => (
  <div className="w-full overflow-x-auto">
    <table className="w-full table-fixed text-left text-base font-light leading-none text-dark">
      <colgroup>
        <col className="w-[10%]" />
        <col className="w-[12%]" />
        <col className="w-[17%]" />
        <col className="w-[9%]" />
        <col className="w-[14%]" />
        <col className="w-[12%]" />
        <col className="w-[12%]" />
        <col className="w-[10%]" />
      </colgroup>
      <thead className="bg-[#F6F5FB] text-dark text-base font-normal leading-none">
        <tr className="h-[60px]">
          <th className="rounded-l-md px-2 py-3 sm:px-3">No</th>
          <th className="px-2 py-3 sm:px-3">Tarix</th>
          <th className="px-2 py-3 sm:px-3">Çatdırılma ünvanı</th>
          <th className="px-2 py-3 sm:px-3">Məhsul sayı</th>
          <th className="px-2 py-3 sm:px-3">Ara cəm/Çatdırılma</th>
          <th className="px-2 py-3 sm:px-3">Ödəniş üsulu</th>
          <th className="px-2 py-3 sm:px-3">Sifariş statusu</th>
          <th className="rounded-r-md px-2 py-3 sm:px-3" />
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => {
          const address = order.delivery_address ?? order.address ?? "-";

          return (
            <tr
              key={order.id}
              className="border-b border-gray-100 last:border-0"
            >
              <td className="max-w-0 px-2 py-3 sm:px-3">
                <TruncatedCell
                  value={getOrderNumber(order.id, order.orderNumber)}
                />
              </td>
              <td className="max-w-0 px-2 py-3 whitespace-nowrap sm:px-3">
                <TruncatedCell value={formatDate(order.createdAt)} />
              </td>
              <td className="max-w-0 px-2 py-3 sm:px-3">
                <TruncatedCell value={address} />
              </td>
              <td className="max-w-0 px-2 py-3 sm:px-3">
                <TruncatedCell value={getItemCount(order)} />
              </td>
              <td className="max-w-0 px-2 py-3 whitespace-nowrap sm:px-3">
                <TruncatedCell value={getOrderTotal(order)} />
              </td>
              <td className="max-w-0 px-2 py-3 sm:px-3">
                <TruncatedCell
                  value={getPaymentMethodLabel(order.paymentMethod)}
                />
              </td>
              <td className="max-w-0 px-2 py-3 sm:px-3">
                <TruncatedCell value={getOrderStatusLabel(order.status)} />
              </td>
              <td className="max-w-0 px-2 py-3 text-right whitespace-nowrap sm:px-3">
                <Link
                  href={`/account/orders/${order.id}`}
                  className="text-base font-light leading-none hover:text-primary"
                  title="Sifariş detallarına bax"
                >
                  detallar &gt;
                </Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

export default AccountOrderTable;
