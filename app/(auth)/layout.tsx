import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <div className="hidden md:block w-1/2 shrink-0 relative">
        <Image
          src="/image/auth-banner.svg"
          alt="TIK TAK"
          fill
          className="object-contain"
          priority
        />
        <Link href="/category" className="absolute inset-0" aria-label="Ana səhifə" />
      </div>
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-[560px]">{children}</div>
      </div>
    </div>
  );
}
