'use client';

import { useState } from 'react';
import { useBasketQuantity } from '@/shared/hooks/useBasket';
import QuantitySelector from '@/shared/components/QuantitySelector';
import Button from '../Button';

interface AddToBasketButtonProps {
  productId: number;
  productType: string;
}

export default function AddToBasketButton({ productId,productType }: AddToBasketButtonProps) {
  const { quantity, increase, setQuantity, isPending } = useBasketQuantity(productId);

  const [localQty, setLocalQty] = useState(quantity);
  const [prevQuantity, setPrevQuantity] = useState(quantity);

  if (quantity !== prevQuantity) {
    setPrevQuantity(quantity);
    setLocalQty(quantity);
  }

  if (localQty > 0) {
    return (
      <QuantitySelector
        value={localQty}
        min={0}
        unit={productType}
        onChange={setLocalQty}
        onCommit={setQuantity}
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