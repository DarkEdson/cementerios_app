import React, {createContext, useEffect, useState} from 'react';
//Apis
import {sedesApi, sedeApi} from '@Apis/SedesApi';

export const SedesContext = createContext();

export const SedesProvider = ({children}) => {
  const [Sedes, setSedes] = useState([]);
  const [isLoadingSedes, setisLoadingSedes] = useState(false);

  const getSedes = async (
    cementery,
    setSede,
    goToScreen,
    routeName,
    country,
  ) => {
    setisLoadingSedes(true);
    sedesApi(cementery, country).then(res => {
      res.sort((a, b) => a.code.localeCompare(b.code));
      console.log('SEDES', res);
      setSedes(res);
      setSede(res[0]);
      setisLoadingSedes(false);
      goToScreen(routeName);
    });
  };

  const getSede = async (sedeID, setSede) => {
    //sedeID = idHeadquarter
    setisLoadingSedes(true);
    sedeApi(sedeID).then(res => {
      console.log('SEDE SIMPLE', res);
      setSede(res);
      setisLoadingSedes(false);
    });
  };

  useEffect(() => {}, []);

  return (
    <SedesContext.Provider
      value={{
        Sedes,
        isLoadingSedes,
        getSedes,
        getSede,
      }}>
      {children}
    </SedesContext.Provider>
  );
};
