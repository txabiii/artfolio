import styles from '../styles/alert.module.scss'
import cx from 'classnames'

export default function Alert({ title = 'Alert', message = 'Insert message here', variant = 'neutral', setShow}: any){
  return(
    <div className={
      cx(styles.alert,
        {[styles.green]: variant === 'green'},
        {[styles.yellow]: variant === 'yellow'},
        {[styles.red]: variant === 'red'})
    }>
      <button className={styles.closeAlert} onClick={() => setShow(false)}><h4>╳</h4></button>
      <h4>{title}</h4>
      <p>{message}</p>
    </div>
  )
}