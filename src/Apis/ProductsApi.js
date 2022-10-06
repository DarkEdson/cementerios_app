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
  let url = `${BASE_URL}/product.getprdsbycat/${product._id}/${lenguaje._id}`;
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

async function productbyCategory(Category) {
  let url = `${BASE_URL}/product.getprdsbycat/${Category._id}`;

  let productos = [];
  try {
    await fetch(url, {
      method: 'GET',
      redirect: 'follow',
    })
      .then(res => res.json())
      .catch(error => console.error('Error', error))
      .then(response => {
        response.forEach(async producto => {
          productos.push(producto);
        });
      });
    return productos;
  } catch (error) {
    console.error(error);
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

async function multimediabyProduct(product) {
  let url = `${BASE_URL}/product.multimedia.getmultimediabyid/${product._id}`;
  let multimedia = [];
  try {
    await fetch(url, {
      method: 'GET',
      redirect: 'follow',
    })
      .then(res => res.json())
      .catch(error => console.error('Error', error))
      .then(response => {
        response.forEach(producto => {
          multimedia.push({
            _id: producto._id,
            idProduct: producto.idProduct,
            code: producto.code,
            name: `${BASE_URL_IMG}${PRODUCTS_URL}${producto.name}`,
            description: producto.description,
          });
        });
      });
    return multimedia;
  } catch (error) {
    console.error(error);
    return multimedia;
  }
}

export {
  productbyCountry,
  productbyCategory,
  productbyHeadquarters,
  productFullbyCategory,
  multimediabyProduct,
};
