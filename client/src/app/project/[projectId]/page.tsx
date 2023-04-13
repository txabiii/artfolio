'use client';

import styles from '../../../styles/projectPage.module.scss'
import { NavbarContext } from '../../../context/NavbarContextProvider';
import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { getProjectById } from '@root/api/projectsClient';
import { getImagesByProject } from '@root/api/imagesClient';
import { useRouter } from 'next/navigation';
import cx from 'classnames'
import ImageView from '../../../components/ImageView'

interface ProjectData {
  project_id: number;
  project_name: string;
  description: string;
}

interface ImageData {
  image_id: number;
  image_name: string;
  description: string;
  url: string;
}

export default function Project({params}: {params: {projectId: number}}){
  const router = useRouter();
  const projectId = params.projectId;
  const [projectData, setProjectData] = useState<ProjectData>({ project_id: 0, project_name: '', description: ''});

  /** Check if project exists, redirect if not */
  useEffect(()=>{
    async function fetchData(){
      const data = await getProjectById(projectId);
      if(!data || data.length === 0) router.push('/');
      else setProjectData(data[0])
    }
    fetchData();
  }, [])

  /** Navbar context */
  const { setIsAlwaysVisible } = useContext(NavbarContext);

  useEffect(()=>{
    setIsAlwaysVisible(true)
  }, [])

  /** Images */
  const [images, setImages] = useState<[ImageData]>([{image_id: 0, image_name: '', description: '', url: ''}]);

  useEffect(()=>{
    async function fetchData(){
      const data = await getImagesByProject(projectId);
      setImages(data);
      setImageHasNotLoaded(false)
      setImageHasLoaded(true)
    };
    fetchData();
  }, [])

  /** For the image popup */
  const [isImageViewVisible, setIsImageViewVisible] = useState(false);
  const [imageId, setImageId] = useState(0);

  function hanndleImageClick(id: number){
    setImageId(id);
    setIsImageViewVisible(true);
  }

  /** If atleast one image has loaded */
  const [imageHasNotLoaded, setImageHasNotLoaded] = useState(true);
  const [imageHasLoaded, setImageHasLoaded] = useState(false);

  return(
    <>
      <ImageView id={imageId} show={isImageViewVisible} setShow={setIsImageViewVisible} />
      <div className={styles.projectPage}>
        <div className={styles.projectDetails}>
          <h1>{ projectData.project_name }</h1>
          <p>{ projectData.description }</p>
        </div>
        <section className={styles.imagesContainer}>
          {/* Images skeleton */}
          { imageHasNotLoaded && <div className={styles.projectImages} style={{height:'500px'}}>
            <div className={cx(styles.imgWrapper, styles.imgSkeleton)}></div>
            <div className={cx(styles.imgWrapper, styles.imgSkeleton)}></div>
          </div>}
          {/* Actual Images */}
          { imageHasLoaded && <div className={styles.projectImages}>
            {
              images.map((image)=>{return(
                <div key={image.image_id} className={styles.imgWrapper}>
                  <Image src={image.url} alt="" fill={true} sizes={"auto, auto, auto"} onClick={() => hanndleImageClick(image.image_id)}/>
                </div>
              )})
            }
          </div>}
        </section>
      </div>
    </>
  )
}