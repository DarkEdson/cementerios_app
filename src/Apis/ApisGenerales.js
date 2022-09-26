import React, {useState, useEffect, useCallback} from 'react';
import {BASE_URL} from '@utils/config';
import {getLanguague, saveLanguague} from '@storage/LanguagueAsyncStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function apiLanguage() {
  let url = `${BASE_URL}/language.index`;
  console.log(url);
  let lenguajes = [];
  try {
    await fetch(url, {
      method: 'GET',
      redirect: 'follow',
    })
      .then(res => res.json())
      .catch(error => console.error('Error', error))
      .then(response => {
        console.log('dentro del API Lenguaje');
        console.log(response);
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
  //const lenguaje = await getLanguague();
  const lenguaje = {_id: '63313015a17b6dbe84cb5f3e'};
  let url = `${BASE_URL}/view.labels.getbyidandlan/${idScreen}/${lenguaje._id}`;
  console.log(url);
  let etiquetas = [];
  try {
    await fetch(url, {
      method: 'GET',
      redirect: 'follow',
    })
      .then(res => res.json())
      .catch(error => console.error('Error', error))
      .then(response => {
        console.log('dentro del API Screen');
        console.log(response);
        etiquetas = response;
      });
    return etiquetas;
  } catch (error) {
    console.error(error);
  }
}

async function apiIdScreens() {
  let url = `${BASE_URL}/view.index`;
  console.log(url);
  let screens = [];
  try {
    await fetch(url, {
      method: 'GET',
      redirect: 'follow',
    })
      .then(res => res.json())
      .catch(error => console.error('Error', error))
      .then(response => {
        console.log('dentro del API Pantallas');
        console.log(response);
        screens = response;
      });
    return screens;
  } catch (error) {
    console.error(error);
  }
}

export {apiLanguage, apiScreen, apiIdScreens};
