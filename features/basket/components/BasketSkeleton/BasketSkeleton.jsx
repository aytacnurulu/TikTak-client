import Skeleton from "@/shared/components/Skeleton";
import Card from "@/shared/components/Card";

export default function BasketSkeleton() {
  return (
    <>
      <Skeleton variant="text" width={160} height={16} className="lg:col-span-2 mb-2" />

      <div>
        <div className="flex items-center justify-between mb-[10px]">
          <Skeleton variant="text" width={140} height={28} />
        </div>

        <Card className="px-6 divide-y divide-gray-100">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex items-center gap-4 py-4">
              <Skeleton variant="rounded" width={72} height={72} />
              <div className="flex-1 flex flex-col gap-2">
                <Skeleton variant="text" width="60%" height={16} />
                <Skeleton variant="text" width="30%" height={14} />
              </div>
              <Skeleton variant="rounded" width={90} height={36} />
              <Skeleton variant="text" width={60} height={16} />
            </div>
          ))}
        </Card>
      </div>

      <div className="flex flex-col gap-3">
        <Skeleton variant="rounded" height={140} />
      </div>
    </>
  );
}