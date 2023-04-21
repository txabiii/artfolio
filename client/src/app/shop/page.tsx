'use client'

import homeStyles from '../../styles/home.module.scss'
import styles from '../../styles/shop.module.scss'
import cx from 'classnames'

import Button from '@root/components/Button'
import Contact from '@root/components/Contact'
import Featured from '@root/components/Featured'
import Catalog from '@root/components/Catalog'
import HeroImage1 from '@root/assets/images/shop-1.png'
import HeroImage2 from '@root/assets/images/shop-2.png'

import Image from 'next/image'
import Link from 'next/link'

import { useContext, useEffect, useRef } from 'react'

import { NavbarContext } from '@root/context/NavbarContextProvider'

export default function ShopHome() {
  /** Navbar context */
  const { setMode, setIsAlwaysVisible, setIsHiddenMenuVisible } = useContext(NavbarContext);

  useEffect(()=>{
    setIsHiddenMenuVisible(false)
    setMode('shop');
    setIsAlwaysVisible(false);
  }, [])

  /** Scroll to contact */
  const contactRef = useRef<HTMLDivElement>(null);

  const scrollToContact = () => {
    if(contactRef.current) contactRef.current.scrollIntoView({ behavior: 'smooth'});
  }

  /** Scroll to catalog */
  const catalogRef = useRef<HTMLDivElement>(null);

  const scrollToCatalog = () => {
    if(catalogRef.current) catalogRef.current.scrollIntoView({ behavior: 'smooth'});
  }

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
              <Button variant="primary" content="Browse products" click={scrollToCatalog}/>
              <Button variant="secondary" content="Contact us" click={scrollToContact}/>
            </div>
          </div>
        </div>
      </main>
      {/* Featured Section */}
      <Featured />
      {/* Products Section */}
      <section ref={catalogRef}>
        <Catalog />
      </section>
      {/* Contact Section */}
      <section ref={contactRef}>
        <Contact mode='shop'/>
      </section>
    </>
  )
}