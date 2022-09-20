import React, {createContext, useState} from 'react';

const initialState = {
  cardNumber: '',
  cardHolderName: '',
  nameSurname: '',
  mmYY: '',
  expiration: '',
  securityCode: '',
  brand: '',
};

const CreditCardContext = createContext();

function CreditCardProvider({children}) {
  const [creditCard, setCreditCard] = useState(initialState);

  return (
    <CreditCardContext.Provider value={[creditCard, setCreditCard]}>
      {children}
    </CreditCardContext.Provider>
  );
}

export {CreditCardContext, CreditCardProvider};
