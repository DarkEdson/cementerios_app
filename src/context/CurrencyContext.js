import React, {createContext, useEffect, useState} from 'react';
//Apis
import  {AffiliateCurrentcyApi, CurrencyApi} from '@Apis/CurrenciesApi';

export const CurrenciesContext = createContext();

export const CurrenciesProvider = ({children}) => {
  const [Currency, setCurrency] = useState({});
  const [Currencies, setCurrencies] = useState([]);
  const [CurrenciesAf, setCurrenciesAf] = useState([]);
  const [isLoadingCurrencies, setisLoadingCurrencies] = useState(true)

  const getCurrenciesAf = async () => {
    setisLoadingCurrencies(true)
    AffiliateCurrentcyApi().then(res => {
        console.log(res, 'Currencies AF')
        setCurrenciesAf(res)
        setisLoadingCurrencies(false);
      });

  };

  const getCurrency = async (Afiliado) => {
    setisLoadingCurrencies(true)
    CurrenciesAf.map(currencyAf=>{
        if (currencyAf.idAffiliate == Afiliado._id){
            Currencies.map(moneda =>{
                if (moneda._id == currencyAf.idCurrency){
                  console.log('Moneda', moneda)
                    setCurrency(moneda)
                }
            })
        }
    })
  };

  const getCurrencies = async () => {
    setisLoadingCurrencies(true)
    CurrencyApi().then(res => {
        console.log(res, 'Currencies')
        setCurrencies(res)
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
        getCurrency
      }}>
      {children}
    </CurrenciesContext.Provider>
  );
};
