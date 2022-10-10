
import {BASE_URL,BASE_URL_IMG, CATEGORIES_URL} from '@utils/config';


 async function categoriesApi(country,lenguaje) {
  let url = `${BASE_URL}/category.getcatsbycou/${country.value}/${lenguaje._id}`;
  let categorias = [];
  try {
    await fetch(url, {
      method: 'GET',
      redirect: 'follow',
    })
      .then(res => res.json())
      .catch(error => console.error('Error Categoria', error))
      .then(response => {
        response.forEach(categoria => {
            categorias.push({
            _id: categoria._id,
            code: categoria.code,
            image: `${BASE_URL_IMG}${CATEGORIES_URL}${categoria.image}`,
            name:categoria.labels[0].name,
            description:categoria.labels[0].description,
          });
        });
      });
    return categorias;
  } catch (error) {
    console.error(error);
    return categorias;
  }
}

async function categoryApi(idCategory) {
  let url = `${BASE_URL}/category.show/${idCategory}`;
  let categorias = {};
  try {
    await fetch(url, {
      method: 'GET',
      redirect: 'follow',
    })
      .then(res => res.json())
      .catch(error => console.error('Error Categoria', error))
      .then(response => {
            categorias={
            _id: response._id,
            code: response.code,
            image: `${BASE_URL_IMG}${CATEGORIES_URL}${response.image}`,
            name:response.labels[0].name,
            description:response.labels[0].description,
          }
      });
    return categorias;
  } catch (error) {
    console.error(error);
    return categorias;
  }
}

export {
  categoriesApi,
  categoryApi
}