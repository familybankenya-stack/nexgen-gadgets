"use client";

import { useEffect, useState } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-[90] bg-white border-t border-gray-200 shadow-2xl p-4 sm:p-5 animate-in fade-in">
      <div className="w-full mx-auto px-2 md:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="text-left">
          <h3 className="text-sm sm:text-base font-bold text-[#1a1a2e]">Your Privacy Matters</h3>
          <p className="text-xs text-text-secondary mt-0.5 max-w-2xl">
            We use cookies for shopping cart and preferences. By using this site you agree to our
            Terms and Privacy Policy.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setVisible(false)}
            className="bg-secondary text-[#1a1a2e] hover:bg-amber-500 font-bold text-sm px-4 py-2 rounded-lg transition-colors duration-150 cursor-pointer"
          >
            Accept All
          </button>
          <button
            onClick={() => setVisible(false)}
            className="border border-gray-300 text-[#1a1a2e] hover:bg-gray-50 font-semibold text-sm px-4 py-2 rounded-lg transition-colors duration-150 cursor-pointer"
          >
            Customize
          </button>
        </div>
      </div>
    </div>
  );
}