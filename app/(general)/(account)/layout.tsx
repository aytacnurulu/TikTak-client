import type { ReactNode } from "react";
import AccountSidebar from "@/features/account/components/AccountSidebar/AccountSidebar";

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <div className="py-8 flex flex-col sm:flex-row gap-6 items-start">
      <AccountSidebar />
      <div className="flex-1 w-full">{children}</div>
    </div>
  );
}