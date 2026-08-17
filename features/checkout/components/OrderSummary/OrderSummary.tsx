import Card from "@/shared/components/Card";
import type { Basket } from "@tiktak/types";

interface OrderSummaryProps {
  basket: Basket | undefined;
  isLoading: boolean;
  title?: string;
}

const OrderSummary = ({
  basket,
  isLoading,
  title = "Xülasə",
}: OrderSummaryProps) => {
  return (
    <div>
      <h2 className="text-[24px] font-bold text-dark mb-[10px]">{title}</h2>
      {isLoading ? (
        <Card className="p-6">Yüklənir...</Card>
      ) : !basket || basket.items.length === 0 ? (
        <Card className="p-6 text-gray-500">Səbətiniz boşdur.</Card>
      ) : (
        <Card className="p-4 sm:p-6">
          <div className="space-y-2 mb-4">
            {basket.items.map((item) => (
              <div key={item.id} className="flex justify-between gap-3 text-sm">
                <span className="min-w-0 truncate">
                  {item.quantity} x {item.product.title}
                </span>
                <span className="shrink-0">{item.total_price} AZN</span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 pt-4 space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Ümumi:</span>
              <span>{basket.total} AZN</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Çatdırılma:</span>
              <span>Pulsuz</span>
            </div>
            <div className="flex justify-between font-bold text-base pt-2">
              <span>Yekun məbləğ</span>
              <span>{basket.total} AZN</span>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default OrderSummary;
