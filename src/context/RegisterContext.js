import React, {createContext, useState} from 'react';

const initialState = {
  username: '',
  name: '',
  lastname: '',
  email: '',
  password: '',
  phone: '',
  role: '',
  paypal_id: '',
  avatar: '',
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
