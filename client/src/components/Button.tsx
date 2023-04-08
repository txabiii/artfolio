import cx from 'classnames'
import styles from '../styles/button.module.scss'

export default function Button ({ variant = 'primary', content = 'Button' }: any): JSX.Element {
  return(
    <button className={cx(styles.general,{[styles.primary] : variant === 'primary'})}>
      { content }
    </button>
  )
}