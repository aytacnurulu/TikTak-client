import { ReactNode } from 'react';

interface CategoryGridProps {
  children: ReactNode;
  columns?: number;
  className?: string;
  ariaLabel?: string;
}

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

export default function CategoryGrid({
  children,
  columns = 6,
  className = '',
  ariaLabel,
}: CategoryGridProps) {
  return (
    <div
      role="list"
      aria-label={ariaLabel}
      className={`grid gap-4 ${getColsClass(columns)} ${className}`}
    >
      {children}
    </div>
  );
}
