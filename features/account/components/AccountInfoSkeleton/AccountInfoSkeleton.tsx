import Skeleton from "@/shared/components/Skeleton";
import Card from "@/shared/components/Card";

export default function AccountInfoSkeleton() {
  return (
    <Card className="p-6">
      <div className="flex flex-col gap-4">
        <Skeleton variant="rounded" height={48} />
        <Skeleton variant="rounded" height={48} />
        <Skeleton variant="rounded" height={48} />
        <Skeleton variant="rounded" width={140} height={44} className="mt-2" />
      </div>
    </Card>
  );
}