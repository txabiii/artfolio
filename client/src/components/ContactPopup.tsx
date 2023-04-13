import styles from '../styles/popup.module.scss'
import Button from './Button'
import { useEffect, useState, useRef } from 'react';
import cx from 'classnames'
import useEscapeKey from '@root/utils/useEscapeKey';
import { sendMessage } from '@root/api/messagesClient';

export default function ContactPopup({ offset, mode = 'artfolio', show = false, setShow }: any): JSX.Element {
  /** Form Submission */
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  function handleSubmit(event:any) {
    event.preventDefault();
    sendMessage(name, email, message)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  /** Popup setup */

  const popup = useRef<HTMLDivElement>(null)

  useEffect(()=>{
    if(popup.current){
      popup.current.style.marginTop = `calc(${offset}px + 20px)`;
    }
  }, [offset,show])

  /** Popup animation */

  const [render, setRender] = useState(false);

  useEffect(()=>{
    if(show) {
      setRender(true);
    } else {
      setRender(false)
    }
  }, [show])

  /** Close popup on escape */
  useEscapeKey(()=>{
    setShow(false);
  })

  return (
    <>
      { show && <div className={styles.background}>
        <div ref={popup} className={cx(styles.popup, {[styles.show] : render})}>
          <div className={styles.popupHeader}>
            <h3>{ mode === 'artfolio' ? `Let's have a chit chat!` : 'Got any issues?'}</h3>
            <button className={styles.closePopup} onClick={() => setShow(false)}>╳</button>
          </div>
          <form onSubmit={handleSubmit} autoComplete='off'>
          <div className={styles.contactForm}>
            <div className={styles.formLeft}>
              <div>
                <label htmlFor="name"><p><b>Name:</b></p></label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="email"><p><b>Email address:</b></p></label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
            </div>
            <div className={styles.formRight}>
              <label htmlFor="message"><p><b>Message:</b></p></label>
              <textarea
                id="message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                required
              />
            </div>
          <Button content="Submit"/>
          </div>
          </form>
        </div>
      </div>}
    </>
  )
}