const BASE_URL = 'http://localhost:5000';

/** Product object interface */

import { Product } from '@root/utils/interfaces'

/** Parse price string to number */

const parsePrice = (product: any): Product => ({
  ...product,
  price: parseFloat(product.price)
});

/** Get data functions */

export async function getAllProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${BASE_URL}/products`);
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