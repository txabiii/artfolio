'use client';

import styles from '../styles/navbar.module.scss'
import Image from 'next/image'
import cx from 'classnames'
import { useState, useRef, useEffect } from 'react';

export default function Navbar ({ mode = 'artfolio' }: any): JSX.Element {
  const hiddenMenu = useRef<HTMLDivElement>(null);
  const navbar = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);

  function handleMenuClick(){
    setIsVisible(!isVisible);
  }

  useEffect(()=>{
    if(hiddenMenu.current){
      const menuHeight = isVisible ? hiddenMenu.current.clientHeight : 0;

      if(navbar.current) {
        navbar.current.style.transform = `translateY(${menuHeight}px)`;
      }
    }
  }, [isVisible]);

  useEffect(()=>{
    const handleScroll = () => {
      setIsVisible(false);
    }

    if(isVisible) window.addEventListener("scroll", handleScroll);
    else window.removeEventListener("scroll",handleScroll);

    return () => window.removeEventListener("scroll",handleScroll)
  }, [isVisible]);

  return(
    <div className={styles.navbar} ref={navbar}>
      <div className={styles.navbarTop}>        
        <div className={styles.navbarRight}>
          <div className={styles.imgWrapper}>        
            <Image src='assets/logo.svg' alt='Website&apos;s logo' fill={true}/>
          </div>
          <div className={styles.mode}>{ mode }</div>
        </div>
        <div className={styles.navbarLeft} ref={hiddenMenu}>
          { mode === 'artfolio' && <ul className={styles.navbarOptions}>
            <li><b>Shop</b></li>
            <li>Projects</li>
            <li>Contact</li>
          </ul>}
          { mode === 'shop' && <ul className={styles.navbarOptions}>
            <li><b>Artfolio</b></li>
            <li>Catalog</li>
            <li>Contact</li>
            <li>Cart</li>
          </ul>}
        </div> 
        <div className={styles.hamburgerMenu} onClick={handleMenuClick}>☰</div>
      </div>
      <div className={cx(styles.navbarBottom, {
        [styles.hidden]: mode === 'artfolio',
      })}>
        <div className={styles.categories}>
          <ul>
            <li>Shirt</li>
            <li>Jacket</li>
            <li>Pillow</li>
            <li>Notebook</li>
            <li>Mug</li>
            <li>Sticker</li>
            <li>Sweater</li>
            <li>Poster</li>
          </ul>
        </div>
        <div className={styles.search}>
          <input type='text' placeholder='Search for an item...' />
        </div>
      </div>
    </div>
  )
}