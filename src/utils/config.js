export const BASE_URL = 'https://www.senoriales.com/api-app';
//export const BASE_URL = 'http://34.171.224.39:4000/api';
//34.171.224.39
//proyectocementeriogt.gq
//export const BASE_URL_IMG = 'http://34.171.224.39/images/';
export const BASE_URL_IMG = 'https://www.senoriales.com/images-app/prod/';
export const PRODUCTS_URL = 'products/';
export const CATEGORIES_URL = 'categories/';
export const COMPANIES_URL = 'companies/';
export const PROMOTIONS_URL = 'promotions/';
export const IMGEXTENSIONS = ['jpg', 'JPG', 'png', 'PNG', 'jpeg', 'JPEG'];

//formatea el monto a forma "##,###,###.##"
export const formatAmount = amount => {
  const re = '\\d(?=(\\d{' + 3 + '})+' + (2 > 0 ? '\\.' : '$') + ')';
  let result = parseFloat(amount)
    .toFixed(Math.max(0, ~~2))
    .replace(new RegExp(re, 'g'), '$&,');

  let arrayRes = result.split('.');
  //  console.log('FORMANT AMOUNT CHANGE', arrayRes, result);
  if (parseInt(arrayRes[arrayRes.length - 1]) >= 1) {
    return result;
  } else {
    return arrayRes[0];
  }
  return parseFloat(amount)
    .toFixed(Math.max(0, ~~2))
    .replace(new RegExp(re, 'g'), '$&,');
};
