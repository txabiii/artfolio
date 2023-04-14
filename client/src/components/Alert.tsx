import styles from '../styles/alert.module.scss'
import cx from 'classnames'
import { useEffect, useState, useRef } from 'react'

export default function Alert({ title = 'Alert', message = 'Insert message here', variant, show, setShow}: any){
  const alertRef = useRef<HTMLDivElement>(null)

  /** For automatic close alert */
  const[count, setCount] = useState(0);

  useEffect(()=>{
    if(!show) return; // if the alert is not shown, don't fade out LMAO
    if(count < 4000) {
      const timer = setTimeout(()=>{
        setCount(count + 100);
        if(count > 3000) setShow(false);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [count, show])

  return(
    <div className={
      cx(styles.alert,
        {[styles.blue]: variant === 'blue'},
        {[styles.green]: variant === 'green'},
        {[styles.yellow]: variant === 'yellow'},
        {[styles.red]: variant === 'red'},
        {[styles.fadeOut]: count >= 2500})
    } ref={alertRef}>
      <button className={styles.closeAlert} onClick={() => setShow(false)}><h4>╳</h4></button>
      <h4>{title}</h4>
      <p>{message}</p>
    </div>
  )
}