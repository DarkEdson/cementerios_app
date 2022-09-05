import React, {useState, useEffect, useCallback} from 'react';
import {BASE_URL} from '@utils/config';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function apiLogin(data) {
  let url = `${BASE_URL}/auth/signin`;
  let email = data.email;
  var password = data.password;
  console.log(data);
  let usuario;
  try {
    let data = {
      email: email,
      password: password,
    };
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then(res => res.json())
      .catch(error => console.error('Error', error))
      .then(response => {
        console.log('dentro del API');
        console.log(response);
        usuario = response;
      });
    return usuario;
  } catch (error) {
    console.error(error);
  }
}
