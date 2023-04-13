'use client';

import styles from '../styles/contact.module.scss'
import mail from 'public/assets/icons/mail.svg'
import phone from 'public/assets/icons/phone.svg'
import work from 'public/assets/icons/work.svg'
import Image from 'next/image'
import Button from './Button';
import { sendMessage } from '@root/api/messagesClient';

import { useState } from 'react'

export default function Contact () {
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

  return(
    <section className={styles.contact}>
      <h2>Let&apos;s connect</h2>
      <div className={styles.contactIntro}>
        <div className={styles.contactText}>
          <p>If you would like to collaborate or have any inquiries about my work, please don&apos;t hesitate to get in touch.</p>
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
  )
}