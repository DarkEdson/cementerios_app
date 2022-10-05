
import {BASE_URL} from '@utils/config';


export default async function categoriesApi() {
  let url = `${BASE_URL}/category.getcatsbycou/`;
  let categorias = [];
  try {
    await fetch(url, {
      method: 'GET',
      redirect: 'follow',
    })
      .then(res => res.json())
      .catch(error => console.error('Error', error))
      .then(response => {
        response.forEach(categoria => {
            categorias.push({
            _id: categoria._id,
            code: categoria.code,
            name: categoria.name,
          });
        });
      });
    return categorias;
  } catch (error) {
    console.error(error);
  }
}