import React, {createContext, useState} from 'react';

const initialState = {
  id: '',
  titulo: '',
  urlImagen: '',
};

const CementeryContext = createContext();

function CementeryProvider({children}) {
  const [cementery, setCementery] = useState(initialState);

  return (
    <CementeryContext.Provider value={[cementery, setCementery]}>
      {children}
    </CementeryContext.Provider>
  );
}

export {CementeryContext, CementeryProvider};
