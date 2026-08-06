import type { BasketItem } from '@/shared/hooks/useBasket';

export interface BasketCardProps {
  item: BasketItem;
  onIncrease: () => void;
  onDelete: () => void;
  disabled?: boolean;
}
