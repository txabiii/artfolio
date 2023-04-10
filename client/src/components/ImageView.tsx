'use client';

import styles from '../styles/imageView.module.scss'
import Image from 'next/image'
import Button from './Button'
import { useEffect, useState } from 'react';
import cx from 'classnames'
import useEscapeKey from '@root/utils/useEscapeKey';

export default function ImageView({ show, setShow, imageId }: any): JSX.Element {
  const [render, setRender] = useState(false);

  useEffect(()=>{
    if(show) {
      setRender(true);
    } else {
      setRender(false)
    }
  }, [show])

  useEscapeKey(() => {
    setShow(false)
  })
  return(
    <>
      {show && <div className={styles.background}>
        <div className={cx(styles.popup, {[styles.show] : render})}>
        <button className={styles.closePopup} onClick={() => setShow(false)}>╳</button>
          <div className={styles.imgWrapper}>
            
          </div>
          <div className={styles.imgDetails}>
            <div className={styles.header}>
              <h4>Image name</h4>
              <Button content="View products" mini={true} variant="primary" />
            </div>
            <div className={styles.description}>
              <p>Just a brief description of the image. I usually make images through different software like Inkscape for vector art or Paint Tool SAI or Photoshop for raster images. </p>
            </div>
          </div>
        </div>
      </div>}
    </>
  )
}