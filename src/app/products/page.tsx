import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import ProductsExplorer from "@/components/ProductsExplorer";
import { getProducts } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const get = (k: string) => {
    const v = sp[k];
    return Array.isArray(v) ? v[0] : v;
  };

  const category = get("category");
  const brand = get("brand");
  const q = get("q");
  const condition = get("condition");
  const sort = get("sort") ?? "recommended";
  const showRaw = get("show");
  const min = parseInt(get("min") ?? "", 10);
  const max = parseInt(get("max") ?? "", 10);

  const result = await getProducts({
    category,
    brand,
    q,
    condition,
    sort,
    show: showRaw && !isNaN(parseInt(showRaw, 10)) ? parseInt(showRaw, 10) : 24,
    min: isNaN(min) ? undefined : min,
    max: isNaN(max) ? undefined : max,
  });

  const activeCategory =
    result.categories.find((c) => c.slug === category)?.name ??
    (category === "laptops" ? "Laptops" : "All Products");

  return (
    <>
      <Header />
      <main className="flex flex-col flex-1 relative w-full overflow-x-hidden">
        <div className="w-full flex flex-col min-h-screen bg-bg-gray">
          <div className="w-full mx-auto px-4 md:px-8 pt-4 pb-10">
            <ProductsExplorer
              initial={result}
              activeCategory={activeCategory}
              q={q}
              sort={sort}
              show={showRaw ?? ""}
              condition={condition}
              brand={brand}
              min={isNaN(min) ? undefined : min}
              max={isNaN(max) ? undefined : max}
            />
          </div>
        </div>
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}