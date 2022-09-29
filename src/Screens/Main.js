import React, { useEffect } from 'react';
import AppNavigations from '@routes/AppNavigationV2';
import { UsuarioProvider } from '@context/UsuarioContext';
import { CementeryProvider } from '@context/CementeryContext';
import { AuthProvider } from '@context/AuthContext';
import { RegisterProvider } from '@context/RegisterContext';
import { CreditCardProvider } from '@context/CreditCardContext';
import { LanguaguesProvider } from '@context/LanguaguesContext';
import { ScreenIdProvider } from '@context/ScreensIDsContext';
import { ScreentagProvider } from '@context/ScreentagsContext';
import { CountriesProvider } from '../context/CountriesContext';

const MainPage = () => {
  useEffect(() => {
    console.log('MainPage');
  }, []);
  return (
    <AuthProvider>
      <ScreentagProvider>
        <ScreenIdProvider>
          <LanguaguesProvider>
            <UsuarioProvider>
              <RegisterProvider>
                <CountriesProvider>
                  <CementeryProvider>
                    <CreditCardProvider>
                      <AppNavigations />
                    </CreditCardProvider>
                  </CementeryProvider>
                </CountriesProvider>
              </RegisterProvider>
            </UsuarioProvider>
          </LanguaguesProvider>
        </ScreenIdProvider>
      </ScreentagProvider>
    </AuthProvider>
  );
};

export default MainPage;
