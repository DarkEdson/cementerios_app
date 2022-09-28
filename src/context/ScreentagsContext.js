import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import Snackbar from 'react-native-snackbar';
import {BASE_URL} from '@utils/config';
//Apis
import {apiScreen, apiIdScreens} from '@Apis/ApisGenerales';
// async storage
import {getLanguague, saveLanguague} from '@storage/LanguagueAsyncStorage';

export const ScreentagContext = createContext();

export const ScreentagProvider = ({children}) => {
  const [tags, setTags] = useState({});

    const actualizaEtiquetas = ()=>{
        updateTags();
    }
  

  const updateTags = async (pantalla) => {
        let etiquetas = await apiScreen(pantalla._id);
        if (pantalla.code =='v12'){
            if (etiquetas.length != 0) {
                setTags(prevState=>({...prevState, perfilScreen:{
                  cerrar: etiquetas[0].description,
                  codigov: etiquetas[1].description,
                  editar: etiquetas[2].description,
                  perfil: etiquetas[3].description,
                }}));
              }
        }
        if (pantalla.code =='v01'){
            if (etiquetas.length != 0) {
                setTags(prevState =>({...prevState, loginScreen:{
                    btnlogin: etiquetas[0].description,
                    contrasena: etiquetas[1].description,
                    inputpassword: etiquetas[2].description,
                    inputusuario: etiquetas[3].description,
                    label1: etiquetas[4].description,
                  }}));
              }
        }
        if (pantalla.code =='v02'){
            if (etiquetas.length != 0) {
                setTags(prevState =>({...prevState, registerScreen:{
                    btnapple: etiquetas[0].description,
          btnfacebook:  etiquetas[1].description,
          btngoogle: etiquetas[2].description,
          btnsiguiente: etiquetas[3].description,
          header1: etiquetas[4].description,
          inputconfpassword: etiquetas[5].description,
          inputcorreo: etiquetas[6].description,
          inputpassword1: etiquetas[7].description,
          inputtipo: etiquetas[8].description,
          inputusuario1: etiquetas[9].description,
          label2: etiquetas[10].description,
                  }}));
              }
        }
        if (pantalla.code =='v03'){
            if (etiquetas.length != 0) {
                setTags(prevState =>({...prevState, registerAddScreen:{
                    btncompletar: etiquetas[0].description,
          completa: etiquetas[1].description,
          inputapellidos: etiquetas[2].description,
          inputnombres: etiquetas[3].description,
          inputnumid: etiquetas[4].description,
          inputpaypalid: etiquetas[5].description,
                  }}));
              }
        }
        

  };

  useEffect(() => {

  }, []);

  return (
    <ScreentagContext.Provider
      value={{
        actualizaEtiquetas,
        tags,
        updateTags,
      }}>
      {children}
    </ScreentagContext.Provider>
  );
};
