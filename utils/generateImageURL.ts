import axios from 'axios';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

const generateImageURL = async (base64: string, transactionId: number) => {
  const API_BASE64 = publicRuntimeConfig.NEXT_PUBLIC_BUCKETEER;
  const CDN = publicRuntimeConfig.NEXT_PUBLIC_CDN;
  const token = (await axios.get(API_BASE64 + 'csrftoken')).data.csrf_token;

  const body = {
    body: base64,
    key: `mailing/${transactionId}.png`,
    content_type: 'image/png',
    metadata: {
      meta: 'data'
    }
  };

  let config = {
    headers: {
      'Content-Type': 'application/json',
      'x-csrf-token': token
    }
  };

  let result = await axios.post(API_BASE64 + 'putb64', body, config);
  return CDN + result.data.will_upload_to.key;
};

export default generateImageURL;
