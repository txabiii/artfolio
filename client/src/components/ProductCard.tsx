import Image from "next/image"
import IconButton from "./IconButton"

import styles from '@root/styles/productCard.module.scss'
import cx from 'classnames'

import { Product } from '@root/utils/interfaces'
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function ProductCard({ product }: { product: Product}) {
  const [salePrice, setSalePrice] = useState<number | null>(null)

  useEffect(()=>{
    if(product.sale_percent === null) return;
    if(product.sale_percent !== undefined) {
      let salePrice = (product.price * ((100 - product.sale_percent) / 100));
      salePrice = Math.floor(salePrice * 100) / 100
      setSalePrice(parseFloat(salePrice.toFixed(2)));
    }
  }, [])

  const router = useRouter();

  return(
    <div className={styles.card}>
      { product.sale_percent && 
        <div className={styles.salePercent}>
          <p>-{ product.sale_percent }%</p>
        </div>
      }
      <div className={styles.imgWrapper} onClick={() => router.push(`/shop/product?product_id=${product.product_id}`)}>
        <Image src={product.url} alt='' fill={true} />
      </div>
      <div className={styles.productDetailsWrapper}>
        <div className={styles.productDetails}>
          <Link href={`/shop/product?product_id=${product.product_id}`}>
            <h5 tabIndex={0}>{ product.product_name }</h5>
          </Link>
          <h5 className={cx({[styles.strikeThrough] : salePrice})}>${ product.price }</h5>
          { salePrice !== null && <h5>${ salePrice?.toFixed(2) }</h5>}
        </div>
      </div>
      <div className={styles.iconWrapper}>
        <IconButton icon='bag' variant='secondary' click={()=>{console.log('to be created')}}/>
      </div>
    </div>
  )
}