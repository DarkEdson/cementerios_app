import React, {createContext, useReducer, useState} from 'react';
import {saveUsuario, deleteUsuario} from '@storage/UsuarioAsyncStorage';
import Snackbar from 'react-native-snackbar';
import apiRegister from '@Apis/RegisterApi';

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
      saveUsuario(payload.data).then(msg => {
        console.log('usuario guardado');
      });

      console.log('EN EL CASE');
      console.log(payload.data);
      Snackbar.show({
        text: payload.tags.inicio != ''? payload.tags.inicio:'Iniciando Sesion',
        duration: Snackbar.LENGTH_LONG,
      });

      return {...state, usuario: payload.data, activo: true};

    case 'sign-out':
      deleteUsuario().then(msg => {
        console.log(msg);
      });
      Snackbar.show({
        text: payload.tags.mensaje != ''? payload.tags.mensaje: 'Sesión expirada',
        duration: Snackbar.LENGTH_LONG,
      });

      return {...state, usuario: payload.data, activo: false};
    case 'register':
      saveUsuario(payload.data).then(msg => {
        console.log('usuario registrado');
      });

      console.log('EN EL CASE');
      console.log(payload.data);
      Snackbar.show({
        text: payload.tags.registro != ''? payload.tags.registro+' Please Logged in':'Registro exitoso',
        duration: Snackbar.LENGTH_LONG,
      });

      return {...state, usuario: payload.data, activo: true};

    default:
      return state;
  }
}

const UsuarioContext = createContext(initialState);

function UsuarioProvider(props) {
  const [loginUser, loginAction] = useReducer(usuarioReducer, initialState);

  return (
    <UsuarioContext.Provider value={[loginUser, loginAction]}>
      {props.children}
    </UsuarioContext.Provider>
  );
}

export {UsuarioContext, UsuarioProvider};
