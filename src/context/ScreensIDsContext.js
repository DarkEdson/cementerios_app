import React, {createContext, useState} from 'react';

const initialState = [
  {
    _id: '63313041a17b6dbe84cb5f42',
    code: 'v01',
    description: 'Vista del inicio',
  },
];

const ScreenIdContext = createContext();

function ScreenIdProvider({children}) {
  const [ScreenId, setScreenId] = useState(initialState);

  return (
    <ScreenIdContext.Provider value={[ScreenId, setScreenId]}>
      {children}
    </ScreenIdContext.Provider>
  );
}

export {ScreenIdContext, ScreenIdProvider};
