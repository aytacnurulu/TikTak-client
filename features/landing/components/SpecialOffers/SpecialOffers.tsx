import Link from "next/link";
import type { Campaign } from "@tiktak/types";

interface SpecialOffersProps {
  campaigns: Campaign[];
}

const gradients = ["from-success to-emerald-800", "from-error to-rose-900"];

const SpecialOffers = ({ campaigns }: SpecialOffersProps) => {
  if (campaigns.length === 0) return null;

  return (
    <section>
      <h2 className="text-lg sm:text-2xl font-bold text-[#195233] mb-1">
        Xüsusi təkliflər!
      </h2>
      <p className="text-sm sm:text-base text-[#195233] mb-4">
        BRAVO-da hər gün üçün super təklifləri qaçırmayın!
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {campaigns.map((campaign, i) => (
          <Link
            key={campaign.id}
            href="/category"
            className={`relative overflow-hidden rounded-[10px] text-white p-5 sm:p-8 min-h-[200px] sm:min-h-[320px] flex flex-col justify-start ${
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
              <h3 className="text-base sm:text-lg font-semibold line-clamp-2">{campaign.title}</h3>
              <p className="text-sm opacity-90">
                Kampanya tarixi: {campaign.created_at}
              </p>
              {campaign.description && (
                <p className="text-sm opacity-80 mt-1 line-clamp-2">
                  {campaign.description}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SpecialOffers;
