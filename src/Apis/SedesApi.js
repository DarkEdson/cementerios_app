import {BASE_URL, BASE_URL_IMG, PRODUCTS_URL} from '@utils/config';

async function sedesApi(cementery, country, language) {
  let url = `${BASE_URL}/affiliate.headquarters.getheadquartersbyid/${cementery._id}/${language._id}`;
  console.log('URL EN SEDE', url);
  let sedes = [];
  try {
    await fetch(url, {
      method: 'GET',
      redirect: 'follow',
    })
      .then(res => res.json())
      .catch(error => console.error('Error Categoria', error))
      .then(response => {
        console.log('RESPUESTA EN SEDES API', response);
        response.forEach(sede => {
          if (sede.idCountry == country.value) {
            sedes.push({
              _id: sede._id,
              idAffiliate: sede.idAffiliate,
              idCountry: sede.idCountry,
              code: sede.code,
              name: sede.labels[0].name,
              description: sede.labels[0].description,
              image: `${BASE_URL_IMG}${PRODUCTS_URL}${sede.image}`,
              address: sede.labels[0].address,
              state: sede.labels[0].state,
              town: sede.labels[0].town,
            });
          }
        });
      });
    return sedes;
  } catch (error) {
    console.error('ERROR RETORNANDO SEDES GRUPAL API', error);
    return sedes;
  }
}

async function sedeApi(sedeID) {
  let url = `${BASE_URL}/affiliate.headquarters.show/${sedeID}`;
  let sedes = {};
  try {
    await fetch(url, {
      method: 'GET',
      redirect: 'follow',
    })
      .then(res => res.json())
      .catch(error => console.error('Error SEDE API', error))
      .then(response => {
        console.log('RESPUESTA SEDE INDIVIDUAL API', response);
        sedes = {
          _id: response._id,
          idAffiliate: response.idAffiliate,
          idCountry: response.idCountry,
          code: response.code,
          name: response.labels[0].name,
          description: response.labels[0].description,
          image: `${BASE_URL_IMG}${PRODUCTS_URL}${response.image}`,
          address: response.address,
          state: response.labels[0].state,
          town: response.labels[0].town,
        };
      });
    return sedes;
  } catch (error) {
    console.error('ERROR RETORNANDO SEDE API', error);
    return sedes;
  }
}

export {sedesApi, sedeApi};
