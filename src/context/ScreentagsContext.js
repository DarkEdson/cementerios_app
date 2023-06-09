import React, {createContext, useEffect, useState} from 'react';
//Apis
import {apiScreen, apiIdScreens} from '@Apis/ApisGenerales';

export const ScreentagContext = createContext();

export const ScreentagProvider = ({children}) => {
  const [tags, setTags] = useState({});
  const [isLoadingTags, setisLoadingTags] = useState(true);

  const updateTags = async pantalla => {
    setisLoadingTags(true);
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
            phone: etiquetas[6].description,
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
            detallePrecio: etiquetas[0].description,
            labelproductos: etiquetas[1].description,
            labelsearch1: etiquetas[2].description,
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
            precio: etiquetas[3].description,
            sede: etiquetas[4].description,
            todos: etiquetas[6].description,
            sinprods:  etiquetas[5].description
          },
        }));
      }
    }
    if (pantalla.code == 'v08') {
      console.log('ETIQUETAS PROD DETAIL', etiquetas);
      if (etiquetas.length != 0) {
        setTags(prevState => ({
          ...prevState,
          ProductDetailScreen: {
            btnagregar: etiquetas[0].description,
            cash: etiquetas[1].description,
            cuotas: etiquetas[2].description,
            detalle: etiquetas[3].description,
            enganche: etiquetas[4].description,
            financing: etiquetas[5].description,
            precio: etiquetas[6].description,
            sede: etiquetas[7].description,
            txtComments: etiquetas[8].description,
            txtCuotasMsj: etiquetas[9].description,
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
            change: etiquetas[1].description,
            codigo: etiquetas[2].description,
            compra: etiquetas[3].description,
            confirmPurchaseTxt: etiquetas[4].description,
            deleteBtn: etiquetas[5].description,
            deleteMsg: etiquetas[6].description,
            deleteTitle: etiquetas[7].description,
            emptyCart: etiquetas[8].description,
            entrega: etiquetas[9].description,
            failed: etiquetas[10].description,
            finishPurchaseBtn: etiquetas[11].description,
            methodPay: etiquetas[12].description,
            pagar: etiquetas[13].description,
            paymentMethodTxt: etiquetas[14].description,
            product: etiquetas[15].description,
            promotions: etiquetas[16].description,
            resumen: etiquetas[17].description,
            selectCard: etiquetas[18].description,
            selectPaymentTitle: etiquetas[19].description,
            silaba: etiquetas[20].description,
            subtotal: etiquetas[21].description,
            success: etiquetas[22].description,
            total: etiquetas[23].description,
          },
        }));
      }
    }
    if (pantalla.code == 'v10') {
      if (etiquetas.length != 0) {
        setTags(prevState => ({
          ...prevState,
          PromoScreen: {
            failed: etiquetas[0].description,
            repited: etiquetas[1].description,
            success: etiquetas[2].description,
            labelbtn: etiquetas[3].description,
            placeholder: etiquetas[4].description,
            titulo: etiquetas[5].description,
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
            compras: etiquetas[2].description,
            labelfechafin: etiquetas[3].description,
            labelfechainicio: etiquetas[4].description,
            search: etiquetas[5].description,
            subtotal1: etiquetas[6].description,
            ventas: etiquetas[7].description,
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
            help: etiquetas[3].description,
            perfil: etiquetas[4].description,
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
            failed: etiquetas[7].description,
            success: etiquetas[8].description,
            username: etiquetas[9].description,
            whiteemail: etiquetas[10].description,
            whitelastname: etiquetas[11].description,
            whitename: etiquetas[12].description,
            whiteusername: etiquetas[13].description,
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
            failed: etiquetas[5].description,
            success: etiquetas[6].description,
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
            cardmsg: etiquetas[1].description,
            deletemsg: etiquetas[2].description,
            deletetitle: etiquetas[3].description,
            preferido: etiquetas[4].description,
            tarjetas: etiquetas[5].description,
            titulo: etiquetas[6].description,
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
            shopping: etiquetas[4].description,
          },
        }));
      }
    }
    if (pantalla.code == 'v21') {
      if (etiquetas.length != 0) {
        setTags(prevState => ({
          ...prevState,
          sedeSelectScreen: {
            btncancelar: etiquetas[0].description,
            btnconfirmar: etiquetas[1].description,
            titulo: etiquetas[2].description,
          },
        }));
      }
    }
    if (pantalla.code == 'v22') {
      if (etiquetas.length != 0) {
        setTags(prevState => ({
          ...prevState,
          closeSessionScreen: {
            btnno: etiquetas[0].description,
            btnsi: etiquetas[1].description,
            mensaje: etiquetas[2].description,
            titulo: etiquetas[3].description,
          },
        }));
      }
    }
    if (pantalla.code == 'v23') {
      //console.log('V23 TAGS', etiquetas);
      if (etiquetas.length != 0) {
        setTags(prevState => ({
          ...prevState,
          dialogAlertsScreen: {
            a: etiquetas[0].description,
            b: etiquetas[1].description,
            c: etiquetas[2].description,
            d: etiquetas[3].description,
            e: etiquetas[4].description,
            f: etiquetas[5].description,
            g: etiquetas[6].description,
            h: etiquetas[7].description,
            i: etiquetas[8].description,
            j: etiquetas[9].description,
            k: etiquetas[10].description,
            l: etiquetas[11].description,
            m: etiquetas[12].description,
            n: etiquetas[13].description,
            o: etiquetas[14].description,
            p: etiquetas[15].description,
            q: etiquetas[16].description,
            r: etiquetas[17].description,
            s: etiquetas[18].description,
            t: etiquetas[19].description,
            u: etiquetas[20].description,
            v: etiquetas[21].description,
            w: etiquetas[22].description,
            x: etiquetas[23].description,
            y: etiquetas[24].description,
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
      }}
    >
      {children}
    </ScreentagContext.Provider>
  );
};
