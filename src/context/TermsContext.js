import React, {createContext, useState} from 'react';
//Apis
import {
  getTermsApi,
  getTermsStatusApi,
  saveTermStatusApi,
} from '@Apis/TermsApi';
//import {saveTerm, getcountry} from '@storage/CountryAsyncStorage';

const TermsContext = createContext();

function TermsProvider({children}) {
  const [acceptTerm, setAcceptTerm] = useState(0);
  const [termsResp, settermsResp] = useState(null);
  const [termStatusResp, settermStatusResp] = useState(null);
  const [termText, settermText] = useState({
    html: `
<p style='text-align:center;'>
  Hello World!
</p>`,
  });
  const [isLoadingTerms, setLoadingTerms] = useState(false);

  async function saveTermStatus(idUser, status) {
    setLoadingTerms(true);

    saveTermStatusApi(
      termsResp != null ? termsResp._id : null,
      idUser,
      status,
      termStatusResp != null ? termStatusResp._id : null,
    ).then(res => {
      console.log('STATUS TERM SALVADO STATUS', res);
      settermStatusResp(res);
      setLoadingTerms(false);
    });
  }
  async function getStatusTerms(idTerm, idUser) {
    setLoadingTerms(true);
    let myStatusTerms;
    getTermsStatusApi(idTerm, idUser).then(res => {
      if (res != null) {
        setAcceptTerm(res.status);
        console.log('STATUS TERM RESPUESTA SIMPLE', res.status);
        settermStatusResp(res);
      } else {
        setAcceptTerm(0);
      }

      setLoadingTerms(false);
    });
    myStatusTerms = await getTermsStatusApi(idTerm, idUser);
    console.log('RESPUESTA EN getSTATUS TERMS API', myStatusTerms);
    return myStatusTerms;
  }

  async function getTerms(lenguaje, user) {
    setLoadingTerms(true);
    let myTerms;
    getTermsApi(lenguaje, user.role).then(res => {
      if (res != null) {
        settermText({html: res.text});
        settermsResp(res);
        // console.log('TERMS', res.text);
        getStatusTerms(res._id, user._id);
      }

      setLoadingTerms(false);
    });

    myTerms = await getTermsApi(lenguaje, user.role);
    console.log('RESPUESTA EN getTermsContexts API', termsResp);
    return myTerms;
  }

  return (
    <TermsContext.Provider
      value={{
        acceptTerm,
        termText,
        termStatusResp,
        setAcceptTerm,
        isLoadingTerms,
        saveTermStatus,
        getStatusTerms,
        getTerms,
      }}
    >
      {children}
    </TermsContext.Provider>
  );
}

export {TermsContext, TermsProvider};
