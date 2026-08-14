"use client";

import { useState } from "react";
import {
  Menu,
  Search,
  Heart,
  ShoppingCart,
  User,
  ChevronDown,
  ChevronRight,
  X,
  Phone,
  Mail,
} from "lucide-react";

const HELP_LINKS = [
  { label: "Call Us", href: "tel:+254717043408" },
  { label: "How to Shop", href: "/how-to-shop" },
  { label: "Contact Support", href: "mailto:support@nexgen-gadgets.com" },
];

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "All Products", href: "/products" },
  { label: "Track Order", href: "/track", highlight: true },
  { label: "All-in-Ones", href: "/products?category=all-in-ones" },
  {
    label: "PC Accessories",
    href: "/products?category=pc-accessories",
    dropdown: [
      { label: "Keyboards & Mice", href: "/products?category=pc-accessories&brand=Keyboards%20%26%20Mice" },
      { label: "Laptop Chargers", href: "/products?category=pc-accessories&brand=Laptop%20Chargers" },
    ],
  },
  {
    label: "Laptops",
    href: "/products?category=laptops",
    dropdown: [
      { label: "HP", href: "/products?category=laptops&brand=HP" },
      { label: "Dell", href: "/products?category=laptops&brand=Dell" },
      { label: "Lenovo", href: "/products?category=laptops&brand=Lenovo" },
      { label: "Apple Macbooks", href: "/products?category=laptops&brand=Apple%20Macbooks" },
    ],
  },
  { label: "Monitors", href: "/products?category=monitors" },
  { label: "Printers", href: "/products?category=printers" },
  { label: "Watches", href: "/products?category=watches" },
  { label: "Laptop Bags & Sleeves", href: "/products?category=laptop-bags-sleeves" },
  { label: "Smartphones & Tablets", href: "/products?category=smartphones-tablets" },
];

