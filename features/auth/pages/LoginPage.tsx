"use client";

import Link from "next/link";
import Input from "@/shared/components/Input";
import PhoneInput from "@/shared/components/PhoneInput";
import Button from "@/shared/components/Button";
import AuthTabs from "../components/AuthTabs/AuthTabs";
import { useLoginForm } from "../hooks/useLoginForm";

const LoginPage = () => {
  const {
    phone,
    setPhone,
    password,
    setPassword,
    isPending,
    isError,
    handleSubmit,
  } = useLoginForm();

  return (
    <div>
      <AuthTabs />
      <form onSubmit={handleSubmit} className="space-y-4">
        <PhoneInput
          label="Telefon nömrəsi"
          value={phone}
          onChange={setPhone}
          required
        />
        <Input
          label="Parol"
          type="password"
          size="lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {isError && (
          <p className="text-sm text-error">Telefon və ya parol yanlışdır.</p>
        )}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={isPending}
        >
          Daxil ol
        </Button>
        <p className="text-sm text-[#1A1D28]">
          Hesabınız yoxdur?{" "}
          <Link href="/register" className="text-primary">
            Qeydiyyatdan keç
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
