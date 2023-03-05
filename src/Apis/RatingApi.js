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
  console.log('URL EN RATING API', url);
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
          if (prod.financing) {
            console.log(
              'PRODUCTO FINANCING  en API RATING',
              prod.financing,
              prod,
            );
          }
          ratings.push({
            _id: prod._id,
            idCategory: prod.idCategory,
            idHeadquarter: prod.headquarters[0]._id,
            code: prod.code,
            principalImage: `${BASE_URL_IMG}${PRODUCTS_URL}${prod.image}`,
            name: prod.labels[0].name,
            description: prod.labels[0].description,
            price: prod.headquarters[0].price,
            currency: prod.headquarters[0].currency,
            ranking: prod.ranking,
            financing: prod.financing
              ? prod.financing
              : [
                  {
                    number_of_installments: '0',
                    percentage: '100',
                  },
                ],
            type: prod.type ? prod.type : '1',
          });
        });
      });
    return ratings;
  } catch (error) {
    console.error(error);
    return ratings;
  }
}

async function getRatingCommentsApi(lenguajeid, countryID, productID) {
  let url = `${BASE_URL}/ranking.getrankingswithcomsbyprod/${lenguajeid}/${countryID}/${productID}`;
  let ratings = [];
  try {
    await fetch(url, {
      method: 'GET',
      redirect: 'follow',
    })
      .then(res => res.json())
      .catch(error => console.error('Error Rating', error))
      .then(response => {
        console.log('RESPUESTA GET RATINGS COMMENTS API', response);
        response.forEach(prod => {
          ratings.push({
            _id: prod._id,
            idCategory: prod.idCategory,
            idAffiliate: prod.idAffiliate,
            code: prod.code,
            principalImage: `${BASE_URL_IMG}${PRODUCTS_URL}${prod.image}`,
            name: prod.labels[0].name,
            description: prod.labels[0].description,
            price: prod.labels[0].price,
            comment: prod.comment,
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

async function findProductSell(lenguajeid, userID, productID) {
  let url = `${BASE_URL}/sale.getprodbyidanduser/${lenguajeid}/${productID}/${userID}`;
  console.log('URL de PRODUCTO VENDIDO EN RANKING', url);
  let sellprod = [];
  try {
    await fetch(url, {
      method: 'GET',
      redirect: 'follow',
    })
      .then(res => res.json())
      .catch(error => console.error('Error SALE', error))
      .then(response => {
        console.log('RESPUESTA SI EL PRODUCTO FUE COMPRADO API', response);
        response.forEach(prod => {
          sellprod.push({
            _id: prod._id,
            idCategory: prod.idCategory,
            idAffiliate: prod.idAffiliate,
            code: prod.code,
            principalImage: `${BASE_URL_IMG}${PRODUCTS_URL}${prod.image}`,
            name: prod.labels[0].name,
            description: prod.labels[0].description,
            price: prod.headquarters[0].price,
          });
        });
      });
    return sellprod;
  } catch (error) {
    console.error(error);
    return sellprod;
  }
}

export {createRatingApi, getRatingsApi, getRatingCommentsApi, findProductSell};
