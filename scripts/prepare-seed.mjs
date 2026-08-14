import { readFileSync, writeFileSync } from "node:fs";

const raw = JSON.parse(readFileSync("src/data/products.json", "utf-8"));

const BRANDS = [
  "HP", "Dell", "Lenovo", "Apple", "Asus", "ASUS", "Samsung", "Xiaomi", "Redmi", "Tecno",
  "Casio", "Curren", "Brother", "MSI", "QSM", "Rapoo", "Logitech", "Biowang", "Ponasoo",
  "Cartier", "Patek", "Wiersoon", "Nuoxiya", "Kuaibao", "Liebig", "Omaya", "Poedagar",
  "Antitheft", "Waterproof", "Neoprene", "Leather", "Jeep", "Business King", "Rechargeable",
];

const CONDITION_KEYWORDS = ["Ex-UK", "ex uk", "Used", "Refurbished", "certified"];

function parseKsh(s) {
  if (!s) return 0;
  const n = parseInt(s.replace(/[^0-9]/g, ""), 10);
  return Number.isFinite(n) ? n : 0;
}

function detectBrand(name) {
  const upper = name.toUpperCase();
  for (const b of [...BRANDS].sort((a, b2) => b2.length - a.length)) {
    if (upper.includes(b.toUpperCase())) return b === "ASUS" ? "Asus" : b;
  }
  return "Generic";
}

function detectCondition(name) {
  const lower = name.toLowerCase();
  if (CONDITION_KEYWORDS.some((k) => lower.includes(k.toLowerCase()))) return "Pre-Owned / Ex-UK";
  return "New";
}

