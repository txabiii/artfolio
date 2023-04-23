'use client';

import styles from '../styles/projectPreview.module.scss'

import Button from '../components/Button'
import IconButton from './IconButton';

import Image from 'next/image'
import Link from 'next/link';
import dynamic from 'next/dynamic'

import { useState, useEffect, useRef } from 'react'

import { getImagesByProject } from '@root/api/imagesClient';

const ImageView = dynamic(() => import('./ImageView'), {
  ssr: false,
})

export default function ProjectPreview({ projectData } : any): JSX.Element {
  /** Setup images */
  const [images, setImages] = useState([]);

  useEffect(()=>{
    async function fetchData(){
      const data = await getImagesByProject(projectData.project_id, 5);
      setImages(data);
    }
    fetchData();
  }, [])

  /** For the image popup */
  const [isImageViewVisible, setIsImageViewVisible] = useState(false);
  const [imageId, setImageId] = useState(0);

  function hanndleImageClick(id: number){
    setImageId(id);
    setIsImageViewVisible(true);
  }

  /** For the left and right arrow buttons */
  const imagesRef = useRef<HTMLDivElement>(null)

  function handleLeftArrowClick() {
    if(imagesRef.current) {
      const firstImage = imagesRef.current.firstChild as HTMLElement;
      const imageWidth = firstImage.offsetWidth;
      imagesRef.current.scrollTo({
        left: imagesRef.current.scrollLeft - imageWidth,
        behavior: 'smooth'
      });
    }
  }

  function handleRightArrowClick() {
    if(imagesRef.current) {
      const firstImage = imagesRef.current.firstChild as HTMLElement;
      const imageWidth = firstImage.offsetWidth;
      imagesRef.current.scrollTo({
        left: imagesRef.current.scrollLeft + imageWidth,
        behavior: 'smooth'
      });
    }
  }

  return (
    <>
      { isImageViewVisible && <ImageView id={imageId} show={isImageViewVisible} setShow={setIsImageViewVisible}/>}
      <div className={styles.projectPreview}>
        <div className={styles.projectDetails}>
          <div className={styles.projectHeader}>          
            <h2>{ projectData.project_name }</h2>
            <Link href={'/project/'+projectData.project_id}>
              <Button content="View project" variant="secondary" mini={true} />
            </Link>
          </div>
          <p>{ projectData.description }</p>
        </div>
        <div className={styles.projectImages} ref={imagesRef}>
          {
            images.map((item : any, index)=>{return(
              <div key={index} className={styles.imgWrapper}>
                <Image src={item.url} alt="" fill={true} sizes="(max-width: 640px) auto, auto" onClick={() => hanndleImageClick(item.image_id)}/>
              </div>
            )})
          }
        </div>
        <div className={styles.arrowButton} onClick={handleLeftArrowClick}>
          <IconButton icon='left-arrow' variant='secondary'/>
        </div>
        <div className={styles.arrowButton} onClick={handleRightArrowClick}>
          <IconButton icon='right-arrow' variant='secondary'/>
        </div>
      </div>
    </>
  )
}
