import React, {useState, useEffect, useCallback} from 'react';
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

  const lenguaje = {_id: '633225cf5531aa122f71a7e4'};

  let url = `${BASE_URL}/view.labels.getbyidandlan/${idScreen}/${lenguajer._id}`;
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
  let resp = {}
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
    console.error('ERROR EN API PAGO',error);
    return resp;
  }
}

export {apiLanguage, apiScreen, apiIdScreens, apiPago};
