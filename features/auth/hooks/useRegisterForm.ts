"use client";

import { useState, type FormEvent } from "react";
import { useSignupMutation } from "./useAuth";

export const useRegisterForm = () => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, isPending, isError } = useSignupMutation();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutate({ full_name: fullName, phone, password });
  };

  return {
    fullName,
    setFullName,
    phone,
    setPhone,
    password,
    setPassword,
    isPending,
    isError,
    handleSubmit,
  };
};
