import Skeleton from "@/shared/components/Skeleton";

function FieldSkeleton({ label }: { label: string }) {
  return (
    <div>
      <p className="text-sm text-gray-600 mb-1">{label}</p>
      <Skeleton variant="rounded" height={48} />
    </div>
  );
}

export default function AccountInfoSkeleton() {
  return (
     <div className="bg-white rounded-[10px] border border-gray-100 p-4 sm:p-6 flex-1">
      <h2 className="text-[28px] font-normal leading-none tracking-normal text-dark mb-6">
        Əlaqə məlumatlarınız
      </h2>
 
      <div className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <FieldSkeleton label="Adınız" />
          <FieldSkeleton label="Telefon nömrəsi" />
          <FieldSkeleton label="E-mail" />
          <FieldSkeleton label="Ünvan" />
        </div>
 
        <div>
          <h3 className="text-[28px] font-normal leading-none tracking-normal text-dark mb-2">
            Şifrənin yenilənməsi
          </h3>
          <p className="text-xs text-gray-400 mb-3">
            Ehtiyac yoxdursa boş buraxın
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <FieldSkeleton label="Yeni Şifrə" />
            <FieldSkeleton label="Yeni Şifrənin təkrarı" />
          </div>
        </div>
 
        <div className="flex justify-center">
          <Skeleton
            variant="rounded"
            height={60}
            className="w-full sm:w-[484px]"
          />
        </div>
      </div>
    </div>
  );
}