
import {BASE_URL,BASE_URL_IMG, COMPANIES_URL} from '@utils/config';


export default async function cementeriesApi(country) {
  let url = `${BASE_URL}/affiliate.getaffiesbycou/${country.value}`;
  let cementerios = [];
  try {
    await fetch(url, {
      method: 'GET',
      redirect: 'follow',
    })
      .then(res => res.json())
      .catch(error => console.error('Error', error))
      .then(response => {
        response.forEach(cementerio => {
            cementerios.push({
            _id: cementerio._id,
            code: cementerio.code,
            name:cementerio.name,
            image: `${BASE_URL_IMG}${COMPANIES_URL}${cementerio.image}`
          });
        });
      });
    return cementerios;
  } catch (error) {
    console.error(error);
    return cementerios;
  }
}