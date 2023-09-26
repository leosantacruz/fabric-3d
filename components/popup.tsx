import { useEffect, useState } from 'react';
import Image from 'next/image';
import close from 'public/img/close.svg';
import { useCarStore, useModelStore } from '@/store/store';
import generateImageURL from '@/utils/generateImageURL';
import sendEmail from '@/utils/sendEmail';
import saveToBucket from '@/utils/saveToBucket';
import Dynamic365 from '@/utils/dynamic365';
import { generateScreenshot } from '@/utils/sketchfab';

import Preloader from '@/components/elements/preloader';

interface ModalProps {
  showModal: () => void;
}

const Modal = ({ showModal }: ModalProps) => {
  const store = useCarStore((state: any) => state);

  const [formSent, setFormSent] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailType, setEmailType] = useState('');

  const [contactForm, setContactForm] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  const [formValid, setFormValid] = useState(false);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setContactForm((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      contactForm.firstName &&
      contactForm.lastName &&
      contactForm.email &&
      emailRegex.test(contactForm.email)
    ) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [contactForm]);

  const closeMessage = () => {
    showModal();
    setFormSent(true);
  };
  const sendForm = async (emailType: string) => {
    if (contactForm.firstName && contactForm.lastName && contactForm.email) {
      setLoading(true);
      let transactionId = new Date().valueOf();
      let lead = Dynamic365(store.car, transactionId, contactForm);
      let base64 = String(await generateScreenshot());
      let imageUrl = await generateImageURL(base64, transactionId);
      let JSONdata = await saveToBucket(store.car, transactionId);
      let emailRespond = await sendEmail(
        contactForm,
        imageUrl,
        store.car,
        transactionId,
        emailType
      );
      setEmailType(emailType);
      setFormSent(true);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="modal">
        {!formSent === true && (
          <div className="popup">
            <h4>
              RESERVE YOUR MODEL
              <Image onClick={showModal} src={close} alt="Close popup" />
            </h4>
            <p>To reserve an allocation please enter your details</p>

            <div className="twoColumnns">
              <label htmlFor="">
                First name
                <input
                  type="text"
                  name="firstName"
                  value={contactForm.firstName}
                  onChange={handleInputChange}
                />
              </label>

              <label htmlFor="">
                Last name
                <input
                  type="text"
                  name="lastName"
                  value={contactForm.lastName}
                  onChange={handleInputChange}
                />
              </label>
            </div>

            <label htmlFor="">
              Email
              <input
                type="text"
                name="email"
                value={contactForm.email}
                onChange={handleInputChange}
              />
            </label>

            <div className="btn-modal">
              {!loading && (
                <>
                  <div
                    onClick={() => {
                      sendForm('save');
                    }}
                    className={!formValid ? 'disabled btn white' : 'btn white'}
                  >
                    Save configuration
                  </div>
                  <div
                    onClick={() => {
                      sendForm('enquire');
                    }}
                    className={!formValid ? 'disabled btn green' : 'btn green'}
                  >
                    Enquire
                  </div>
                </>
              )}

              {loading && (
                <>
                  <Preloader width={'100px'} height={'50px'} />
                </>
              )}
            </div>
          </div>
        )}
        {formSent && (
          <div className="popup text-center successMessage fadeIn">
            <svg viewBox="0 0 24 24" fill="none" width="120px" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                stroke="#fff"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7.75 12L10.58 14.83L16.25 9.17004"
                stroke="#fff"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            {emailType == 'save' && (
              <>
                <h1>Configuration saved</h1>

                <p>
                  We have sent you a link to your email address so you can access your configuration
                  at any time.
                </p>
              </>
            )}

            {emailType == 'enquire' && (
              <>
                <h1>Our Sales team will be in touch shortly</h1>

                <p>
                  Also, we have sent you a link to your email address so you can access your
                  configuration at any time.
                </p>
              </>
            )}

            <div className="btn-modal">
              <div className="btn primary" onClick={closeMessage}>
                Go back to the configurator
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Modal;
