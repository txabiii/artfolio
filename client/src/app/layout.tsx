'use client';

import './globals.css'
import Navbar from '@root/components/Navbar'
import Footer from '@root/components/Footer'
import { NavbarContextProvider } from '@root/context/NavbarContextProvider'

import { Provider } from 'react-redux';
import store from '@root/store/store'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Provider store={store}>
      <html lang="en">
        <head>
          <title>Txabi's Artfolio</title>
          <meta name="description" content="This is Txabi's Artfolio website, showcasing his artwork and creative projects." />
          <meta name="keywords" content="art, artist, portfolio, creative, projects" />
          <meta name="author" content="Txabi Guerrero" />
        </head>
        <body>
          <NavbarContextProvider>
            <Navbar />
            {children}
            <Footer />
          </NavbarContextProvider>
        </body>
      </html>
    </Provider>
  )
}
