'use client';

import styles from '../styles/home.module.scss'

import Link from 'next/link'
import Image from 'next/image'

import { useRef, useState, useEffect, useContext, useMemo } from 'react'
import { NavbarContext } from '../context/NavbarContextProvider';

import Button from '@root/components/Button'
import ProjectPreview from '@root/components/ProjectPreview'
import Contact from '@root/components/Contact'
import ProjectPreviewSkeleton from '@root/components/ProjectPreviewSkeleton';

import heroImage from '@root/assets/images/Hero image.png'

import { getAllProjects } from '@root/api/projectsClient';

export default function Home() {
  /** Navbar context */
  const { setMode, setIsAlwaysVisible, setIsHiddenMenuVisible } = useContext(NavbarContext);

  useEffect(()=>{
    setIsHiddenMenuVisible(false)
    setMode('artfolio')
    setIsAlwaysVisible(false)
  }, [])


  /** Scroll to contact */
  const contactRef = useRef<HTMLDivElement>(null);

  const scrollToContact = () => {
    if(contactRef.current) contactRef.current.scrollIntoView({ behavior: 'smooth'});
  }

  /** Scroll to projects */
  const projectsRef = useRef<HTMLDivElement>(null);

  const scrollToProjects = () => {
    if(projectsRef.current) projectsRef.current.scrollIntoView({ behavior: 'smooth'});
  }

  /** Get projects */
  const [projectData, setProjectData] = useState([]);
  const [projectHasNotLoaded, setProjectHasNotLoaded] = useState(true)

  const projects = useMemo(() => {
    return projectData;
  }, [projectData]);
  
  useEffect(()=>{
    async function fetchData() {
      const data = await getAllProjects();
      setProjectData(data);
      setProjectHasNotLoaded(false);
    }
    fetchData();
  }, [])

  return (
    <>
      {/* Hero section */}
      <main className={styles.heroContainer}>
        <div className={styles.initialNavbar}>
          <Link href={''}><p><u>Artfolio</u></p></Link>
          <Image src='assets/logo.svg' alt='Website&apos;s logo' height={60} width={120}/>
          <Link href={'/shop'}><p>Shop</p></Link>
        </div>
        <div className={styles.hero}>
          <div className={styles.heroImages}>
            <Image className={styles.heroImage} src={heroImage} alt="" />
          </div>
          <div className={styles.heroDetailsWrapper}>
            <div className={styles.heroDetails}>
              <h1>Hi, I&apos;m Txabi, a <span className={styles.highlight}>digital artist</span> and creator of cute and colorful art</h1>
              <p>I make cute digital arts and I showcase them here in my artfolio, check them out as you please! I have a soft spot for cartoon-ish style though I also try different styles as well.</p>
            </div>
            <div className={styles.heroButtonGroup}>
              <Button variant="primary" content="View works" click={scrollToProjects}/>
              <Button variant="secondary" content="Contact me" click={scrollToContact}/>
            </div>
          </div>
        </div>
      </main>
      {/* Project previews Section */}
      { projectHasNotLoaded && <ProjectPreviewSkeleton />}
      <div className={styles.projectPreview} ref={projectsRef}>
        {projects.map((project, index) => (
          <ProjectPreview key={index} projectData={project}/>
        ))}
      </div>
      {/* Contact Section */}
      <section ref={contactRef}>
        <Contact />
      </section>
    </>
  )
}