function slugify(name, used) {
  let slug = name
    .toLowerCase()
    .replace(/[’'–—‑"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  let base = slug;
  let i = 2;
  while (used.has(slug)) {
    slug = `${base}-${i++}`;
  }
  used.add(slug);
  return slug;
}

function specsFor(product, category, brand) {
  const name = product.name;
  const specs = [];
  specs.push(["Brand", brand]);
  specs.push(["Category", category]);
  specs.push(["Condition", detectCondition(name)]);
  const ram = name.match(/(\d+)\s*(?:GB|G)\s*RAM/i);
  if (ram) {
    specs.push(["Memory (RAM)", `${ram[1]} GB`]);
  }
  const ssd = name.match(/(\d+)\s*(?:GB|G)\s*(?:SSD|HDD)/i);
  if (ssd) {
    specs.push(["Storage", `${ssd[1]} ${ssd[0].match(/SSD/i) ? "SSD" : "HDD"}`]);
  }
  const cpu = name.match(/(Core\s*[iI]\d|Intel\s*[iI]\d|Pentium|Ryzen|Helio|Snapdragon|Media\s*Tek|MediaTek)/i);
  if (cpu) {
    specs.push(["Processor Family", cpu[1].replace(/\s+/g, " ").trim()]);
  }
  const gen = name.match(/(\d+)(?:st|nd|rd|th)\s*Gen/i);
  if (gen) {
    specs.push(["Processor Generation", `${gen[1]}th Gen`]);
  }
  const screen = name.match(/(\d+(?:\.\d+)?)(?:\s*["”]|\s*Inch|\s*Inches)/i);
  if (screen) {
    specs.push(["Screen Size", `${screen[1]}"`]);
  }
  const touch = name.match(/touch\s*screen|touchscreen|touch\b/i);
  if (touch) {
    specs.push(["Touchscreen", "Yes"]);
  }
  specs.push(["Warranty", "1-Year Warranty"]);
  specs.push(["Verified", "100% Genuine Product"]);
  specs.push(["Delivery", "Free within Nairobi region"]);
  return specs;
}

const categories = raw.categories.map((c) => ({
  name: c.title,
  slug: c.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
}));
categories.push({ name: "Laptops", slug: "laptops" });

const used = new Set();
const products = [];
const seen = new Map();

const CATEGORY_SLUG = {
  "PC Accessories": "pc-accessories",
  "All-in-Ones": "all-in-ones",
  "HP Laptops": "hp-laptops",
  "Dell Laptops": "dell-laptops",
  "Lenovo Laptops": "lenovo-laptops",
  "Apple Macbooks Laptops": "apple-macbooks-laptops",
  Monitors: "monitors",
  Printers: "printers",
  Watches: "watches",
  "Laptop Bags & Sleeves": "laptop-bags-sleeves",
  "Smartphones & Tablets": "smartphones-tablets",
};

for (const cat of raw.categories) {
  const catSlug = CATEGORY_SLUG[cat.title] || cat.slug;
  for (const p of cat.cards) {
    if (seen.has(p.name)) continue;
    seen.set(p.name, true);
    const brand = detectBrand(p.name);
    const price = parseKsh(p.price);
    const comparePrice = p.comparePrice ? parseKsh(p.comparePrice) : null;
    const discount = p.discount ? parseInt(p.discount.replace(/[^0-9]/g, ""), 10) : null;
    products.push({
      name: p.name,
      slug: slugify(p.name, used),
      brand,
      categorySlug: catSlug,
      price,
      comparePrice: comparePrice && comparePrice > price ? comparePrice : null,
      discountPct: discount && comparePrice ? discount : null,
      images: [p.img, p.imgAlt].filter(Boolean),
      rating: 4.5,
      reviews: p.reviews ?? 0,
      inStock: true,
      specs: specsFor(p, cat.title, brand),
      description: `${p.name}. Shop the genuine ${brand} ${cat.title} range at NexGen Gadgets Kenya at the best price in Nairobi. Every unit is carefully tested and covered by a 1-year warranty, with insured delivery across Nairobi, Mombasa, Kisumu, Nakuru, Eldoret, Thika, Nyeri and Machakos. Pay easily with M-PESA or Visa. ${
        detectCondition(p.name) === "Pre-Owned / Ex-UK"
          ? "This unit is a quality pre-owned / Ex-UK machine, fully inspected and guaranteed."
          : "This is a genuine new product with full NexGen Gadgets verification."
      }`,
    });
  }
}

// catalog-only products get a sensible category by brand
const CAT_BY_BRAND = {
  HP: "hp-laptops", Dell: "dell-laptops", Lenovo: "lenovo-laptops", Apple: "apple-macbooks-laptops",
  Samsung: "smartphones-tablets", Xiaomi: "smartphones-tablets", Redmi: "smartphones-tablets",
  Tecno: "smartphones-tablets", Casio: "watches", Curren: "watches",
  Brother: "printers", MSI: "monitors", QSM: "monitors", Rapoo: "pc-accessories",
  Logitech: "pc-accessories", Biowang: "laptop-bags-sleeves", Ponasoo: "laptop-bags-sleeves",
  Antitheft: "laptop-bags-sleeves", Waterproof: "laptop-bags-sleeves", Neoprene: "laptop-bags-sleeves",
  Leather: "laptop-bags-sleeves", Jeep: "laptop-bags-sleeves",
};

for (const p of raw.catalog) {
  if (seen.has(p.name)) continue;
  seen.set(p.name, true);
  const brand = detectBrand(p.name);
  const categoryForSlug = CAT_BY_BRAND[brand] ?? "laptops";
  const catName = catTitleBySlug(categoryForSlug);
  const price = parseKsh(p.price);
  const comparePrice = p.comparePrice ? parseKsh(p.comparePrice) : null;
  const discount = p.discount ? parseInt(p.discount.replace(/[^0-9]/g, ""), 10) : null;
  products.push({
    name: p.name,
    slug: slugify(p.name, used),
    brand,
    categorySlug: categoryForSlug,
    price,
    comparePrice: comparePrice && comparePrice > price ? comparePrice : null,
    discountPct: discount && comparePrice ? discount : null,
    images: [p.img, p.imgAlt].filter(Boolean),
    rating: 4.5,
    reviews: p.reviews ?? 0,
    inStock: true,
    specs: specsFor(p, catName, brand),
    description: `${p.name}. Shop the genuine ${brand} range at NexGen Gadgets Kenya at the best price in Nairobi. Every unit is carefully tested and covered by a 1-year warranty, with insured delivery across Kenya and East Africa. Pay easily with M-PESA or Visa.`,
  });
}

function catTitleBySlug(slug) {
  return raw.categories.find((c) => CATEGORY_SLUG[c.title] === slug)?.title ?? "Laptops";
}

const out = { products };
writeFileSync("src/data/seed.json", JSON.stringify(out, null, 1));
console.log("products:", products.length);
console.log("sample:", JSON.stringify(products[0], null, 1).slice(0, 700));