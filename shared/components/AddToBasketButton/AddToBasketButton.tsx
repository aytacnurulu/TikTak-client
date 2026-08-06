'use client';

import { useBasketQuantity } from '@/shared/hooks/useBasket';
import QuantitySelector from '@/shared/components/QuantitySelector';
import Button from '../Button';

interface AddToBasketButtonProps {
  productId: number;
}

export default function AddToBasketButton({ productId }: AddToBasketButtonProps) {
  const { quantity, increase, decrease, isPending } = useBasketQuantity(productId);

  if (quantity > 0) {
    return (
      <QuantitySelector
        value={quantity}
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
      size="sm"
      fullWidth
      loading={isPending}
      onClick={(e) => {
        e.preventDefault();
        increase();
      }}
    >
      Səbətə əlavə et
    </Button>
  );
}
