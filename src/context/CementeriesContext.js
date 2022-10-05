import React, {createContext, useEffect, useState} from 'react';
//Apis
import cementeriesApi from '@Apis/CementeriesApi';

export const CementeriesContext = createContext();

export const CementeriesProvider = ({children}) => {
  const [Cementeries, setCementeries] = useState([]);
  const [isLoadingCementeries, setisLoadingCementeries] = useState(true)



  const getCementeries = async (country) => {
    setisLoadingCementeries(true)
    cementeriesApi(country).then(res => {
        res.sort((a, b) => a.code.localeCompare(b.code));
        console.log(res, 'CEMENTERIOS')
        setCementeries(res)
        setisLoadingCementeries(false);
      });

  };

  useEffect(() => {}, []);

  return (
    <CementeriesContext.Provider
      value={{
        Cementeries,
        isLoadingCementeries,
        getCementeries,
      }}>
      {children}
    </CementeriesContext.Provider>
  );
};
