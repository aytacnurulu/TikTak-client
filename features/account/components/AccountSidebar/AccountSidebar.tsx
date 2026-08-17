"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/shared/lib/logout";

const AccountSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const items = [
    { href: "/account", label: "Hesab məlumatlarım", icon: "user" },
    { href: "/account/orders", label: "Sifarişlərim", icon: "home" },
  ];

  return (
    <div className="w-full sm:w-[280px] shrink-0">
      <h2 className="text-[24px] font-bold text-dark mb-[10px]">Hesabım</h2>
      <div className="bg-white rounded-[10px] border border-gray-100 p-6 w-full">
        <nav className="space-y-3">
          {items.map((item) => {
            const isActive =
              item.href === "/account/orders"
                ? pathname.startsWith(item.href)
                : pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 text-sm ${
                  isActive ? "text-primary font-medium" : "text-gray-500"
                }`}
              >
                {item.icon === "user" ? (
                  <svg
                    viewBox="0 0 24 24"
                    width={18}
                    height={18}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    width={18}
                    height={18}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path d="M6 8h12l1 12H5L6 8z" />
                    <path d="M9 8V6a3 3 0 0 1 6 0v2" />
                  </svg>
                )}
                {item.label}
              </Link>
            );
          })}
        </nav>
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-red-500 mt-4 pt-4 border-t border-gray-100 w-full cursor-pointer"
        >
          <svg
            viewBox="0 0 24 24"
            width={18}
            height={18}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3" />
            <path d="M10 8l-4 4 4 4" />
            <path d="M6 12h12" />
          </svg>
          Çıxış et
        </button>
      </div>
    </div>
  );
};

export default AccountSidebar;
