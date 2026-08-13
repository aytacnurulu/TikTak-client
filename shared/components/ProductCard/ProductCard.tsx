import Link from "next/link";
import type { Product } from "@tiktak/types";
import Card from "@/shared/components/Card";
import FavoriteButton from "@/shared/components/FavoriteButton";
import ProductImage from "./ProductImage";
import type { ProductCardProps, ProductCardSize } from "./ProductCard.types";

const sizeMap: Record<
  ProductCardSize,
  { card: string; padding: string; title: string; price: string; gap: string }
> = {
  sm: {
    card: "max-w-[140px]",
    padding: "p-2",
    title: "text-xs",
    price: "text-xs",
    gap: "mt-1.5",
  },
  md: {
    card: "max-w-[190px]",
    padding: "p-2.5",
    title: "text-sm",
    price: "text-sm",
    gap: "mt-1.5",
  },
  lg: {
    card: "w-full",
    padding: "p-3",
    title: "text-sm",
    price: "text-sm",
    gap: "mt-2",
  },
};

export default function ProductCard({
  id,
  image,
  title,
  price,
  href,
  currency = "AZN",
  actionSlot,
  className = "",
  size = "lg",
}: ProductCardProps) {
  const {
    card,
    padding,
    title: titleClass,
    price: priceClass,
    gap,
  } = sizeMap[size];

  const productHref = href ?? `/products/${id}`;

  // Best-effort shape for the favorites cache's optimistic-add — fields the
  // card doesn't carry (description/type/category) are filled by the
  // background refetch that follows the toggle.
  const favoriteProduct: Product = {
    id: Number(id),
    title,
    img_url: typeof image === "string" ? image : image.src,
    price,
    description: "",
    type: "",
    created_at: "",
    category: { id: 0, name: "" },
  };

  return (
    <Card
      className={`flex flex-col items-center w-full mx-auto ${card} ${padding} transition-shadow hover:shadow-md ${className}`}
    >
      <Link href={productHref} className="flex flex-col items-center w-full">
        <div className="relative w-full aspect-square shrink-0">
          <ProductImage image={image} title={title} />
          <FavoriteButton
            product={favoriteProduct}
            className="absolute top-2 right-2 z-10"
          />
        </div>
        <span
          className={`${gap} ${titleClass} font-medium text-gray-800 text-center leading-snug line-clamp-2`}
        >
          {title}
        </span>
        <span className={`${priceClass} text-gray-500`}>
          {Number(price).toFixed(2)} {currency}
        </span>
      </Link>
      <div className="w-full mt-1.5">{actionSlot}</div>
    </Card>
  );
}
