import Skeleton from "@/shared/components/Skeleton";

export default function AccountOrdersSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100">
          <Skeleton variant="text" width={100} height={16} />
          <Skeleton variant="text" width={80} height={16} />
          <Skeleton variant="text" width={70} height={16} />
          <Skeleton variant="rounded" width={90} height={32} />
        </div>
      ))}
    </div>
  );
}