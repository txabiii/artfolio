'use client';

import { Product } from '@root/utils/interfaces'
import scrollToTop from '@root/utils/scrollToTop';

import Image from 'next/image'
import Button from '@root/components/Button';
import styles from '@root/styles/productPage.module.scss'
import ProductCard from '@root/components/ProductCard';

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useContext, useState, useRef } from 'react';

import { NavbarContext } from '@root/context/NavbarContextProvider';

import { getProductAndFeatures, getRelatedProducts } from '@root/api/productsClient';

import { RefObject } from 'react';

export default function ProductPage(){
  /** Navbar context */
  const { setMode, setIsAlwaysVisible, setIsHiddenMenuVisible } = useContext(NavbarContext);

  useEffect(()=>{
    setIsHiddenMenuVisible(false)
    setMode('shop')
    setIsAlwaysVisible(true)
  }, [])

  /** Get product_id from url */
  const [productData, setProductData] = useState<Product | null>(null)
  const [features, setFeatures] = useState<String[]>([]);

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(()=>{
    const productIdFromParams = searchParams.get('product_id');
    if(productIdFromParams === null) {
      router.push('/shop');
      return;
    }
    
    const productId = parseInt(productIdFromParams)
    async function fetchData(){
      const data = await getProductAndFeatures(productId);
      setProductData(data[0]);
      setFeatures(data.map((item: Product)=>item.feature_description))
    }
    fetchData();
    scrollToTop();
  }, [searchParams])

  /** Product zoom in */
  const imageRef: RefObject<HTMLImageElement> = useRef(null);

  function handleMouseHover(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    let { x, y } = event.currentTarget.getBoundingClientRect();

    const centerX = event.currentTarget.offsetWidth / 2;
    const centerY = event.currentTarget.offsetHeight / 2;
    
    const offsetX = event.clientX - (x + centerX);
    const offsetY = event.clientY - (y + centerY);

    if(imageRef.current) {
      imageRef.current.style.transform = `scale(2) translate(${0-offsetX/2}px, ${0-offsetY/2}px)`
    }
  }

  function handleMousOut() {
    if(imageRef.current) {
      imageRef.current.style.transform = `unset`
    }
  }

  /** For handling mobile devices */
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    const { x, y } = event.currentTarget.getBoundingClientRect();
    const centerX = event.currentTarget.offsetWidth / 2;
    const centerY = event.currentTarget.offsetHeight / 2;
    const offsetX = event.touches[0].clientX - (x + centerX);
    const offsetY = event.touches[0].clientY - (y + centerY);

    if (imageRef.current) {
      imageRef.current.style.transform = `scale(2) translate(${0-offsetX/2}px, ${0-offsetY/2}px)`;
    }
  };

  const detectTouchDevice = () => {
    if ('ontouchstart' in window) {
      setIsTouchDevice(true);
    }
  };

  useEffect(() => {
    detectTouchDevice();
  }, []);

  /** For getting related products */
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(()=>{
    async function fetchData(){
      if(productData){
        if(productData.category_id){
          const data = await getRelatedProducts(productData.product_id, productData.category_id);
          setRelatedProducts(data);
        }
      }
    }
    fetchData();
  },[productData])

  return(
    <div>
      <main className={styles.main}>
      <div
          className={styles.imgWrapper}
          onMouseMove={!isTouchDevice ? handleMouseHover : undefined}
          onTouchMove={isTouchDevice ? handleTouchMove : undefined}
          onMouseOut={handleMousOut}
        >
          { productData && <Image ref={imageRef} src={productData.url} alt='' fill={true}/>}
        </div>
        { productData && <div className={styles.productDetails}>
          <div>
            <h3>{ productData?.product_name }</h3>
            <p>{ productData?.product_description }</p>
            <h4>Features</h4>
            <ul>
              {
                features.map((feature, index)=>(
                  <li key={index}>{ feature }</li>
                ))
              }
            </ul>
          </div>
          <div>
            <h4>${ productData?.price }</h4>
            <Button content='Add to cart' variant='secondary' />
          </div>
        </div>}
      </main>
      { relatedProducts && <section className={styles.recommendations}>
        <h3>Other products</h3>
        <div className={styles.relatedProducts}>
          {
            relatedProducts.map((product)=>(
              <div key={product.product_id}>
                <ProductCard product={product} />
              </div>
            ))
          }
        </div>
      </section>}
    </div>
  )
}