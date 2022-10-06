import {BASE_URL, BASE_URL_IMG, PRODUCTS_URL} from '@utils/config';

async function productbyCountry(country, lenguaje) {
  let url = `${BASE_URL}/product.getprodsbycou/${country.value}/${lenguaje._id}`;
  let productos = [];
  try {
    await fetch(url, {
      method: 'GET',
      redirect: 'follow',
    })
      .then(res => res.json())
      .catch(error => console.error('Error', error))
      .then(response => {
        response.forEach(producto => {
          productos.push({
            _id: producto._id,
            idCategory: producto.idCategory,
            idHeadquarter: producto.idHeadquarter,
            code: producto.code,
            principalImage: `${BASE_URL_IMG}${PRODUCTS_URL}${producto.image}`,
            name: producto.labels[0].name,
            description: producto.labels[0].description,
            price: producto.labels[0].price,
          });
        });
      });
    return productos;
  } catch (error) {
    console.error(error);
    return productos;
  }
}

async function productFullbyCategory(product, lenguaje) {
  console.log(product, 'FULL PROD PRODUCT');
  let url = `${BASE_URL}/product.findbyidandlan/${product._id}/${lenguaje._id}`;
  let productos = {};
  try {
    await fetch(url, {
      method: 'GET',
      redirect: 'follow',
    })
      .then(res => res.json())
      .catch(error => console.error('Error FULL PROD', error))
      .then(response => {
        console.log(response, 'FULL PROD RESPONSE');
        productos = {
          _id: response._id,
          idCategory: response.idCategory,
          idHeadquarter: response.idHeadquarter,
          code: response.code,
          principalImage: `${BASE_URL_IMG}${PRODUCTS_URL}${response.image}`,
          name: response.labels[0].name,
          description: response.labels[0].description,
          price: response.labels[0].price,
        };
      });
    return productos;
  } catch (error) {
    console.error(error, 'FULL PROD RETURN');
    return productos;
  }
}

async function productbyCategory(Category) {
  let url = `${BASE_URL}/product.getprdsbycat/${Category._id}`;

  let productos = [];
  try {
    await fetch(url, {
      method: 'GET',
      redirect: 'follow',
    })
      .then(res => res.json())
      .catch(error => console.error('Error byCAT', error))
      .then(response => {
        response.forEach(async producto => {
          productos.push({
            _id: producto._id,
            code: producto.code,
            principalImage: `${BASE_URL_IMG}${PRODUCTS_URL}${producto.image}`,
          });
        });
      });
    return productos;
  } catch (error) {
    console.error('RESPONSE ERROR BY CAT', error);
    return productos;
  }
}

async function productbyHeadquarters(Sede, lenguaje) {
  let url = `${BASE_URL}/product.getprdsbyhq/${Sede._id}/${lenguaje._id}`;
  let productos = [];
  try {
    await fetch(url, {
      method: 'GET',
      redirect: 'follow',
    })
      .then(res => res.json())
      .catch(error => console.error('Error', error))
      .then(response => {
        response.forEach(producto => {
          productos.push({
            _id: producto._id,
            idCategory: producto.idCategory,
            idHeadquarter: producto.idHeadquarter,
            code: producto.code,
            principalImage: `${BASE_URL_IMG}${PRODUCTS_URL}${producto.image}`,
            name: producto.labels[0].name,
            description: producto.labels[0].description,
            price: producto.labels[0].price,
          });
        });
      });
    return productos;
  } catch (error) {
    console.error(error);
    return productos;
  }
}

export {
  productbyCountry,
  productbyCategory,
  productbyHeadquarters,
  productFullbyCategory,
};
