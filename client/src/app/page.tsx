import styles from '../styles/home.module.scss'

import Link from 'next/link'
import Image from 'next/image'

import Button from '@root/components/Button'
import ProjectPreview from '@root/components/ProjectPreview'
import Contact from '@root/components/Contact'
import Footer from '@root/components/Footer'

import heroImage from '@root/assets/images/Hero image.png'

export default function Home() {

  return (
    <>
    {/* Hero section */}
      <main className={styles.heroContainer}>
        <div className={styles.initialNavbar}>
          <Link href={''}><p><u>Artfolio</u></p></Link>
          <Image src='assets/logo.svg' alt='Website&apos;s logo' height={60} width={120}/>
          <Link href={''}><p>Shop</p></Link>
        </div>
        <div className={styles.hero}>
          <div className={styles.heroImages}>
            <Image className={styles.heroImage} src={heroImage} alt="" />
          </div>
          <div className={styles.heroDetailsWrapper}>
            <div className={styles.heroDetails}>
              <h1>Hi, I&apos;m Txabi, a <span className={styles.highlight}>digital artist</span> and creator of cute and colorful art</h1>
              <p>I make cute digital arts and I showcase them here in my artfolio, check them out as you please! I have a soft spot for cartoon-ish style though I also try different styles as well.</p>
            </div>
            <div className={styles.heroButtonGroup}>
              <Button variant="primary" content="View works"/>
              <Button variant="secondary" content="Contact me" />
            </div>
          </div>
        </div>
      </main>
    {/* Project previews Section */}
      <section className={styles.projectPreview}>
        <ProjectPreview/>
        <ProjectPreview/>
      </section>
    {/* Contact Section */}
      <Contact />
    {/* Footer */}
      <Footer />
    </>
  )
}
