export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  sku: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductMeta {
  current_page: number;
  total_pages: number;
  total_count: number;
}

export interface PaginatedResponse {
  products: Product[];
  meta: ProductMeta;
}

export interface ProductFormData {
  name: string;
  description?: string;
  price: number;
  stock: number;
  sku: string;
  active: boolean;
}
