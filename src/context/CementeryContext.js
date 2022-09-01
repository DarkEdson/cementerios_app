import React, {createContext, useReducer} from 'react';
import {saveUsuario, deleteUsuario} from '@storage/UsuarioAsyncStorage';
import Snackbar from 'react-native-snackbar';

const initialState = {
  Company: {
    id: '',
    titulo: '',
    urlImagen: '',
  },
  activo: false,
};

const cementeryReducer = (state = initialState, payload) => {
  switch (payload.type) {
    case 'consult':
      console.log('Consultando Cementerio');
      return {...state, Company: payload.data, activo: true};
    case 'select':
      saveCementery(payload.data).then(msg => {
        console.log('Cementerio Elegido');
      });
      Snackbar.show({
        text: 'Cementerio '+payload.data.titulo,
        duration: Snackbar.LENGTH_LONG,
      });

      return {...state, Company: payload.data, activo: true};
    case 'return':
      deleteCementery().then(msg => {
        console.log(msg);
      });
      Snackbar.show({
        text: 'Volviendo a Home',
        duration: Snackbar.LENGTH_LONG,
      });

      return {...state, Company: payload.data, activo: false};
    default:
      return state;
  }
};

const CementeryContext = createContext(initialState);

function CementeryProvider(props) {
  const [cementery, cementeryAction] = useReducer(cementeryReducer, initialState);

  return (
    <CementeryContext.Provider value={[cementery, cementeryAction]}>
      {props.children}
    </CementeryContext.Provider>
  );
}

export {CementeryContext, CementeryProvider};
