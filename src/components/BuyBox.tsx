"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingCart, Zap } from "lucide-react";
import { waLink, WHATSAPP_PHONE } from "@/lib/formats";

export default function BuyBox({
  name,
  price,
  slug,
}: {
  name: string;
  price: string;
  slug: string;
}) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const orderMsg = `Hello NexGen Gadgets, I would like to order:\n\n${name}\n${price}\nQty: ${qty}\nProduct: https://nexgen-gadgets.com/products/${slug}\n\nPlease confirm availability.`;

  return (
    <div className="flex flex-col gap-3 pt-1">
      <div className="flex items-center gap-4">
        <span className="text-sm font-semibold text-slate-600">Quantity:</span>
        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="px-3 py-2 text-slate-600 hover:bg-gray-100 cursor-pointer"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="px-4 py-2 text-sm font-bold text-slate-800 border-x border-gray-200 min-w-12 text-center">
            {qty}
          </span>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => setQty((q) => Math.min(99, q + 1))}
            className="px-3 py-2 text-slate-600 hover:bg-gray-100 cursor-pointer"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
      <a
        href={waLink(WHATSAPP_PHONE, orderMsg)}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full bg-[#1a1a2e] text-white py-3 px-4 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 shadow hover:bg-slate-800 transition-all"
      >
        <Zap className="h-4 w-4 text-amber-500" />
        Buy Now
      </a>
      <button
        type="button"
        onClick={() => {
          setAdded(true);
          setTimeout(() => setAdded(false), 2000);
        }}
        className="w-full bg-secondary text-dark-primary py-3 px-4 rounded-lg text-sm font-bold uppercase tracking-wider hover:bg-amber-500 transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-60"
      >
        <ShoppingCart className="h-4 w-4 shrink-0" />
        {added ? "Added to Cart" : "Add to Cart"}
      </button>
      <a
        href={waLink(WHATSAPP_PHONE, `Hello NexGen Gadgets, I want to order: ${name} (${price})`)}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full bg-[#15803d] text-white py-3 px-4 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 shadow hover:bg-[#166534] transition-all"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" stroke="none">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
        Quick Order
      </a>
    </div>
  );
}