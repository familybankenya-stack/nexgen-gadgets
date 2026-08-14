"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  SlidersHorizontal,
  ChevronDown,
  Grid3x3,
  Columns3,
  LayoutGrid,
  List,
  Funnel,
  X,
  Search,
} from "lucide-react";
import type { ProductsResult } from "@/lib/data";
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

function FilterGroup({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div>
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

export default function ProductsExplorer({
  initial,
  activeCategory,
  q,
  sort,
  show,
  condition,
  brand,
  min,
  max,
}: {
  initial: ProductsResult;
  activeCategory: string;
  q?: string;
  sort: string;
  show: string;
  condition?: string;
  brand?: string;
  min?: number;
  max?: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const [cols, setCols] = useState<2 | 3 | 4 | 6 | "list">(4);
  const [filterOpen, setFilterOpen] = useState(false);
  const [query, setQuery] = useState(q ?? "");
  const [sortOpen, setSortOpen] = useState(false);
  const [showOpen, setShowOpen] = useState(false);

  const build = (patch: Record<string, string | undefined>) => {
    const next = new URLSearchParams();
    for (const [k, v] of sp.entries()) {
      if (v) next.set(k, v);
    }
    for (const [k, v] of Object.entries(patch)) {
      if (v === undefined || v === "") next.delete(k);
      else next.set(k, v);
    }
    router.push(`${pathname}${next.size ? `?${next.toString()}` : ""}`);
  };

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

  const { products, total, categories, brands, conditions } = initial;

  const linkCls = (active: boolean) =>
    `py-2 px-3 rounded-lg cursor-pointer transition-colors ${
      active ? "bg-amber-50 text-amber-700 font-semibold" : "text-slate-600 hover:bg-gray-50"
    }`;

  const brandLinkCls = (active: boolean) =>
    `py-1.5 px-3 rounded-lg cursor-pointer transition-colors flex items-center justify-between ${
      active ? "bg-amber-50 text-amber-700 font-semibold" : "text-slate-600 hover:bg-gray-50"
    }`;

  const filters = (
    <>
      <FilterGroup title="Categories">
        <button type="button" onClick={() => build({ category: undefined })} className={linkCls(!activeCategory || activeCategory === "All Products")}>
          <span className="text-sm">All Products</span>
        </button>
        {categories.map((c) => (
          <button
            key={c.slug}
            type="button"
            onClick={() => build({ category: c.slug })}
            className={linkCls(activeCategory === c.name)}
          >
            <span className="text-sm">
              {c.name} <span className="text-slate-400 text-xs">({c.count})</span>
            </span>
          </button>
        ))}
      </FilterGroup>
      <FilterGroup title="Brands">
        <button type="button" onClick={() => build({ brand: undefined })} className={brandLinkCls(!brand)}>
          <span className="text-sm">All Brands</span>
        </button>
        {brands.slice(0, 20).map((b) => (
          <button
            key={b.name}
            type="button"
            onClick={() => build({ brand: b.name === brand ? undefined : b.name })}
            className={brandLinkCls(b.name === brand)}
          >
            <span className="text-sm">{b.name}</span>
            <span className="text-xs text-slate-400">{b.count}</span>
          </button>
        ))}
      </FilterGroup>
      <FilterGroup title="Price Range (KES)">
        <button type="button" onClick={() => build({ min: undefined, max: undefined })} className={linkCls(!min && !max)}>
          <span className="text-sm">All Prices</span>
        </button>
        {PRICE_FILTERS.map((p) => {
          const active = min === p.min && max === p.max;
          return (
            <button
              key={p.label}
              type="button"
              onClick={() => build({ min: String(p.min), max: String(p.max) })}
              className={linkCls(active)}
            >
              <span className="text-sm">{p.label}</span>
            </button>
          );
        })}
      </FilterGroup>
      <FilterGroup title="Condition">
        <button type="button" onClick={() => build({ condition: undefined })} className={linkCls(!condition)}>
          <span className="text-sm">All Conditions</span>
        </button>
        {CONDITION_FILTERS.filter((c) => conditions.includes(c) || c === condition).map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => build({ condition: c === condition ? undefined : c })}
            className={linkCls(c === condition)}
          >
            <span className="text-sm">{c}</span>
          </button>
        ))}
      </FilterGroup>
    </>
  );

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-1">
        <div>
          <nav className="text-xs text-slate-500 mb-1">
            <a href="/" className="hover:text-amber-600">Home</a>
            <span className="mx-1.5">/</span>
            <a href="/products" className="hover:text-amber-600">Products</a>
            {activeCategory !== "All Products" && (
              <>
                <span className="mx-1.5">/</span>
                <span className="text-slate-700 font-semibold">{activeCategory}</span>
              </>
            )}
          </nav>
          <h1 className="text-2xl md:text-3xl font-semibold text-primary font-sans leading-none tracking-tight">
            {activeCategory}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {total} product{total === 1 ? "" : "s"} found
            {q ? (
              <>
                {" "}for &quot;<span className="text-amber-700 font-semibold">{q}</span>&quot;
              </>
            ) : null}
          </p>
        </div>
        <form
          className="flex items-center relative w-full sm:w-72"
          onSubmit={(e) => {
            e.preventDefault();
            build({ q: query || undefined });
          }}
        >
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-4 pr-20 py-2 text-sm bg-white text-text-primary rounded-lg border border-gray-300 focus:outline-none focus:border-amber-500 placeholder-gray-400"
          />
          <button
            type="submit"
            className="absolute right-0 top-0 bottom-0 px-3 bg-amber-500 text-primary rounded-r flex items-center justify-center hover:bg-amber-600 cursor-pointer"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </button>
        </form>
      </div>

      <div className="w-full flex flex-col gap-4">
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
              className="hidden lg:flex items-center gap-1.5 bg-gray-50 border border-gray-300 rounded px-3.5 py-1.5 text-sm font-semibold cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <SlidersHorizontal className="h-4 w-4 text-secondary" />
              <span>Filter</span>
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm ml-auto">
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setSortOpen(!sortOpen);
                  setShowOpen(false);
                }}
                className="flex items-center gap-2 bg-white border border-gray-300 rounded pl-3 pr-2 py-1.5 font-semibold text-text-primary cursor-pointer"
              >
                <span className="text-slate-500 font-medium">Sort:</span>
                {SORT_OPTIONS.find((o) => o.value === sort)?.label}
                <ChevronDown className="h-4 w-4 text-text-secondary" />
              </button>
              {sortOpen && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded shadow-lg z-50 py-1">
                  {SORT_OPTIONS.map((o) => (
                    <button
                      key={o.value}
                      type="button"
                      onClick={() => {
                        build({ sort: o.value });
                        setSortOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-amber-50 cursor-pointer ${
                        o.value === sort ? "text-amber-700 font-bold" : "text-slate-700"
                      }`}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowOpen(!showOpen);
                  setSortOpen(false);
                }}
                className="flex items-center gap-2 bg-white border border-gray-300 rounded pl-3 pr-2 py-1.5 font-semibold text-text-primary cursor-pointer"
              >
                <span className="text-slate-500 font-medium">Show:</span>
                {show || "24"}
                <ChevronDown className="h-4 w-4 text-text-secondary" />
              </button>
              {showOpen && (
                <div className="absolute right-0 top-full mt-1 w-32 bg-white border border-gray-200 rounded shadow-lg z-50 py-1">
                  {SHOW_COUNTS.map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => {
                        build({ show: String(n) });
                        setShowOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-amber-50 cursor-pointer ${
                        String(n) === show ? "text-amber-700 font-bold" : "text-slate-700"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="hidden sm:flex items-center bg-gray-100 p-1 rounded-lg border border-gray-200 gap-1 select-none">
              {[
                { v: 2 as const, icon: Grid3x3, label: "2 / row" },
                { v: 3 as const, icon: Columns3, label: "3 / row" },
                { v: 4 as const, icon: Grid3x3, label: "4 / row" },
                { v: 6 as const, icon: LayoutGrid, label: "6 / row" },
                { v: "list" as const, icon: List, label: "List" },
              ].map((b) => (
                <button
                  key={String(b.v)}
                  type="button"
                  onClick={() => setCols(b.v)}
                  className={`p-1.5 sm:px-2 py-1 rounded transition-colors items-center gap-1 cursor-pointer shrink-0 ${
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

        <div className="w-full flex gap-6 items-start">
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
                {filters}
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            {products.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded p-12 text-center">
                <p className="text-lg font-semibold text-slate-700 mb-2">No products found</p>
                <p className="text-sm text-slate-500 mb-4">Try adjusting or clearing your filters.</p>
                <button
                  type="button"
                  onClick={() => {
                    router.push("/products");
                    setFilterOpen(false);
                  }}
                  className="bg-[#1a1a2e] text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-slate-800 cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className={`grid gap-3 md:gap-4 w-full transition-all duration-300 ${gridClass}`}>
                {products.map((p, i) => (
                  <ProductCard key={`${p.slug ?? p.name}-${i}`} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>

        {filterOpen && (
          <div className="lg:hidden bg-white border border-gray-200 rounded-lg shadow-lg p-4 -mt-2">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-lg text-slate-800">Filters</h2>
              <button
                onClick={() => setFilterOpen(false)}
                className="text-sm text-slate-500 hover:text-[#F59E0B] cursor-pointer flex items-center gap-1"
              >
                <X className="h-4 w-4" /> Close
              </button>
            </div>
            <div className="space-y-5 divide-y divide-slate-100">{filters}</div>
          </div>
        )}
      </div>
    </div>
  );
}