"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { AccountIcon, FavoritesIcon, BasketIcon } from "./NavIcons";

interface NavItem {
  href: string;
  label: string;
  icon: ReactNode;
}

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

const NavLinks = () => {
  const pathname = usePathname();

  return (
    <>
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
    </>
  );
};

export default NavLinks;
