export type IProduct = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  salePrice: number | null;
  stock: number;
  images: string[];
  categoryId: string;
  brandId?: string | null;
  storeId?: string | null;
  isFeatured: boolean;
  category: { name: string };
  brand: { name: string } | null;
}

export type IProductResponse = {
  success: boolean;
  message: string;
  data: IProduct[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};
