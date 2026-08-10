"use client";

import { useState } from "react";
import CategorySidebar from "../CategorySidebar";

interface Category {
  id: number;
  name: string;
}

interface CategoryFilterAccordionProps {
  categories: Category[];
  currentCategoryId: number;
}

export default function CategoryFilterAccordion({
  categories,
  currentCategoryId,
}: CategoryFilterAccordionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between rounded-[10px] border border-gray-100 bg-white px-4 py-3 text-sm font-semibold text-gray-900"
      >
        Kateqoriyalar
        <svg
          viewBox="0 0 24 24"
          width={18}
          height={18}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="mt-2">
          <CategorySidebar
            categories={categories}
            currentCategoryId={currentCategoryId}
          />
        </div>
      )}
    </div>
  );
}
