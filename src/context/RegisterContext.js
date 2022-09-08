import React, {createContext, useState} from 'react';

const initialState = {
      username: '',
      name: '',
      lastname: '',
      email: '',
      password: '',
      phone: '',
      id_number: '',
      paypal_id: '',
      image: '',

  };
const RegisterContext = createContext();

function RegisterProvider({children}) {
  const [registerUser, registerAction] = useState(initialState);

  return (
    <RegisterContext.Provider value={[registerUser, registerAction]}>
      {children}
    </RegisterContext.Provider>
  );
}

export {RegisterContext, RegisterProvider};
