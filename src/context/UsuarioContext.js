import React, {createContext, useReducer, useState} from 'react';
import {saveUsuario, deleteUsuario} from '@storage/UsuarioAsyncStorage';
import Snackbar from 'react-native-snackbar';
import apiLogin from '../Apis/LoginApi';
import apiRegister from '../Apis/RegisterApi';

import {getUsuario} from '../storage/UsuarioAsyncStorage';

const initialState = {
  usuario: {
    id: '',
    username: '',
    name: '',
    lastname: '',
    email: '',
    password: '',
    phone: '',
    id_number: '',
    paypal_id: '',
    image: '',
  },
  activo: false,
  token: '',
};

function usuarioReducer(state = initialState, payload) {
  let loginUser = initialState;
  switch (payload.type) {
    case 'sign-in':
      console.log('Bienvenidos al sistema');
      return {...state, usuario: payload.data, activo: true};
    case 'sign':
      loginUser = apiLogin(payload.data).then(res => {
        console.log('dentro de la funcion consultora');
        console.log(res);
        if (res !== 'Email or Password is wrong!') {
          saveUsuario(res).then(msg => {
            console.log('usuario guardado');
          });
        }
      });

      console.log('EN EL CASE');
      console.log(loginUser);
      Snackbar.show({
        text: 'Iniciando Sesion',
        duration: Snackbar.LENGTH_LONG,
      });

      return {...state, usuario: loginUser, activo: true};

    case 'sign-out':
      deleteUsuario().then(msg => {
        console.log(msg);
      });
      Snackbar.show({
        text: 'Sesión expirada',
        duration: Snackbar.LENGTH_LONG,
      });

      return {...state, usuario: payload.data, activo: false};
    case 'register':
      loginUser = apiRegister(payload.data).then(res => {
        console.log('dentro de la funcion consultora REGISTER');
        console.log(res);

        saveUsuario(res).then(msg => {
          console.log('usuario guardado');
        });
      });

      console.log('EN EL CASE REGISTER');
      console.log(loginUser);
      Snackbar.show({
        text: 'Registro exitoso, Bienvenido',
        duration: Snackbar.LENGTH_LONG,
      });

      return {...state, usuario: loginUser, activo: true};

    default:
      return state;
  }
}

const UsuarioContext = createContext(initialState);

function UsuarioProvider(props) {
  const [login, loginAction] = useReducer(usuarioReducer, initialState);

  return (
    <UsuarioContext.Provider value={[login, loginAction]}>
      {props.children}
    </UsuarioContext.Provider>
  );
}

export {UsuarioContext, UsuarioProvider};
