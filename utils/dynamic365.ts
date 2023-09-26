import axios from 'axios';
import { Car, ContactForm } from '@/interfaces/general';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

const Dynamic365 = async (options: Car, transactionId: number, contactForm: ContactForm) => {
  const API_DYNAMIC365 = publicRuntimeConfig.NEXT_PUBLIC_DYNAMIC365;
  const token = (await axios.get(API_DYNAMIC365 + 'csrftoken')).data.csrf_token;
  options;
  let config = {
    headers: {
      'Content-Type': 'application/json',
      'x-csrf-token': token
    }
  };
  let product_enquiry_list = {
    Base: { name: 'Bentley' },
    'Pacco Gara': { name: 'Bentley' }
  };

  let racePackSelected = options.racePack as 'Base' | 'Pacco Gara';

  let body = {
    id: transactionId,
    options: {
      product_enquiry: product_enquiry_list[racePackSelected].name as string
    },
    lead: {
      firstname: contactForm.firstName,
      lastname: contactForm.lastName,
      mobilephone: '12345678',
      emailaddress1: contactForm.email
    }
  };

  return await axios.post(API_DYNAMIC365 + 'lead', body, config);
};

export default Dynamic365;
