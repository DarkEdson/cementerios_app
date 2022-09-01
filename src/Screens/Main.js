import React from 'react';
import AppNavigations from '@routes/AppNavigationV2';
import {UsuarioProvider} from '@context/UsuarioContext';
import {CementeryProvider} from '@context/CementeryContext';

const MainPage = () => {
  return (
    <UsuarioProvider>
      <CementeryProvider>
        <AppNavigations />
      </CementeryProvider>
    </UsuarioProvider>
  );
};

export default MainPage;
