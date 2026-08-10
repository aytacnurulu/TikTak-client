"use client";

import { useState } from "react";
import Button from "@/shared/components/Button";
import type { Campaign } from "@tiktak/types";
import Link from "next/link";
interface HeroCarouselProps {
  campaigns: Campaign[];
}

const gradients = ["from-success to-emerald-800", "from-error to-rose-900"];

interface ArrowButtonProps {
  direction: "prev" | "next";
  onClick: () => void;
}

const ArrowButton = ({ direction, onClick }: ArrowButtonProps) => {
  const isPrev = direction === "prev";
  return (
    <button
      onClick={onClick}
      aria-label={isPrev ? "Əvvəlki" : "Növbəti"}
      className={`absolute top-1/2 -translate-y-1/2 z-10 ${
        isPrev ? "left-0 -translate-x-1/3 sm:-translate-x-1/2" : "right-0 translate-x-1/3 sm:translate-x-1/2"
      } h-9 w-9 sm:h-12 sm:w-12 rounded-full bg-white shadow-lg flex items-center justify-center text-2xl sm:text-4xl leading-none text-dark hover:bg-gray-50 transition-colors`}
    >
      {isPrev ? "‹" : "›"}
    </button>
  );
};

const HeroCarousel = ({ campaigns }: HeroCarouselProps) => {
  const [startIndex, setStartIndex] = useState(0);
  const canPrev = startIndex > 0;
  const canNext = startIndex + 2 < campaigns.length;

  if (campaigns.length === 0) return null;

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${startIndex * 50}%)` }}
        >
          {campaigns.map((campaign, i) => (
            <div key={campaign.id} className="w-1/2 shrink-0 px-1.5 sm:px-2">
              <div
                className={`relative overflow-hidden rounded-[10px] text-white p-3 sm:p-8 min-h-[160px] sm:min-h-[320px] flex flex-col justify-between ${
                  campaign.img_url
                    ? ""
                    : `bg-gradient-to-br ${gradients[i % gradients.length]}`
                }`}
              >
                {campaign.img_url && (
                  <img
                    src={campaign.img_url}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-transparent" />
                <div className="relative min-w-0">
                  <h3 className="text-sm sm:text-2xl font-bold mb-1 line-clamp-2">{campaign.title}</h3>
                  {campaign.description && (
                    <p className="hidden sm:block text-sm opacity-90 line-clamp-2">{campaign.description}</p>
                  )}
                </div>
                <Link href={`/category`}>
                  <Button
                    variant="success"
                    size="sm"
                    className="w-fit relative px-3 sm:px-8 text-xs sm:text-sm"
                  >
                    Ətraflı
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {canPrev && (
        <ArrowButton
          direction="prev"
          onClick={() => setStartIndex((i) => i - 1)}
        />
      )}
      {canNext && (
        <ArrowButton
          direction="next"
          onClick={() => setStartIndex((i) => i + 1)}
        />
      )}
    </div>
  );
};

export default HeroCarousel;
