import cx from 'classnames'
import styles from '../styles/button.module.scss'

export default function Button ({ variant = 'primary', content = 'Button', mini }: any): JSX.Element {
  return(
    <button className={
      cx(styles.general,
        {[styles.primary] : variant === 'primary'},
        {[styles.secondary] : variant === 'secondary'},
        {[styles.mini] : mini}  
      )}>
      { content }
    </button>
  )
}