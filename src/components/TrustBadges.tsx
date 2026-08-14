import { ShieldCheck, Truck, RotateCcw, CreditCard } from "lucide-react";

const BADGES = [
  {
    icon: ShieldCheck,
    title: "Quality Products",
    desc: "We sell high-quality New, Refurbished, and Ex-UK laptops",
  },
  {
    icon: Truck,
    title: "Free Delivery",
    desc: "Zero shipping costs within Nairobi region",
  },
  {
    icon: RotateCcw,
    title: "14-Day Returns",
    desc: "Hassle-free replacement or refund policy",
  },
  {
    icon: CreditCard,
    title: "M-PESA Accepted",
    desc: "Secure, instant payments via Safaricom Paybill",
  },
];

export default function TrustBadges() {
  return (
    <div className="w-full bg-white border border-gray-200 rounded p-3 sm:p-5 shadow-sm select-none">
      <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-6">
        {BADGES.map((b) => (
          <div key={b.title} className="flex items-center gap-2 sm:gap-3 text-left p-1 sm:p-0 min-w-0">
            <div className="bg-emerald-50 p-1.5 sm:p-2.5 rounded-full border border-emerald-100 flex items-center justify-center shrink-0">
              <b.icon className="h-8 w-8 text-[#10B981] shrink-0" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-xs sm:text-sm md:text-base font-bold text-[#1a1a2e] font-sans leading-tight truncate">
                {b.title}
              </h3>
              <p className="text-[10px] sm:text-xs text-text-secondary mt-0.5 leading-tight line-clamp-2">
                {b.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}