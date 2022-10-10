import {BASE_URL, BASE_URL_IMG, PRODUCTS_URL} from '@utils/config';

async function sedesApi(cementery, country) {
  let url = `${BASE_URL}/affiliate.headquarters.getheadquartersbyid/${cementery._id}`;
  let sedes = [];
  try {
    await fetch(url, {
      method: 'GET',
      redirect: 'follow',
    })
      .then(res => res.json())
      .catch(error => console.error('Error Categoria', error))
      .then(response => {
        response.forEach(sede => {
          if (sede.idCountry == country.value) {
            sedes.push({
              _id: sede._id,
              idAffiliate: sede.idAffiliate,
              idCountry: sede.idCountry,
              code: sede.code,
              name: sede.name,
              description: sede.description,
              image: `${BASE_URL_IMG}${PRODUCTS_URL}${sede.image}`,
              address: sede.address,
              state: sede.state,
              town: sede.town,
            });
          }
        });
      });
    return sedes;
  } catch (error) {
    console.error(error);
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
      .catch(error => console.error('Error Categoria', error))
      .then(response => {
        sedes = {
          _id: response._id,
          idAffiliate: response.idAffiliate,
          idCountry: response.idCountry,
          code: response.code,
          name: response.name,
          description: response.description,
          image: `${BASE_URL_IMG}${PRODUCTS_URL}${response.image}`,
          address: response.address,
          state: response.state,
          town: response.town,
        };
      });
    return sedes;
  } catch (error) {
    console.error(error);
    return sedes;
  }
}

export {sedesApi, sedeApi};
