import React, {createContext, useEffect, useState} from 'react';
//Apis
import promotionsApi from '@Apis/PromotionsApi';

export const PromotionsContext = createContext();

export const PromotionsProvider = ({children}) => {
  const [Promotions, setPromotions] = useState([]);
  const [isLoadingPromotions, setisLoadingPromotions] = useState(true)



  const getPromotions = async (country,languaje) => {
    setisLoadingPromotions(true)
    promotionsApi(country,languaje).then(res => {
        res.sort((a, b) => a.code.localeCompare(b.code));
        console.log('PROMOCIONES',res)
        setPromotions(res)
        setisLoadingPromotions(false);
      });

  };

  useEffect(() => {}, []);

  return (
    <PromotionsContext.Provider
      value={{
        Promotions,
        isLoadingPromotions,
        getPromotions,
      }}>
      {children}
    </PromotionsContext.Provider>
  );
};
