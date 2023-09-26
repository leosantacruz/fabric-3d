import axios from 'axios';
import { Car } from '@/interfaces/general';
import { colorList } from '@/data/colors';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

const sendEmail = async (
  contactForm: any,
  imageUrl: string,
  car: Car,
  transactionId: number,
  emailType: string
) => {
  const API_MAIL = publicRuntimeConfig.NEXT_PUBLIC_MAIL;

  const token = (await axios.get(API_MAIL + 'csrftoken')).data.csrf_token;

  try {
    let config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-csrf-token': token
      }
    };
    let bccs: { email: string }[] = [];
    if (emailType == 'enquire') {
      bccs = [{ email: 'sales@thelittlecar.co' }];
    }
    const mailData = {
      from_email: 'sales@thelittlecar.co',
      tos: [{ email: contactForm.email }],
      subject: 'Your Bentley Configuration',
      template_id: 'ferrari',
      template_data: {
        websiteURL: publicRuntimeConfig.NEXT_PUBLIC_WEBSITE_URL,
        id: transactionId,
        name: contactForm.firstName,
        imageUrl: imageUrl,
        model: car.model.name,
        paintwork: colorList[car.Paintwork.id - 1].name,
        interior: colorList[car.Interior.id - 1].name,
        piping: colorList[car.Piping.id - 1].name,
        livery: colorList[car.Livery.id - 1].name,
        tonneau: colorList[car.Tonneau.id - 1].name,
        racePack: car.racePack == 'Base' ? 'Standard' : 'Pacco Gara',
        number: car.radiatorNumber.number ? car.radiatorNumber.number : '-',
        borranniPack: car.borranniUpgrade ? 'Yes' : 'No'
      },
      ccs: [],
      bccs: bccs,
      dev_mode: false
    };

    const formData = new FormData();
    formData.append('mail', JSON.stringify(mailData));
    const resp = await axios.post(API_MAIL + 'send', formData, config);
  } catch (err) {
    console.error(err);
  }
};

export default sendEmail;
