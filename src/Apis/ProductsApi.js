import {BASE_URL, BASE_URL_IMG, PRODUCTS_URL} from '@utils/config';

async function productbyCountry(country, lenguaje) {
  console.log('api prods pais', lenguaje);
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
        console.log('PRODUCTOS API POR PAIS', response);
        response.forEach(producto => {
          console.log('PORCENTAJES API PROD', producto.financing)
          console.log('CONFIRMAR QUE ENTRO Y EJECUTA');
          productos.push({
            _id: producto._id,
            idCategory: producto.idCategory,
            idAffiliate: producto.idAffiliate,
            idHeadquarter: producto.headquarters[0].idHeadquarter,
            code: producto.code,
            principalImage: `${BASE_URL_IMG}${PRODUCTS_URL}${producto.image}`,
            name: producto.labels[0].name,
            description: producto.labels[0].description,
            price: producto.headquarters[0].price,
            currency: producto.currency,
            financing: producto.financing
              ? producto.financing
              : [
                  {
                    number_of_installments: '0',
                    percentage: '100',
                  },
                ],
            type: producto.type ? producto.type : '1',
          });
        });
      });
    return productos;
  } catch (error) {
    console.error('ERROR EN PRODUCTOS API POR PAIS', error);
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
          idAffiliate: response.idAffiliate,
          idHeadquarter: response.headquarters[0]._id,
          code: response.code,
          principalImage: `${BASE_URL_IMG}${PRODUCTS_URL}${response.image}`,
          name: response.labels[0].name,
          description: response.labels[0].description,
          price: response.headquarters[0].price,
          currency: response.headquarters[0].currency,
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
        console.log('PRODUCTOS POR CAT API RESP', response);
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
  console.log('URL SEDE HQ', url);
  let productos = [];
  try {
    await fetch(url, {
      method: 'GET',
      redirect: 'follow',
    })
      .then(res => res.json())
      .catch(error => console.error('Error en SEDES', error))
      .then(response => {
        console.log('PRODUCTOS en SEDE', response);
       
        response.forEach(producto => {
          
          productos.push({
            _id: producto._id,
            idCategory: producto.idCategory,
            idHeadquarter: Sede._id,
            idAffiliate: producto.idAffiliate,
            code: producto.code,
            principalImage: `${BASE_URL_IMG}${PRODUCTS_URL}${producto.image}`,
            name: producto.labels[0].name,
            description: producto.labels[0].description,
            price: producto.price,
            currency: producto.currency,
            ranking: producto.ranking,
            financing: producto.financing
              ? producto.financing
              : [
                  {
                    number_of_installments: '0',
                    percentage: '100',
                  },
                ],
            type: producto.type ? producto.type : '1',
          });
        });
      });
    return productos;
  } catch (error) {
    console.error('RESPUESTA ERROR EN SEDES', error);
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
