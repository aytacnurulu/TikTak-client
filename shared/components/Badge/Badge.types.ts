import { HTMLAttributes, ReactNode } from 'react';

export type BadgeVariant = 'primary' | 'success' | 'danger' | 'accent' | 'dark' | 'light';
export type BadgeSize = 'sm' | 'md' | 'lg';
export type BadgeShape = 'rounded' | 'pill' | 'circle';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  shape?: BadgeShape;
  outline?: boolean;
  dot?: boolean;
  children?: ReactNode;
}