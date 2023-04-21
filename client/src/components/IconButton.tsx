import styles from '../styles/IconButton.module.scss'
import cx from 'classnames'

import Image from 'next/image'

import Error from '@root/assets/icons/error.svg'
import Link from '@root/assets/icons/link.svg'
import Download from '@root/assets/icons/download.svg'
import Bag from '@root/assets/icons/bag.svg'
import LeftArrow from '@root/assets/icons/left-arrow.svg'
import RightArrow from '@root/assets/icons/right-arrow.svg'

interface IconButtonProps {
  icon: string;
  variant: string;
  click?: () => void;
  hoverColor?: boolean;
}

export default function IconButton({ icon = 'undefined', variant = 'primary', click = ()=>{}, hoverColor = false }: IconButtonProps) {
  return(
    <div onClick={click}
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === 'Enter') {
        click();
      }
    }}
    className={
      cx(styles.iconWrapper,
      {[styles.primary] : variant === 'primary'},
      {[styles.secondary] : variant === 'secondary'},
      {[styles.hoverColor] : hoverColor },
      )
    }>
      { icon === 'undefined' && <Image src={Error} alt=''/>}
      { icon === 'download' && <Image src={Download} alt=''/>}
      { icon === 'link' && <Image src={Link} alt=''/>}
      { icon === 'bag' && <Image src={Bag} alt=''/>}
      { icon === 'left-arrow' && <Image src={LeftArrow} alt=''/>}
      { icon === 'right-arrow' && <Image src={RightArrow} alt=''/>}
    </div>
  )
}