import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBadges from "@/components/TrustBadges";
import FlashSale from "@/components/FlashSale";
import CategorySection from "@/components/CategorySection";
import Catalog from "@/components/Catalog";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import { getHomeData, getProducts } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [data, catalogMeta] = await Promise.all([
    getHomeData(),
    getProducts({ show: 24 }),
  ]);

  return (
    <>
      <Header />
      <main className="flex flex-col flex-1 relative w-full overflow-x-hidden">
        <div className="w-full flex flex-col min-h-screen bg-bg-gray">
          <Hero />
          <div className="w-full mx-auto px-4 md:px-8 pt-3 flex flex-col gap-4">
            <TrustBadges />
            <FlashSale products={data.flashSale} />
            <div className="w-full flex flex-col gap-8">
              {data.categories.map((cat) => (
                <CategorySection key={cat.title} category={cat} />
              ))}
            </div>
            <Catalog
              products={data.catalog}
              categories={catalogMeta.categories}
              brands={catalogMeta.brands.map((b) => b.name)}
            />
          </div>
        </div>
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}