import Skeleton from "@/shared/components/Skeleton";

export default function AccountOrdersSkeleton() {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full table-fixed text-left text-base font-light leading-none text-dark">
        <colgroup>
          <col className="w-[10%]" />
          <col className="w-[12%]" />
          <col className="w-[17%]" />
          <col className="w-[9%]" />
          <col className="w-[14%]" />
          <col className="w-[12%]" />
          <col className="w-[12%]" />
          <col className="w-[10%]" />
        </colgroup>
        <thead className="bg-[#F6F5FB] text-dark text-base font-normal leading-none">
          <tr className="h-[60px]">
            <th className="rounded-l-md px-2 py-3 sm:px-3">No</th>
            <th className="px-2 py-3 sm:px-3">Tarix</th>
            <th className="px-2 py-3 sm:px-3">Çatdırılma ünvanı</th>
            <th className="px-2 py-3 sm:px-3">Məhsul sayı</th>
            <th className="px-2 py-3 sm:px-3">Ara cəm/Çatdırılma</th>
            <th className="px-2 py-3 sm:px-3">Ödəniş üsulu</th>
            <th className="px-2 py-3 sm:px-3">Sifariş statusu</th>
            <th className="rounded-r-md px-2 py-3 sm:px-3" />
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 4 }).map((_, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b border-gray-100 last:border-0"
            >
              <td className="px-2 py-3 sm:px-3">
                <Skeleton variant="text" width="60%" height={14} />
              </td>
              <td className="px-2 py-3 sm:px-3">
                <Skeleton variant="text" width="70%" height={14} />
              </td>
              <td className="px-2 py-3 sm:px-3">
                <Skeleton variant="text" width="80%" height={14} />
              </td>
              <td className="px-2 py-3 sm:px-3">
                <Skeleton variant="text" width="40%" height={14} />
              </td>
              <td className="px-2 py-3 sm:px-3">
                <Skeleton variant="text" width="65%" height={14} />
              </td>
              <td className="px-2 py-3 sm:px-3">
                <Skeleton variant="text" width="60%" height={14} />
              </td>
              <td className="px-2 py-3 sm:px-3">
                <Skeleton variant="text" width="55%" height={14} />
              </td>
              <td className="px-2 py-3 text-right sm:px-3">
                <Skeleton
                  variant="text"
                  width="70%"
                  height={14}
                  className="ml-auto"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
