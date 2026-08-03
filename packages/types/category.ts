export type Category = {
  id: number;
  name: string;
  img_url: string;
  description: string;
  created_at: string;
};

export type CategoriesResponse = {
  message: string;
  data: Category[];
  result: boolean;
};