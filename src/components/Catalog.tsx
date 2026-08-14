"use client";

import { useState } from "react";
import Link from "next/link";
import {
  SlidersHorizontal,
  ChevronDown,
  Grid3x3,
  Columns3,
  LayoutGrid,
  List,
  Funnel,
} from "lucide-react";
import type { Product } from "@/lib/types";
import ProductCard from "@/components/ProductCard";

const SORT_OPTIONS = [
  { value: "recommended", label: "Recommended" },
  { value: "price-asc", label: "Price: Low-High" },
  { value: "price-desc", label: "Price: High-Low" },
  { value: "rating", label: "Rating" },
];

const SHOW_COUNTS = [9, 12, 18, 24, 36];

const CONDITION_FILTERS = ["New", "Refurbished", "Pre-Owned / Ex-UK"];

const PRICE_FILTERS = [
  { label: "Under KES 10,000", min: 0, max: 10000 },
  { label: "KES 10,000 - 25,000", min: 10000, max: 25000 },
  { label: "KES 25,000 - 50,000", min: 25000, max: 50000 },
  { label: "KES 50,000 - 100,000", min: 50000, max: 100000 },
  { label: "Over KES 100,000", min: 100000, max: 1000000000 },
];

function priceNum(p: Product): number {
  return parseInt((p.price ?? "").replace(/[^0-9]/g, ""), 10) || 0;
}

function FilterGroup({ title, children, defaultOpen = true }: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="pt-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-sm font-bold uppercase tracking-wider text-slate-900 mb-4 select-none cursor-pointer focus:outline-none"
      >
        <span>{title}</span>
        <ChevronDown
          className={`h-4 w-4 text-slate-500 transition-transform ${open ? "" : "-rotate-90"}`}
        />
      </button>
      {open && <div className="flex flex-col gap-1">{children}</div>}
    </div>
  );
}

