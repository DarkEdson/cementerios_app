import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Platform,
  SafeAreaView,
  NativeModules,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
//Estilos Generales
import {splashStyles,mainStyles} from '@styles/stylesGeneral';
//Contextos
import {UsuarioContext} from '@context/UsuarioContext';
import {LanguaguesContext} from '@context/LanguaguesContext';
import {ShoppingCartContext} from '@context/ShoppingCartContext';
import {ScreenIdContext} from '@context/ScreensIDsContext';
import {ScreentagContext} from '@context/ScreentagsContext';
import {CountriesContext} from '@context/CountriesContext';
import {CountryContext} from '@context/CountryContext';
import { GlobalLanguageContext } from '@context/LanguageContext';
import { CurrenciesContext } from '@context/CurrencyContext';
//Apis
import {apiLanguage, apiIdScreens} from '@Apis/ApisGenerales';
import locationsApi from '@Apis/LocationsApi';
//Async Storages
import {getUsuario} from '@storage/UsuarioAsyncStorage';
import {getLanguague, saveLanguague} from '@storage/LanguagueAsyncStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getcountry} from '@storage/CountryAsyncStorage';

export default function SplashScreen(props) {
  const [login, loginAction] = useContext(UsuarioContext);
  const [ScreenId, setScreenId] = useContext(ScreenIdContext);
  const [Languagues, setLanguagues] = useContext(LanguaguesContext);
  const [countries, setCountries] = useContext(CountriesContext);
  const {removeAllItemstoCart} = useContext(ShoppingCartContext);
  const {saveDefaultCountry, updateDefaultCountry} = useContext(CountryContext);
  const {tags, updateTags} = useContext(ScreentagContext);
  const [GlobalLanguage, setGlobalLanguage] = useContext(GlobalLanguageContext)
  const {
    isLoadingCurrencies,
    getCurrenciesAf,
    getCurrencies,
  } = useContext(CurrenciesContext);

  const [bienvenida, setbienvenida] = useState('es');
  let deviceLanguage =(
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0]
      : NativeModules.I18nManager.localeIdentifier)
  let defaultLanguage = deviceLanguage.substr(0, 2);

  //variable para limpiar el async storage
  const clear = false;

  useEffect(() => {
    //limpia el async storage por completo cambiando la variable clear a TRUE
    if (clear) {
      console.log(clear);
      clearAsyncStorage = async () => {
        AsyncStorage.clear();
      };
      clearAsyncStorage();
    }

    console.log('LENGUAJE DE SISTEMA', deviceLanguage.substr(0, 2));
    obtenerLenguaje(defaultLanguage);
    fetchSesion(loginAction);
  }, []);

  return (
    <View style={splashStyles.container}>
      <ImageBackground
        source={require('@images/background.png')}
        resizeMode="cover"
        style={splashStyles.image}>
        <Animatable.Image
          animation="pulse"
          easing="ease-in-out"
          iterationCount="infinite"
          style={splashStyles.logo}
          source={require('@images/main_logo.png')}
        />
        <Text style={splashStyles.texto}>
          {bienvenida == 'es' ? 'Bienvenido' : 'Welcome'}
        </Text>
      </ImageBackground>
    </View>
  );

  async function obtenerLenguaje(defecto) {
    const response = await apiLanguage();
    setLanguagues(response);
    const lenguaje = await getLanguague();
    console.log(lenguaje, 'lenguaje que esta guardado');
    if (lenguaje == null) {
      response.forEach(element => {
        if (element.code == defecto) {
          setbienvenida(element.code);
          saveLanguague(element).then(msg => {});
          setGlobalLanguage(element)
        } else {
          setbienvenida(response[0].code);
          saveLanguague(response[0]).then(msg => {});
          setGlobalLanguage(response[0])
        }
      });
    } else {
      response.forEach(element => {
        if (element._id == lenguaje._id) {
          setbienvenida(lenguaje.code);
          saveLanguague(lenguaje).then(msg => {});
          setGlobalLanguage(lenguaje)
        } else if (element.code == lenguaje.code) {
          setbienvenida(element.code);
          saveLanguague(element).then(msg => {});
          setGlobalLanguage(element)
        }
      });

      setbienvenida(lenguaje.code);
    }
  }
  async function fetchCountries() {
    const response = await locationsApi();
    const pais = await getcountry();
    setCountries(response);
    if (response != null) {
      if (pais == null) {
        saveDefaultCountry(response[0]);
      } else {
        updateDefaultCountry(pais);
      }
    }
  }

  async function fetchSesion(loginAction) {
    const response = await getUsuario();
    const pantallasID = await apiIdScreens();
    setScreenId(pantallasID);
    pantallasID.forEach(pantalla => {
      updateTags(pantalla);
    });
    if (response == null) {
      setTimeout(() => {
        goToScreen('Login');
      }, 3000);
      return;
    }
    loginAction({type: 'sign-in', data: response});
    fetchCountries();
    getCurrenciesAf();
    getCurrencies();
    removeAllItemstoCart();
    setTimeout(() => {
      goToScreen('Home');
    }, 3000);
  }

  function goToScreen(routeName) {
    props.navigation.replace(routeName);
  }
}
