import { forwardRef } from "react";
import type {
  SkeletonProps,
  SkeletonVariant,
  SkeletonAnimation,
} from "./Skeleton.types";

const variantClasses: Record<SkeletonVariant, string> = {
  text: "rounded-md h-4 w-full",
  circular: "rounded-full",
  rectangular: "rounded-none",
  rounded: "rounded-[10px]",
};

const animationClasses: Record<SkeletonAnimation, string> = {
  pulse: "animate-pulse",
  wave: "animate-skeleton-wave",
  none: "",
};

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      variant = "text",
      animation = "pulse",
      width,
      height,
      lines = 1,
      className = "",
      style,
      ...rest
    },
    ref,
  ) => {
    const classes = [
      "bg-gray-200 select-none",
      variantClasses[variant],
      animationClasses[animation],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const inlineStyle = {
      width: width,
      height: height,
      ...style,
    };

    if (variant === "text" && lines > 1) {
      return (
        <div ref={ref} className="flex flex-col gap-2" {...rest}>
          {Array.from({ length: lines }).map((_, index) => (
            <div
              key={index}
              className={classes}
              style={{
                ...inlineStyle,
                width:
                  index === lines - 1 && !width ? "80%" : inlineStyle.width,
              }}
            />
          ))}
        </div>
      );
    }

    return <div ref={ref} className={classes} style={inlineStyle} {...rest} />;
  },
);

Skeleton.displayName = "Skeleton";

export default Skeleton;