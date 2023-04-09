'use client';

import './globals.css'
import Navbar from '@root/components/Navbar'

import { useEffect, useState } from 'react';

export const metadata = {
  title: 'Txabi\'s Artfolio',
  description: 'A portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(()=>{
    function handleScroll() {
      setIsVisible(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <html lang="en">
      <body>
        { isVisible && <Navbar/>}
        {children}
      </body>
    </html>
  )
}
