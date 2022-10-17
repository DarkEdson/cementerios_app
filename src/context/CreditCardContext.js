import React, {createContext, useState, useEffect} from 'react';
import {
  apiActualizarTarjeta,
  apiBorrarTarjeta,
  apiCrearTarjeta,
  apiCreditsCards,
} from '@Apis/CreditCardApi';
import Snackbar from 'react-native-snackbar';

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

function CreditCardProvider({children}) {
  const [creditCard, setCreditCard] = useState(initialState);
  const [creditCardSel, setcreditCardSel] = useState(initialState);
  const [creditCards, setcreditCards] = useState([]);
  const [isLoadingCreditCards, setisLoadingCreditCards] = useState(false);
  const [isUpdatedCard, setisUpdatedCard] = useState(false);

  const getCreditCards = async usuario => {
    setisLoadingCreditCards(true);
    apiCreditsCards(usuario).then(res => {
      console.log('CREDIT CARDS', res);
      setcreditCards(res);
      if (res.length >= 1) {
        setCreditCard(res[0]);
      } else {
        setCreditCard({
          _id: '',
          card_id: '',
          token: '',
          idUser: '',
          brand: '',
          exp_month: '',
          exp_year: '',
          last4: '',
        });
      }

      setisLoadingCreditCards(false);
    });
  };

  const refreshCreditCards = async (usuario, goToScreen, routeName) => {
    setisLoadingCreditCards(true);
    apiCreditsCards(usuario).then(res => {
      console.log('CREDIT CARDS', res);
      setcreditCards(res);
      setCreditCard(res[0]);
      goToScreen(routeName);
      Snackbar.show({
        text: isUpdatedCard ? 'Tarjeta Actualizada' : 'Tarjeta Creada',
        duration: Snackbar.LENGTH_LONG,
      });
      setisLoadingCreditCards(false);
    });
  };

  const createCard = async (
    tarjeta,
    usuario,
    goToScreen,
    routeName,
    tagSuccess,
  ) => {
    setisLoadingCreditCards(true);
    apiCrearTarjeta(tarjeta, usuario).then(res => {
      if (res.value) {
        Snackbar.show({
          text: tagSuccess ? tagSuccess : 'Credit Card Creada',
          duration: Snackbar.LENGTH_LONG,
        });
        console.log('CREDIT CARD CREATED', res);
        refreshCreditCards(usuario, goToScreen, routeName);
      } else {
        console.log(res.raw.code + ' ' + res.raw.message + ' ' + res.raw.param);
        Snackbar.show({
          text: res.raw.code + ' ' + res.raw.message + ' ' + res.raw.param,
          duration: Snackbar.LENGTH_LONG,
        });
        setisLoadingCreditCards(false);
      }
    });
  };

  const deleteCard = async (tarjeta, usuario) => {
    setisLoadingCreditCards(true);
    apiBorrarTarjeta(tarjeta).then(res => {
      console.log('CREDIT CARD DELETED', res);
      getCreditCards(usuario);
    });
  };

  const updateCard = async (tarjeta, usuario, goToScreen, routeName) => {
    setisLoadingCreditCards(true);
    apiActualizarTarjeta(tarjeta, usuario).then(res => {
      if (res.value) {
        Snackbar.show({
          text: 'Credit Card Updated',
          duration: Snackbar.LENGTH_LONG,
        });
        console.log('CREDIT CARD UPDATED', res);
        refreshCreditCards(usuario, goToScreen, routeName);
      } else {
        console.log(res.raw.code + ' ' + res.raw.message + ' ' + res.raw.param);
        Snackbar.show({
          text: res.raw.code + ' ' + res.raw.message + ' ' + res.raw.param,
          duration: Snackbar.LENGTH_LONG,
        });
        setisLoadingCreditCards(false);
      }
    });
  };

  useEffect(() => {}, []);

  return (
    <CreditCardContext.Provider
      value={{
        creditCard,
        creditCardSel,
        creditCards,
        isLoadingCreditCards,
        isUpdatedCard,
        setcreditCardSel,
        getCreditCards,
        setisUpdatedCard,
        createCard,
        deleteCard,
        updateCard,
      }}>
      {children}
    </CreditCardContext.Provider>
  );
}

export {CreditCardContext, CreditCardProvider};