export default function Catalog({
  products,
  categories,
  brands,
}: {
  products: Product[];
  categories: { name: string; slug: string; count: number }[];
  brands: string[];
}) {
  const [sort, setSort] = useState("recommended");
  const [show, setShow] = useState(24);
  const [cols, setCols] = useState<2 | 3 | 4 | 6 | "list">(4);
  const [filterOpen, setFilterOpen] = useState(false);

  const gridClass =
    cols === 2
      ? "grid-cols-2"
      : cols === 3
        ? "grid-cols-2 sm:grid-cols-3"
        : cols === 6
          ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"
          : cols === "list"
            ? "grid-cols-1"
            : "grid-cols-2 md:grid-cols-4";

  const sorted = [...products];
  if (sort === "price-asc") sorted.sort((a, b) => priceNum(a) - priceNum(b));
  if (sort === "price-desc") sorted.sort((a, b) => priceNum(b) - priceNum(a));
  if (sort === "rating") sorted.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));

  const items = show === 0 || show > sorted.length ? sorted : sorted.slice(0, show);

  return (
    <section id="main-catalog" className="w-full border-t border-gray-200 pt-6 scroll-mt-24 min-h-[600px]">
      <div className="text-left mb-6">
        <h2 className="text-3xl font-semibold text-primary font-sans leading-none tracking-tight">
          Browse All Products
        </h2>
      </div>

      <div className="w-full flex flex-col gap-4 mb-12 relative">
        <div className="bg-white border border-gray-200 text-text-primary rounded px-4 py-3 flex flex-wrap items-center justify-between shadow-sm select-none gap-3 relative z-30">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setFilterOpen(!filterOpen)}
              className="lg:hidden flex items-center gap-2 bg-[#1a1a2e] text-white px-3 py-1.5 rounded text-sm font-medium hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="h-4 w-4 text-secondary" />
              Filter Catalog
            </button>
            <button
              type="button"
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center gap-1.5 bg-gray-50 border border-gray-300 rounded px-3.5 py-1.5 text-xs sm:text-sm font-semibold cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <SlidersHorizontal className="h-4 w-4 text-secondary" />
              <span>Filter</span>
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm ml-auto">
            <div className="flex items-center gap-2">
              <span className="text-slate-500 text-xs sm:text-sm font-medium">Sort by:</span>
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded pl-3 pr-8 py-1.5 font-semibold text-text-primary focus:outline-none focus:border-secondary cursor-pointer text-xs sm:text-sm"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary pointer-events-none" />
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs sm:text-sm font-medium text-slate-600 select-none">
              <span className="text-slate-500 font-medium">Show :</span>
              {SHOW_COUNTS.map((n, i) => (
                <span key={n} className="flex items-center gap-1">
                  {i > 0 && <span className="text-slate-300">/</span>}
                  <button
                    type="button"
                    onClick={() => setShow(n)}
                    className={`hover:text-[#F59E0B] px-0.5 transition-colors cursor-pointer ${
                      show === n ? "text-[#F59E0B] font-extrabold underline" : "text-slate-600"
                    }`}
                  >
                    {n}
                  </button>
                </span>
              ))}
              <span className="text-slate-300">/</span>
              <button
                type="button"
                onClick={() => setShow(products.length)}
                className={`hover:text-[#F59E0B] px-0.5 transition-colors cursor-pointer ${
                  show >= products.length && show !== 24 ? "text-[#F59E0B] font-extrabold underline" : "text-slate-600"
                }`}
              >
                All
              </button>
            </div>
            <div className="flex items-center bg-gray-100 p-1 rounded-lg border border-gray-200 gap-1 select-none">
              {[
                { v: 2 as const, icon: Grid3x3, label: "2 / row", title: "2 per row" },
                { v: 3 as const, icon: Columns3, label: "3 / row", title: "3 per row" },
                { v: 4 as const, icon: Grid3x3, label: "4 / row", title: "4 per row" },
                { v: 6 as const, icon: LayoutGrid, label: "6 / row", title: "6 per row", hiddenSm: true },
                { v: "list" as const, icon: List, label: "List", title: "List View" },
              ].map((b) => (
                <button
                  key={String(b.v)}
                  type="button"
                  title={b.title}
                  onClick={() => setCols(b.v)}
                  className={`${b.hiddenSm ? "hidden sm:flex" : "flex"} p-1.5 sm:px-2 py-1 rounded transition-colors items-center gap-1 cursor-pointer shrink-0 ${
                    cols === b.v
                      ? "bg-white text-[#1a1a2e] shadow-sm font-bold"
                      : "text-gray-400 hover:text-gray-700"
                  }`}
                >
                  <b.icon className="h-4 w-4" />
                  <span className="hidden xl:inline text-xs">{b.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full flex gap-6 items-start mt-4 mb-12">
          <div
            className={`hidden lg:block shrink-0 bg-white border border-gray-200 rounded shadow-sm p-4 text-left transition-all duration-300 ease-in-out overflow-hidden ${
              filterOpen ? "w-72 opacity-100" : "w-0 opacity-0 border-0 p-0 shadow-none"
            }`}
          >
            <div className="flex flex-col h-full w-full">
              <div className="pb-4 mb-4 border-b border-slate-200 flex items-center gap-2">
                <Funnel className="h-5 w-5 text-slate-700" />
                <h2 className="font-sans font-bold text-lg text-slate-800">Filters</h2>
              </div>
              <div className="space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto scrollbar-thin divide-y divide-slate-100 pr-2">
                <FilterGroup title="Categories">
                  <Link
                    href="/products"
                    className="py-2 px-3 rounded-lg cursor-pointer transition-colors bg-amber-50 text-amber-700 font-semibold"
                  >
                    <span className="text-sm">All Products</span>
                  </Link>
                  {categories.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/products?category=${c.slug}`}
                      className="py-2 px-3 rounded-lg cursor-pointer transition-colors text-slate-600 hover:bg-gray-50"
                    >
                      <span className="text-sm">
                        {c.name} <span className="text-slate-400 text-xs">({c.count})</span>
                      </span>
                    </Link>
                  ))}
                </FilterGroup>
                <FilterGroup title="Brands">
                  {brands.slice(0, 14).map((b) => (
                    <Link
                      key={b}
                      href={`/products?brand=${encodeURIComponent(b)}`}
                      className="py-1.5 px-3 rounded-lg cursor-pointer transition-colors text-slate-600 hover:bg-gray-50 flex items-center justify-between"
                    >
                      <span className="text-sm">{b}</span>
                    </Link>
                  ))}
                </FilterGroup>
                <FilterGroup title="Price Range (KES)">
                  <div className="flex flex-col gap-1">
                    {PRICE_FILTERS.map((p) => (
                      <Link
                        key={p.label}
                        href={`/products?min=${p.min}&max=${p.max}`}
                        className="py-1.5 px-3 rounded-lg cursor-pointer transition-colors text-slate-600 hover:bg-gray-50"
                      >
                        <span className="text-sm">{p.label}</span>
                      </Link>
                    ))}
                  </div>
                </FilterGroup>
                <FilterGroup title="Condition">
                  {CONDITION_FILTERS.map((c) => (
                    <Link
                      key={c}
                      href={`/products?condition=${encodeURIComponent(c)}`}
                      className="py-1.5 px-3 rounded-lg cursor-pointer transition-colors text-slate-600 hover:bg-gray-50"
                    >
                      <span className="text-sm">{c}</span>
                    </Link>
                  ))}
                </FilterGroup>
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="w-full flex flex-col items-center">
              <div
                className={`grid gap-3 md:gap-4 w-full transition-all duration-300 ${gridClass}`}
              >
                {items.map((p, i) => (
                  <ProductCard key={`${p.name}-${i}`} product={p} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {filterOpen && cols && (
          <div className="lg:hidden bg-white border border-gray-200 rounded-lg shadow-lg p-4 -mt-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-lg text-slate-800">Filters</h2>
              <button
                onClick={() => setFilterOpen(false)}
                className="text-sm text-slate-500 hover:text-[#F59E0B] cursor-pointer"
              >
                Close
              </button>
            </div>
            <FilterGroup title="Categories">
              <Link
                href="/products"
                className="py-2 px-3 rounded-lg cursor-pointer transition-colors bg-amber-50 text-amber-700 font-semibold"
              >
                <span className="text-sm">All Products</span>
              </Link>
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  href={`/products?category=${c.slug}`}
                  onClick={() => setFilterOpen(false)}
                  className="py-2 px-3 rounded-lg cursor-pointer transition-colors text-slate-600 hover:bg-gray-50"
                >
                  <span className="text-sm">{c.name}</span>
                </Link>
              ))}
            </FilterGroup>
            <FilterGroup title="Brands">
              {brands.slice(0, 14).map((b) => (
                <Link
                  key={b}
                  href={`/products?brand=${encodeURIComponent(b)}`}
                  onClick={() => setFilterOpen(false)}
                  className="py-1.5 px-3 rounded-lg cursor-pointer transition-colors text-slate-600 hover:bg-gray-50"
                >
                  <span className="text-sm">{b}</span>
                </Link>
              ))}
            </FilterGroup>
          </div>
        )}
      </div>
    </section>
  );
}