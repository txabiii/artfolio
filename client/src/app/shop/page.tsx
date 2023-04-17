'use client'

import homeStyles from '../../styles/home.module.scss'
import styles from '../../styles/shop.module.scss'
import cx from 'classnames'

import Button from '@root/components/Button'
import Contact from '@root/components/Contact'
import HeroImage1 from '@root/assets/images/shop-1.png'
import HeroImage2 from '@root/assets/images/shop-2.png'

import Image from 'next/image'
import Link from 'next/link'

import { useContext, useEffect } from 'react'

import { NavbarContext } from '@root/context/NavbarContextProvider';

export default function ShopHome() {
  /** Navbar context */
  const { setMode, setIsAlwaysVisible, setIsHiddenMenuVisible } = useContext(NavbarContext);

  useEffect(()=>{
    setIsHiddenMenuVisible(false)
    setMode('shop');
    setIsAlwaysVisible(false);
  }, [])

  return(
    <>
    {/* Hero Section */}
      <main className={homeStyles.heroContainer}>
        <div className={homeStyles.initialNavbar}>
          <Link href={'/'}><p>Artfolio</p></Link>
          <Image src='assets/logo.svg' alt='Website&apos;s logo' height={60} width={120}/>
          <Link href={'/shop'}><p><u>Shop</u></p></Link>
        </div>
        <div className={cx(homeStyles.hero, styles.hero)}>
          <div className={cx(homeStyles.heroImages, styles.heroImages)}>
            <Image className={styles.heroImage} src={HeroImage1} alt="" />
            <Image className={styles.heroImage} src={HeroImage2} alt="" />
          </div>
          <div className={cx(homeStyles.heroDetailsWrapper, styles.heroDetailsWrapper)}>
            <div className={cx(homeStyles.heroDetails, styles.shopHeroDetails)}>
              <h1>Art you can <span>touch</span>, <span>feel</span>, and <span>wear</span></h1>
              <p>Digital art isn't just for display screens. Here, we offer a wide range of physical products that let you touch, feel, and wear your favorite designs, so you can bring the beauty and inspiration of digital art into your everyday life.</p>
            </div>
            <div className={cx(homeStyles.heroButtonGroup, styles.shopButtonGroup)}>
              <Button variant="primary" content="Browse products"/>
              <Button variant="secondary" content="Contact us"/>
            </div>
          </div>
        </div>
      </main>
      {/* Contact Section */}
      <Contact mode='shop'/>
    </>
  )
}