import { Suspense } from "react";
import LoginPage from "@/features/auth/pages/LoginPage";
import Spinner from "@/shared/components/Spinner";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          <Spinner size="lg" color="primary" />
        </div>
      }
    >
      <LoginPage />
    </Suspense>
  );
}
