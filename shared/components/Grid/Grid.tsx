import { ReactNode } from 'react';

interface GridProps {
  children: ReactNode;
  columns?: number;
  gap?: number;
  className?: string;
  ariaLabel?: string;
}

export default function Grid({
  children,
  columns = 6,
  gap = 4,
  className = '',
  ariaLabel,
}: GridProps) {
  return (
    <div
      role="list"
      aria-label={ariaLabel}
      className={`grid ${className}`}
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gap: `${gap * 0.25}rem`,
      }}
    >
      {children}
    </div>
  );
}