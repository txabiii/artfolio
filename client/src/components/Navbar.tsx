'use client';

import styles from '../styles/navbar.module.scss'
import Image from 'next/image'
import cx from 'classnames'

import { useState, useRef, useEffect, useContext } from 'react';

import ContactPopup from './ContactPopup';
import PorjectPopup from './ProjectPopup';
import Logo from 'public/assets/logo.svg'
import CartIcon from '@root/assets/icons/cart.svg'

import { NavbarContext } from '@root/context/NavbarContextProvider';

import { getAllProjects } from '@root/api/projectsClient';
import Link from 'next/link';

export default function Navbar (): JSX.Element {
  const navbar = useRef<HTMLDivElement>(null);

  /** Navbar Context */
  const { mode, isAlwaysVisible, isHiddenMenuVisible, setIsHiddenMenuVisible } = useContext(NavbarContext);

  /** Mobile's hidden menu visibility */
  const hiddenMenu = useRef<HTMLDivElement>(null);
  const [navbarHeight, setNavbarHeight] = useState(0)

  function handleMenuClick(){
    setIsHiddenMenuVisible(!isHiddenMenuVisible);
  }

  /** Hide hidden menu when user scrolls */
  useEffect(()=>{
    const handleScroll = () => {
      setIsHiddenMenuVisible(false);
    }

    if(isHiddenMenuVisible) window.addEventListener("scroll", handleScroll);
    else window.removeEventListener("scroll",handleScroll);

    return () => window.removeEventListener("scroll",handleScroll)
  }, [isHiddenMenuVisible]);

  /** Contact and Project popups */
  const [isContactVisible, setIsContactVisible] = useState(false);
  const [isProjectVisible, setIsProjectVisible] = useState(false);

  useEffect(()=>{
    if(hiddenMenu.current){
      const menuHeight = isHiddenMenuVisible ? hiddenMenu.current.clientHeight : 0;

      if(navbar.current) {
        navbar.current.style.transform = `translateY(${menuHeight}px)`;
        setNavbarHeight(navbar.current.clientHeight + menuHeight);
      }
    }
  }, [isHiddenMenuVisible, isContactVisible, isProjectVisible, navbarHeight]);

  function handlleProjectCLick() {
    if(isContactVisible) setIsContactVisible(false);
    setIsProjectVisible(!isProjectVisible)
  }

  function handleContactClick() {
    if(isProjectVisible) setIsProjectVisible(false);
    setIsContactVisible(!isContactVisible);
  }

  /** Navbar's visibiNlity */
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);

  useEffect(()=>{
    function handleScroll() {
      setIsNavbarVisible(window.scrollY > 100)
    }

    if (isAlwaysVisible) {
      setIsNavbarVisible(true);
    } else {
      window.addEventListener("scroll", handleScroll);
    
      return () => {
        window.removeEventListener("scroll", handleScroll)
      };
    }
  }, [isAlwaysVisible])

  /** Get projects */
  const [projects, setProjects] = useState([]);

  useEffect(()=>{
    async function fetchData() {
      const data = await getAllProjects();
      setProjects(data);
    }
    fetchData();
  }, [])

  return(
    <>
      { isNavbarVisible && <div>
        <PorjectPopup projects={projects} offset={navbarHeight} show={isProjectVisible} setShow={setIsProjectVisible}/>
        <ContactPopup offset={navbarHeight} show={isContactVisible} setShow={setIsContactVisible}/>
        <div className={styles.navbar} ref={navbar}>
          <div className={styles.navbarTop}>        
            <div className={styles.navbarRight}>
              <div className={styles.imgWrapper}>        
                <Link href='/'>
                  <Image src={Logo} alt='Website&apos;s logo' fill={true}/>
                </Link>
              </div>
              <div className={styles.mode}>{ mode }</div>
            </div>
            <div className={styles.emptyElement}></div>
            <div className={styles.navbarLeft} ref={hiddenMenu}>
              { mode === 'artfolio' && <ul className={styles.navbarOptions}>
                <Link href={'/shop'}><li><b>Shop</b></li></Link>
                <li onClick={handlleProjectCLick}>Projects</li>
                <li onClick={handleContactClick}>Contact</li>
              </ul>}
              { mode === 'shop' && <ul className={styles.navbarOptions}>
                <Link href={'/'}><li><b>Artfolio</b></li></Link>
                <li>Catalog</li>
                <li onClick={handleContactClick}>Contact</li>
                { mode === 'shop' && 
                  <>
                    <li className={styles.cartLink}>
                      Cart
                      <Image className={styles.cartIcon} src={CartIcon} alt='cart icon'/>
                    </li>
                  </>
                }
              </ul>}
            </div> 
            <div className={styles.hiddenIcons}>
              <Image className={styles.cartIcon} src={CartIcon} alt='cart icon'/>
            </div>
            <div className={styles.hiddenIcons} onClick={handleMenuClick}>☰</div>
          </div>
          <div className={cx(styles.navbarBottom, {
            [styles.hidden]: mode === 'artfolio',
          })}>
            <div className={styles.categories}>
              <ul>
                <li>Shirt</li>
                <li>Pillow</li>
                <li>Notebook</li>
                <li>Mug</li>
                <li>Sticker</li>
                <li>Banner</li>
              </ul>
            </div>
            <div className={styles.search}>
              <input type='text' placeholder='Search for an item...' />
            </div>
          </div>
        </div>
      </div>}
    </>
  )
}