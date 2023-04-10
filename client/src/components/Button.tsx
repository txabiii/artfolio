import cx from 'classnames'
import styles from '../styles/button.module.scss'

export default function Button ({ variant = 'primary', content = 'Button', mini = false, click }: any): JSX.Element {
  return(
    <button onClick={click}
      className={
      cx(styles.general,
        {[styles.primary] : variant === 'primary'},
        {[styles.secondary] : variant === 'secondary'},
        {[styles.mini] : mini}  
      )}>
      { content }
    </button>
  )
}