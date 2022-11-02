import {BASE_URL, BASE_URL_IMG, PRODUCTS_URL} from '@utils/config';

async function createRatingApi(califica) {
  let url = `${BASE_URL}/ranking.create`;
  let rating = {};
  try {
    let data = califica;
    console.log('RATING A CREAR: ', data);
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then(res => res.json())
      .catch(error =>
        console.error('Error en RESPUESTA API CREAR RATING', error),
      )
      .then(response => {
        console.log('dentro del API CREAR RATING');
        console.log(response);
        rating = response;
      });
    return rating;
  } catch (error) {
    console.error('ERROR EN API CREAR RATING', error);
    return rating;
  }
}

async function getRatingsApi(lenguajeid, countryID) {
  let url = `${BASE_URL}/ranking.getrankings/${lenguajeid}/${countryID}`;
  let ratings = [];
  try {
    await fetch(url, {
      method: 'GET',
      redirect: 'follow',
    })
      .then(res => res.json())
      .catch(error => console.error('Error Rating', error))
      .then(response => {
        console.log('RESPUESTA GET RATINGS API', response);
        response.forEach(prod => {
          ratings.push({
            _id: prod._id,
            idCategory: prod.idCategory,
            idHeadquarter: prod.idHeadquarter,
            code: prod.code,
            principalImage: `${BASE_URL_IMG}${PRODUCTS_URL}${prod.image}`,
            name: prod.labels[0].name,
            description: prod.labels[0].description,
            price: prod.labels[0].price,
            ranking: prod.ranking,
          });
        });
      });
    return ratings;
  } catch (error) {
    console.error(error);
    return ratings;
  }
}

export {createRatingApi, getRatingsApi};
