import Skeleton from "@/shared/components/Skeleton";
import Card from "@/shared/components/Card";

function CategoryCardSkeleton() {
  return (
    <Card className="flex flex-col items-center gap-3 p-4 w-full">
      <Skeleton variant="rectangular" width={96} height={96} />
      <Skeleton variant="text" width="70%" height={14} />
    </Card>
  );
}

export default function Loading() {
  return (
    <section className="py-6 flex flex-col lg:flex-row gap-4 items-start">
      <Skeleton
        variant="rounded"
        className="w-full lg:w-[330px] shrink-0"
        height={330}
      />

      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4 w-full">
        {Array.from({ length: 12 }).map((_, index) => (
          <CategoryCardSkeleton key={index} />
        ))}
      </div>
    </section>
  );
}