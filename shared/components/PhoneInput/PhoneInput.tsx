"use client";

import { useEffect, useRef, useState } from "react";

interface Country {
  code: string;
  name: string;
  flag: string;
  dialCode: string;
  maxDigits: number;
  placeholder: string;
}

const countries: Country[] = [
  {
    code: "AZ",
    name: "Azərbaycan",
    flag: "🇦🇿",
    dialCode: "+994",
    maxDigits: 9,
    placeholder: "XX XXX XX XX",
  },
  {
    code: "TR",
    name: "Türkiyə",
    flag: "🇹🇷",
    dialCode: "+90",
    maxDigits: 10,
    placeholder: "XXX XXX XX XX",
  },
  {
    code: "RU",
    name: "Rusiya",
    flag: "🇷🇺",
    dialCode: "+7",
    maxDigits: 10,
    placeholder: "XXX XXX XX XX",
  },
  {
    code: "GE",
    name: "Gürcüstan",
    flag: "🇬🇪",
    dialCode: "+995",
    maxDigits: 9,
    placeholder: "XXX XX XX XX",
  },
  {
    code: "US",
    name: "ABŞ",
    flag: "🇺🇸",
    dialCode: "+1",
    maxDigits: 10,
    placeholder: "XXX XXX XXXX",
  },
  {
    code: "GB",
    name: "Böyük Britaniya",
    flag: "🇬🇧",
    dialCode: "+44",
    maxDigits: 10,
    placeholder: "XXXX XXX XXX",
  },
];

interface PhoneInputProps {
  label?: string;
  error?: string;
  value: string;
  onChange: (fullValue: string) => void;
  size?: "sm" | "md" | "lg";
  required?: boolean;
}

const sizeClasses: Record<"sm" | "md" | "lg", string> = {
  sm: "h-9 text-sm",
  md: "h-12 text-base",
  lg: "h-[60px] text-base",
};

const parseValue = (value: string) => {
  const found = countries.find((c) => value.startsWith(c.dialCode));
  if (found) {
    return {
      country: found,
      local: value.slice(found.dialCode.length).replace(/\D/g, ""),
    };
  }
  return { country: countries[0], local: value.replace(/\D/g, "") };
};

const PhoneInput = ({
  label,
  error,
  value,
  onChange,
  size = "lg",
  required,
}: PhoneInputProps) => {
  const { country: initialCountry, local: initialLocal } = parseValue(value);
  const [country, setCountry] = useState<Country>(initialCountry);
  const [local, setLocal] = useState(initialLocal);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLocalChange = (raw: string) => {
    const digits = raw.replace(/\D/g, "").slice(0, country.maxDigits);
    setLocal(digits);
    onChange(digits ? `${country.dialCode}${digits}` : "");
  };

  const handleCountrySelect = (c: Country) => {
    setCountry(c);
    setIsOpen(false);
    const digits = local.slice(0, c.maxDigits);
    setLocal(digits);
    onChange(digits ? `${c.dialCode}${digits}` : "");
  };

  return (
    <div>
      {label && (
        <label className="block text-sm text-text mb-1.5">{label}</label>
      )}
      <div
        ref={wrapperRef}
        className={`relative flex items-center rounded-[10px] bg-gray-50 border outline-none transition-colors focus-within:border-primary ${
          error ? "border-error" : "border-gray-200"
        } ${sizeClasses[size]}`}
      >
        <button
          type="button"
          onClick={() => setIsOpen((o) => !o)}
          className="flex items-center gap-1.5 px-3 h-full border-r border-gray-200 shrink-0"
        >
          <span className="text-lg">{country.flag}</span>
          <span className="text-sm text-dark">{country.dialCode}</span>
          <span className="text-xs text-gray-400">▾</span>
        </button>

        <input
          type="tel"
          inputMode="numeric"
          value={local}
          onChange={(e) => handleLocalChange(e.target.value)}
          placeholder={country.placeholder}
          required={required}
          className="flex-1 bg-transparent outline-none px-3 h-full placeholder:text-gray-400"
        />

        {isOpen && (
          <div className="absolute top-full left-0 mt-1 w-64 max-h-64 overflow-y-auto bg-white border border-gray-200 rounded-[10px] shadow-lg z-20">
            {countries.map((c) => (
              <button
                key={c.code}
                type="button"
                onClick={() => handleCountrySelect(c)}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 text-left"
              >
                <span className="text-lg">{c.flag}</span>
                <span className="flex-1">{c.name}</span>
                <span className="text-gray-400">{c.dialCode}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-error">{error}</p>}
    </div>
  );
};

export default PhoneInput;
