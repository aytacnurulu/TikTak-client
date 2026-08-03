'use client';

import Button from "../Button";

interface QuantitySelectorProps {
  value: number;
  min?: number;
  max?: number;
  unit?: string;
  onIncrease: () => void;
  onDecrease: () => void;
  disabled?: boolean;
}

const QuantitySelector = ({
  value,
  min = 0,
  max,
  unit = 'əd',
  onIncrease,
  onDecrease,
  disabled = false,
}: QuantitySelectorProps) => {
  const isDecreaseDisabled = disabled || value <= min;
  const isIncreaseDisabled = disabled || (max !== undefined && value >= max);

  return (
    <div className="flex items-center gap-1 w-full">
      <Button
        type="button"
        variant="accent"
        size="sm"
        onClick={onDecrease}
        disabled={isDecreaseDisabled}
        aria-label="Sayı azalt"
        className="rounded-full w-9 px-0 text-lg"
      >
        −
      </Button>
      <span className="flex-1 h-9 flex items-center justify-center rounded-xl bg-gray-50 border border-gray-200 text-sm font-medium">
        {value} {unit}
      </span>

      <Button
        type="button"
        variant="primary"
        size="sm"
        onClick={onIncrease}
        disabled={isIncreaseDisabled}
        aria-label="Sayı artır"
        className="rounded-full w-9 px-0 text-lg"
      >
        +
      </Button>
    </div>
  );
};

export default QuantitySelector;