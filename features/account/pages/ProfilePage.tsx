"use client";

import AccountInfoForm from "../components/AccountInfoForm/AccountInfoForm";
import { useProfileQuery } from "../hooks/useProfile";
import AccountInfoSkeleton from "../components/AccountInfoSkeleton/AccountInfoSkeleton";

export default function AccountPage() {
  const { data: profile, isLoading } = useProfileQuery();

  if (isLoading) {
    return (
        <AccountInfoSkeleton />
    );
  }

  return <AccountInfoForm profile={profile} />;
}