import React, {createContext, useState} from 'react';

const initialState = [
  {
    _id: '',
    code: '',
    name: '',
  },
];

const LanguaguesContext = createContext();

function LanguaguesProvider({children}) {
  const [Languagues, setLanguagues] = useState(initialState);

  return (
    <LanguaguesContext.Provider value={[Languagues, setLanguagues]}>
      {children}
    </LanguaguesContext.Provider>
  );
}

export {LanguaguesContext, LanguaguesProvider};
