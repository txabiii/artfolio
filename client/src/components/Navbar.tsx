'use client';

import styles from '../styles/navbar.module.scss'
import Image from 'next/image'
import cx from 'classnames'

import { useState, useRef, useEffect, useContext } from 'react';

import ContactPopup from './ContactPopup';
import PorjectPopup from './ProjectPopup';
import Logo from 'public/assets/logo.svg'

import { NavbarContext } from '@root/context/NavbarContextProvider';

import { getAllProjects } from '@root/api/projectsClient';

export default function Navbar (): JSX.Element {
  const navbar = useRef<HTMLDivElement>(null);

  /** Context */
  const { mode, isAlwaysVisible } = useContext(NavbarContext);

  /** Mobile's hidden menu visibility */

  const hiddenMenu = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(0)

  function handleMenuClick(){
    setIsVisible(!isVisible);
  }

  useEffect(()=>{
    const handleScroll = () => {
      setIsVisible(false);
    }

    if(isVisible) window.addEventListener("scroll", handleScroll);
    else window.removeEventListener("scroll",handleScroll);

    return () => window.removeEventListener("scroll",handleScroll)
  }, [isVisible]);

  function handleContactClick() {
    if(isProjectVisible) setIsProjectVisible(false);
    setIsContactVisible(!isContactVisible);
  }

  /** Contact and Project popups */

  const [isContactVisible, setIsContactVisible] = useState(false);
  const [isProjectVisible, setIsProjectVisible] = useState(false);

  useEffect(()=>{
    if(hiddenMenu.current){
      const menuHeight = isVisible ? hiddenMenu.current.clientHeight : 0;

      if(navbar.current) {
        navbar.current.style.transform = `translateY(${menuHeight}px)`;
        setNavbarHeight(navbar.current.clientHeight + menuHeight);
      }
    }
  }, [isVisible, isContactVisible, isProjectVisible, navbarHeight]);

  function handlleProjectCLick() {
    if(isContactVisible) setIsContactVisible(false);
    setIsProjectVisible(!isProjectVisible)
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
                <Image src={Logo} alt='Website&apos;s logo' fill={true}/>
              </div>
              <div className={styles.mode}>{ mode }</div>
            </div>
            <div className={styles.navbarLeft} ref={hiddenMenu}>
              { mode === 'artfolio' && <ul className={styles.navbarOptions}>
                <li><b>Shop</b></li>
                <li onClick={handlleProjectCLick}>Projects</li>
                <li onClick={handleContactClick}>Contact</li>
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
      </div>}
    </>
  )
}