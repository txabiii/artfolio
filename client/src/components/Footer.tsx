import styles from '../styles/footer.module.scss'
import Image from 'next/image'
import Logo from 'public/assets/logo.svg'

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
          <Image src={Logo} alt='Website&apos;s logo' fill={true}/>
        </div>
      </div>
      <p style={{opacity:'0.6'}}>2023 © Txabi Guerrero</p>
    </div>
  )
}