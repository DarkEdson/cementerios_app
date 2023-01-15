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
    language,
  ) => {
    setisLoadingSedes(true);
    sedesApi(cementery, country, language).then(res => {
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

  const getSedeDirect = async (sedeID, setSede, goToScreen, routeName) => {
    //sedeID = idHeadquarter
    setisLoadingSedes(true);
    sedeApi(sedeID).then(res => {
      console.log('SEDE SIMPLE DIRECT', res);
      setSede(res);
      setisLoadingSedes(false);
      goToScreen(routeName);
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
        getSedeDirect,
      }}
    >
      {children}
    </SedesContext.Provider>
  );
};
