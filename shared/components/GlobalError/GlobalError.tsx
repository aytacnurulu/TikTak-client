"use client";

import Button from "@/shared/components/Button";

interface GlobalErrorProps {
  reset: () => void;
}

export default function GlobalError({ reset }: GlobalErrorProps) {
  return (
    <div className="bg-[#F5F5FA] px-4 py-10 sm:py-16 min-h-screen flex items-center">
      <div className="max-w-5xl w-full mx-auto bg-white rounded-3xl px-4 py-12 sm:py-16 flex flex-col items-center text-center">
        <div className="w-full max-w-md aspect-[565/345] bg-[#F5F5FA] rounded-2xl flex flex-col items-center justify-center gap-4">
          <svg
            width="72"
            height="72"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 9v4m0 4h.01M10.29 3.86l-8.18 14.18A2 2 0 0 0 3.82 21h16.36a2 2 0 0 0 1.71-2.96L13.71 3.86a2 2 0 0 0-3.42 0Z"
              stroke="var(--color-error)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-6xl font-semibold text-dark">500</span>
        </div>

        <p className="mt-6 text-lg text-dark">
          Daxili server xətası baş verdi, deyəsən bir problem yaranıb!
        </p>

        <Button variant="primary" size="md" className="mt-6" onClick={reset}>
          Yenidən cəhd et
        </Button>
      </div>
    </div>
  );
}
