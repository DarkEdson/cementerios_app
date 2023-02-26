import {BASE_URL, BASE_URL_IMG, CATEGORIES_URL} from '@utils/config';

async function getTermsApi(idAffiliate, lenguaje, role) {
  let url = `${BASE_URL}/terms.getterm`;
  console.log('Obteniendo TERMINOS');
  let resp = null;
  let dataTerms = {
    idAffiliate: idAffiliate,
    idLanguage: lenguaje._id,
    role: role,
  };
  try {
    let data = dataTerms;
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then(res => res.json())
      .catch(error =>
        console.error('Error en RESPUESTA API OBTENER TERMINOS', error),
      )
      .then(response => {
        console.log('dentro del API OBTENER TERMINOS');
        console.log(response);
        resp = response;
      });
    return resp;
  } catch (error) {
    console.error('ERROR EN API OBTENER TERMINOS', error);
    return resp;
  }
}

async function getTermsStatusApi(idTerm, idUser) {
  let url = `${BASE_URL}/terms.gettermstatus`;
  console.log('Obteniendo Status de Terminos');
  let resp = null;
  let dataTerm = {
    idTerm: idTerm,
    idUser: idUser,
  };
  try {
    let data = dataTerm;
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then(res => res.json())
      .catch(error =>
        console.error('Error en RESPUESTA API STATUS TERM', error),
      )
      .then(response => {
        console.log('dentro del API TERMS STATUS');
        console.log(response);
        resp = response;
      });
    return resp;
  } catch (error) {
    console.error('ERROR EN API STATUS TERMS', error);
    return resp;
  }
}

async function saveTermStatusApi(idTerm, idUser, status, idTermStatus = null) {
  let url = `${BASE_URL}/terms.savestate`;
  console.log('aceptando Status de Terminos');
  let resp = null;
  let dataTerm;
  if (idTermStatus != null) {
    dataTerm = {
      id: idTermStatus,
      idTerm: idTerm,
      idUser: idUser,
      status: status,
    };
  } else {
    dataTerm = {
      idTerm: idTerm,
      idUser: idUser,
      status: status,
    };

    try {
      let data = dataTerm;
      await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
      })
        .then(res => res.json())
        .catch(error =>
          console.error('Error en RESPUESTA API aceptando STATUS TERM', error),
        )
        .then(response => {
          console.log('dentro del API aceptando TERMS STATUS');
          console.log(response);
          resp = response;
        });
      return resp;
    } catch (error) {
      console.error('ERROR EN API aceptando STATUS TERMS', error);
      return resp;
    }
  }
}

export {getTermsApi, getTermsStatusApi, saveTermStatusApi};
