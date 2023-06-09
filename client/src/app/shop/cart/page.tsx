'use client';

import Image from 'next/image';
import Button from '@root/components/Button';
import styles from '@root/styles/cartPage.module.scss'

import { NavbarContext } from '@root/context/NavbarContextProvider';

import { useEffect, useContext, useRef } from 'react';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { CartContext } from '@root/context/CartContextProvider';

export default function CartPage() {
  const { cartItems } = useContext(CartContext);

  const router = useRouter();

  /** Navbar context */
  const { setMode, setIsAlwaysVisible, setIsHiddenMenuVisible } = useContext(NavbarContext);

  useEffect(()=>{
    setIsHiddenMenuVisible(false)
    setMode('shop')
    setIsAlwaysVisible(true)
  }, [])

  /** displayed value */
  const inputRef = useRef<HTMLInputElement>(null);

  /** For adding to cart */
  const { addToCart, removeFromCart, updateDisplayedQuantity, updateProductQuantity, removeAllFromCart } = useContext(CartContext);

  return(
    <div>
      <div className={styles.cartHeader}>
        <div className={styles.cartDetails}>
          <div className={styles.cartDetailsLeft}>
            <Link href='/shop/catalog'><p>back to shopping</p></Link>
            <h5>Your cart</h5>
          </div>
          <div className={styles.amount}>
            <p>Subtotal</p>
            <h5>${cartItems.reduce(
              (total, item) => total + (item.product.price * item.quantity),
              0
            ).toFixed(2)}</h5>
          </div>
        </div>
      </div>
      <div className={styles.cartContent}>
        { cartItems && cartItems.length > 0 && 
        <>
          <div className={styles.desktopCart}> 
            <table>
              <thead>
                <tr>
                  <th style={{width:'40%'}}>Product</th>
                  <th style={{width:'18%'}}>Price</th>
                  <th style={{width:'18%'}}>Quantity</th>
                  <th style={{width:'18%'}}>Total</th>
                  <th style={{width:'9%'}}></th>
                </tr>
              </thead>
              <tbody>
              {
                cartItems.map((item, index)=>(
                  <tr key={index}>
                    <td>
                      <div className={styles.imgWrapper}>
                        <Image src={item.product.url} alt='' fill={true} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"/>
                      </div>
                      <h6>{item.product.product_name}</h6>
                    </td>
                    <td><h6>${item.product.price}</h6></td>
                    <td>
                      <div className={styles.quantityGroup}>
                      <button 
                        className={styles.quantityButton}
                        onClick={() => {
                          addToCart(item.product, 1)
                        }}
                      >
                            +
                        </button>
                        <input 
                          type="number" 
                          min={0} 
                          max={100} 
                          ref={inputRef}
                          onChange={(e) => {
                            if(e.target.value === '' || parseInt(e.target.value) < 0 || !e.target.value || e.target.value === '0') {
                              updateDisplayedQuantity(item.product)
                              return;
                            }
                            updateProductQuantity(item.product, parseInt(e.target.value))
                          }}
                          value={item.displayed_quantity}
                        />
                        <button 
                          className={styles.quantityButton}
                          onClick={() => {
                            addToCart(item.product, -1)
                          }}
                        >
                            -
                        </button>
                      </div>
                    </td>
                    <td><h6>${(item.product.price * item.quantity).toFixed(2)}</h6></td>
                    <td>
                      <button
                        onClick={() => {
                          removeFromCart(item.product.product_id)
                        }}
                      >
                        <h6>╳</h6>
                      </button>
                    </td>
                  </tr>
                ))
              }
              </tbody>
            </table>
          </div>
          <div className={styles.mobileCart}>
            <h5>Products</h5>
            {
              cartItems.map((item, index) => (
                <div key={index} className={styles.mobileCartItem}>
                  <div className={styles.imgWrapper}>
                    <Image src={item.product.url} alt='' fill={true} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"/>
                  </div>
                  <div className={styles.itemDetails}>
                    <h5>{item.product.product_name}</h5>
                    <div className={styles.priceDetails}>
                      {/* Left */}
                      <div>
                        <p>per item</p>
                        <h5>${item.product.price}</h5>
                      </div>
                      {/* Right */}
                      <div>
                        <p>total</p>
                        <h5>${(item.product.price * item.quantity).toFixed(2)}</h5>
                      </div>
                    </div>
                  </div>
                  <div className={styles.quantityGroup}>
                      <button className={styles.quantityButton}>
                          +
                      </button>
                      <input 
                        type="number" 
                        min={0} 
                        max={100} 
                        ref={inputRef}
                      />
                      {/* <h5>{ item.quantity }</h5> */}
                      <button>
                          -
                      </button>
                    </div>
                </div>
              ))
            }
          </div>
          <div className={styles.buttonGroup}>
              <Button 
                content="Clear cart" 
                variant="tertiary"
                click={() => {
                  removeAllFromCart()
                }}
              />
              <Button 
                content="Proeed to checkout" 
                variant="primary" 
                click={() => {
                  router.push('/shop/checkout')
                }}
              />
            </div>
        </>
        }
        {
          !cartItems || cartItems.length === 0 &&
          <div className={styles.emptyCart}>
            <h2>¯\_(ツ)_/¯</h2>
            <h5>No items in the cart</h5>
            <Button content="View catalog" click={() => router.push('/shop/catalog')} />
          </div>
        }
      </div>
    </div>
  )
}