'use client';

import styles from '../styles/imageView.module.scss'
import Image from 'next/image'
import Button from './Button'
import { useEffect, useState } from 'react';
import cx from 'classnames'
import useEscapeKey from '@root/utils/useEscapeKey';
import { getImage } from '@root/api/imagesClient';

interface ImageData {
  image_id: number;
  image_name: string;
  description: string;
  url: string;
}

export default function ImageView({ show, setShow, id }: any): JSX.Element {
  /** Setup data */
  const [imageData, setImageData] = useState<ImageData>({ image_id: 0, image_name: '', description: '', url: ''})
  
  /** Handle popup's visibility */
  const [render, setRender] = useState(false);

  useEffect(()=>{
    async function fetchData() {
      const data = await getImage(id);
      setImageData(data);
      setRender(true);
    };

    if(show) {
      fetchData();
    } else {
      setRender(false);
    }
  }, [show])

  useEscapeKey(() => {
    setShow(false)
  });

  // useEffect(()=>{
  //   async function fetchData() {
  //     const data = await getImage(id);
  //     setImageData(data);
  //     setShow(true);
  //   };
  //   if(id) fetchData();
  // },[id])

  return(
    <>
      {show && <div className={cx(styles.background, {[styles.fadeIn] : render})}>
        <div className={cx(styles.popup, {[styles.show] : render})}>
        <button className={styles.closePopup} onClick={() => setShow(false)}>╳</button>
          <div className={styles.imgWrapper}>
            <Image src={imageData.url} alt='' fill={true} />
          </div>
          <div className={styles.imgDetails}>
            <div className={styles.header}>
              <h3>{imageData.image_name}</h3>
              <Button content="View products" mini={true} variant="primary" />
            </div>
            <div className={styles.description}>
              <p>{imageData.description}</p>
            </div>
          </div>
        </div>
      </div>}
    </>
  )
}