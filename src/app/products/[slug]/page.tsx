import { notFound } from "next/navigation";
import { ShieldCheck, Star, Truck, RotateCcw, CreditCard, Wrench, PackageCheck } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import ProductCard from "@/components/ProductCard";
import BuyBox from "@/components/BuyBox";
import { getProductBySlug, getRelated } from "@/lib/data";
import { formatKES } from "@/lib/formats";

export const dynamic = "force-dynamic";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = await getRelated(product);
  const specs = (product.specs as unknown as [string, string][] | null) ?? [];
  const categorySlug = product.category.slug;

  return (
    <>
      <Header />
      <main className="flex flex-col flex-1 relative w-full overflow-x-hidden">
        <div className="w-full flex flex-col min-h-screen bg-bg-gray">
          <div className="w-full mx-auto px-4 md:px-8 pt-4 pb-10 flex flex-col gap-6">
            <nav className="text-xs text-slate-500">
              <a href="/" className="hover:text-amber-600">Home</a>
              <span className="mx-1.5">/</span>
              <a href={`/products?category=${categorySlug}`} className="hover:text-amber-600">
                {product.category.name}
              </a>
              <span className="mx-1.5">/</span>
              <span className="text-slate-700 font-semibold line-clamp-1">{product.name}</span>
            </nav>

            <div className="w-full grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-6 items-start">
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-3 sm:p-5">
                <div className="w-full aspect-square bg-white relative overflow-hidden rounded-lg group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/${product.images[0]}`}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-105"
                  />
                  {product.images[1] && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={`/${product.images[1]}`}
                      alt={`${product.name} alternate`}
                      className="w-full h-full object-cover object-center absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
                    />
                  )}
                  {product.discountPct && (
                    <span className="absolute top-2 left-2 z-10 bg-red-700 text-white text-sm font-bold px-2.5 py-1 rounded shadow-sm">
                      {product.discountPct}% OFF
                    </span>
                  )}
                </div>
                {product.images.slice(0, 5).map((img, i) => (
                  <div key={img + i} className="inline-block w-16 h-16 border border-gray-200 rounded-lg overflow-hidden mt-3 mr-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/${img}`} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>

              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-6 flex flex-col gap-4">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-700" />
                  <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wide">VERIFIED</span>
                </div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold font-sans text-primary leading-tight">
                  {product.name}
                </h1>
                <div className="flex items-center gap-2">
                  <Stars rating={product.rating} />
                  <span className="text-sm text-slate-500">
                    {product.rating.toFixed(1)} ({product.reviews} reviews)
                  </span>
                </div>
                <div className="border-y border-gray-100 py-3 flex items-baseline gap-3 flex-wrap">
                  <span className="text-2xl md:text-3xl font-extrabold text-dark-primary">
                    {formatKES(product.price)}
                  </span>
                  {product.comparePrice && (
                    <span className="text-base text-gray-400 line-through">
                      {formatKES(product.comparePrice)}
                    </span>
                  )}
                  {product.discountPct && (
                    <span className="text-sm font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">
                      Save {product.discountPct}%
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-24 text-slate-500 font-medium shrink-0">Brand:</span>
                    <span className="font-semibold text-slate-800">{product.brand}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-24 text-slate-500 font-medium shrink-0">Condition:</span>
                    <span className="font-semibold text-slate-800">{product.condition}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-24 text-slate-500 font-medium shrink-0">Availability:</span>
                    <span className={`font-semibold ${product.inStock ? "text-emerald-700" : "text-red-600"}`}>
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                </div>
                <BuyBox
                  name={product.name}
                  price={formatKES(product.price)}
                  slug={product.slug}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { icon: Wrench, title: "Warranty", desc: "14-day warranty on all items" },
                { icon: Truck, title: "Delivery", desc: "Free within Nairobi, countrywide rates apply" },
                { icon: CreditCard, title: "M-PESA", desc: "Pay via M-PESA, cards & bank transfer" },
                { icon: RotateCcw, title: "Returns", desc: "7-day money-back guarantee" },
              ].map((b) => (
                <div key={b.title} className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex items-start gap-3">
                  <b.icon className="h-6 w-6 text-amber-600 shrink-0" />
                  <div>
                    <p className="font-bold text-sm text-slate-800">{b.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full grid lg:grid-cols-2 gap-6 items-start">
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-6">
                <h2 className="text-lg font-bold text-slate-800 mb-4 uppercase tracking-wide">Description</h2>
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{product.description}</p>
              </div>
              {specs.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-6">
                  <h2 className="text-lg font-bold text-slate-800 mb-4 uppercase tracking-wide">Specifications</h2>
                  <table className="w-full text-sm">
                    <tbody>
                      {specs.map(([k, v], i) => (
                        <tr key={k + i} className={i % 2 === 0 ? "bg-gray-50" : ""}>
                          <td className="py-2 px-3 font-semibold text-slate-700 w-2/5 align-top">{k}</td>
                          <td className="py-2 px-3 text-slate-600">{v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {related.length > 0 && (
              <div className="w-full flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl md:text-2xl font-semibold text-primary font-sans tracking-tight">
                    Related Products
                  </h2>
                  <a
                    href={`/products?category=${categorySlug}`}
                    className="bg-secondary text-[#1a1a2e] hover:bg-[#1a1a2e] hover:text-white font-semibold text-sm px-4 py-2 rounded transition-all duration-150"
                  >
                    VIEW ALL
                  </a>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                  {related.map((p, i) => (
                    <ProductCard key={`${p.slug}-${i}`} product={p} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}