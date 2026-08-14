"use client";

import Link from "next/link";
import { Heart, Eye, ShieldCheck, Star, ShoppingCart } from "lucide-react";
import type { Product } from "@/lib/types";
import { waLink, WHATSAPP_PHONE } from "@/lib/formats";

export default function ProductCard({ product }: { product: Product }) {
  const href = product.slug ? `/products/${product.slug}` : "#";
  const stars = Math.round(product.rating ?? 4.5);

  return (
    <Link
      href={href}
      className="group bg-white border border-border-gray text-dark-primary rounded-xl relative transition-all duration-300 hover:scale-[1.02] hover:shadow-xl flex flex-col h-full cursor-pointer overflow-hidden text-left w-full max-w-full min-w-0 block"
    >
      {product.discount && (
        <span className="absolute top-2 left-2 z-10 bg-red-700 text-white text-[10px] sm:text-sm font-bold px-1 sm:px-2 py-0.5 rounded shadow-sm select-none">
          {product.discount}
        </span>
      )}
      <div className="w-full aspect-square bg-white relative border-b border-border-gray select-none group/image overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={product.name}
          width={300}
          height={300}
          className="w-full h-full object-cover object-center transition-all duration-500 ease-out group-hover/image:scale-[1.05]"
          loading="lazy"
          src={`/${product.img}`}
        />
        {product.imgAlt && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt={`${product.name} alternate`}
            width={300}
            height={300}
            className="w-full h-full object-cover object-center absolute inset-0 opacity-0 transition-all duration-500 ease-out group-hover/image:opacity-100 group-hover/image:scale-[1.05]"
            loading="lazy"
            src={`/${product.imgAlt}`}
          />
        )}
        <button
          className="absolute top-2 right-2 bg-white/90 backdrop-blur text-slate-400 hover:text-rose-500 hover:bg-rose-50 p-1.5 rounded-full shadow-sm transition-colors z-20 opacity-0 group-hover/image:opacity-100 focus:opacity-100"
          title="Add to wishlist"
          aria-label="Add to wishlist"
          onClick={(e) => e.preventDefault()}
        >
          <Heart className="h-4 w-4" />
        </button>
        <button
          className="absolute top-11 right-2 bg-white/90 backdrop-blur text-slate-400 hover:text-blue-500 hover:bg-blue-50 p-1.5 rounded-full shadow-sm transition-colors z-20 opacity-0 group-hover/image:opacity-100 focus:opacity-100"
          title="Quick view"
          aria-label="Quick view"
          onClick={(e) => e.preventDefault()}
        >
          <Eye className="h-4 w-4" />
        </button>
      </div>
      <div className="flex flex-col flex-1 min-w-0 p-2 sm:p-3">
        <span className="flex items-center gap-1 text-[9px] sm:text-[10px] font-semibold text-emerald-800 uppercase tracking-wide">
          <ShieldCheck className="h-3 w-3 text-emerald-700 shrink-0" />
          <span className="truncate">VERIFIED</span>
        </span>
        <h3
          className="text-[11px] sm:text-sm md:text-base font-bold font-sans text-dark-primary leading-tight line-clamp-2 hover:text-secondary transition-colors duration-100"
          title={product.name}
        >
          {product.name}
        </h3>
        <div className="flex items-center gap-1 select-none text-xs mt-0.5 flex-wrap">
          <div className="flex scale-75 origin-left shrink-0 sm:scale-100">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className={`h-4 w-4 shrink-0 ${
                  i <= stars ? "fill-amber-400 text-amber-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-text-secondary text-[10px] sm:text-xs">({product.reviews})</span>
        </div>
        <div className="flex items-baseline gap-1 mt-0.5 flex-wrap min-w-0">
          {product.comparePrice && (
            <span className="text-[10px] sm:text-xs text-gray-400 line-through truncate">
              {product.comparePrice}
            </span>
          )}
          <span className="text-xs sm:text-lg md:text-xl font-extrabold text-dark-primary truncate">
            {product.price}
          </span>
        </div>
        <div className="text-[10px] sm:text-xs font-semibold mt-auto select-none pt-0.5">
          <span className="text-emerald-700">In Stock</span>
        </div>
      </div>
      <div className="p-1 sm:p-3 border-t border-border-gray bg-bg-gray mt-auto z-10 select-none flex flex-col gap-1 transition-all duration-300 min-w-0">
        <a
          href={waLink(
            WHATSAPP_PHONE,
            `Hello NexGen Gadgets, I would like to order: ${product.name} (${product.price})`
          )}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="w-full min-w-0 bg-dark-primary text-white py-1 sm:py-1.5 px-1 rounded-lg text-[10px] sm:text-xs font-semibold flex items-center justify-center gap-1 shadow hover:bg-slate-800 transition-all cursor-pointer whitespace-nowrap overflow-hidden"
        >
          <span className="truncate">Buy Now</span>
        </a>
        <a
          href={waLink(
            WHATSAPP_PHONE,
            `Hello NexGen Gadgets, I want to check out: ${product.name}`
          )}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="w-full min-w-0 bg-[#15803d] text-white py-1 sm:py-1.5 px-1 rounded-lg text-[10px] sm:text-xs font-semibold flex items-center justify-center gap-1 shadow hover:bg-[#166534] transition-all cursor-pointer whitespace-nowrap overflow-hidden"
        >
          <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor" stroke="none">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
          </svg>
          <span className="truncate">Quick Order</span>
        </a>
        <button
          onClick={(e) => e.preventDefault()}
          className="w-full min-w-0 bg-secondary text-dark-primary py-1 sm:py-1.5 px-1 rounded-lg text-[10px] sm:text-xs font-bold uppercase tracking-wider hover:bg-amber-500 transition-all duration-150 flex items-center justify-center gap-1 cursor-pointer shadow-sm whitespace-nowrap overflow-hidden"
        >
          <ShoppingCart className="h-3 w-3 shrink-0" />
          <span className="truncate">Add to Cart</span>
        </button>
      </div>
    </Link>
  );
}