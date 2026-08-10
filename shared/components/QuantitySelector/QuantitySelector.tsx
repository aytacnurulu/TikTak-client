"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import Button from "../Button";

interface QuantitySelectorProps {
  value?: number;
  initialValue?: number;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  onChange?: (value: number) => void;
  onCommit?: (value: number) => void;
  onIncrease?: () => void;
  onDecrease?: () => void;
  disabled?: boolean;
  decreaseIcon?: ReactNode;
  increaseIcon?: ReactNode;
  repeatDelay?: number;
  repeatInterval?: number;
}

const QuantitySelector = ({
  value,
  initialValue = 0,
  min = 0,
  max,
  step = 1,
  unit = "əd",
  onChange,
  onCommit,
  onIncrease,
  onDecrease,
  disabled = false,
  decreaseIcon,
  increaseIcon,
  repeatDelay = 400,
  repeatInterval = 120,
}: QuantitySelectorProps) => {
  const [internalValue, setInternalValue] = useState(initialValue);
  const currentValue = value ?? internalValue;
  const valueRef = useRef(currentValue);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const movedRef = useRef(false);

  useEffect(() => {
    valueRef.current = currentValue;
  }, [currentValue]);

  const clearTimers = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
    timeoutRef.current = null;
    intervalRef.current = null;
  };

  const applyStep = (direction: 1 | -1) => {
    const next =
      direction === 1
        ? Math.min(max ?? Infinity, valueRef.current + step)
        : Math.max(min, valueRef.current - step);

    if (next === valueRef.current) return;
    valueRef.current = next;
    if (value === undefined) setInternalValue(next);
    onChange?.(next);
    if (direction === 1) onIncrease?.();
    else onDecrease?.();
  };

  const start = (direction: 1 | -1) => {
    if (disabled) return;
    movedRef.current = true;
    applyStep(direction);
    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(
        () => applyStep(direction),
        repeatInterval,
      );
    }, repeatDelay);
  };

  const stop = () => {
    if (!movedRef.current) return;
    movedRef.current = false;
    clearTimers();
    onCommit?.(valueRef.current);
  };

  useEffect(() => clearTimers, []);

  const isDecreaseDisabled = disabled || currentValue <= min;
  const isIncreaseDisabled =
    disabled || (max !== undefined && currentValue >= max);

  return (
    <div className="flex items-center gap-1 w-full">
      <Button
        type="button"
        variant="accent"
        size="sm"
        onPointerDown={() => start(-1)}
        onPointerUp={stop}
        onPointerLeave={stop}
        onPointerCancel={stop}
        disabled={isDecreaseDisabled}
        aria-label="Sayı azalt"
        className="rounded-lg w-8 px-0 text-lg"
      >
        {decreaseIcon ?? "−"}
      </Button>

      <span className="flex-1 h-9 flex items-center justify-center rounded-lg bg-gray-50 border border-gray-200 text-sm font-medium">
        {currentValue}
        {unit && ` ${unit}`}
      </span>

      <Button
        type="button"
        variant="primary"
        size="sm"
        onPointerDown={() => start(1)}
        onPointerUp={stop}
        onPointerLeave={stop}
        onPointerCancel={stop}
        disabled={isIncreaseDisabled}
        aria-label="Sayı artır"
        className="rounded-lg w-8 px-0 text-lg"
      >
        {increaseIcon ?? "+"}
      </Button>
    </div>
  );
};

export default QuantitySelector;
