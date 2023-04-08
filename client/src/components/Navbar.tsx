import styles from '../styles/navbar.module.scss'
import Image from 'next/image'
import cx from 'classnames'

export default function Navbar ({ mode = 'artfolio' }: any): JSX.Element {
  return(
    <div className={styles.navbar}>
      <div className={styles.navbarTop}>        
        <div className={styles.navbarRight}>
          <div className={styles.imgWrapper}>        
            <Image src='assets/logo.svg' alt='Website&apos;s logo' fill={true}/>
          </div>
          <div className={styles.mode}>{ mode }</div>
        </div>
        <div className={styles.navbarLeft}>
          <ul className={cx(styles.navbarOptions, {
            [styles.hidden]: mode === 'shop',
          })}>
            <li><b>Shop</b></li>
            <li>Projects</li>
            <li>Contact</li>
          </ul>
          <ul className={cx(styles.navbarOptions, {
            [styles.hidden]: mode === 'artfolio',
          })}>
            <li><b>Artfolio</b></li>
            <li>Catalog</li>
            <li>Contact</li>
            <li>
              Cart
            </li>
          </ul>
        </div> 
      </div>
      <div className={cx(styles.navbarBottom, {
        [styles.hidden]: mode === 'artfolio',
      })}>
        <div className={styles.categories}>
          <ul>
            <li>Shirt</li>
            <li>Jacket</li>
            <li>Pillow</li>
            <li>Notebook</li>
            <li>Mug</li>
            <li>Sticker</li>
            <li>Sweater</li>
            <li>Poster</li>
          </ul>
        </div>
        <div className={styles.search}>
          <input type='text' placeholder='Search for an item...' />
        </div>
      </div>
    </div>
  )
}