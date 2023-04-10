'use client';

import styles from '../../../styles/projectPage.module.scss'
import { NavbarContext } from '../../../context/NavbarContextProvider';
import { useContext, useEffect } from 'react';
import Image from 'next/image';
import Contact from '@root/components/Contact';

export default function Project({params}: {params: {projectName: string}}){
  const projectTitle = params.projectName;

  /** Navbar context */
  const { isAlwaysVisible, setIsAlwaysVisible } = useContext(NavbarContext);

  useEffect(()=>{
    setIsAlwaysVisible(true)
  }, [])

  /** Images */

  const images = [
    '/assets/skribols/a.png',
    '/assets/skribols/b.png',
    '/assets/skribols/c.png',
    '/assets/skribols/d.png',
    '/assets/skribols/e.png',
    '/assets/skribols/f.png',
    '/assets/skribols/g.png',
    '/assets/skribols/h.png',
    '/assets/skribols/i.jpg',
    '/assets/skribols/j.png',
    '/assets/skribols/k.png',
    '/assets/skribols/l.png',
    '/assets/skribols/m.png',
    '/assets/skribols/n.png',
  ]

  return(
    <div className={styles.projectPage}>
      <div className={styles.projectDetails}>
        <h1>{ projectTitle }</h1>
        <p>Skribols is a project that I made in early 2022. I drew it in cute chibi anime style. Most of them are fanart of Genshin Impact characters but I also have my own original characters. My inspiration is anime, chibi, and the artist XXXPPI</p>
      </div>
      <section className={styles.imagesContainer}>
        <div className={styles.projectImages}>
          {
            images.map((item, index)=>{return(
              <div key={index} className={styles.imgWrapper}>
                <Image src={item} alt="" fill={true} sizes={"auto, auto, auto"}/>
              </div>
            )})
          }
        </div>
      </section>
    </div>
  )
}