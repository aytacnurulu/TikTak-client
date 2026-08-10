"use client";

import { useRouter } from "next/navigation";
import Button from "@/shared/components/Button";
import HeartIcon from "@/shared/components/FavoriteButton/HeartIcon";

export default function FavoriteEmptyState() {
  const router = useRouter();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:py-20 flex flex-col items-center text-center">
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10">
        <HeartIcon filled={false} className="w-8 h-8" />
      </div>

      <h2 className="mt-6 text-lg font-semibold text-dark">
        Seçilmişlər siyahınız boşdur
      </h2>
      <p className="mt-2 max-w-sm text-sm text-gray-500">
        Seçilmişlərdə hələ məhsul yoxdur. Bəyəndiyiniz məhsulları ürək
        işarəsinə klikləyərək buraya əlavə edə bilərsiniz.
      </p>

      <Button
        variant="primary"
        size="md"
        className="mt-6"
        onClick={() => router.push("/category")}
      >
        Alış-verişə başla
      </Button>
    </div>
  );
}
