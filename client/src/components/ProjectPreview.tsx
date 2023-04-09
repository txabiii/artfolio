import styles from '../styles/projectPreview.module.scss'
import Button from '../components/Button'
import Image from 'next/image'

export default function ProjectPreview({ projectName = 'Project' } : any): JSX.Element {
  const images = [
    '/assets/skribols/a.png',
    '/assets/skribols/b.png',
    '/assets/skribols/c.png',
    '/assets/skribols/d.png',
    '/assets/skribols/e.png',
  ]

  return (
    <div className={styles.projectPreview}>
      <div className={styles.projectDetails}>
        <div className={styles.projectHeader}>          
          <h2>{ projectName }</h2>
          <Button content="View project" variant="secondary" mini={true} />
        </div>
        <p>Skribols is a project that I made in early 2022. I drew it in cute chibi anime style. Most of them are fanart of Genshin Impact characters but I also have my own original characters. My inspiration is anime, chibi, and the artist XXXPPI</p>
      </div>
      <div className={styles.projectImages}>
        {
          images.map((item, index)=>{return(
            <div key={index} className={styles.imgWrapper}>
              <Image src={item} alt="" fill={true}/>
            </div>
          )})
        }
      </div>
    </div>
  )
}