"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/lib/types";
import ProductCard from "@/components/ProductCard";

function useCountdown(initialSeconds: number) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  useEffect(() => {
    const started = Date.now();
    const timer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - started) / 1000);
      setSecondsLeft(Math.max(0, initialSeconds - elapsed));
      if (initialSeconds - elapsed <= 0) setSecondsLeft(initialSeconds);
    }, 1000);
    return () => clearInterval(timer);
  }, [initialSeconds]);
  const h = String(Math.floor(secondsLeft / 3600)).padStart(2, "0");
  const m = String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, "0");
  const s = String(secondsLeft % 60).padStart(2, "0");
  return { h, m, s };
}

export default function FlashSale({ products }: { products: Product[] }) {
  const { h, m, s } = useCountdown(8 * 3600 + 36 * 60 + 7);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    scrollerRef.current?.scrollBy({ left: dir * 300, behavior: "smooth" });
  };

  return (
    <div className="w-full bg-[#1a1a2e] text-white border border-gray-800 rounded p-3.5 sm:p-6 shadow-sm select-none relative group">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-800 pb-2.5 sm:pb-4 mb-3 sm:mb-6 gap-2 sm:gap-4 text-left">
        <div className="flex items-center gap-2">
          <span className="text-base sm:text-2xl md:text-3xl font-semibold font-sans text-[#F59E0B] flex items-center gap-1 tracking-tight">
            ⚡ FLASH SALE
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[16px] text-gray-300 font-semibold font-sans">Ending In:</span>
            <div className="flex items-center gap-1.5 select-none">
              <div className="flex flex-col items-center px-2.5 py-1 rounded shadow-sm bg-white text-[#1a1a2e] border border-gray-200">
                <span className="text-base md:text-[18px] font-semibold font-mono leading-none">{h}</span>
              </div>
              <span className="font-bold text-gray-500 text-base leading-none">:</span>
              <div className="flex flex-col items-center px-2.5 py-1 rounded shadow-sm bg-white text-[#1a1a2e] border border-gray-200">
                <span className="text-base md:text-[18px] font-semibold font-mono leading-none">{m}</span>
              </div>
              <span className="font-bold text-gray-500 text-base leading-none">:</span>
              <div className="flex flex-col items-center px-2.5 py-1 rounded shadow-sm bg-white text-[#1a1a2e] border border-gray-200">
                <span className="text-base md:text-[18px] font-semibold font-mono leading-none">{s}</span>
              </div>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 ml-2">
            <button
              className="p-1.5 rounded-full bg-slate-800 hover:bg-[#F59E0B] hover:text-[#1a1a2e] text-white transition-colors cursor-pointer border border-slate-700"
              aria-label="Scroll Flash Sales Left"
              onClick={() => scroll(-1)}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              className="p-1.5 rounded-full bg-slate-800 hover:bg-[#F59E0B] hover:text-[#1a1a2e] text-white transition-colors cursor-pointer border border-slate-700"
              aria-label="Scroll Flash Sales Right"
              onClick={() => scroll(1)}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      <div
        ref={scrollerRef}
        className="flex overflow-x-auto gap-3.5 pb-4 no-scrollbar scroll-smooth snap-x snap-mandatory min-w-0 w-full max-w-full"
      >
        {products.map((p, i) => (
          <div
            key={`${p.name}-${i}`}
            className="w-[calc(50%-7px)] sm:w-[220px] md:w-[280px] shrink-0 snap-start bg-white rounded overflow-hidden max-w-full"
          >
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
}