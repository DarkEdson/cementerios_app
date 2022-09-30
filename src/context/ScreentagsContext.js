import React, {createContext, useEffect, useState} from 'react';
//Apis
import {apiScreen, apiIdScreens} from '@Apis/ApisGenerales';

export const ScreentagContext = createContext();

export const ScreentagProvider = ({children}) => {
  const [tags, setTags] = useState({});

  const updateTags = async pantalla => {
    let etiquetas = await apiScreen(pantalla._id);
    etiquetas.sort((a, b) => a.code.localeCompare(b.code));

    if (pantalla.code == 'v01') {
      if (etiquetas.length != 0) {
        setTags(prevState => ({
          ...prevState,
          loginScreen: {
            btnlogin: etiquetas[0].description,
            contrasena: etiquetas[1].description,
            inputpassword: etiquetas[2].description,
            inputusuario: etiquetas[3].description,
            label1: etiquetas[4].description,
          },
        }));
      }
    }
    if (pantalla.code == 'v02') {
      if (etiquetas.length != 0) {
        setTags(prevState => ({
          ...prevState,
          registerScreen: {
            btnapple: etiquetas[0].description,
            btnfacebook: etiquetas[1].description,
            btngoogle: etiquetas[2].description,
            btnsiguiente: etiquetas[3].description,
            header1: etiquetas[4].description,
            inputconfpassword: etiquetas[5].description,
            inputcorreo: etiquetas[6].description,
            inputpassword1: etiquetas[7].description,
            inputtipo: etiquetas[8].description,
            inputusuario1: etiquetas[9].description,
            label2: etiquetas[10].description,
          },
        }));
      }
    }
    if (pantalla.code == 'v03') {
      if (etiquetas.length != 0) {
        setTags(prevState => ({
          ...prevState,
          registerAddScreen: {
            btncompletar: etiquetas[0].description,
            completa: etiquetas[1].description,
            inputapellidos: etiquetas[2].description,
            inputnombres: etiquetas[3].description,
            inputnumid: etiquetas[4].description,
            inputpaypalid: etiquetas[5].description,
          },
        }));
      }
    }
    if (pantalla.code == 'v04') {
      if (etiquetas.length != 0) {
        setTags(prevState => ({
          ...prevState,
          HomeScreen: {
            inputsearch: etiquetas[0].description,
            labelcementarios: etiquetas[1].description,
            labelvertodos: etiquetas[2].description,
            ubica: etiquetas[3].description,
          },
        }));
      }
    }
    if (pantalla.code == 'v05') {
      if (etiquetas.length != 0) {
        setTags(prevState => ({
          ...prevState,
          PromotionsScreen: {
            labelpromociones: etiquetas[0].description,
          },
        }));
      }
    }
    if (pantalla.code == 'v06') {
      if (etiquetas.length != 0) {
        setTags(prevState => ({
          ...prevState,
          ProductsScreen: {
            labelproductos: etiquetas[0].description,
            labelsearch1: etiquetas[1].description,
          },
        }));
      }
    }
    if (pantalla.code == 'v07') {
      if (etiquetas.length != 0) {
        setTags(prevState => ({
          ...prevState,
          CompanyDetailScreen: {
            label1p: etiquetas[0].description,
            label1s: etiquetas[1].description,
            mas: etiquetas[2].description,
            todos: etiquetas[3].description,
          },
        }));
      }
    }
    if (pantalla.code == 'v08') {
      if (etiquetas.length != 0) {
        setTags(prevState => ({
          ...prevState,
          ProductDetailScreen: {
            btnagregar: etiquetas[0].description,
            detalle: etiquetas[1].description,
          },
        }));
      }
    }
    if (pantalla.code == 'v09') {
      if (etiquetas.length != 0) {
        setTags(prevState => ({
          ...prevState,
          PaymentScreen: {
            agregar: etiquetas[0].description,
            codigo: etiquetas[1].description,
            compra: etiquetas[2].description,
            entrega: etiquetas[3].description,
            pagar: etiquetas[4].description,
            subtotal: etiquetas[5].description,
            total: etiquetas[6].description,
          },
        }));
      }
    }
    if (pantalla.code == 'v10') {
      if (etiquetas.length != 0) {
        setTags(prevState => ({
          ...prevState,
          PromoScreen: {
            labelbtn: etiquetas[0].description,
            placeholder: etiquetas[1].description,
            titulo: etiquetas[2].description,
          },
        }));
      }
    }
    if (pantalla.code == 'v11') {
      if (etiquetas.length != 0) {
        setTags(prevState => ({
          ...prevState,
          SellsScreen: {
            comision: etiquetas[0].description,
            comisionpct: etiquetas[1].description,
            labelfechafin: etiquetas[2].description,
            labelfechainicio: etiquetas[3].description,
            subtotal1: etiquetas[4].description,
            ventas: etiquetas[5].description,
          },
        }));
      }
    }
    if (pantalla.code == 'v12') {
      if (etiquetas.length != 0) {
        setTags(prevState => ({
          ...prevState,
          perfilScreen: {
            cerrar: etiquetas[0].description,
            codigov: etiquetas[1].description,
            editar: etiquetas[2].description,
            perfil: etiquetas[3].description,
          },
        }));
      }
    }
    if (pantalla.code == 'v13') {
      etiquetas.sort((a, b) => a.code.localeCompare(b.code));
      if (etiquetas.length != 0) {
        setTags(prevState => ({
          ...prevState,
          personalDataScreen: {
            codigo: etiquetas[0].description,
            contrasena: etiquetas[1].description,
            editar: etiquetas[2].description,
            email: etiquetas[3].description,
            idioma: etiquetas[4].description,
            info: etiquetas[5].description,
            metodos: etiquetas[6].description,
            nombre: etiquetas[7].description,
            titulo: etiquetas[8].description,
          },
        }));
      }
    }
    if (pantalla.code == 'v14') {
      if (etiquetas.length != 0) {
        setTags(prevState => ({
          ...prevState,
          PasswordRecoveryScreen: {
            btn: etiquetas[0].description,
            email: etiquetas[1].description,
            recuperar: etiquetas[2].description,
            titulo: etiquetas[3].description,
          },
        }));
      }
    }
    if (pantalla.code == 'v15') {
      if (etiquetas.length != 0) {
        setTags(prevState => ({
          ...prevState,
          EditUserScreen: {
            btn: etiquetas[0].description,
            email: etiquetas[1].description,
            lastname: etiquetas[2].description,
            name: etiquetas[3].description,
            paypalid: etiquetas[4].description,
            phone: etiquetas[5].description,
            titulo: etiquetas[6].description,
            username: etiquetas[7].description,
          },
        }));
      }
    }
    if (pantalla.code == 'v16') {
      if (etiquetas.length != 0) {
        setTags(prevState => ({
          ...prevState,
          changePasswordScreen: {
            btn: etiquetas[0].description,
            confpass: etiquetas[1].description,
            newpass: etiquetas[2].description,
            password: etiquetas[3].description,
            titulo: etiquetas[4].description,
          },
        }));
      }
    }
    if (pantalla.code == 'v17') {
      if (etiquetas.length != 0) {
        setTags(prevState => ({
          ...prevState,
          paymentMethodsScreen: {
            btn: etiquetas[0].description,
            preferido: etiquetas[1].description,
            tarjetas: etiquetas[2].description,
            titulo: etiquetas[3].description,
          },
        }));
      }
    }
    if (pantalla.code == 'v18') {
      if (etiquetas.length != 0) {
        setTags(prevState => ({
          ...prevState,
          CementeriesScreen: {
            placeholder: etiquetas[0].description,
            titulo: etiquetas[1].description,
          },
        }));
      }
    }
    if (pantalla.code == 'v19') {
      if (etiquetas.length != 0) {
        setTags(prevState => ({
          ...prevState,
          PaymentCardDetailScreen: {
            guardar: etiquetas[0].description,
            securecode: etiquetas[1].description,
            titular: etiquetas[2].description,
            titulo: etiquetas[3].description,
            vence: etiquetas[4].description,
          },
        }));
      }
    }
    if (pantalla.code == 'v20') {
      if (etiquetas.length != 0) {
        setTags(prevState => ({
          ...prevState,
          HomeTagsScreen: {
            home: etiquetas[0].description,
            products: etiquetas[1].description,
            promo: etiquetas[2].description,
            sells: etiquetas[3].description,
          },
        }));
      }
    }
  };

  useEffect(() => {}, []);

  return (
    <ScreentagContext.Provider
      value={{
        tags,
        updateTags,
      }}>
      {children}
    </ScreentagContext.Provider>
  );
};
