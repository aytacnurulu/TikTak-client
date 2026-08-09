"use client";

import Spinner from "@/shared/components/Spinner";
import AccountSidebar from "../components/AccountSidebar/AccountSidebar";
import AccountInfoForm from "../components/AccountInfoForm/AccountInfoForm";
import { useProfileQuery } from "../hooks/useProfile";

const AccountPage = () => {
  const { data: profile, isLoading } = useProfileQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  return (
    <div className="py-8 flex flex-col sm:flex-row gap-6 items-start">
      <AccountSidebar />
      <AccountInfoForm profile={profile} />
    </div>
  );
};

export default AccountPage;
