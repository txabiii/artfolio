export interface Product {
  product_id: number;
  image_id: number;
  product_name: string;
  product_description?: string;
  url: string;
  price: number;
  sale_percent?: number;
  feature_description?: string;
  category_id?: number;
}