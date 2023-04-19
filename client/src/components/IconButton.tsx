import styles from '../styles/IconButton.module.scss'
import cx from 'classnames'

import Image from 'next/image'

import Error from '@root/assets/icons/error.svg'
import Link from '@root/assets/icons/link.svg'
import Download from '@root/assets/icons/download.svg'
import Bag from '@root/assets/icons/bag.svg'

export default function IconButton({ icon = 'undefined', variant = 'primary', click }: any) {
  return(
    <div onClick={click}
    className={
      cx(styles.iconWrapper,
      {[styles.primary] : variant === 'primary'},
      {[styles.secondary] : variant === 'secondary'})
    }>
      { icon === 'undefined' && <Image src={Error} alt=''/>}
      { icon === 'download' && <Image src={Download} alt=''/>}
      { icon === 'link' && <Image src={Link} alt=''/>}
      { icon === 'bag' && <Image src={Bag} alt=''/>}
    </div>
  )
}