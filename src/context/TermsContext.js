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
  const [termText, settermText] = useState('');
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
    getTermsStatusApi(idTerm, idUser).then(res => {
      if (res != null) {
        setAcceptTerm(res.status);
        console.log('STATUS TERM RESPUESTA SIMPLE', res.status);
        settermStatusResp(res);
      }

      setLoadingTerms(false);
    });
  }

  async function getTerms(idAffiliate, lenguaje, user) {
    setLoadingTerms(true);
    getTermsApi(idAffiliate, lenguaje, user.role).then(async res => {
      if (res != null) {
        settermText(res.text);
        settermsResp(res);
        console.log('TERMS', res.text);
      }
      getStatusTerms(res.id, user._id);
      setLoadingTerms(false);
    });
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
