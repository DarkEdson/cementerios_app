import React, { createContext, useState, useEffect } from 'react';
import {apiCreditsCards} from '@Apis/ApisGenerales';

const initialState = {
  _id: '',
  card_id: '',
  token: '',
  idUser: '',
  brand: '',
  exp_month: '',
  exp_year: '',
  last4: '',
};

const CreditCardContext = createContext();

function CreditCardProvider({ children }) {
  const [creditCard, setCreditCard] = useState(initialState);
  const [creditCardSel, setcreditCardSel] = useState(initialState)
  const [creditCards, setcreditCards] = useState([])
  const [isLoadingCreditCards, setisLoadingCreditCards] = useState(false)

  const getCreditCards = async (usuario) => {
    setisLoadingCreditCards(true)
    apiCreditsCards(usuario).then(res => {
      res.sort((a, b) => a.code.localeCompare(b.code));
      console.log('CREDIT CARDS', res)
      setcreditCards(res)
      setCreditCard(res[0])
      setisLoadingCreditCards(false);
    });

  };

  useEffect(() => { }, []);

  return (
    <CreditCardContext.Provider value={{ creditCard, creditCardSel,creditCards,isLoadingCreditCards,setcreditCardSel,getCreditCards }}>
      {children}
    </CreditCardContext.Provider>
  );
}

export { CreditCardContext, CreditCardProvider };
