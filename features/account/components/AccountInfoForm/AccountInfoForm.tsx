"use client";

import { startTransition, useEffect, useState, type FormEvent } from "react";
import Input from "@/shared/components/Input";
import Button from "@/shared/components/Button";
import type { UserProfile } from "@tiktak/types";
import { useUpdateProfileMutation } from "../../hooks/useProfile";
import { useToast } from "@/shared/hooks/useToast";

interface AccountInfoFormProps {
  profile: UserProfile | undefined;
}

const AccountInfoForm = ({ profile }: AccountInfoFormProps) => {
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { showToast } = useToast();

  const { mutate, isPending } = useUpdateProfileMutation();

  useEffect(() => {
    if (profile) {
      startTransition(() => {
        setFullName(profile.full_name ?? "");
        setAddress(profile.address ?? "");
      });
    }
  }, [profile]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setPasswordError("");

    if (password && password !== passwordRepeat) {
      setPasswordError("Şifrələr uyğun gəlmir.");
      return;
    }

    mutate(
      {
        full_name: fullName,
        address,
        ...(password ? { password, password_repeat: passwordRepeat } : {}),
      },
      {
        onSuccess: () => {
          showToast("Uğurla yeniləndi!", "Məlumatlarınız uğurla yeniləndi.");
        },
        onError: () => {
          showToast(
            "Xəta baş verdi.",
            "Məlumatlarınız yenilənərkən problem yarandı",
            "error",
          );
        },
      },
    );
  };

  return (
    <div className="bg-white rounded-[10px] border border-gray-100 p-4 sm:p-6 flex-1">
      <h2 className="text-lg font-bold text-[#2B3043] mb-6">
        Əlaqə məlumatlarınız
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <Input
            label="Adınız"
            size="lg"
            placeholder="Adınız"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <Input
            label="Telefon nömrəsi"
            size="lg"
            placeholder="+994 XX XXX XX XX"
            value={profile?.phone ?? ""}
            disabled
          />
          {/* TODO: backend-də email sahəsi yoxdur (Postman-də profile GET/PUT-da təsdiqlənmədi) */}
          <Input
            label="E-mail"
            size="lg"
            placeholder="E-mail ünvanınız"
            value=""
            disabled
          />
          <Input
            label="Ünvan"
            size="lg"
            placeholder="Ünvanınız"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div>
          <h3 className="text-base font-semibold text-[#2B3043]">
            Şifrənin yenilənməsi
          </h3>
          <p className="text-xs text-gray-400 mb-3">
            Ehtiyac yoxdursa boş buraxın
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              label="Yeni Şifrə"
              size="lg"
              type="password"
              placeholder="Yeni Şifrə"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              label="Yeni Şifrənin təkrarı"
              size="lg"
              type="password"
              placeholder="Yeni Şifrənin təkrarı"
              value={passwordRepeat}
              onChange={(e) => setPasswordRepeat(e.target.value)}
              error={passwordError || undefined}
            />
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={isPending}
            className="w-full sm:w-[484px]"
          >
            Məlumatları yenilə
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AccountInfoForm;
