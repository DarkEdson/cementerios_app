import React, {createContext, useState} from 'react';

const initialState = 'Initial';

const RouteBackContext = createContext();

function RouteBackProvider({children}) {
  //Route back productos
  const [RouteBack, setRouteBack] = useState(initialState);
  //Route back compañias
  const [RouteBackComp, setRouteBackComp] = useState(initialState);

  return (
    <RouteBackContext.Provider
      value={{RouteBack, RouteBackComp, setRouteBackComp, setRouteBack}}>
      {children}
    </RouteBackContext.Provider>
  );
}

export {RouteBackContext, RouteBackProvider};
