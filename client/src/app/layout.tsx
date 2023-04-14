'use client';

import './globals.css'
import Navbar from '@root/components/Navbar'
import Footer from '@root/components/Footer'
import { NavbarContextProvider } from '@root/context/NavbarContextProvider'
import Head from 'next/head';

export const metadata = {
  title: 'Txabi\'s Artfolio',
  description: 'A portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <NavbarContextProvider>
      <html lang="en">
        <Head>
          <title>My Artfolio</title>
          <meta property="og:title" content="My Artfolio" key="title" />
        </Head>
        <body>
          <Navbar />
          {children}
          <Footer />
        </body>
      </html>
    </NavbarContextProvider>
  )
}
