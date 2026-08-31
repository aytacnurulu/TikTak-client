import Skeleton from "@/shared/components/Skeleton";
import Card from "@/shared/components/Card";

export default function Loading() {
  return (
    <Card className="rounded-[10px] p-6 space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton
          variant="rounded"
          width={110}
          height={36}
          className="rounded-full"
        />
        <Skeleton variant="circular" width={32} height={32} />
      </div>

      <div className="flex flex-col sm:flex-row gap-6">
        <div className="relative w-full sm:w-45 aspect-square shrink-0">
          <Skeleton variant="rounded" width="100%" height="100%" />
        </div>

        <div className="flex flex-col gap-4 flex-1">
          <Skeleton variant="text" width="65%" height={28} />

          <div className="flex flex-col gap-2">
            <Skeleton variant="text" width="100%" height={14} />
            <Skeleton variant="text" width="95%" height={14} />
            <Skeleton variant="text" width="55%" height={14} />
          </div>

          <Skeleton variant="text" width={90} height={24} />

          <Skeleton
            variant="rounded"
            width={243}
            height={48}
            className="max-w-full"
          />
        </div>
      </div>
    </Card>
  );
}