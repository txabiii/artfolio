'use client';

import styles from '@root/styles/cartPage.module.scss'

import { NavbarContext } from '@root/context/NavbarContextProvider';

import { useEffect, useContext } from 'react';

export default function CartPage() {
  /** Navbar context */
  const { setMode, setIsAlwaysVisible, setIsHiddenMenuVisible } = useContext(NavbarContext);

  useEffect(()=>{
    setIsHiddenMenuVisible(false)
    setMode('shop')
    setIsAlwaysVisible(true)
  }, [])

  return(
    <div>
      <div className={styles.cartHeader}>
        <p>Back to shopping</p>
        <div className={styles.cartDetails}>
          <h5>Your cart</h5>
          <div className={styles.amount}>
            <p>Subtotal</p>
            <h5>$161.00</h5>
          </div>
        </div>
      </div>
      <div style={{height:'1000px'}}></div>
    </div>
  )
}