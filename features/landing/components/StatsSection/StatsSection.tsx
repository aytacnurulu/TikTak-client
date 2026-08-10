import Card from "@/shared/components/Card";
import { ReactNode } from "react";

interface Stat {
  label: string;
  value: string;
  icon: ReactNode;
}

const iconProps = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
};

// TODO: statik data — Postman collection-da bu bloka uyğun endpoint yoxdur
// (yalnız Admin > Orders > stats var, sifariş statistikası üçündür).
// Backend uyğun endpoint verəndə useQuery ilə əvəz olunacaq.
const stats: Stat[] = [
  {
    label: "Market sayı",
    value: "137",
    icon: (
      <svg {...iconProps}>
        <path d="M4 10h16M5 10v9h14v-9M8 19v-5h3v5M3 10l2-6h14l2 6" />
      </svg>
    ),
  },
  {
    label: "Region",
    value: "11",
    icon: (
      <svg {...iconProps}>
        <path d="M9 4l-6 2v14l6-2 6 2 6-2V4l-6 2-6-2z" />
        <path d="M9 4v14M15 6v14" />
      </svg>
    ),
  },
  {
    label: "Məhsul sayı",
    value: "50000+",
    icon: (
      <svg {...iconProps}>
        <path d="M6 8h12l-1 12H7L6 8z" />
        <path d="M9 8a3 3 0 0 1 6 0" />
      </svg>
    ),
  },
  {
    label: "Əməkdaş sayı",
    value: "5500+",
    icon: (
      <svg {...iconProps}>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <circle cx="12" cy="10" r="2.5" />
        <path d="M7 18c0-2.5 2-4 5-4s5 1.5 5 4" />
      </svg>
    ),
  },
];

const StatsSection = () => {
  return (
    <section>
      <h2 className="text-lg sm:text-xl font-bold text-[#195233] mb-1">
        Bizim göstəricilər
      </h2>
      <p className="text-sm sm:text-base text-[#195233] mb-6">
        Biz yeni imkanları axtarırıq və digərlərinin bilmədikləri yerlərə
        getməyə hazırıq.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat) => (
          <Card
            key={stat.label}
            className="p-4 sm:p-6 flex flex-col justify-between min-h-[160px] sm:min-h-[250px]"
          >
            <div className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#195233]">
              {stat.value}
            </div>
            <div className="flex items-end justify-between mt-4 gap-2">
              <span className="text-sm sm:text-lg text-gray-500">{stat.label}</span>
              <span className="text-primary shrink-0 [&_svg]:w-6 [&_svg]:h-6 sm:[&_svg]:w-9 sm:[&_svg]:h-9">
                {stat.icon}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
