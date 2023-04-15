'use client';

import styles from '../../../styles/projectPage.module.scss'
import cx from 'classnames'
import { NavbarContext } from '../../../context/NavbarContextProvider';
import { useContext, useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

import { getProjectById } from '@root/api/projectsClient';
import { getImagesByProject } from '@root/api/imagesClient';

import ImageView from '../../../components/ImageView'
import Button from '@root/components/Button';

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
  /** Get url parameters */
  const searchParams = useSearchParams();

  useEffect(()=>{
    const urlId = searchParams.get('image_id');
    if(urlId) {
      setImageId(parseInt(urlId));
      setIsImageViewVisible(true);
    }
  }, [])

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
    router.push(`/project/${projectData.project_id}?image_id=${id}`)
  }

  /** When the ImageView is closed */
  useEffect(()=>{
    if(images.length === 1) return;
    if(!isImageViewVisible) router.push(`/project/${projectId}`)
  }, [isImageViewVisible])

  /** If atleast one image has loaded */
  const [imageHasNotLoaded, setImageHasNotLoaded] = useState(true);
  const [imageHasLoaded, setImageHasLoaded] = useState(false);

  /** Handle Read more */
  const descriptionRef = useRef<HTMLDivElement>(null);
  const [isDescriptionHidden, setIsDescriptionHidden] = useState(false)
  function handleReadMore() {
    if(descriptionRef.current){
      descriptionRef.current.classList.remove(styles.hidden);
      setIsDescriptionHidden(true);
    }
  }

  function handleShowLess() {
    if(descriptionRef.current){
      descriptionRef.current.classList.add(styles.hidden);
      setIsDescriptionHidden(false);
    }
  }

  return(
    <>
      <ImageView id={imageId} show={isImageViewVisible} setShow={setIsImageViewVisible} />
      <div className={styles.projectPage}>
        <div className={styles.projectDetails}>
          <h1>{ projectData.project_name }</h1>
          <p ref={descriptionRef} className={styles.hidden}>{ projectData.description }</p>
          { projectData.project_id !== 0 && !isDescriptionHidden && 
            <Button click={handleReadMore} content='Read more' variant='secondary' mini={true}/>
          }
          { isDescriptionHidden && <Button click={handleShowLess} content='Show less' variant='secondary' mini={true}/>}
        </div>
        <section className={styles.imagesContainer}>
          {/* Images skeleton */}
          { imageHasNotLoaded && <div className={cx(styles.projectImages)} style={{height:'500px'}}>
            <div className={cx(styles.imgWrapper, styles.imgSkeleton)}></div>
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