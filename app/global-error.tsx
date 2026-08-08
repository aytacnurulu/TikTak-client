"use client";

import { useEffect } from "react";
import { Roboto } from "next/font/google";
import GlobalErrorView from "@/shared/components/GlobalError";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
});

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className={roboto.className}>
        <GlobalErrorView reset={reset} />
      </body>
    </html>
  );
}
