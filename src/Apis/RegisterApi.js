import React, {useState, useEffect, useCallback} from 'react';
import {BASE_URL} from '@utils/config';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function apiRegister(dataU) {
  let url = `${BASE_URL}/auth/signin`;
  console.log(dataU);
  let usuario;
  try {
    let data = {
      username: dataU.username,
      name: dataU.name,
      lastname: dataU.lastname,
      email: dataU.email,
      password: dataU.password,
      phone: dataU.phone,
      id_number: dataU.id_number,
      paypal_id: dataU.paypal_id,
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
        console.log('dentro del API REGISTRO');
        console.log(response);
        usuario = response;
      });
    return usuario;
  } catch (error) {
    console.error(error);
  }
}
