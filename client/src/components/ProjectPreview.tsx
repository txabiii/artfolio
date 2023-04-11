'use client';

import styles from '../styles/projectPreview.module.scss'
import Button from '../components/Button'
import Image from 'next/image'
import ImageView from './ImageView'
import { useState, useEffect } from 'react'
import { getImagesByProject } from '@root/api/imagesClient';
import Link from 'next/link';

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

  return (
    <>
      <ImageView id={imageId} show={isImageViewVisible} setShow={setIsImageViewVisible} />
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
        <div className={styles.projectImages}>
          {
            images.map((item : any, index)=>{return(
              <div key={index} className={styles.imgWrapper}>
                <Image src={item.url} alt="" fill={true} sizes="(max-width: 640px) auto, auto" onClick={() => hanndleImageClick(item.image_id)}/>
              </div>
            )})
          }
        </div>
      </div>
    </>
  )
}