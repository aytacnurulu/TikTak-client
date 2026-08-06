"use client";

import Link from "next/link";
import Input from "@/shared/components/Input";
import PhoneInput from "@/shared/components/PhoneInput";
import Button from "@/shared/components/Button";
import AuthTabs from "../components/AuthTabs/AuthTabs";
import { useRegisterForm } from "../hooks/useRegisterForm";

const RegisterPage = () => {
  const {
    fullName,
    setFullName,
    phone,
    setPhone,
    password,
    setPassword,
    isPending,
    isError,
    handleSubmit,
  } = useRegisterForm();

  return (
    <div>
      <AuthTabs />
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Ad"
          size="lg"
          placeholder="Ad, Soyad"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
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
          <p className="text-sm text-error">
            Qeydiyyat uğursuz oldu, yenidən cəhd edin.
          </p>
        )}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={isPending}
        >
          Tamamla
        </Button>
        <p className="text-sm text-[#1A1D28]">
          Hesabınız var?{" "}
          <Link href="/login" className="text-primary">
            Daxil ol
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
