'use client';

import styles from '../styles/imageView.module.scss'
import Image from 'next/image'
import Button from './Button'
import { useEffect, useState } from 'react';
import cx from 'classnames'
import useEscapeKey from '@root/utils/useEscapeKey';
import { getImage } from '@root/api/imagesClient';
import { usePathname } from 'next/navigation';
import Alert from './Alert';

interface ImageData {
  image_id: number;
  image_name: string;
  description: string;
  url: string;
}

export default function ImageView({ show, setShow, id, goBack }: any): JSX.Element {
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

  /** For the Alert */
  const [showAlert, setShowAlert] = useState(false);
  const pathname = usePathname();

  const handleClick = async () => {
    try {
      if(pathname) {
        await navigator.clipboard.writeText('localhost:3000' + pathname + '?image_id=' + id)
        setShowAlert(true);
      }
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  /** For download */
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageData.url;
    link.download = imageData.image_name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /** Handle button close */
  const handleClose = () => {
    setShow(false);
  }
  
  return(
    <>
      { showAlert && <Alert title='Link copied' message='Share the link to your friends!' variant='green' show={showAlert} setShow={setShowAlert} />}
      <div className={cx(styles.background, {[styles.fadeIn] : render})}>
        <div className={cx(styles.popup, {[styles.show] : render})}>
        <button className={styles.closePopup} onClick={handleClose}>╳</button>
          <div className={styles.imgWrapper}>
            <Image src={imageData.url} alt='' fill={true} />
          </div>
          <div className={styles.imgDetails}>
            <div className={styles.header}>
              <h3>{imageData.image_name}</h3>
              <div className={styles.buttonGroup}>
                <Button content="Download" mini={true} variant="secondary" click={handleDownload} />
                <Button content="Share link" mini={true} variant="secondary" click={handleClick} />
                <Button content="View products" mini={true} variant="primary" />
              </div>
            </div>
            <div className={styles.description}>
              <p>{imageData.description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}