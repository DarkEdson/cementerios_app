
import {BASE_URL} from '@utils/config';


export default async function locationsApi() {
  let url = `${BASE_URL}/country.index`;
  let paises = [];
  try {
    await fetch(url, {
      method: 'GET',
      redirect: 'follow',
    })
      .then(res => res.json())
      .catch(error => console.error('Error', error))
      .then(response => {
        response.forEach(pais => {
          paises.push({
            _id: pais._id,
            code: pais.code,
            name: pais.name,
          });
        });
      });
    return paises;
  } catch (error) {
    console.error(error);
  }
}