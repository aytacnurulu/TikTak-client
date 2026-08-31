import Skeleton from "@/shared/components/Skeleton";
import Card from "@/shared/components/Card";

function ProductCardSkeleton() {
  return (
    <Card className="flex flex-col items-center w-full h-full mx-auto p-2.5">
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

export default function Loading() {
  return (
    <section>
      <h2
        aria-hidden="true"
        className="invisible text-[24px] font-bold mb-[10px]"
      >
        placeholder
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </section>
  );
}
