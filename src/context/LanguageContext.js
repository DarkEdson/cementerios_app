import React, {createContext, useState} from 'react';

const initialState = {

};

const GlobalLanguageContext = createContext();

function GlobalLanguageProvider({children}) {
  const [GlobalLanguage, setGlobalLanguage] = useState(initialState);

  return (
    <GlobalLanguageContext.Provider value={[GlobalLanguage, setGlobalLanguage]}>
      {children}
    </GlobalLanguageContext.Provider>
  );
}

export {GlobalLanguageContext, GlobalLanguageProvider};
