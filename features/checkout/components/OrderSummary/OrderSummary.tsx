import Card from "@/shared/components/Card";
import type { Basket } from "@tiktak/types";

interface OrderSummaryProps {
  basket: Basket | undefined;
  isLoading: boolean;
}

const OrderSummary = ({ basket, isLoading }: OrderSummaryProps) => {
  if (isLoading) {
    return <Card className="p-6">Yüklənir...</Card>;
  }

  if (!basket || basket.items.length === 0) {
    return <Card className="p-6 text-gray-500">Səbətiniz boşdur.</Card>;
  }

  return (
    <Card className="p-6">
      <h2 className="text-lg font-bold text-dark mb-4">Xülasə</h2>

      <div className="space-y-2 mb-4">
        {basket.items.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span>
              {item.quantity} x {item.product.title}
            </span>
            <span>{item.total_price} AZN</span>
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
  );
};

export default OrderSummary;
