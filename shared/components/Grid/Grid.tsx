import { ReactNode } from 'react';

interface GridProps {
  children: ReactNode;
  columns?: number;
  gap?: number;
  className?: string;
  ariaLabel?: string;
}

const gapClasses: Record<number, string> = {
  2: 'gap-2',
  3: 'gap-3',
  4: 'gap-4',
  5: 'gap-5',
  6: 'gap-6',
};

const responsiveColsClasses: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-2 sm:grid-cols-3',
  4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
  5: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5',
  6: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6',
};

const getColsClass = (columns: number) =>
  responsiveColsClasses[columns] ?? responsiveColsClasses[6];

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
      className={`grid ${getColsClass(columns)} ${gapClasses[gap] ?? 'gap-4'} ${className}`}
    >
      {children}
    </div>
  );
}
