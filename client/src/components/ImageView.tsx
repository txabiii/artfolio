'use client';

import styles from '../styles/imageView.module.scss'
import cx from 'classnames'

import Image from 'next/image'
import Button from './Button'
import Alert from './Alert';
import IconButton from './IconButton';

import { useEffect, useState } from 'react';

import useEscapeKey from '@root/utils/useEscapeKey';

import { getImage } from '@root/api/imagesClient';

import { useRouter, usePathname } from 'next/navigation';

interface ImageData {
  image_id: number;
  project_id: number;
  image_name: string;
  description: string;
  url: string;
  has_product: boolean;
}

export default function ImageView({ show, setShow, id, goBack }: any): JSX.Element {
  /** Setup data */
  const [imageData, setImageData] = useState<ImageData | null>(null)
  
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
      if(pathname && imageData) {
        await navigator.clipboard.writeText('https://artfolio-wiky.vercel.app/project/' + imageData.project_id + '?image_id=' + id)
        setShowAlert(true);
      }
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  /** For download */
  const handleDownload = () => {
    if(imageData){      
      const link = document.createElement('a');
      link.href = imageData.url;
      link.download = imageData.image_name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  /** Handle button close */
  const handleClose = () => {
    setShow(false);
  }

  /** Handle shop click */
  const router = useRouter();

  function handleShopClick(){
    if(imageData){
      router.push(`/shop/catalog?image_id= ${imageData.image_id}`)
    }
  }
  
  return(
    <>
      { showAlert && <Alert title='Link copied' message='Share the link to your friends!' variant='green' show={showAlert} setShow={setShowAlert} />}
      <div className={cx(styles.background, {[styles.fadeIn] : render})}>
        <div className={cx(styles.popup, {[styles.show] : render})}>
        <button className={styles.closePopup} onClick={handleClose}>╳</button>
          <div className={styles.imgWrapper}>
            { imageData && <Image src={imageData.url} alt='' fill={true} sizes='auto'/>}
          </div>
          <div className={styles.imgDetails}>
            <div className={styles.header}>
              { imageData && <h4>{imageData.image_name}</h4>}
              <div className={styles.buttonGroup}>
                <IconButton icon='download' variant='secondary' click={handleDownload}/>
                <IconButton icon='link' variant='secondary' click={handleClick}/>
                { imageData?.has_product && <Button content="Shop" mini={true} variant="primary" click={handleShopClick}/>}
              </div>
            </div>
            <div className={styles.description}>
              { imageData && <p>{imageData.description}</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}