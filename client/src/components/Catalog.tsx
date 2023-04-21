import ProductCard from '@root/components/ProductCard'
import Expand from '@root/assets/icons/expand.svg'
import Button from './Button'
import styles from '@root/styles/catalog.module.scss'
import Image from 'next/image'

import { getAllProducts, getCategories } from '@root/api/productsClient'

import { Product } from '@root/utils/interfaces'

import { useSearchParams } from 'next/navigation'

import { useEffect, useState, useMemo, useRef } from 'react'

interface Category {
  category_id: number;
  category_name: string;
  selected?: boolean;
}

export default function Catalog() {
  /** Get url parameters */
  const searchParams = useSearchParams();

  useEffect(()=>{
    const categoryId = searchParams.get('category_id');
    if(categoryId) {
      setCategoryIds([parseInt(categoryId)]);
    }
  }, [searchParams])

  useEffect(()=>{
    const categoryId = searchParams.get('category_id');
    if(!categoryId) setCategories([]);
  }, [])
  
  /** Get all products */
  const [products, setProducts] = useState<Product[]>([]);
  const [dataHasNotLoaded, setDataHasNotLoaded] = useState(true);

  const productsMemo = useMemo(()=>{
    return products
  }, [products])

  useEffect(()=>{
    const categoryId = searchParams.get('category_id');
    let otherName: number[] = [];
    if(categoryId) {
      otherName.push(parseInt(categoryId))
    }

    async function fetchData() {
      const allProducts = await getAllProducts({categoryIds: otherName});
      setProducts(allProducts);
      setDataHasNotLoaded(false);
    }
    fetchData();
  }, [searchParams])

  /** For the search bar */
  const [search, setSearch] = useState('');

  /** Get all categories */
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryIds, setCategoryIds] = useState<number[]>([]);

  useEffect(()=>{
    async function fetchData() {
      const categories = await getCategories();
      setCategories(categories);
    }
    fetchData();
  }, [])

  /** For the price range */
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  /** Handle filter expansion */
  const filterRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const expandRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);

  /** Handle filter */
  const handleFilterClick = async () => {
    setDataHasNotLoaded(true);
    setProducts([]);
    const allProducts = await getAllProducts({categoryIds, search, minPrice, maxPrice});
    setProducts(allProducts);
    setDataHasNotLoaded(false);
  }

  /** Handle filter expand */
  function handleExpandClick() {
    if(expandRef.current && filterRef.current && optionsRef.current) {
      if(!expanded) {
        expandRef.current.style.transform = 'initial'
        filterRef.current.style.maxHeight = '6rem'
        optionsRef.current.style.display = 'none'
        setExpanded(true);
      }
      else {
        expandRef.current.style.transform = 'rotateZ(180deg)'
        filterRef.current.style.maxHeight = '100vh'
        optionsRef.current.style.display = 'block'
        setExpanded(false);
      };
    }
  }

  return(
    <div className={styles.catalog}>
      {/* Filter */}
      <div className={styles.filter} ref={filterRef}>
        <div className={styles.expandMore} onClick={handleExpandClick} ref={expandRef}>
          <Image src={Expand} alt='filter expand more'/>
        </div>
        <h3 onClick={handleExpandClick}>Catalog</h3>
        <div ref={optionsRef}>
          {/* Search */}
          <h5>Search</h5>
          <input 
            value={search} 
            className={styles.search} 
            type='text' 
            placeholder='Search for an item...' 
            onChange={(e) => setSearch(e.target.value)}  
          />
          <legend><h5>Categories</h5></legend>
          {/* Categories */}
          <fieldset className={styles.categories}>
          {categories.map((category) => (
            <div key={category.category_id}>
              <input
                type="checkbox"
                id={category.category_name}
                name={category.category_name}
                value={category.category_id}
                checked={categoryIds.includes(category.category_id)}
                onChange={(event) => {
                  if(event.target.checked) {
                    setCategoryIds((prev) => [...prev, category.category_id])
                  } else {
                    setCategoryIds((prev) => 
                      prev.filter((id) => id !== category.category_id)
                    )
                  }
                }}
              />
              <label htmlFor={category.category_name}>{category.category_name}</label>
            </div>
          ))}
          </fieldset>
          {/* Price range */}
          <h5>Price range</h5>
          <div className={styles.priceRangeWrapper}>
            <input 
              className={styles.priceRange}
              type="number" 
              min={0}
              max={100} 
              placeholder='0'
              value={minPrice === null ? '' : minPrice} 
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (!isNaN(value)) {
                  setMinPrice(value);
                } else setMinPrice(null)
              }}
            />
            <input 
              className={styles.priceRange}
              type="number" 
              min={0}
              max={100} 
              placeholder='100'
              value={maxPrice === null ? '' : maxPrice} 
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (!isNaN(value)) {
                  setMaxPrice(value);
                } else setMaxPrice(null)
              }}
            />
          </div>
          <Button content='Filter' variant='primary' click={handleFilterClick}/>
        </div>
      </div>
      {/* Products */}
      <section className={styles.productSection}>
        {/* skeletons */}
          { dataHasNotLoaded && 
          <>
            <div className={styles.productCardSkeleton}><div></div><div></div></div>
            <div className={styles.productCardSkeleton}><div></div><div></div></div>
            <div className={styles.productCardSkeleton}><div></div><div></div></div>
          </>
        }
        {productsMemo.map((product) => (
          <div key={product.product_id}>
            <ProductCard product={product} />
          </div>
        ))}
      </section>
    </div>
  )
}