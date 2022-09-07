import React from 'react';
import AppNavigations from '@routes/AppNavigationV2';
import {UsuarioProvider} from '@context/UsuarioContext';
import {CementeryProvider} from '@context/CementeryContext';
import {AuthProvider} from '@context/AuthContext';

const MainPage = () => {
  return (
    <AuthProvider>
      <UsuarioProvider>
        <CementeryProvider>
          <AppNavigations />
        </CementeryProvider>
      </UsuarioProvider>
    </AuthProvider>
  );
};

export default MainPage;
