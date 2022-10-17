import React, {useState, useEffect, useCallback} from 'react';
import {BASE_URL} from '@utils/config';

async function apiCrearTarjeta(tarjeta, usuario) {
  let url = `${BASE_URL}/user.creditcards.create`;
  let last4 = tarjeta.number.split(' ');
  let expMonth = tarjeta.expiration.split('/');
  console.log(last4, expMonth);
  let card = {};
  try {
    let data = {
      idUser: usuario._id,
      number: tarjeta.number.split(' ').join(''),
      exp_month: expMonth[0],
      exp_year: expMonth[1],
      cvc: tarjeta.cvv,
    };
    console.log('TARJETA A CREAR: ', data);
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then(res => res.json())
      .catch(error =>
        console.error('Error en RESPUESTA API CREAR TARJETA', error),
      )
      .then(response => {
        console.log('dentro del API CREAR TARJETA');
        console.log(response);
        card = response;
      });
    return card;
  } catch (error) {
    console.error('ERROR EN API CREAR TARJETA', error);
    return card;
  }
}

async function apiActualizarTarjeta(tarjeta, usuario) {
  let url = `${BASE_URL}/user.creditcards.update/${tarjeta._id}`;
  let last4 = tarjeta.number.split(' ');
  let expMonth = tarjeta.expiration.split('/');
  console.log(last4, expMonth);
  let card = {};
  try {
    let data = {
      idUser: usuario._id,
      number: tarjeta.number.split(' ').join(''),
      exp_month: expMonth[0],
      exp_year: expMonth[1],
      cvc: tarjeta.cvv,
    };
    console.log('TARJETA A ACTUALIZAR: ', data);
    await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then(res => res.json())
      .catch(error =>
        console.error('Error en RESPUESTA API ACTUALIZAR TARJETA', error),
      )
      .then(response => {
        console.log('dentro del API ACTUALIZAR TARJETA');
        console.log(response);
        card = response;
      });
    return card;
  } catch (error) {
    console.error('ERROR EN API ACTUALIZAR TARJETA', error);
    return card;
  }
}

async function apiBorrarTarjeta(tarjeta) {
  let url = `${BASE_URL}/user.creditcards.destroy/${tarjeta._id}`;
  let card = {};
  try {
    await fetch(url, {
      method: 'DEL',
      redirect: 'follow',
    })
      .then(res => res.json())
      .catch(error => console.error('Error', error))
      .then(response => {
        card = response;
      });
    return card;
  } catch (error) {
    console.error(error);
    return card;
  }
}

async function apiCreditsCards(usuario) {
  let url = `${BASE_URL}/user.creditcards.getcreditcardsbyid/${usuario._id}`;
  let creditsCards = [];
  try {
    await fetch(url, {
      method: 'GET',
      redirect: 'follow',
    })
      .then(res => res.json())
      .catch(error => console.error('Error en CREDIT CARD API', error))
      .then(response => {
        response.map(card => {
          creditsCards.push({
            _id: card._id,
            card_id: card.card_id,
            token: card.token,
            idUser: card.idUser,
            brand: card.brand,
            exp_month: card.exp_month,
            exp_year: card.exp_year,
            last4: card.last4,
          });
        });
      });
    return creditsCards;
  } catch (error) {
    creditsCards.error('error en RESPUESTA CREDIT CARD API', error);
  }
}

export {
  apiCrearTarjeta,
  apiActualizarTarjeta,
  apiBorrarTarjeta,
  apiCreditsCards,
};
