import { Mail, ArrowRight, MapPin, CircleCheck } from "lucide-react";

const CUSTOMER_SERVICE = [
  { label: "Help Center & FAQs", href: "/faq" },
  { label: "Delivery Timelines", href: "/shipping" },
  { label: "Return Policy & Refunds", href: "/returns" },
  { label: "How to Shop on NexGen Gadgets", href: "/how-to-shop" },
  { label: "Report a Product / Dispute", href: "/faq" },
];

const INFORMATION = [
  { label: "Contact Us", href: "mailto:support@nexgen-gadgets.com" },
  { label: "Track Order", href: "/track" },
  { label: "FAQs", href: "/faq" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy & Cookie Notice", href: "/privacy" },
  { label: "Official Laptop Stores", href: "/" },
];

const MY_ACCOUNT = [
  { label: "My Profile Details", href: "/orders" },
  { label: "Track My Order", href: "/track" },
  { label: "Order History", href: "/orders" },
  { label: "My Saved Items / Wishlist", href: "/products" },
  { label: "Address Book", href: "/orders" },
];

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://facebook.com/nexgengadgets",
    path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
  },
  {
    label: "Twitter",
    href: "https://twitter.com/nexgengadgets",
    path: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/nexgengadgets",
    path: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z",
    rect: true,
  },
  {
    label: "Youtube",
    href: "https://youtube.com/nexgengadgets",
    path: "M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z",
    polygon: "9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02",
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#1a1a2e] text-white border-t border-slate-800 mt-12 pb-20 md:pb-8 select-none">
      <div className="border-b border-slate-800 bg-slate-900/50 py-8">
        <div className="w-full mx-auto px-4 md:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="text-[18px] font-semibold font-sans text-[#F59E0B] uppercase tracking-wider">
              New to NexGen Gadgets?
            </h3>
            <p className="text-sm text-gray-300 mt-1">
              Subscribe to our newsletter to get updates on our latest premium laptop deals!
            </p>
          </div>
          <form className="flex w-full md:w-auto max-w-md shrink-0 gap-2 font-sans">
            <div className="relative flex-1">
              <Mail className="absolute left-3.5 top-3 h-5 w-5 text-gray-400" />
              <input
                type="email"
                required
                placeholder="Enter E-mail Address"
                aria-label="Email address"
                className="w-full pl-10 pr-4 py-3.5 text-sm bg-white text-text-primary rounded-xl border border-gray-600 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20"
              />
            </div>
            <button
              type="submit"
              className="bg-secondary text-primary font-bold text-sm px-6 py-2.5 rounded-xl hover:bg-amber-500 transition-colors duration-150 cursor-pointer"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="w-full mx-auto px-4 md:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-left">
        <div>
          <h4 className="text-[18px] font-semibold font-sans text-[#F59E0B] mb-4">Customer Service</h4>
          <ul className="space-y-2.5 text-sm text-gray-300">
            {CUSTOMER_SERVICE.map((l) => (
              <li key={l.label}>
                <a className="hover:text-[#F59E0B] transition-colors" href={l.href}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-[18px] font-semibold font-sans text-[#F59E0B] mb-4">Information</h4>
          <ul className="space-y-2.5 text-sm text-gray-300">
            {INFORMATION.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="hover:text-[#F59E0B] transition-colors flex items-center gap-2"
                >
                  <ArrowRight className="h-3 w-3" />
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-[18px] font-semibold font-sans text-[#F59E0B] mb-4">Our Location</h4>
          <p className="text-sm text-gray-300 flex items-start gap-2">
            <MapPin className="h-4 w-4 mt-1 shrink-0 text-[#F59E0B]" />
            <span>NAIROBI CBD,TOM MBOYA STREET OLDNATION HOUSE FIRST FLOOR SHOP NUMBER B16</span>
          </p>
        </div>
        <div>
          <h4 className="text-[18px] font-semibold font-sans text-[#F59E0B] mb-4">My Account</h4>
          <ul className="space-y-2.5 text-sm text-gray-300">
            {MY_ACCOUNT.map((l) => (
              <li key={l.label}>
                <a className="hover:text-[#F59E0B] transition-colors" href={l.href}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-[18px] font-semibold font-sans text-[#F59E0B] mb-4">Follow Us</h4>
          <div className="flex items-center gap-3.5 mb-6">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-slate-800 rounded-full hover:bg-[#F59E0B] hover:text-primary transition-colors"
                aria-label={s.label}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  {s.rect && <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />}
                  <path d={s.path} />
                  {s.polygon && <polygon points={s.polygon} />}
                </svg>
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <CircleCheck className="h-5 w-5 text-[#10B981] shrink-0" />
            <span>100% Verified Genuine Products</span>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 bg-slate-900/30 py-6 text-left text-xs text-gray-400">
        <div className="w-full mx-auto px-4 md:px-8 leading-relaxed space-y-2">
          <p className="font-medium text-gray-300">
            <strong className="text-[#F59E0B]">NexGen Gadgets Kenya:</strong> Your trusted online
            store for HP, Lenovo, Dell, and Apple MacBooks, desktops, monitors &amp; tech
            accessories in Nairobi and countrywide. Nunua kompyuta kwa M-PESA kwa bei nafuu.
          </p>
          <p>
            Fast, insured delivery to all major towns including{" "}
            <strong>Nairobi, Mombasa, Kisumu, Nakuru, Eldoret, Thika, Nyeri, Machakos</strong>, and
            regional shipping across East Africa (Uganda, Tanzania, Rwanda).
          </p>
        </div>
      </div>

      <div className="border-t border-slate-850 bg-slate-950 py-8 text-center">
        <div className="w-full mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center flex-wrap gap-3">
            <span className="text-xs uppercase font-semibold text-gray-400 tracking-wider">
              Accepted Payments:
            </span>
            <div className="flex gap-2.5 items-center">
              <span className="flex items-center shadow-md shrink-0" title="M-PESA">
                <svg className="h-7 w-16 rounded" viewBox="0 0 100 36">
                  <rect width="100" height="36" rx="4" fill="#388e3c" />
                  <text x="12" y="24" fontFamily="sans-serif" fontWeight={950} fontSize={16} fill="#ffffff">M-</text>
                  <text x="32" y="24" fontFamily="sans-serif" fontWeight={950} fontSize={16} fill="#e53935">PESA</text>
                </svg>
              </span>
              <span className="flex items-center shadow-md shrink-0" title="Visa">
                <svg className="h-7 w-16 rounded" viewBox="0 0 100 36">
                  <rect width="100" height="36" rx="4" fill="#1a1f71" />
                  <text x="18" y="25" fontFamily="'Georgia', serif" fontWeight="bold" fontStyle="italic" fontSize={22} fill="#f7b614">V</text>
                  <text x="35" y="25" fontFamily="'Georgia', serif" fontWeight="bold" fontStyle="italic" fontSize={22} fill="#ffffff">ISA</text>
                </svg>
              </span>
              <span className="flex items-center shadow-md shrink-0" title="Mastercard">
                <svg className="h-7 w-16 rounded" viewBox="0 0 100 36">
                  <rect width="100" height="36" rx="4" fill="#111111" />
                  <circle cx="42" cy="18" r="10" fill="#eb001b" />
                  <circle cx="58" cy="18" r="10" fill="#ff5f00" opacity="0.85" />
                </svg>
              </span>
            </div>
          </div>
          <p className="text-xs text-gray-400">© 2026 NexGen Gadgets. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}