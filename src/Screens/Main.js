import React, {useEffect} from 'react';
import AppNavigations from '@routes/AppNavigationV2';
import {UsuarioProvider} from '@context/UsuarioContext';
import {CementeryProvider} from '@context/CementeryContext';
import {AuthProvider} from '@context/AuthContext';
import {RegisterProvider} from '@context/RegisterContext';
import {CreditCardProvider} from '@context/CreditCardContext';
import {LanguaguesProvider} from '@context/LanguaguesContext';
import {ScreenIdProvider} from '@context/ScreensIDsContext';
import {ScreentagProvider} from '@context/ScreentagsContext';
import {CountriesProvider} from '@context/CountriesContext';
import {ProductProvider} from '@context/ProductContext';
import {ShoppingCartProvider} from '@context/ShoppingCartContext';
import {RouteBackProvider} from '@context/RouteBackContext';
import {CountryProvider} from '@context/CountryContext';
import {GlobalLanguageProvider} from '@context/LanguageContext';
import {CategoriesProvider} from '@context/CategoriesContext';
import {CementeriesProvider} from '@context/CementeriesContext';
import {PromotionsProvider} from '@context/PromotionsContext';
import {ProductsProvider} from '@context/ProductsContext';
import {CategoryProvider} from '@context/CategoryContext';
import {SedesProvider} from '@context/SedesContext';
import {SedeProvider} from '@context/SedeContext';
import {CurrenciesProvider} from '@context/CurrencyContext';
import {PromotionProvider} from '@context/PromotionContext';
import {ReportsProvider} from '@context/ReportsContext';

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
              <SedesProvider>
                <SedeProvider>
                  <UsuarioProvider>
                    <RegisterProvider>
                      <ShoppingCartProvider>
                        <CountriesProvider>
                          <CountryProvider>
                            <CementeriesProvider>
                              <CurrenciesProvider>
                                <CategoriesProvider>
                                  <CategoryProvider>
                                    <PromotionsProvider>
                                      <PromotionProvider>
                                        <CementeryProvider>
                                          <ProductsProvider>
                                            <ProductProvider>
                                              <CreditCardProvider>
                                                <ReportsProvider>
                                                  <RouteBackProvider>
                                                    {
                                                      //el ultimo nivel, la app
                                                    }
                                                    <AppNavigations />
                                                    {
                                                      //
                                                    }
                                                  </RouteBackProvider>
                                                </ReportsProvider>
                                              </CreditCardProvider>
                                            </ProductProvider>
                                          </ProductsProvider>
                                        </CementeryProvider>
                                      </PromotionProvider>
                                    </PromotionsProvider>
                                  </CategoryProvider>
                                </CategoriesProvider>
                              </CurrenciesProvider>
                            </CementeriesProvider>
                          </CountryProvider>
                        </CountriesProvider>
                      </ShoppingCartProvider>
                    </RegisterProvider>
                  </UsuarioProvider>
                </SedeProvider>
              </SedesProvider>
            </GlobalLanguageProvider>
          </LanguaguesProvider>
        </ScreenIdProvider>
      </ScreentagProvider>
    </AuthProvider>
  );
};

export default MainPage;
