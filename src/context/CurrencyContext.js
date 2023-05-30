import React, {createContext, useEffect, useState} from 'react';
//Apis
import {AffiliateCurrentcyApi, CurrencyApi} from '@Apis/CurrenciesApi';
import {apiListaCuentas, apiListaPaises} from '../Apis/ApisGenerales';

export const CurrenciesContext = createContext();

export const CurrenciesProvider = ({children}) => {
  const [Currency, setCurrency] = useState({});
  const [Currencies, setCurrencies] = useState([]);
  const [CurrenciesAf, setCurrenciesAf] = useState([]);
  const [isLoadingCurrencies, setisLoadingCurrencies] = useState(true);
  const [paisesLista, setpaisesLista] = useState([]);
  const [cuentasLista, setcuentasLista] = useState([])

  const getListaPaises = async () => {
    setisLoadingCurrencies(true);
    let listaPaises = await apiListaPaises();
    console.log(listaPaises);
    setpaisesLista(listaPaises);
    setisLoadingCurrencies(false);
  };

  const getListaCuentas = async () => {
    setisLoadingCurrencies(true);
    let listaCuentas = await apiListaCuentas();
    console.log('CUENTAS OBTENIDAS EN CONTEXTO',listaCuentas);
    setcuentasLista(listaCuentas);
    setisLoadingCurrencies(false);
    return listaCuentas;
  };

  const getCurrenciesAf = async () => {
    setisLoadingCurrencies(true);
    AffiliateCurrentcyApi().then(res => {
      console.log(res, 'Currencies AF');
      setCurrenciesAf(res);
      setisLoadingCurrencies(false);
    });
  };

  const getCurrency = async Afiliado => {
    setisLoadingCurrencies(true);
    CurrenciesAf.map(currencyAf => {
      if (currencyAf.idAffiliate == Afiliado._id) {
        Currencies.map(moneda => {
          if (moneda._id == currencyAf.idCurrency) {
            console.log('Moneda', moneda);
            setCurrency(moneda);
          }
        });
      }
    });
  };

  const getCurrencies = async () => {
    setisLoadingCurrencies(true);
    CurrencyApi().then(res => {
      console.log(res, 'Currencies');
      setCurrencies(res);
      setisLoadingCurrencies(false);
    });
  };

  useEffect(() => {}, []);

  return (
    <CurrenciesContext.Provider
      value={{
        Currency,
        isLoadingCurrencies,
        getCurrenciesAf,
        getCurrencies,
        getCurrency,
        paisesLista,
        getListaPaises,
        cuentasLista,
        getListaCuentas,
      }}
    >
      {children}
    </CurrenciesContext.Provider>
  );
};
