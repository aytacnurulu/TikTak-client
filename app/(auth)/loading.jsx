import Skeleton from '@/shared/components/Skeleton'

export default function Loading() {
  return (
    <div className="w-full flex flex-col gap-6">
      <Skeleton variant="text" width={120} height={28} />

      <Skeleton variant="text" width="70%" height={16} />

      <div className="flex flex-col gap-4 mt-2">
        <Skeleton variant="rounded" height={48} />
        <Skeleton variant="rounded" height={48} />
        <Skeleton variant="rounded" height={48} />
      </div>

      <Skeleton variant="rounded" height={48} className="mt-2" />
    </div>
  );
}