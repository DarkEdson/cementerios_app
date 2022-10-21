import React, {useState, useEffect, useCallback} from 'react';
import {BASE_URL} from '@utils/config';

async function apiReporteVendedor(usuarioID, lenguajeID, fechaIni, fechaFin) {
  let url = `${BASE_URL}/payment.getsalesbyuser`;
  let ventas = {};
  try {
    let data = {
      start_date: fechaIni,
      finish_date: fechaFin,
      idUser: usuarioID,
      idLanguage: lenguajeID,
    };
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then(res => res.json())
      .catch(error =>
        console.error('Error en RESPUESTA API REPORTE VENDEDOR', error),
      )
      .then(response => {
        console.log('dentro del API REPORTE VENDEDOR');
        console.log(response);
        ventas = response;
      });
    return ventas;
  } catch (error) {
    console.error('ERROR EN API REPORTE VENDEDOR', error);
    return ventas;
  }
}

async function apiReporteCliente(usuarioID, lenguajeID) {
  let url = `${BASE_URL}/payment.getsalesbyclient`;
  let compras = {};
  try {
    let data = {
      idUser: usuarioID,
      idLanguage: lenguajeID,
    };
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then(res => res.json())
      .catch(error =>
        console.error('Error en RESPUESTA API REPORTE VENDEDOR', error),
      )
      .then(response => {
        console.log('dentro del API REPORTE VENDEDOR');
        console.log(response);
        compras = response;
      });
    return compras;
  } catch (error) {
    console.error('ERROR EN API REPORTE VENDEDOR', error);
    return compras;
  }
}

export {apiReporteVendedor, apiReporteCliente};
