import {BASE_URL} from '@utils/config';

async function AffiliateCurrentcyApi() {
  let url = `${BASE_URL}/affiliate.currencies.index`;
  let monedas = [];
  try {
    await fetch(url, {
      method: 'GET',
      redirect: 'follow',
    })
      .then(res => res.json())
      .catch(error => console.error('Error Monedas Af', error))
      .then(response => {
        response.forEach(moneda => {
            monedas.push({
              _id: moneda._id,
              idAffiliate: moneda.idAffiliate,
              idCurrency: moneda.idCurrency,
            });
        });
      });
    return monedas;
  } catch (error) {
    console.error(error);
    return monedas;
  }
}

async function CurrencyApi() {
  let url = `${BASE_URL}/currency.index`;
  let monedas = [];
  try {
    await fetch(url, {
      method: 'GET',
      redirect: 'follow',
    })
      .then(res => res.json())
      .catch(error => console.error('Error Categoria', error))
      .then(response => {
        response.forEach(moneda => {
            monedas.push({
              _id: moneda._id,
              code: moneda.code,
              name: moneda.name,
              symbol: moneda.symbol,
            });
        });
      });
    return monedas;
  } catch (error) {
    console.error(error);
    return monedas;
  }
}

export {AffiliateCurrentcyApi, CurrencyApi};
