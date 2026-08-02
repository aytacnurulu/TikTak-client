// shared/components/QuantitySelector.tsx
'use client';

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
      <button
        type="button"
        onClick={onDecrease}
        disabled={isDecreaseDisabled}
        aria-label="Sayı azalt"
        className="h-9 w-9 flex items-center justify-center rounded-full bg-accent text-white text-lg font-medium disabled:opacity-40 disabled:cursor-not-allowed"
      >
        −
      </button>
      <span className="flex-1 h-9 flex items-center justify-center rounded-full bg-gray-50 border border-gray-200 text-sm font-medium">
        {value} {unit}
      </span>
      <button
        type="button"
        onClick={onIncrease}
        disabled={isIncreaseDisabled}
        aria-label="Sayı artır"
        className="h-9 w-9 flex items-center justify-center rounded-full bg-primary text-white text-lg font-medium disabled:opacity-40 disabled:cursor-not-allowed"
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;