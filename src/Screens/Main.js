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
import { CountriesProvider } from '@context/CountriesContext';
import { ProductProvider } from '@context/ProductContext';
import { ShoppingCartProvider } from '@context/ShoppingCartContext';
import { RouteBackProvider } from '@context/RouteBackContext';
import { CountryProvider } from '@context/CountryContext';
import { GlobalLanguageProvider } from '@context/LanguageContext';
import { CategoriesProvider } from '@context/CategoriesContext';
import { CementeriesProvider } from '@context/CementeriesContext';
import { PromotionsProvider } from '@context/PromotionsContext';

const MainPage = () => {
  useEffect(() => {
    console.log('MainPage');
  }, []);
  return (
    <AuthProvider>
      <ScreentagProvider>
        <ScreenIdProvider>
          <LanguaguesProvider>
            <GlobalLanguageProvider>
              <UsuarioProvider>
                <RegisterProvider>
                  <ShoppingCartProvider>
                    <CountriesProvider>
                      <CountryProvider>
                        <CementeriesProvider>
                          <CategoriesProvider>
                            <PromotionsProvider>
                              <CementeryProvider>
                                <ProductProvider>
                                  <CreditCardProvider>
                                    <RouteBackProvider>
                                      {
                                        //el ultimo nivel, la app
                                      }
                                      <AppNavigations />
                                      {
                                        //
                                      }
                                    </RouteBackProvider>
                                  </CreditCardProvider>
                                </ProductProvider>
                              </CementeryProvider>
                            </PromotionsProvider>
                          </CategoriesProvider>
                        </CementeriesProvider>
                      </CountryProvider>
                    </CountriesProvider>
                  </ShoppingCartProvider>
                </RegisterProvider>
              </UsuarioProvider>
            </GlobalLanguageProvider>
          </LanguaguesProvider>
        </ScreenIdProvider>
      </ScreentagProvider>
    </AuthProvider>
  );
};

export default MainPage;
