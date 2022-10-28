export const BASE_URL = 'http://34.125.91.120:4000/api';
//34.125.91.120
//proyectocementeriogt.gq
export const BASE_URL_IMG = 'http://34.125.91.120/images/';
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
  console.log(arrayRes, result);
  if (parseInt(arrayRes[arrayRes.length - 1]) >= 1) {
    return result;
  } else {
    return arrayRes[0];
  }
  return parseFloat(amount)
    .toFixed(Math.max(0, ~~2))
    .replace(new RegExp(re, 'g'), '$&,');
};
