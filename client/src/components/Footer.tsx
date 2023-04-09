import styles from '../styles/footer.module.scss'
import Image from 'next/image'

export default function Footer() {
  return(
    <div className={styles.footer}>
      <ul>
        <li>Artfolio</li>
        <li>Shop</li>
        <li>Contact</li>
        <li>About</li>
      </ul>
      <div className={styles.imgContainer}>
        <div className={styles.imgWrapper}>        
          <Image src='assets/logo.svg' alt='Website&apos;s logo' fill={true}/>
        </div>
      </div>
      <p>2023 © Txabi Guerrero</p>
    </div>
  )
}