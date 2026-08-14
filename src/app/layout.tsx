import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Laptops, Desktops, Monitors & Tech Accessories in Kenya | NexGen Gadgets",
  description:
    "NexGen Gadgets Kenya: Your trusted online store for HP, Lenovo, Dell, and Apple MacBooks, desktops, monitors & tech accessories in Nairobi and countrywide. Nunua kompyuta kwa M-PESA kwa bei nafuu.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
