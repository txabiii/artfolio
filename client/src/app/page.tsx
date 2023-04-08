import styles from '../styles/home.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import Button from '../components/Button'

import profilePic from '../assets/images/profile.png'
import hero1 from '../assets/images/hero-1.png'
import hero2 from '../assets/images/hero-2.png'

export default function Home() {
  return (
    <main className={styles.hero}>
      <div className={styles.initialNavbar}>
        <Link href={''}><p><u>Artfolio</u></p></Link>
        <Image src='assets/logo.svg' alt='Website&apos;s logo' height={60} width={120}/>
        <Link href={''}><p>Shop</p></Link>
      </div>
      <div className={styles.heroImages}>
        <Image className={styles.hero1} src={hero1} alt="digital art of two boys in chibi anime style" />
        <Image className={styles.profile} src={profilePic} alt="profile picture of Txabi Guerrero" />
        <Image className={styles.hero2} src={hero2} alt="digital art of a frog and dew characters in a stalk" />
      </div>
      <div className={styles.heroDetailsWrapper}>
        <div className={styles.heroDetails}>
          <h1>Hi, I&apos;m Txabi, a <span className={styles.highlight}>digital artist</span> and creator of cute and colorful art</h1>
          <p>Subtext goes here explaining who I am, what I do, and what this website is all about. You can view me developer portfolio here.</p>
        </div>
        <div className={styles.heroButtonGroup}>
          <Button variant="primary" content="View works"/>
          <Button variant="secondary" content="Contact me" />
        </div>
      </div>
    </main>
  )
}
