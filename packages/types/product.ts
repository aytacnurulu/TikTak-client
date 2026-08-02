export type ProductCategory = {
  id: number;
  name: string;
};

export type Product = {
  id: number;
  title: string;
  img_url: string;
  description: string;
  price: string;
  type: string;
  created_at: string;
  category: ProductCategory;
};

export type ProductsResponse = {
  message: string;
  data: Product[];
  result: boolean;
};