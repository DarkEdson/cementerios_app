import React from 'react';
import AppNavigations from '@routes/AppNavigationV2';
import {UsuarioProvider} from '@context/UsuarioContext';
import {CementeryProvider} from '@context/CementeryContext';
import {AuthProvider} from '@context/AuthContext';
import {RegisterProvider} from '@context/RegisterContext';
import {CreditCardProvider} from '@context/CreditCardContext';

const MainPage = () => {
  return (
    <AuthProvider>
      <UsuarioProvider>
        <RegisterProvider>
          <CementeryProvider>
            <CreditCardProvider>
              <AppNavigations />
            </CreditCardProvider>
          </CementeryProvider>
        </RegisterProvider>
      </UsuarioProvider>
    </AuthProvider>
  );
};

export default MainPage;
