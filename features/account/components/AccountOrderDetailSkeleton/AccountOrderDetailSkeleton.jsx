import Skeleton from "@/shared/components/Skeleton";

export default function AccountOrderDetailSkeleton() {
  return (
<section className="bg-white rounded-[10px] border border-gray-100 p-4 sm:p-6 w-full">
      <div className="flex flex-col gap-[40px]">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-sm">
          <div>
            <p className="text-gray-500">Sifariş nömrəsi</p>
            <Skeleton variant="text" width={90} height={14} className="mt-2" />
          </div>
          <div>
            <p className="text-gray-500">Sifariş vaxtı</p>
            <Skeleton variant="text" width={110} height={14} className="mt-2" />
          </div>
          <div>
            <p className="text-gray-500">Ödəniş üsulu</p>
            <Skeleton variant="text" width={80} height={14} className="mt-2" />
          </div>
        </div>
 
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-sm">
          <div>
            <p className="text-gray-500">Çatdırılma ünvanı</p>
            <Skeleton variant="text" width={140} height={14} className="mt-2" />
          </div>
          <div>
            <p className="text-gray-500">Məhsul sayı</p>
            <Skeleton variant="text" width={30} height={14} className="mt-2" />
          </div>
          <div>
            <p className="text-gray-500">Ümumi məbləğ</p>
            <Skeleton variant="text" width={70} height={14} className="mt-2" />
          </div>
        </div>
      </div>
 
      <div className="mt-[70px]">
        <h2 className="mb-4 text-sm font-semibold text-[#2B3043]">Məhsullar</h2>
        <div className="divide-y divide-gray-100 border-y border-gray-100">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="grid grid-cols-4 items-center gap-4 py-[6px] text-sm"
            >
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