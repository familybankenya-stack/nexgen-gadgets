import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const adapter = new PrismaNeon({
  connectionString: process.env.DIRECT_URL,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const seed = JSON.parse(
    readFileSync(path.join(__dirname, "../src/data/seed.json"), "utf-8")
  );

  const catSlugs = new Set<string>(seed.products.map((p: any) => p.categorySlug as string));
  const CATEGORY_NAMES: Record<string, string> = {
    "pc-accessories": "PC Accessories",
    "all-in-ones": "All-in-Ones",
    "hp-laptops": "HP Laptops",
    "dell-laptops": "Dell Laptops",
    "lenovo-laptops": "Lenovo Laptops",
    "apple-macbooks-laptops": "Apple Macbooks Laptops",
    monitors: "Monitors",
    printers: "Printers",
    watches: "Watches",
    "laptop-bags-sleeves": "Laptop Bags & Sleeves",
    "smartphones-tablets": "Smartphones & Tablets",
    laptops: "Laptops",
  };

  for (const slug of catSlugs) {
    if (!slug) continue;
    const name = CATEGORY_NAMES[slug] ?? slug;
    await prisma.category.upsert({
      where: { slug },
      update: { name },
      create: { slug, name },
    });
  }

  let created = 0;
  for (const p of seed.products) {
    const category = await prisma.category.findUnique({ where: { slug: p.categorySlug } });
    if (!category) continue;
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {
        name: p.name,
        brand: p.brand,
        categoryId: category.id,
        price: p.price,
        comparePrice: p.comparePrice,
        discountPct: p.discountPct,
        images: p.images,
        rating: p.rating,
        reviews: p.reviews,
        condition: p.condition ?? "New",
        inStock: p.inStock,
        description: p.description,
        specs: p.specs,
      },
      create: {
        slug: p.slug,
        name: p.name,
        brand: p.brand,
        categoryId: category.id,
        price: p.price,
        comparePrice: p.comparePrice,
        discountPct: p.discountPct,
        images: p.images,
        rating: p.rating,
        reviews: p.reviews,
        condition: p.condition ?? "New",
        inStock: p.inStock,
        description: p.description,
        specs: p.specs,
      },
    });
    created++;
  }

  const count = await prisma.product.count();
  console.log(`Seeded ${created} products. Total in DB: ${count}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
