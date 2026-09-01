import Skeleton from "@/shared/components/Skeleton";
import Card from "@/shared/components/Card";

export default function BasketSkeleton() {
  return (
    <>
      <div className="lg:col-span-2 pt-[10px] pb-[10px]">
        <Skeleton variant="text" width={160} height={24} />
      </div>

      <div className="self-start">
        <div className="mb-[20px]">
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

       <div className="self-start">
        <div className="mb-[25px]">
          <Skeleton variant="text" width={140} height={24} />
        </div>
 
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between">
              <Skeleton variant="text" width={60} height={14} />
              <Skeleton variant="text" width={70} height={14} />
            </div>
            <div className="flex justify-between">
              <Skeleton variant="text" width={80} height={14} />
              <Skeleton variant="text" width={60} height={14} />
            </div>
          </div>
 
          <div className="mt-8 flex justify-between">
            <Skeleton variant="text" width={90} height={16} />
            <Skeleton variant="text" width={70} height={16} />
          </div>
 
          <Skeleton variant="rounded" height={60} className="mt-4" />
        </Card>
      </div>
    </>
  );
}
