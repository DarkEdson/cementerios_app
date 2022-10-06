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
import { ProductsProvider } from '@context/ProductsContext';
import { CategoryProvider } from '@context/CategoryContext';

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
                            <CategoryProvider>
                              <PromotionsProvider>
                                <CementeryProvider>
                                  <ProductsProvider>
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
                                  </ProductsProvider>
                                </CementeryProvider>
                              </PromotionsProvider>
                            </CategoryProvider>
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
