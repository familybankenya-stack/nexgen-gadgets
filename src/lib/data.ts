import type { Category, Product } from "@/lib/types";
import { formatKES } from "@/lib/formats";
import { prisma } from "@/lib/db";

type DbProduct = Awaited<ReturnType<typeof prisma.product.findFirst>>;

export function toCard(p: NonNullable<DbProduct>): Product {
  return {
    slug: p.slug,
    name: p.name,
    brand: p.brand,
    condition: p.condition,
    rating: p.rating,
    reviews: p.reviews,
    price: formatKES(p.price),
    comparePrice: p.comparePrice ? formatKES(p.comparePrice) : undefined,
    discount: p.discountPct ? `${p.discountPct}% OFF` : undefined,
    img: p.images[0] ?? "/favicon.png",
    imgAlt: p.images[1],
  };
}

export type HomeData = {
  flashSale: Product[];
  categories: Category[];
  catalog: Product[];
  featured: Product[];
};

export async function getHomeData(): Promise<HomeData> {
  const [flash, categories, catalog, featured] = await Promise.all([
    prisma.product.findMany({
      where: { discountPct: { gt: 0 } },
      orderBy: [{ discountPct: "desc" }, { price: "asc" }],
      take: 8,
    }),
    prisma.category.findMany({
      include: { products: { orderBy: { createdAt: "asc" }, take: 4 } },
    }),
    prisma.product.findMany({ orderBy: { createdAt: "asc" }, take: 24 }),
    prisma.product.findMany({ orderBy: { rating: "desc" }, take: 12 }),
  ]);

  return {
    flashSale: flash.map(toCard),
    categories: categories.map((c) => ({
      title: c.name,
      slug: c.slug,
      cards: c.products.map(toCard),
    })),
    catalog: catalog.map(toCard),
    featured: featured.map(toCard),
  };
}

const LAPTOP_FAMILY = [
  "hp-laptops",
  "dell-laptops",
  "lenovo-laptops",
  "apple-macbooks-laptops",
];

export type FilterOptions = {
  category?: string;
  brand?: string;
  q?: string;
  sort?: string;
  show?: number;
  min?: number;
  max?: number;
  condition?: string;
};

export type ProductsResult = {
  products: Product[];
  total: number;
  categories: { name: string; slug: string; count: number }[];
  brands: { name: string; count: number }[];
  conditions: string[];
  minPrice: number;
  maxPrice: number;
};

export async function getProducts(opts: FilterOptions = {}): Promise<ProductsResult> {
  const where: Record<string, unknown> = {};

  if (opts.category === "laptops") {
    where.category = { slug: { in: LAPTOP_FAMILY } };
  } else if (opts.category) {
    where.category = { slug: opts.category };
  }
  if (opts.brand) where.brand = opts.brand;
  if (opts.condition) where.condition = opts.condition;
  if (opts.q) where.name = { contains: opts.q, mode: "insensitive" };

  if (opts.min !== undefined && opts.max !== undefined) {
    where.price = { gte: opts.min, lte: opts.max };
  } else if (opts.min !== undefined) {
    where.price = { gte: opts.min };
  } else if (opts.max !== undefined) {
    where.price = { lte: opts.max };
  }

  const orderBy =
    opts.sort === "price-asc"
      ? [{ price: "asc" as const }]
      : opts.sort === "price-desc"
        ? [{ price: "desc" as const }]
        : opts.sort === "rating"
          ? [{ rating: "desc" as const }, { createdAt: "asc" as const }]
          : [{ createdAt: "asc" as const }];

  const [rows, total, categories, brands, conditions, agg] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy,
      take: opts.show ?? 24,
    }),
    prisma.product.count({ where }),
    prisma.category.findMany({
      include: { _count: { select: { products: true } } },
    }),
    prisma.product.groupBy({ by: ["brand"], _count: { _all: true }, orderBy: { _count: { brand: "desc" } } }),
    prisma.product.groupBy({ by: ["condition"], _count: { _all: true } }),
    prisma.product.aggregate({ _min: { price: true }, _max: { price: true } }),
  ]);

  return {
    products: rows.map(toCard),
    total,
    categories: categories.map((c) => ({ name: c.name, slug: c.slug, count: c._count.products })),
    brands: brands.map((b) => ({ name: b.brand, count: b._count._all })),
    conditions: conditions.map((c) => c.condition),
    minPrice: agg._min.price ?? 0,
    maxPrice: agg._max.price ?? 300000,
  };
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });
}

export async function getRelated(product: NonNullable<DbProduct>, take = 4): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    where: { categoryId: product.categoryId, slug: { not: product.slug } },
    orderBy: [{ rating: "desc" }, { price: "asc" }],
    take,
  });
  return rows.map(toCard);
}