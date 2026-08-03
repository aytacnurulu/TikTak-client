"use client";

import { useState } from "react";
import Button from "@/shared/components/Button";
import type { Campaign } from "@tiktak/types";

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
        isPrev ? "left-0 -translate-x-1/2" : "right-0 translate-x-1/2"
      } h-12 w-12 rounded-full bg-white shadow-lg flex items-center justify-center text-4xl leading-none text-dark hover:bg-gray-50 transition-colors`}
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
            <div key={campaign.id} className="w-1/2 shrink-0 px-2">
              <div
                className={`relative overflow-hidden rounded-[10px] bg-gradient-to-br ${gradients[i % gradients.length]} text-white p-8 min-h-[320px] flex flex-col justify-between`}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-transparent" />
                <div className="relative">
                  <h3 className="text-2xl font-bold mb-1">{campaign.title}</h3>
                  {campaign.description && (
                    <p className="text-sm opacity-90">{campaign.description}</p>
                  )}
                </div>
                <Button variant="success" size="sm" className="w-fit relative">
                  Ətraflı
                </Button>
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
