import Skeleton from "@/shared/components/Skeleton";
import Card from "@/shared/components/Card";

function ProductCardSkeleton() {
  return (
    <Card className="flex flex-col items-center w-full h-full mx-auto max-w-[190px] p-2.5">
      <div className="relative w-full h-[140px] shrink-0 p-2">
        <Skeleton variant="rounded" width="100%" height="100%" />
      </div>
      <div className="w-full mt-1.5 flex flex-col items-center gap-1">
        <Skeleton variant="text" width="90%" height={14} />
        <Skeleton variant="text" width="60%" height={14} />
      </div>
      <Skeleton variant="text" width={70} height={14} className="mt-1" />
      <div className="w-full mt-auto pt-2">
        <Skeleton variant="rounded" height={36} />
      </div>
    </Card>
  );
}

export default function FavoritesSkeleton() {
  return (
    <div className="flex flex-col pb-6 lg:grid lg:grid-cols-[1fr_320px] lg:items-start lg:gap-x-6">
      <div className="lg:col-span-2 pt-[10px] pb-[10px]">
        <Skeleton variant="text" width={180} height={24} />
      </div>

      <section aria-label="Seçilmiş məhsullar">
        <Skeleton variant="text" width={140} height={24} className="mb-[10px]" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </section>

      <div className="mt-6 lg:mt-0">
        <Skeleton variant="rounded" height={200} />
      </div>
    </div>
  );
}