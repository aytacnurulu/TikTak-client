import Skeleton from "@/shared/components/Skeleton";
import Card from "@/shared/components/Card";

const ITEM_ROW_WIDTHS = [90, 120, 150, 80, 100, 70, 110];

export default function Loading() {
  return (
    <>
      <nav className="pt-[10px] pb-[24px] lg:col-span-2">
        <Skeleton variant="text" width={160} height={20} />
      </nav>

      <div>
        <Skeleton
          variant="text"
          width={260}
          height={24}
          className="mb-[10px]"
        />

        <Card className="p-4 sm:p-6">
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Skeleton
                    variant="text"
                    width={70}
                    height={14}
                    className="mb-1"
                  />
                  <Skeleton variant="text" width={140} height={14} />
                </div>
                <div>
                  <Skeleton
                    variant="text"
                    width={80}
                    height={14}
                    className="mb-1"
                  />
                  <Skeleton variant="text" width={180} height={14} />
                </div>
                <div>
                  <Skeleton
                    variant="text"
                    width={120}
                    height={14}
                    className="mb-1"
                  />
                  <Skeleton variant="text" width={110} height={14} />
                </div>
              </div>

              <div>
                <Skeleton
                  variant="text"
                  width={90}
                  height={14}
                  className="mb-1.5"
                />
                <Skeleton variant="rounded" width="100%" height={110} />
              </div>
            </div>

            <div>
              <Skeleton
                variant="text"
                width={150}
                height={14}
                className="mb-2"
              />
              <div className="grid sm:grid-cols-2 gap-3">
                <Skeleton variant="rounded" width="100%" height={56} />
                <Skeleton variant="rounded" width="100%" height={56} />
              </div>
            </div>

            <div className="flex justify-center mt-[60px] sm:mt-[80px] mb-5 sm:mb-[28px]">
              <Skeleton
                variant="rounded"
                width={484}
                height={48}
                className="w-full sm:w-[484px]"
              />
            </div>
          </div>
        </Card>
      </div>

      <div>
        <Skeleton variant="text" width={90} height={24} className="mb-[10px]" />
        <Card className="p-4 sm:p-6">
          <div className="space-y-2 mb-4">
            {ITEM_ROW_WIDTHS.map((w, i) => (
              <div key={i} className="flex justify-between gap-3">
                <Skeleton variant="text" width={w} height={14} />
                <Skeleton variant="text" width={55} height={14} />
              </div>
            ))}
          </div>
          <div className="border-t border-gray-100 pt-4 space-y-1">
            <div className="flex justify-between">
              <Skeleton variant="text" width={60} height={14} />
              <Skeleton variant="text" width={60} height={14} />
            </div>
            <div className="flex justify-between">
              <Skeleton variant="text" width={80} height={14} />
              <Skeleton variant="text" width={50} height={14} />
            </div>
            <div className="flex justify-between pt-2">
              <Skeleton variant="text" width={100} height={16} />
              <Skeleton variant="text" width={70} height={16} />
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
