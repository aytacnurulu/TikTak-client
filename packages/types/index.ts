export {};
export interface ApiResponse<T> {
  message: string;
  data: T;
  result: boolean;
}

export interface Pagination {
  next: number | null;
  prev: number | null;
  current: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: Pagination;
}

export interface Category {
  id: number;
  name: string;
  img_url: string;
  description: string;
  created_at: string;
}

export interface Product {
  id: number;
  title: string;
  img_url: string;
  description: string;
  price: string;
  type: string;
  created_at: string;
  category: Pick<Category, "id" | "name">;
}

export interface Campaign {
  id: number;
  title: string;
  description: string | null;
  img_url: string | null;
  created_at: string;
}

export interface UserProfile {
  id: number;
  full_name: string;
  phone: string;
  address: string | null;
  img_url: string | null;
  role: string;
  created_at: string;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
}

export interface LoginResponseData {
  tokens: AuthTokens;
  profile: UserProfile;
}

export interface LoginPayload {
  phone: string;
  password: string;
}

export interface SignupPayload {
  phone: string;
  password: string;
  full_name: string;
}

export type PaymentMethod = "CASH" | "CARD";

export interface BasketItem {
  id: number;
  quantity: number;
  total_price: string;
  product: Product;
}

export interface Basket {
  items: BasketItem[];
  total: string;
  count: number;
}

export interface CheckoutPayload {
  paymentMethod: PaymentMethod;
  note?: string;
  address: string;
  phone: string;
}

export interface FavoriteToggleResult {
  favorited: boolean;
}

export interface ProfileUpdatePayload {
  full_name: string;
  img_url?: string;
  address: string;
  password?: string;
  password_repeat?: string;
}

export interface Order {
  id: number;
  order_number?: string | number;
  created_at: string;
  delivery_address?: string | null;
  address?: string | null;
  items?: BasketItem[];
  item_count?: number;
  total?: string | number;
  subtotal?: string | number;
  delivery_fee?: string | number;
  status: string;
  payment_method?: PaymentMethod;
}
