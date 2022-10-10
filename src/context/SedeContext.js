import React, {createContext, useState} from 'react';

const initialState = {
  id: '',
  name: '',
  urlImagen: '',
};

const SedeContext = createContext();

function SedeProvider({children}) {
  const [sede, setSede] = useState(initialState);

  return (
    <SedeContext.Provider value={[sede, setSede]}>
      {children}
    </SedeContext.Provider>
  );
}

export {SedeContext, SedeProvider};
