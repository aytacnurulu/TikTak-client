"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "../Button";
import NavLinks from "@/shared/components/NavLinks";
import { useAuthStore } from "@/shared/store/useAuthStore";

const LandingHeader = () => {
  const router = useRouter();
  const accessToken = useAuthStore((s) => s.accessToken);
  const hasHydrated = useAuthStore((s) => s.hasHydrated);
  const isAuthenticated = !!accessToken;

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4 px-4 sm:px-6 lg:px-10 py-3 sm:py-4 lg:py-5">
        <Link
          href="/"
          className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-dark shrink-0 transition-opacity hover:opacity-80"
        >
          TIK<span className="text-primary">TAK</span>
        </Link>

        {!hasHydrated ? (
          <div className="h-9 w-9 sm:w-[110px]" aria-hidden="true" />
        ) : isAuthenticated ? (
          <NavLinks />
        ) : (
          <Button
            variant="success"
            size="sm"
            onClick={() => router.push("/login")}
            className="px-5 sm:px-6 font-semibold shadow-sm hover:shadow-md transition-shadow"
          >
            Daxil ol
          </Button>
        )}
      </div>
    </header>
  );
};

export default LandingHeader;
