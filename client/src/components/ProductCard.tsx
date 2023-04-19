import Image from "next/image"
import IconButton from "./IconButton"

import styles from '@root/styles/productCard.module.scss'
import cx from 'classnames'

import { Product } from '@root/utils/interfaces'
import { useEffect, useState } from "react"

export default function ProductCard({ product }: { product: Product}) {
  const [salePrice, setSalePrice] = useState<number | null>(null)

  useEffect(()=>{
    if(product.sale_percent === null) return;
    if(product.sale_percent !== undefined) {
      //price = 4.99 sale_percent = 25 sale_price = 4.99 - (4.99 * (25/100))
      const salePrice = (product.price - (product.price * (product.sale_percent / 100))).toFixed(2);
      setSalePrice(parseFloat(salePrice));
    }
  }, [])

  return(
    <div className={styles.card}>
      { product.sale_percent && 
        <div className={styles.salePercent}>
          <p>-{ product.sale_percent }%</p>
        </div>
      }
      <div className={styles.iconWrapper}>
        <IconButton icon='bag' variant='secondary'/>
      </div>
      <div className={styles.imgWrapper}>
        <Image src={product.url} alt='' fill={true} />
      </div>
      <div className={styles.productDetailsWrapper}>
        <div className={styles.productDetails}>
          <h5>{ product.product_name }</h5>
          <h5 className={cx({[styles.strikeThrough] : salePrice})}>${ product.price }</h5>
          { salePrice !== 0 && <h5>{ salePrice?.toFixed(2) }</h5>}
        </div>
      </div>
    </div>
  )
}