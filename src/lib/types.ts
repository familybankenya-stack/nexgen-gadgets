export type Product = {
  slug?: string;
  discount?: string;
  img: string;
  imgAlt?: string;
  name: string;
  brand?: string;
  condition?: string;
  reviews: number;
  rating?: number;
  price: string;
  comparePrice?: string;
};

export type Category = {
  title: string;
  slug?: string;
  cards: Product[];
};

export type CatalogData = {
  flashSale: Product[];
  categories: Category[];
  catalog: Product[];
};