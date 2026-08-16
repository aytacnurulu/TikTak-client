"use client";

import { useBasketQuantity } from "@/shared/hooks/useBasket";
import QuantitySelector from "@/shared/components/QuantitySelector";
import Button from "@/shared/components/Button";
import type { Product } from "@/packages/types/product";

interface ProductDetailActionsProps {
  productId: number;
  product: Product;
}

export default function ProductDetailActions({
  productId,
  product,
}: ProductDetailActionsProps) {
  const { quantity, increase, decrease, isPending } =
    useBasketQuantity(productId);

  if (quantity > 0) {
    return (
      <QuantitySelector
        value={quantity}
        unit={product.type}
        min={0}
        onIncrease={increase}
        onDecrease={decrease}
        disabled={isPending}
      />
    );
  }

  return (
    <Button
      type="button"
      variant="primary"
      size="lg"
      loading={isPending}
      className="w-[243px]"
      onClick={(e) => {
        e.preventDefault();
        increase();
      }}
    >
      Səbətə əlavə et
    </Button>
  );
}
