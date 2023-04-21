'use client';

import Contact from "@root/components/Contact"
import Catalog from "@root/components/Catalog"
import styles from '@root/styles/catalogPage.module.scss'

import { useSearchParams } from 'next/navigation';

import { NavbarContext } from '@root/context/NavbarContextProvider';

import { useEffect, useContext } from "react";

export default function CatalogPage() {
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