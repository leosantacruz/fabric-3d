import axios from 'axios';
import { Car } from '@/interfaces/general';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

const saveToBucket = async (options: Car, transactionId: number) => {
  const API_JSON = publicRuntimeConfig.NEXT_PUBLIC_JSON;
  const CDN = publicRuntimeConfig.NEXT_PUBLIC_CDN;

  const token = (await axios.get(API_JSON + 'csrftoken')).data.csrf_token;
  let config = {
    headers: {
      'Content-Type': 'application/json',
      'x-csrf-token': token
    }
  };
  let body = {
    id: transactionId,
    options: options
  };

  return await axios.post(API_JSON + 'json-api', body, config);
};

export default saveToBucket;
