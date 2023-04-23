'use client';

import Contact from "@root/components/Contact"
import Catalog from "@root/components/Catalog"
import styles from '@root/styles/catalogPage.module.scss'

import { NavbarContext } from '@root/context/NavbarContextProvider';

import { useEffect, useContext } from "react";

import scrollToTop from "@root/utils/scrollToTop";

export default function CatalogPage() {
  useEffect(() => {
    scrollToTop();
  },[]);

  /** Navbar context */
  const { setMode, setIsAlwaysVisible, setIsHiddenMenuVisible } = useContext(NavbarContext);

  useEffect(()=>{
    setIsHiddenMenuVisible(false)
    setMode('shop')
    setIsAlwaysVisible(true)
  }, [])

  return(
    <div className={styles.pageWrapper}>
      <Catalog />
      <Contact />
    </div>
  )
}