
import {BASE_URL} from '@utils/config';


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

async function getRatingsApi(lenguajeid) {
 let url = `${BASE_URL}/ranking.getrankings/${lenguajeid}`;
 let ratings = [];
 try {
   await fetch(url, {
     method: 'GET',
     redirect: 'follow',
   })
     .then(res => res.json())
     .catch(error => console.error('Error Rating', error))
     .then(response => {
        console.log(response)
           ratings=response
     });
   return ratings;
 } catch (error) {
   console.error(error);
   return ratings;
 }
}

export {
 createRatingApi,
 getRatingsApi
}