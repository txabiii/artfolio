'use client';

import styles from '../styles/contact.module.scss'
import mail from 'public/assets/icons/mail.svg'
import phone from 'public/assets/icons/phone.svg'
import work from 'public/assets/icons/work.svg'
import Image from 'next/image'
import Button from './Button'
import Alert from './Alert';
import { sendMessage } from '@root/api/messagesClient';

import { useState } from 'react'

export default function Contact ({ mode = 'artfolio' }: any) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [title, setTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [variant, setVariant] = useState('');

  function handleSubmit(event:any) {
    event.preventDefault();
    sendMessage(name, email, message)
    .then((response) => {
      setShowAlert(true);
      setTitle(response.status);
      setAlertMessage(response.message);

      if(response.status === 'success'){
        setVariant('green')
      } else  setVariant('red');
    })
    .catch((error) => {
      console.log(error);
    });
  }

  /** Alert component */
  const [showAlert, setShowAlert] = useState(false);

  return(
    <>
      { showAlert && <Alert title={title} message={alertMessage} variant={variant} show={showAlert} setShow={setShowAlert}/>}
      <section className={styles.contact}>
        { mode === 'artfolio' && <h2>Let&apos;s connect</h2>}
        { mode === 'shop' && <h2>Got any issues?</h2>}
        <div className={styles.contactIntro}>
          <div className={styles.contactText}>
            { mode === 'artfolio' && <p>If you would like to collaborate or have any inquiries about my work, please don&apos;t hesitate to get in touch.</p>}
            { mode === 'shop' && <p>If you have any feedbacks or issues with our products please feel free to send us a message.</p>}
          </div>
          <div className={styles.contactDetails}>
            <div>
              <Image src={mail} alt='mail icon'/>
              <p>txabiguerrero2000@gmail.com</p>
            </div>
            <div>
              <Image src={phone} alt='phone icon'/>
              <p>+63 966 990 1844</p>
            </div>
            <div>
              <Image src={work} alt='work icon'/>
              <p>Quezon City, Philippines</p>
            </div>
          </div>
        </div>
        {/* Contact Form */}
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
          </div>
          <Button content="Submit"/>
        </form>
      </section>
    </>
  )
}