"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import SearchBar from "./SearchBar";
import { AccountIcon, FavoritesIcon, BasketIcon } from "./NavIcons";
import { useProfileQuery } from "@/features/account/hooks/useProfile";
import { useAuthStore } from "@/shared/store/useAuthStore";

interface NavItem {
  href: string;
  label: string;
  icon: ReactNode;
}

interface HeaderProps {
  showAddress?: boolean;
  showSearch?: boolean;
}

const Header = ({ showAddress = true, showSearch = true }: HeaderProps) => {
  const isAuthenticated = useAuthStore((s) => !!s.accessToken);
  const { data: profile } = useProfileQuery({ enabled: isAuthenticated });
  const pathname = usePathname();

  const userAddress = profile?.address || "Ünvan seçilməyib";

  const navItems: NavItem[] = [
    {
      href: "/account",
      label: "Hesabım",
      icon: <AccountIcon />,
    },
    {
      href: "/favorites",
      label: "Siyahılarım",
      icon: <FavoritesIcon />,
    },
    {
      href: "/basket",
      label: "Səbətim",
      icon: <BasketIcon />,
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-[1440px] mx-auto flex items-center gap-3 sm:gap-4 lg:gap-6 px-4 sm:px-6 lg:px-10 py-2.5 sm:py-3">
        <Link
          href="/"
          className="text-xl sm:text-3xl font-extrabold tracking-tight text-dark shrink-0 transition-opacity hover:opacity-80"
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
          <div className="flex-1 min-w-0">
            <SearchBar />
          </div>
        ) : (
          <div className="flex-1" />
        )}

        <nav className="hidden md:flex items-center gap-4 shrink-0">
          {navItems.map((item) => {
            const isActive = pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1 text-sm transition-colors ${
                  isActive ? "text-primary" : "text-gray-600 hover:text-dark"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex md:hidden items-center gap-1 shrink-0">
          {navItems.map((item) => {
            const isActive = pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-label={item.label}
                className={`flex items-center justify-center h-10 w-10 rounded-full ${
                  isActive ? "text-primary" : "text-gray-600"
                }`}
              >
                {item.icon}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default Header;
