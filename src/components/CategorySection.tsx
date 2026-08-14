import type { Category } from "@/lib/types";
import ProductCard from "@/components/ProductCard";

export default function CategorySection({ category }: { category: Category }) {
  const path = category.slug ?? "products";
  return (
    <div className="w-full max-w-full min-w-0 bg-white border border-gray-200 rounded p-3.5 sm:p-6 shadow-sm select-none overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-3 sm:pb-4 mb-4 sm:mb-6 gap-2 sm:gap-3 text-left">
        <div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#1a1a2e] font-sans leading-tight tracking-tight uppercase">
            {category.title}
          </h3>
        </div>
        <a
          href={`/products?category=${path}`}
          className="bg-secondary text-[#1a1a2e] hover:bg-[#1a1a2e] hover:text-white font-semibold text-xs sm:text-sm md:text-[16px] px-4 py-2 sm:px-6 sm:py-2.5 rounded transition-all duration-150 cursor-pointer self-start sm:self-center shadow-sm text-center"
        >
          SHOP NOW
        </a>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 w-full min-w-0">
        {category.cards.map((p, i) => (
          <div key={`${p.name}-${i}`} className="w-full min-w-0">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
}