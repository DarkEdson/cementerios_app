import React, {useState, useEffect, useCallback} from 'react';
import {Platform, NativeModules} from 'react-native';
import {BASE_URL} from '@utils/config';
import {getLanguague, saveLanguague} from '@storage/LanguagueAsyncStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function apiLanguage() {
  let url = `${BASE_URL}/language.index`;
  let lenguajes = [];
  try {
    await fetch(url, {
      method: 'GET',
      redirect: 'follow',
    })
      .then(res => res.json())
      .catch(error => console.error('Error', error))
      .then(response => {
        response.forEach(language => {
          lenguajes.push({
            _id: language._id,
            code: language.code,
            name: language.name,
          });
        });
      });
    return lenguajes;
  } catch (error) {
    console.error(error);
  }
}

async function apiScreen(idScreen) {
  const lenguajer = await getLanguague();
  let deviceLanguage =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0]
      : NativeModules.I18nManager.localeIdentifier;
  let defaultLanguage = deviceLanguage.substr(0, 2);
  let lenguaje;
  if (defaultLanguage == 'es') {
    lenguaje = {_id: '633225cf5531aa122f71a7e4'};
  } else {
    lenguaje = {_id: '633225de5531aa122f71a7e6'};
  }
  let url;
  if (lenguajer == null) {
    url = `${BASE_URL}/view.labels.getbyidandlan/${idScreen}/${lenguaje._id}`;
  } else {
    url = `${BASE_URL}/view.labels.getbyidandlan/${idScreen}/${lenguajer._id}`;
  }

  let etiquetas = [];
  try {
    await fetch(url, {
      method: 'GET',
      redirect: 'follow',
    })
      .then(res => res.json())
      .catch(error => console.error('Error', error))
      .then(response => {
        response.forEach(tag => {
          etiquetas.push({
            _id: tag._id,
            code: tag.code,
            description: tag.description,
          });
        });
      });
    return etiquetas;
  } catch (error) {
    console.error(error);
  }
}

async function apiIdScreens() {
  let url = `${BASE_URL}/view.index`;
  let screens = [];
  try {
    await fetch(url, {
      method: 'GET',
      redirect: 'follow',
    })
      .then(res => res.json())
      .catch(error => console.error('Error', error))
      .then(response => {
        screens = response;
      });
    return screens;
  } catch (error) {
    console.error(error);
  }
}

async function apiPago(dataPay) {
  let url = `${BASE_URL}/payment.create`;
  console.log(dataPay);
  let resp = {};
  try {
    let data = dataPay;
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then(res => res.json())
      .catch(error => console.error('Error en RESPUESTA API PAGO', error))
      .then(response => {
        console.log('dentro del API PAYMENT');
        console.log(response);
        resp = response;
      });
    return resp;
  } catch (error) {
    console.error('ERROR EN API PAGO', error);
    return resp;
  }
}

async function apiChangePassword(userID, newPassword) {
  let url = `${BASE_URL}/user.changepass/${userID}`;
  console.log(userID, newPassword);
  let resp = {};
  try {
    let data = {password: newPassword};
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then(res => res.json())
      .catch(error =>
        console.error('Error en RESPUESTA API CAMBIO PASSWORD', error),
      )
      .then(response => {
        console.log('dentro del API CAMBIO PASSWORD');
        console.log(response);
        resp = response;
      });
    return resp;
  } catch (error) {
    console.error('ERROR EN API CAMBIO PASSWORD', error);
    return resp;
  }
}

async function apiUpdateUser(user, idUser) {
  let url = `${BASE_URL}/user.update/${idUser}`;
  console.log(user, idUser);
  let resp = {};
  try {
    let data = user;
    await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then(res => res.json())
      .catch(error =>
        console.error('Error en RESPUESTA API UPDATE USER', error),
      )
      .then(response => {
        console.log('dentro del API UPDATE USER');
        console.log(response);
        resp = response;
      });
    return resp;
  } catch (error) {
    console.error('ERROR EN API UPDATE USER', error);
    return resp;
  }
}

async function apiLinkPaypal(codigoMoneda, ValorPago,dataPay) {
  let url = `${BASE_URL}/payment.paypal.create?cur=${codigoMoneda}&amt=${ValorPago}`;
  console.log('VALORES DEL API LINK PAYPAL',codigoMoneda, ValorPago);
  console.log('VALORES A ENVIAR POR PAYPAL', dataPay)
  console.log('VALOR DE URL PAYPAL',url)
  let resp = 'https://m.facebook.com';
  try {
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify(dataPay),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then(res => res.json())
      .catch(error =>
        console.error('Error en RESPUESTA API LINK PAGO PAYPAL', error),
      )
      .then(response => {
        console.log('dentro de RESPUESTA API LINK PAGO PAYPAL');
        console.log(response);
        resp = response;
      });
    return resp;
  } catch (error) {
    console.error('ERROR EN RESPUESTA API LINK PAGO PAYPAL', error);
    return resp;
  }
}

export {
  apiLanguage,
  apiScreen,
  apiIdScreens,
  apiPago,
  apiChangePassword,
  apiUpdateUser,
  apiLinkPaypal
};
