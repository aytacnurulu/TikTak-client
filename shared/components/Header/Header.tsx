"use client";

import Link from "next/link";
import SearchBar from "./SearchBar";
import NavLinks from "@/shared/components/NavLinks";
import { useProfileQuery } from "@/features/account/hooks/useProfile";
import { useAuthStore } from "@/shared/store/useAuthStore";

interface HeaderProps {
  showAddress?: boolean;
  showSearch?: boolean;
}

const Header = ({ showAddress = true, showSearch = true }: HeaderProps) => {
  const isAuthenticated = useAuthStore((s) => !!s.accessToken);
  const { data: profile } = useProfileQuery({ enabled: isAuthenticated });

  const userAddress = profile?.address || "Ünvan seçilməyib";

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-[1440px] mx-auto flex items-center gap-3 sm:gap-4 lg:gap-6 px-4 sm:px-6 lg:px-10 py-3 sm:py-4 lg:py-5">
        <Link
          href="/"
          className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-dark shrink-0 transition-opacity hover:opacity-80"
        >
          TIK<span className="text-primary">TAK</span>
        </Link>

        {showAddress && (
          <div className="hidden md:flex flex-col bg-gray-50 border border-gray-200 rounded-[8px] px-2.5 py-1 shrink-0 max-w-[150px]">
            <span className="text-xs font-semibold text-dark">Ünvan</span>
            <span className="text-xs text-gray-500 truncate">
              {userAddress}
            </span>
          </div>
        )}

        {showSearch ? (
          <div className="flex-1 flex justify-center min-w-0">
            <div className="w-full sm:max-w-[360px] lg:max-w-[480px] xl:max-w-[560px]">
              <SearchBar />
            </div>
          </div>
        ) : (
          <div className="flex-1" />
        )}

        <NavLinks />
      </div>
    </header>
  );
};

export default Header;
