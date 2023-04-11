import styles from '../styles/popup.module.scss'
import cx from 'classnames'
import { useEffect, useState, useRef } from 'react';
import useEscapeKey from '@root/utils/useEscapeKey';
import Link from 'next/link';

export default function PorjectPopup({ projects, offset, show = false, setShow }: any): JSX.Element {
  /** Popup setup */
  const popup = useRef<HTMLDivElement>(null)

  useEffect(()=>{
    if(popup.current){
      popup.current.style.marginTop = `calc(${offset}px + 20px)`;
    }
  }, [offset,show])
  
  /** Popup animation */

  const [render, setRender] = useState(false);

  useEffect(()=>{
    if(show) {
      setRender(true);
    } else {
      setRender(false)
    }
  }, [show])

  /** Close popup on escape */
  useEscapeKey(()=>{
    setShow(false);
  })

  return(
    <>
      { show && <div className={styles.background}>
        <div ref={popup} className={cx(styles.popup, styles.project, {[styles.show] : render})}>
          <div className={styles.popupHeader}>
            <h3>Check out my projects</h3>
            {
              projects.map((project : any)=>{return(
                <div key={project.project_id}>
                  <Link href={'/project/'+project.project_id}>
                    <h4>{project.project_name}</h4>
                  </Link>
                </div>
              )})
            }
            <button className={styles.closePopup} onClick={() => setShow(false)}>╳</button>
          </div>
        </div>
      </div> }
    </>
  )
}