const BASE_URL = 'http://localhost:5000';

/** Interface */

import { Product } from '@root/utils/interfaces'

interface ProductQueryParams {
  categoryIds?: number[],
  search?: string,
  minPrice?: number | null,
  maxPrice?: number | null,
  imageId?: number | null,
}

/** Parse price string to number */

const parsePrice = (product: any): Product => ({
  ...product,
  price: parseFloat(product.price)
});

/** Get data functions */

export async function getAllProducts(queryParams: ProductQueryParams = {}): Promise<Product[]> {
  try {
    let url = `${BASE_URL}/products`;

    if (queryParams.categoryIds && queryParams.categoryIds.length > 0) {
      url += `?category_id=${queryParams.categoryIds.join(',')}`;
    }
    if (queryParams.search) {
      url += `${queryParams.categoryIds?.length !== 0 ? '&' : '?'}search=${encodeURIComponent(queryParams.search)}`;
    }
    if (queryParams.minPrice !== undefined && queryParams.maxPrice !== undefined && queryParams.minPrice !== null && queryParams.maxPrice !== null) {
      url += `${queryParams.categoryIds?.length !== 0 || queryParams.search ? '&' : '?'}min_price=${queryParams.minPrice}&max_price=${queryParams.maxPrice}`;
    }
    if(queryParams.imageId){
      url += `${url !== `${BASE_URL}/products` ? '&' : '?'}image_id=${queryParams.imageId}`
    }

    const response = await fetch(url);
    const data = await response.json();
    return data.map(parsePrice);
  } catch(error) { 
    console.log(error)
    throw new Error("Failed to fetch products");
  }
}

export async function getProductAndFeatures(id: number) {
  try {
    const response = await fetch(`${BASE_URL}/products/product/${id}`);
    const data = await response.json();
    return data.map(parsePrice);
  } catch(error) {
    console.log(error)
    throw new Error("Failed to fetch products");
  }
}

export async function getSaleProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${BASE_URL}/products/sale`);
    const data = await response.json();
    return data.map(parsePrice);
  } catch(error) {
    console.log(error)
    throw new Error("Failed to fetch products");
  }
}

export async function getTopProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${BASE_URL}/products/top`);
    const data = await response.json();
    return data.map(parsePrice);
  } catch(error) {
    console.log(error)
    throw new Error("Failed to fetch products");
  }
}

export async function getNewArrivals(): Promise<Product[]> {
  try {
    const response = await fetch(`${BASE_URL}/products/new`);
    const data = await response.json();
    return data.map(parsePrice);
  } catch(error) {
    console.log(error)
    throw new Error("Failed to fetch products");
  }
}

export async function getRelatedProducts(productId: number, categoryId: number): Promise<Product[]> {
  try {
    const response = await fetch(`${BASE_URL}/products/related?product_id=${productId}&category_id=${categoryId}`);
    const data = await response.json();
    return data.map(parsePrice);
  } catch(error) {
    console.log(error)
    throw new Error("Failed to fetch products");
  }
}

/** Get categories */

export async function getCategories() {
  try {
    const response = await fetch(`${BASE_URL}/products/categories`);
    const data = await response.json();
    return data
  } catch(error) {
    console.log(error)
    throw new Error("Failed to fetch products");
  }
}