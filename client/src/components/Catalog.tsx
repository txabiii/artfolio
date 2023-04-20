
import ProductCard from '@root/components/ProductCard'
import RangeSlider from './RangeSlider'

import { getAllProducts, getCategories } from '@root/api/productsClient'

import { Product } from '@root/utils/interfaces'

import styles from '@root/styles/catalog.module.scss'

import { useEffect, useState, useMemo, useRef } from 'react'

interface Category {
  category_id: number;
  category_name: string;
}

export default function Catalog() {
  /** Get all products */
  const [products, setProducts] = useState<Product[]>([]);

  const productsMemo = useMemo(()=>{
    return products
  }, [products])

  useEffect(()=>{
    async function fetchData() {
      const allProducts = await getAllProducts();
      setProducts(allProducts);
    }
    fetchData();
  }, [])

  /** Get all categories */
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(()=>{
    async function fetchData() {
      const categories = await getCategories();
      setCategories(categories);
    }
    fetchData();
  }, [])

  /** For the price range */
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000);

  const minPriceThumb = useRef<HTMLDivElement>(null)

  function handleMinPriceDrag(e: React.DragEvent<HTMLDivElement>) {
    if(minPriceThumb.current) {
      console.log(minPriceThumb.current.offsetLeft)
    }
  }

  return(
    <div className={styles.catalog}>
      <div className={styles.filter}>
        <h3>Catalog</h3>
        <h5>Search</h5>
        <input className={styles.search} type='text' placeholder='Search for an item...' />
        <legend><h5>Categories</h5></legend>
        <fieldset className={styles.categories}>
        {categories.map((category) => (
          <div key={category.category_id}>
            <input
              type="checkbox"
              id={category.category_name}
              name={category.category_name}
              value={category.category_id}
            />
            <label htmlFor={category.category_name}>{category.category_name}</label>
          </div>
        ))}
        </fieldset>
        <h5>Price range</h5>
        <input 
          className={styles.priceRange}
          type="number" 
          min="0" 
          max="1000" 
          value={minPrice} 
          onChange={(e) => setMinPrice(parseInt(e.target.value))}
        />
        <div className={styles.separator}></div>
        <input 
          className={styles.priceRange}
          type="number" 
          min="0" 
          max="1000" 
          value={maxPrice} 
          onChange={(e) => setMaxPrice(parseInt(e.target.value))}
        />
      </div>
      {/* Products */}
      <section className={styles.productSection}>
        {productsMemo.map((product) => (
          <div key={product.product_id}>
            <ProductCard product={product} />
          </div>
        ))}
      </section>
    </div>
  )
}