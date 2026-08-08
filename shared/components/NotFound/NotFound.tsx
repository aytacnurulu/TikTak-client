"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "@/shared/components/Button";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="bg-[#F5F5FA] px-4 py-10 sm:py-16">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl px-4 py-12 sm:py-16 flex flex-col items-center text-center">
        <Image
          src="/image/404.svg"
          alt="404"
          width={565}
          height={345}
          className="w-full max-w-md h-auto"
          priority
        />

        <p className="mt-6 text-lg text-dark">
          Səhifə tapılmadı, deyəsən bir problem baş verib!
        </p>

        <Button
          variant="primary"
          size="md"
          className="mt-6"
          onClick={() => router.back()}
        >
          Geri qayıt
        </Button>
      </div>
    </div>
  );
}
