import React from 'react';
import AppNavigation from '@routes/AppNavigation';
import {UsuarioProvider} from '@context/UsuarioContext';

const MainPage = () => {
  return (
    <UsuarioProvider>
      <AppNavigation />
    </UsuarioProvider>
  );
};

export default MainPage;
