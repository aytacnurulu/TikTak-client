"use client";

import { useEffect } from "react";
import GlobalErrorView from "@/shared/components/GlobalError";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <GlobalErrorView reset={reset} />;
}