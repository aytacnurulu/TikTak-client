import type { ReactNode } from "react";

export default function CheckoutLayout({ children }: { children: ReactNode }) {
  return (
    <div className="pb-8 min-h-screen">
      <div className="grid lg:grid-cols-[1fr_360px] gap-y-0 gap-x-6 items-start">
        {children}
      </div>
    </div>
  );
}
