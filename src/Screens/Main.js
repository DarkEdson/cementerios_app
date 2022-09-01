import React from 'react';
import AppNavigations from '@routes/AppNavigationV2';
import {UsuarioProvider} from '@context/UsuarioContext';

const MainPage = () => {
  return (
    <UsuarioProvider>
      <AppNavigations />
    </UsuarioProvider>
  );
};

export default MainPage;
