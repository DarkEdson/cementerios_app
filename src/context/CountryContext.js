import React, {createContext, useState} from 'react';
import {savecountry, getcountry} from '@storage/CountryAsyncStorage';

const initialState = {
  label: '',
  value: '',
};

const CountryContext = createContext();

function CountryProvider({children}) {
  const [country, setCountry] = useState(initialState);
  const [isLoadingCountry, setLoadingCountry] = useState(false);

  function saveDefaultCountry(country) {
    setLoadingCountry(true);
    setCountry({
      label: `${country.name}, ${country.code.toUpperCase()}`,
      value: country._id,
    });
    savecountry({
      label: `${country.name}, ${country.code.toUpperCase()}`,
      value: country._id,
    }).then(res => {
      setLoadingCountry(false);
    });
  }
  function updateDefaultCountry(country) {
    setLoadingCountry(true);
    setCountry({
      label: `${country.label}`,
      value: country.value,
    });
    savecountry({
      label: `${country.label}`,
      value: country.value,
    }).then(res => {
      setLoadingCountry(false);
    });
  }

  async function getDefaultCountry() {
    let loading = true;
    setLoadingCountry(true);
    getcountry().then(res => {
      setCountry(res);
      setLoadingCountry(false);
      loading = false;
    });
    return loading;
  }

  return (
    <CountryContext.Provider
      value={{
        country,
        isLoadingCountry,
        saveDefaultCountry,
        getDefaultCountry,
        updateDefaultCountry,
      }}>
      {children}
    </CountryContext.Provider>
  );
}

export {CountryContext, CountryProvider};
