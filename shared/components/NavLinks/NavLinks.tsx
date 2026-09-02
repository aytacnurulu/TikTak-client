"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { AccountIcon, FavoritesIcon, BasketIcon } from "./NavIcons";
import Badge from "../Badge";
import { useAuthStore } from "@/shared/store/useAuthStore";
import { useBasketQuery } from "@/shared/hooks/useBasket";
import { useFavoritesQuery } from "@/shared/hooks/useFavorites";

interface NavItem {
  href: string;
  label: string;
  icon: ReactNode;
  count?: number;
}

const NavLinks = () => {
  const pathname = usePathname();
  const isAuthenticated = useAuthStore((s) => !!s.accessToken);

  const { data: basket } = useBasketQuery();
  const { data: favorites } = useFavoritesQuery();

  const cartCount = isAuthenticated ? (basket?.items.length ?? 0) : 0;
  const favCount = isAuthenticated ? (favorites?.length ?? 0) : 0;

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
      count: favCount,
    },
    {
      href: "/basket",
      label: "Səbətim",
      icon: <BasketIcon />,
      count: cartCount,
    },
  ];

    const renderIcon = (item: NavItem) => (
    <span className="relative inline-flex">
      {item.icon}
      {!!item.count && item.count > 0 && (
        <Badge
          variant="primary"
          shape="circle"
          size="sm"
          className="absolute top-[-7px]! right-[-7px]! h-4! min-w-4! px-0! text-[9px]!"
        >
          {item.count > 9 ? "9+" : item.count}
        </Badge>
      )}
    </span>
  );

  return (
    <>
      <nav className="hidden md:flex items-center gap-4 shrink-0">
        {navItems.map((item) => {
          const isActive = pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-1 text-sm transition-colors ${isActive ? "text-primary" : "text-gray-600 hover:text-dark"
                }`}
            >
              {renderIcon(item)}
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
              className={`flex items-center justify-center h-10 w-10 rounded-full ${isActive ? "text-primary" : "text-gray-600"
                }`}
            >
              {renderIcon(item)}
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default NavLinks;
