import { forwardRef } from "react";
import type { BadgeProps, BadgeVariant, BadgeSize, BadgeShape } from "./Badge.types";

const variantClasses: Record<BadgeVariant, string> = {
  primary: "bg-primary text-white",
  success: "bg-success text-white",
  danger: "bg-error text-white",
  accent: "bg-accent text-dark",
  dark: "bg-dark text-white",
  light: "bg-white text-dark border border-gray-200",
};

const outlineVariantClasses: Record<BadgeVariant, string> = {
  primary: "bg-transparent text-primary border border-primary",
  success: "bg-transparent text-success border border-success",
  danger: "bg-transparent text-error border border-error",
  accent: "bg-transparent text-accent border border-accent",
  dark: "bg-transparent text-dark border border-dark",
  light: "bg-transparent text-dark border border-gray-200",
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: "h-5 min-w-5 px-1.5 text-xs",
  md: "h-6 min-w-6 px-2 text-sm",
  lg: "h-8 min-w-8 px-2.5 text-base",
};

const dotSizeClasses: Record<BadgeSize, string> = {
  sm: "h-2 w-2",
  md: "h-2.5 w-2.5",
  lg: "h-3 w-3",
};

const shapeClasses: Record<BadgeShape, string> = {
  rounded: "rounded-md",
  pill: "rounded-full",
  circle: "rounded-full aspect-square px-0",
};

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = "primary",
      size = "md",
      shape = "pill",
      outline = false,
      dot = false,
      className = "",
      children,
      ...rest
    },
    ref,
  ) => {
    if (dot) {
      const dotClasses = [
        "inline-block rounded-full",
        dotSizeClasses[size],
        outline ? outlineVariantClasses[variant] : variantClasses[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ");

      return <span ref={ref} className={dotClasses} {...rest} />;
    }

    const classes = [
      "inline-flex items-center justify-center gap-1 font-medium leading-none",
      shapeClasses[shape],
      sizeClasses[size],
      outline ? outlineVariantClasses[variant] : variantClasses[variant],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <span ref={ref} className={classes} {...rest}>
        {children}
      </span>
    );
  },
);

Badge.displayName = "Badge";

export default Badge;