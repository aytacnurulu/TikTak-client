import Skeleton from "@/shared/components/Skeleton";

export default function AccountOrderDetailSkeleton() {
  return (
    <section className="bg-white rounded-[10px] border border-gray-100 p-4 sm:p-6 w-full">
      <div className="flex flex-col gap-[40px]">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i}>
              <Skeleton variant="text" width={100} height={14} />
              <Skeleton variant="text" width={140} height={16} className="mt-2" />
            </div>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i}>
              <Skeleton variant="text" width={100} height={14} />
              <Skeleton variant="text" width={140} height={16} className="mt-2" />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-[70px]">
        <Skeleton variant="text" width={100} height={16} className="mb-4" />
        <div className="divide-y divide-gray-100 border-y border-gray-100">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="grid grid-cols-4 items-center gap-4 py-[6px]">
              <Skeleton variant="rounded" width={56} height={56} />
              <Skeleton variant="text" width="80%" height={14} />
              <Skeleton variant="text" width={20} height={14} className="mx-auto" />
              <Skeleton variant="text" width={50} height={14} className="ml-auto" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}