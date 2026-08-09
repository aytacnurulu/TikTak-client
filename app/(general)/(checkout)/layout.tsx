import type { ReactNode } from "react";

export default function CheckoutLayout({ children }: { children: ReactNode }) {
  return (
    <div className="py-8 min-h-screen">
      <div className="grid lg:grid-cols-[1fr_360px] gap-6 items-start">
        {children}
      </div>
    </div>
  );
}