"use client";

import Spinner from "@/shared/components/Spinner";
import AccountInfoForm from "../components/AccountInfoForm/AccountInfoForm";
import { useProfileQuery } from "../hooks/useProfile";

export default function AccountPage() {
  const { data: profile, isLoading } = useProfileQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  return <AccountInfoForm profile={profile} />;
}