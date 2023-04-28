'use client';

import styles from '../styles/navbar.module.scss'
import Image from 'next/image'
import cx from 'classnames'

import { useState, useRef, useEffect, useContext, useMemo } from 'react';

import ContactPopup from './ContactPopup';
import PorjectPopup from './ProjectPopup';
import Logo from 'public/assets/logo.svg'
import CartIcon from '@root/assets/icons/cart.svg'

import { NavbarContext } from '@root/context/NavbarContextProvider';

import { getAllProjects } from '@root/api/projectsClient';
import { getCategories } from '@root/api/productsClient';

import { useRouter } from 'next/navigation';

import Link from 'next/link';

interface Category {
  category_id: number;
  category_name: string;
}

export default function Navbar (): JSX.Element {
  const router = useRouter();

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

  /** Navbar's visibility */
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

  /** Get categories */
  const [categories, setCategories] = useState<Category[]>([]);

  const categoriesMemo = useMemo(()=>{
    return categories
  }, [categories])

  useEffect(()=>{
    async function fetchData(){
      const data = await getCategories();
      setCategories(data);
    };
    fetchData();
  }, [])

  /** For the search bar */
  const [search, setSearch] = useState('')

  return(
    <>
      { isNavbarVisible && <div>
        <PorjectPopup projects={projects} offset={navbarHeight} show={isProjectVisible} setShow={setIsProjectVisible}/>
        <ContactPopup offset={navbarHeight} show={isContactVisible} setShow={setIsContactVisible}/>
        <div className={styles.navbar} ref={navbar}>
          <div className={styles.navbarTop}>        
            <div className={styles.navbarRight}>
              <div className={styles.imgWrapper}>        
                <Link href={ mode === 'artfolio' ? '/' : '/shop'}>
                  <Image src={Logo} alt='Website&apos;s logo' fill={true} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"/>
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
                <Link href={'/shop/catalog'} ><li>Catalog</li></Link>
                <li onClick={handleContactClick}>Contact</li>
                { mode === 'shop' && 
                  <>
                    <Link href='/shop/cart'>
                      <li className={styles.cartLink}>
                        Cart
                        <Image className={styles.cartIcon} src={CartIcon} alt='cart icon'/>
                      </li>
                    </Link>
                  </>
                }
              </ul>}
            </div> 
            { mode === 'shop' && <div className={styles.hiddenIcons}>
              <Link href='/shop/cart'>
                <Image className={styles.cartIcon} src={CartIcon} alt='cart icon'/>
              </Link>
            </div>}
            <div className={styles.hiddenIcons} onClick={handleMenuClick}>☰</div>
          </div>
          <div className={cx(styles.navbarBottom, {
            [styles.hidden]: mode === 'artfolio',
          })}>
            <div className={styles.categories}>
              <ul>
                {
                  categoriesMemo.map((category)=>(
                    <Link key={category.category_id} href={`/shop/catalog?category_id=${category.category_id}`}>
                      <li>{ category.category_name }</li>
                    </Link>
                  ))
                }
              </ul>
            </div>
            <div className={styles.search}>
              <input 
                type='text' 
                placeholder='Search for an item...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}  
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    router.push(`/shop/catalog?search=${search}`)
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>}
    </>
  )
}