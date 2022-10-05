
import {BASE_URL} from '@utils/config';


export default async function categoriesApi(country,lenguaje) {
  let url = `${BASE_URL}/category.getcatsbycou/${country.value}/${lenguaje._id}`;
  let categorias = [];
  try {
    await fetch(url, {
      method: 'GET',
      redirect: 'follow',
    })
      .then(res => res.json())
      .catch(error => console.error('Error', error))
      .then(response => {
        console.log(response)
        response.forEach(categoria => {
            categorias.push({
            _id: categoria._id,
            code: categoria.code,
            image: categoria.image,
            name:categoria.labels[0].name,
            description:categoria.labels[0].description,
          });
        });
      });
    return categorias;
  } catch (error) {
    console.error(error);
  }
}