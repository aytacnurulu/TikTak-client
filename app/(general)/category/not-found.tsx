"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "@/shared/components/Button";
import Header from "@/shared/components/Header";

export default function NotFound() {
  const router = useRouter();

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col items-center text-center">
        <Image
          src="/image/404.svg"
          alt="404"
          width={565}
          height={345}
          className="w-full max-w-md h-auto"
          priority
        />

        <Button
          variant="primary"
          size="md"
          className="mt-6"
          onClick={() => router.back()}
        >
          Geri qayıt
        </Button>
      </div>
    </>
  );
}
