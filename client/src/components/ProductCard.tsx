import Image from "next/image"
import IconButton from "./IconButton"
import Alert from './Alert';

import styles from '@root/styles/productCard.module.scss'
import cx from 'classnames'

import { Product } from '@root/utils/interfaces'
import { useEffect, useState, useContext } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

import { CartContext } from '@root/context/CartContextProvider'

export default function ProductCard({ product }: { product: Product}) {
  /** Initalize and display data */
  const [salePrice, setSalePrice] = useState<number | null>(null)

  useEffect(()=>{
    if(product.sale_percent === null) return;
    if(product.sale_percent !== undefined) {
      let salePrice = (product.price * ((100 - product.sale_percent) / 100));
      salePrice = Math.floor(salePrice * 100) / 100
      setSalePrice(parseFloat(salePrice.toFixed(2)));
    }
  }, [])

  const [showAlert, setShowAlert] = useState(false);

  /** For routing */
  const router = useRouter();

  /** For adding to cart */
  const { addToCart } = useContext(CartContext);

  return(
    <div className={styles.card}>
      { showAlert && <Alert title='Successfully added' message="1 product added to cart" variant="green" show={showAlert} setShow={setShowAlert} />}
      { product.sale_percent && 
        <div className={styles.salePercent}>
          <p>-{ product.sale_percent }%</p>
        </div>
      }
      <div className={styles.imgWrapper} onClick={() => router.push(`/shop/product?product_id=${product.product_id}`)}>
        <Image src={product.url} alt='' fill={true} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"/>
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
        <IconButton 
          icon='bag' 
          variant='secondary' 
          hoverColor={true}
          click={() => {
            addToCart(product, 1);
          }}
          />
      </div>
    </div>
  )
}