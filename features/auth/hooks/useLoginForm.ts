"use client";

import { useState, type FormEvent } from "react";
import { useLoginMutation } from "./useAuth";

export const useLoginForm = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, isPending, isError } = useLoginMutation();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutate({ phone, password });
  };

  return {
    phone,
    setPhone,
    password,
    setPassword,
    isPending,
    isError,
    handleSubmit,
  };
};
