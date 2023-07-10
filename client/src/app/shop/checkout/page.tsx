'use client';

import styles from '@root/styles/cartPage.module.scss';
import checkoutStyles from '@root/styles/checkoutPage.module.scss';
import cx from 'classnames'

import Image from 'next/image';
import Button from '@root/components/Button';
import Expand from '@root/assets/icons/expand.svg';
import Alert from '@root/components/Alert';

import { useEffect, useContext, useRef, useState } from 'react'

import { NavbarContext } from '@root/context/NavbarContextProvider';
import { CartContext } from '@root/context/CartContextProvider';

import scrollToTop from '@root/utils/scrollToTop';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CheckoutPage(){
  /** Router */
  const router = useRouter();

  const { cartItems } = useContext(CartContext);

  /** Navbar context */
  const { setMode, setIsAlwaysVisible, setIsHiddenMenuVisible } = useContext(NavbarContext);

  useEffect(()=>{
    scrollToTop();

    setIsHiddenMenuVisible(false)
    setMode('shop')
    setIsAlwaysVisible(true)
  }, [])

  /** Handle cart summary expansion */
  const summaryRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null)
  let toggle: boolean = false;

  function handleSummaryExpansion() {
    if (window.innerWidth >= 600) return;
    if(summaryRef.current && arrowRef.current) {
      if(toggle) { 
        summaryRef.current.style.height = '8.3rem';
        arrowRef.current.style.transform = 'rotateZ(180deg)';
      }
      else {
        summaryRef.current.style.height = 'unset';
        arrowRef.current.style.transform = 'unset';
      }
    }
    toggle = !toggle;
  }

  /** Handle input change */
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    state: '',
    country: '',
    zipCode: '',
    credit: '',
    expiration: '',
    cvv: ''
  });

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }

  /** Handle form Submit */
  const [showAlert, setShowAlert] = useState(false)
  const [alertTitle, setAlertTitle] = useState('')
  const [alertMessage, setAlertMessage] = useState('')
  const [alertVariant, setAlertVariant] = useState('')

  function handleFormSubmit() {
    const inputArrays = Object.values(formState);
    const hasEmptyString = inputArrays.some(val => val === '');

    if(!hasEmptyString) {
      setAlertTitle('Thank you!');
      setAlertMessage(`Thanks for interacting with the website. Rest assured no data has been submitted in these forms. For actual products you can go to redbubble.com or etsy.com. Once again, thank you!`);
      setAlertVariant('green');
    } else {
      setAlertTitle('Form incomplete');
      setAlertMessage('One or more fields are missing inputs.');
      setAlertVariant('red');
    }
    setShowAlert(true);
  }

  /** Grand total */
  const grandTotal = (cartItems.reduce((total, item) => total + (item.product.price * item.quantity),0) + 5.99).toFixed(2);

  return(
    <div>
      { showAlert && <Alert permanent={true} title={alertTitle} variant={alertVariant} show={showAlert} setShow={setShowAlert} message={alertMessage} />}
      <div className={cx(styles.cartHeader, checkoutStyles.cartHeader)}>
        <div className={styles.cartDetails}>
          <div className={styles.cartDetailsLeft}>
            <Link href='/shop/cart'><p>back to cart</p></Link>
            <h5>Checkout</h5>
          </div>
          <div className={styles.amount}>
            <p>Grand Total</p>
            <h5>${grandTotal}</h5>
          </div>
        </div>
      </div>
      <div className={checkoutStyles.checkoutContent}>
        {/* Cart Summary */}
        <div className={checkoutStyles.cartSummary} ref={summaryRef}>
          <div className={checkoutStyles.cartSummaryHeader} onClick={handleSummaryExpansion}>
            <h4>Order Summary</h4>
            <div className={checkoutStyles.expandMore} ref={arrowRef}>
              <Image src={Expand} alt='filter expand more'/>
            </div>
          </div>
          {
            cartItems &&
            cartItems.map((item, index) => (
              <div key={index} className={checkoutStyles.productDetails}>
                <p>{item.quantity + ' - ' + item.product.product_name}</p>
                <p>${(item.product.price * item.quantity).toFixed(2)}</p>
              </div>
            ))
          }
          <div className={checkoutStyles.totalDetails}>
            <p>Shipping fee</p>
            <p>$5.99</p>
          </div>
          <div className={checkoutStyles.totalDetails}>
            <p>Grand total</p>
            <p>${grandTotal}</p>
          </div>
        </div>
        <div>
          <div className={cx(checkoutStyles.checkoutDetails, checkoutStyles.shippingDetails)}>
            <h3>Shipping Details</h3>
            <form autoComplete='off' className={checkoutStyles.checkoutForm}>
              <div className={checkoutStyles.threeInputs}>
                <div className={checkoutStyles.twoInputs}>
                  <label>
                    First Name:
                    <input type="text" name="firstName" value={formState.firstName} onChange={handleInputChange} />
                  </label>
                  <label>
                    Last Name:
                    <input type="text" name="lastName" value={formState.lastName} onChange={handleInputChange} />
                  </label>
                </div>
                <label>
                  Email Address:
                  <input type="email" name="email" value={formState.email} onChange={handleInputChange} />
                </label>
              </div>
              <label>
                Address:
                <input type="text" name="address" value={formState.address} onChange={handleInputChange} />
              </label>
              <div className={checkoutStyles.threeInputs}>
                <div className={checkoutStyles.twoInputs}>
                  <label>
                    State/Region:
                    <input type="text" name="state" value={formState.state} onChange={handleInputChange} />
                  </label>
                  <label>
                    Country:
                    <input type="text" name="country" value={formState.country} onChange={handleInputChange} />
                  </label>
                </div>
                <label>
                  Zip Code:
                  <input type="text" name="zipCode" value={formState.zipCode} onChange={handleInputChange} />
                </label>
              </div>
            </form>
          </div>
          <div className={checkoutStyles.checkoutDetails}>
            <h3>Payment Details</h3>
            <div className={checkoutStyles.notice}>
              <h6><b>NOTICE:</b> This is only a demo website. Do not put your actual credit/debit card information.</h6>
            </div>
            <form autoComplete='off' className={checkoutStyles.checkoutForm}>
              <label>
                Credit/Debit card number:
                <input type="text" name="credit" value={formState.credit} onChange={handleInputChange} />
              </label>
              <div className={checkoutStyles.twoInputs}>
                <label>
                  Expiration date:
                  <input type="text" name="expiration" value={formState.expiration} onChange={handleInputChange} />
                </label>
                <label>
                  CVV:
                  <input type="text" name="cvv" value={formState.cvv} onChange={handleInputChange} />
                </label>                
                <label className={checkoutStyles.emptyLabel}></label>
              </div>
            </form>
            <div className={checkoutStyles.placeOrder}>
              {/* <p>By clicking Place your order you understand that this is only a demo website and we held no liability in handling the information you submit through this form.</p> */}
              <Button click={handleFormSubmit} content={`Place order ($${grandTotal})`} variant='primary'/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}