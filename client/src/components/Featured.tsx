import styles from '@root/styles/featured.module.scss'
import cx from 'classnames'

import Button from './Button'
import ProductCard from './ProductCard'

import { useState, useEffect, useMemo } from 'react'

import { getNewArrivals, getSaleProducts, getTopProducts } from '@root/api/productsClient'

import { Product } from '@root/utils/interfaces'

export default function Featured() {
  const [mode, setMode] = useState('on-sale')
  const [dataHasNotLoaded, setDataHasNotLoaded] = useState(true);

  /** Get on-sale producs */
  const [onSale, setOnSale] = useState<Product[]>([])

  /** Get top pick producs */
  const [topPicks, setTopPicks] = useState<Product[]>([])

  /** Get new arrivals producs */
  const [newArrivals, setNewArrivals] = useState<Product[]>([])

  useEffect(()=>{
    async function fetchData() {
      const onSale = await getSaleProducts();
      setOnSale(onSale);      
      setDataHasNotLoaded(false);

      const topPicks = await getTopProducts();
      setTopPicks(topPicks);

      const newArrivals = await getNewArrivals();
      setNewArrivals(newArrivals);
    }
    fetchData();
  }, [])

  return(
    <section className={styles.featuredSection}>
        <h3>Featured Products</h3>
        <div className={styles.featuredButtonGroup}>  
          <Button content='On Sale' click={() => setMode('on-sale')} variant={mode === 'on-sale' ? 'primary' : 'tertiary'}/>
          <Button content='Top Picks' click={() => setMode('top-picks')} variant={mode === 'top-picks' ? 'primary' : 'tertiary'}/>
          <Button content='New Arrivals' click={() => setMode('new-arrivals')} variant={mode === 'new-arrivals' ? 'primary' : 'tertiary'}/>
        </div>
        {mode === 'on-sale' && <div className={cx(styles.featuredProducts)}>
          {/* skeletons */}
          { dataHasNotLoaded && 
            <>
              <div className={styles.productCardSkeleton}><div></div><div></div></div>
              <div className={styles.productCardSkeleton}><div></div><div></div></div>
              <div className={styles.productCardSkeleton}><div></div><div></div></div>
              <div className={styles.productCardSkeleton}><div></div><div></div></div>
            </>
          }
          {onSale.map((product)=>(
            <div key={product.product_id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>}
        {mode === 'top-picks' && <div className={styles.featuredProducts}>
          {topPicks.map((product)=>(
            <div key={product.product_id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>}
        {mode === 'new-arrivals' && <div className={styles.featuredProducts}>
          {newArrivals.map((product)=>(
            <div key={product.product_id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>}
      </section>
  )
}