import Skeleton from "@/shared/components/Skeleton";
import Card from "@/shared/components/Card";

export default function AccountInfoSkeleton() {
  return (
    <Card className="p-6 sm:p-8">
      <Skeleton variant="text" width={220} height={28} className="mb-6" />

      <div className="grid sm:grid-cols-2 gap-x-6 gap-y-5">
        <Skeleton variant="rounded" height={56} />
        <Skeleton variant="rounded" height={56} />
        <Skeleton variant="rounded" height={56} />
        <Skeleton variant="rounded" height={56} />
      </div>

      <div className="mt-8">
        <Skeleton variant="text" width={200} height={22} />
        <Skeleton variant="text" width={160} height={14} className="mt-2" />
      </div>

      <div className="grid sm:grid-cols-2 gap-x-6 gap-y-5 mt-4">
        <Skeleton variant="rounded" height={56} />
        <Skeleton variant="rounded" height={56} />
      </div>

      <Skeleton variant="rounded" height={52} className="mt-6" />
    </Card>
  );
}