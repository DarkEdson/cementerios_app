import React, {createContext, useState} from 'react';

const initialState = {
  id: '',
  code: '',
  name: '',
};

const CountriesContext = createContext();

function CountriesProvider({children}) {
  const [countries, setCountries] = useState(initialState);

  return (
    <CountriesContext.Provider value={[countries, setCountries]}>
      {children}
    </CountriesContext.Provider>
  );
}

export {CountriesContext, CountriesProvider};
