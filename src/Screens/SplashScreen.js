import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Platform,
  NativeModules,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {splashStyles} from '@styles/stylesGeneral';
//Contextos
import {UsuarioContext} from '@context/UsuarioContext';
import {LanguaguesContext} from '@context/LanguaguesContext';
import {ScreenIdContext} from '@context/ScreensIDsContext';
//Apis
import {apiLanguage, apiIdScreens} from '@Apis/ApisGenerales';
//Async Storages
import {getUsuario} from '@storage/UsuarioAsyncStorage';
import {getLanguague, saveLanguague} from '@storage/LanguagueAsyncStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SplashScreen(props) {
  const [login, loginAction] = useContext(UsuarioContext);
  const [ScreenId, setScreenId] = useContext(ScreenIdContext);
  const [Languagues, setLanguagues] = useContext(LanguaguesContext);
  const [bienvenida, setbienvenida] = useState('es');
  let deviceLanguage =
    Platform.OS === ' ios'
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0]
      : NativeModules.I18nManager.localeIdentifier;
  let defaultLanguage = deviceLanguage.substr(0, 2);

  const clear = false;
  useEffect(() => {
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
    console.log('ARRAY de lenguajes', response);
    const lenguaje = await getLanguague();
    console.log(lenguaje, 'lenguaje que esta guardado');
    if (lenguaje == null) {
      response.forEach(element => {
        if ((element.code = defecto)) {
          setbienvenida(element.code);
          saveLanguague(element).then(msg => {
            console.log('lenguaje defecto guardado');
          });
        } else {
          setbienvenida(response[0].code);
          saveLanguague(response[0]).then(msg => {
            console.log('lenguaje posicion 1 guardado');
          });
        }
      });
    } else {
      setbienvenida(lenguaje.code);
    }
  }

  async function fetchSesion(loginAction) {
    const response = await getUsuario();
    const pantallasID = await apiIdScreens();
    console.log('PANTALLAS OBTENIDAS', pantallasID);
    setScreenId(pantallasID);
    console.log('DATOS DE SESION GUARDADOS', response);
    if (response == null) {
      setTimeout(() => {
        goToScreen('Login');
      }, 3000);
      return;
    }
    loginAction({type: 'sign-in', data: response});
    setTimeout(() => {
      goToScreen('Home');
    }, 1000);
  }

  function goToScreen(routeName) {
    props.navigation.replace(routeName);
  }
}