const MOBILE_LINKS = [
  { label: "Home", href: "/" },
  { label: "All Products", href: "/products" },
  { label: "Track Order", href: "/track" },
  { label: "All-in-Ones", href: "/products?category=all-in-ones" },
  { label: "PC Accessories", href: "/products?category=pc-accessories" },
  { label: "Laptops", href: "/products?category=laptops" },
  { label: "Monitors", href: "/products?category=monitors" },
  { label: "Printers", href: "/products?category=printers" },
  { label: "Watches", href: "/products?category=watches" },
  { label: "Laptop Bags & Sleeves", href: "/products?category=laptop-bags-sleeves" },
  { label: "Smartphones & Tablets", href: "/products?category=smartphones-tablets" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full select-none shadow-md border-b border-gray-200">
      <div className="w-full bg-[#1a1a2e] text-white py-2.5 sm:py-4">
        <div className="w-full mx-auto px-2.5 sm:px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-2.5 sm:gap-4">
          <div className="flex items-center justify-between w-full md:w-auto">
            <div className="flex items-center gap-1 sm:gap-2 min-w-0 flex-1">
              <button
                className="p-1 -ml-1 min-w-9 min-h-9 text-white hover:text-[#d97706] md:hidden cursor-pointer flex items-center justify-center shrink-0"
                onClick={() => setMobileOpen(true)}
                aria-label="Open Navigation Menu"
              >
                <Menu className="h-5.5 w-5.5" />
              </button>
              <a
                className="hover:opacity-90 transition-opacity flex items-center gap-1 relative min-w-0"
                aria-label="NexGen Gadgets Home"
                href="/"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="NexGen Logo"
                  width={48}
                  height={48}
                  decoding="async"
                  className="h-7 sm:h-11 md:h-14 w-auto object-contain shrink-0 drop-shadow"
                  src="/favicon.png"
                />
                <span className="font-sans hidden min-[340px]:inline text-[11px] xs:text-[13px] sm:text-xl md:text-3xl font-bold leading-none tracking-tight text-white whitespace-nowrap truncate">
                  NexGen <span className="text-[#F59E0B]">Gadgets</span>
                </span>
              </a>
            </div>
            <div className="flex items-center gap-1 sm:gap-2.5 md:hidden shrink-0">
              <a
                className="relative p-1.5 min-w-9 min-h-9 sm:min-w-11 sm:min-h-11 rounded-full bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-colors flex items-center justify-center cursor-pointer text-white"
                aria-label="Wishlist"
                href="/wishlist"
              >
                <Heart className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-white" />
              </a>
              <button
                className="relative p-1.5 min-w-9 min-h-9 sm:min-w-11 sm:min-h-11 rounded-full bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-colors flex items-center justify-center cursor-pointer text-white"
                aria-label="Open Shopping Cart"
              >
                <ShoppingCart className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-white" />
              </button>
              <button
                className="p-2 min-w-11 min-h-11 rounded-full bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-colors flex items-center justify-center cursor-pointer text-white"
                aria-label="Account"
              >
                <User className="h-4.5 w-4.5 text-white" />
              </button>
            </div>
          </div>
          <form
            className="flex items-center relative w-full mt-3 md:mt-0 md:max-w-xl lg:max-w-2xl flex-1 md:mx-4"
            onSubmit={(e) => {
              e.preventDefault();
              const q = (e.currentTarget.elements.namedItem("q") as HTMLInputElement)?.value?.trim();
              window.location.href = q ? `/products?q=${encodeURIComponent(q)}` : "/products";
            }}
          >
            <input
              name="q"
              placeholder="Search for products..."
              aria-label="Search for products"
              className="w-full pl-4 pr-12 py-2.5 md:py-3 text-sm md:text-base bg-white text-text-primary rounded-lg border border-gray-300 md:border-2 md:border-transparent focus:outline-none focus:border-[#d97706] placeholder-gray-400"
              type="text"
            />
            <button
              type="submit"
              className="absolute right-0 top-0 bottom-0 px-4 text-gray-500 md:bg-[#d97706] md:text-primary md:rounded-r flex items-center justify-center hover:text-gray-700 md:hover:bg-amber-700 cursor-pointer transition-colors"
              aria-label="Search Submit"
            >
              <Search className="h-5 w-5 md:text-primary" />
            </button>
          </form>
          <div className="hidden md:flex items-center gap-4 shrink-0 text-right justify-end">
            <div className="relative group ml-4">
              <div className="flex items-center gap-2 cursor-pointer hover:text-[#F59E0B] transition-colors py-2">
                <div className="relative border-2 border-white group-hover:border-[#F59E0B] rounded-full w-8 h-8 flex items-center justify-center transition-colors">
                  <span className="font-bold text-lg text-white group-hover:text-[#F59E0B] block mt-[-2px]">
                    ?
                  </span>
                </div>
                <span className="text-sm font-bold flex items-center gap-1 text-white group-hover:text-[#F59E0B]">
                  Help <ChevronDown className="h-4 w-4" />
                </span>
              </div>
              <div className="absolute right-0 top-full mt-1 w-56 bg-white rounded shadow-2xl py-2 z-50 text-slate-800 border border-gray-100 hidden group-hover:block">
                {HELP_LINKS.map((l, i) => (
                  <a
                    key={l.label}
                    href={l.href}
                    className={`block px-4 py-3 hover:bg-slate-50 hover:text-[#F59E0B] transition-colors font-semibold text-sm ${
                      i < HELP_LINKS.length - 1 ? "border-b border-gray-100" : ""
                    }`}
                  >
                    {l.label === "Call Us" && <Phone className="inline h-3.5 w-3.5 mr-1.5 -mt-0.5" />}
                    {l.label === "Contact Support" && <Mail className="inline h-3.5 w-3.5 mr-1.5 -mt-0.5" />}
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
            <div className="relative ml-4">
              <div className="flex items-center gap-2 cursor-pointer hover:text-[#F59E0B] transition-colors py-2 group">
                <User className="h-9 w-9 text-white group-hover:text-[#F59E0B]" />
                <div className="flex flex-col text-left">
                  <span className="text-sm font-bold flex items-center gap-1 text-white group-hover:text-[#F59E0B]">
                    Account <ChevronDown className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </div>
            <button className="flex items-center gap-2 cursor-pointer hover:text-[#F59E0B] transition-colors py-2 group ml-4">
              <div className="relative">
                <ShoppingCart className="h-9 w-9 text-white group-hover:text-[#F59E0B]" />
              </div>
              <span className="text-sm font-bold text-white group-hover:text-[#F59E0B]">Cart</span>
            </button>
          </div>
        </div>
      </div>

      <div className="hidden md:block">
        <div className="bg-white border-b border-slate-200 shadow-sm relative z-40 hidden md:block select-none overflow-visible">
          <div className="w-full mx-auto px-4 md:px-8">
            <div className="flex items-center gap-1.5 lg:gap-2.5 xl:gap-3 h-12">
              <div className="relative h-full flex items-center shrink-0 z-50">
                <button className="flex items-center gap-1 lg:gap-1.5 px-2.5 lg:px-3.5 h-8.5 font-bold uppercase tracking-wider text-[11px] lg:text-xs transition-colors rounded-lg bg-[#F59E0B] text-[#1a1a2e] hover:bg-amber-500 cursor-pointer">
                  <Menu className="h-3.5 w-3.5 shrink-0" />
                  <span>All Categories</span>
                  <ChevronDown className="h-3 w-3 ml-0.5 transition-transform" />
                </button>
              </div>
              <nav className="flex items-center gap-1 lg:gap-1.5 xl:gap-2.5 font-sans font-bold text-[9.5px] lg:text-[10.5px] xl:text-[11.5px] text-slate-700 h-full flex-nowrap justify-start flex-1 min-w-0 overflow-x-auto no-scrollbar relative pr-4">
                {NAV_LINKS.map((link) => (
                  <div
                    key={link.label}
                    className="relative h-full flex items-center group cursor-pointer shrink-0"
                  >
                    <a
                      className={`hover:text-[#F59E0B] transition-colors flex items-center gap-0.5 h-full uppercase whitespace-nowrap font-bold shrink-0 py-1 border-b-2 border-transparent group-hover:border-[#F59E0B] ${
                        link.highlight ? "text-amber-600 font-extrabold" : ""
                      }`}
                      href={link.href}
                    >
                      <span>{link.label}</span>
                      {link.dropdown && (
                        <ChevronDown className="h-3 w-3 text-slate-400 group-hover:text-[#F59E0B] transition-transform group-hover:rotate-180 shrink-0" />
                      )}
                    </a>
                    {link.dropdown && (
                      <div className="absolute top-full left-0 hidden group-hover:flex flex-col min-w-[200px] bg-white border border-slate-200/80 shadow-2xl rounded-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 -mt-1">
                        {link.dropdown.map((item) => (
                          <a
                            key={item.label}
                            className="px-4 py-2 hover:bg-amber-50/80 hover:text-[#F59E0B] text-slate-700 text-xs font-semibold transition-colors flex items-center justify-between"
                            href={item.href}
                          >
                            <span>{item.label}</span>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-[100]">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-2xl flex flex-col animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between p-4 bg-[#1a1a2e] text-white">
              <span className="font-sans text-lg font-bold tracking-tight">
                NexGen <span className="text-[#F59E0B]">Gadgets</span>
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1 text-white hover:text-[#F59E0B] cursor-pointer"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto py-2">
              {MOBILE_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between px-4 py-3 text-sm font-bold text-slate-700 hover:bg-amber-50 hover:text-[#F59E0B] transition-colors uppercase tracking-wide"
                >
                  {link.label}
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}