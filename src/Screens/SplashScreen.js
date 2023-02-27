import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Platform,
  ScrollView,
  Dimensions,
  SafeAreaView,
  NativeModules,
  useWindowDimensions,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import RenderHtml from 'react-native-render-html';
import MyButton from '@Components/common/MyButton';

//Estilos Generales
import {splashStyles, mainStyles} from '@styles/stylesGeneral';
//Contextos
import {UsuarioContext} from '@context/UsuarioContext';
import {LanguaguesContext} from '@context/LanguaguesContext';
import {ShoppingCartContext} from '@context/ShoppingCartContext';
import {ScreenIdContext} from '@context/ScreensIDsContext';
import {ScreentagContext} from '@context/ScreentagsContext';
import {CountriesContext} from '@context/CountriesContext';
import {CountryContext} from '@context/CountryContext';
import {GlobalLanguageContext} from '@context/LanguageContext';
import {CurrenciesContext} from '@context/CurrencyContext';
import {TermsContext} from '@context/TermsContext';
//Apis
import {apiLanguage, apiIdScreens} from '@Apis/ApisGenerales';
import locationsApi from '@Apis/LocationsApi';
//Async Storages
import {getUsuario} from '@storage/UsuarioAsyncStorage';
import {getLanguague, saveLanguague} from '@storage/LanguagueAsyncStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getcountry} from '@storage/CountryAsyncStorage';

export default function SplashScreen(props) {
  const {
    termText,
    acceptTerm,
    setAcceptTerm,
    getStatusTerms,
    isLoadingTerms,
    getTerms,
    termsResp,
    saveTermStatus,
  } = useContext(TermsContext);
  const [usuarioAsincrono, setusuarioAsincrono] = useState(null);
  const [login, loginAction] = useContext(UsuarioContext);
  const [ScreenId, setScreenId] = useContext(ScreenIdContext);
  const [Languagues, setLanguagues] = useContext(LanguaguesContext);
  const [countries, setCountries] = useContext(CountriesContext);
  const {removeAllItemstoCart} = useContext(ShoppingCartContext);
  const {saveDefaultCountry, updateDefaultCountry} = useContext(CountryContext);
  const {tags, updateTags} = useContext(ScreentagContext);
  const [visible, setvisible] = useState(false);
  const [GlobalLanguage, setGlobalLanguage] = useContext(GlobalLanguageContext);
  const {isLoadingCurrencies, getCurrenciesAf, getCurrencies} = useContext(
    CurrenciesContext,
  );

  const [bienvenida, setbienvenida] = useState('es');
  let deviceLanguage =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0]
      : NativeModules.I18nManager.localeIdentifier;
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

  const {width} = useWindowDimensions();

  return (
    <View style={splashStyles.container}>
      {!visible ? (
        <ImageBackground
          source={require('@images/background.png')}
          resizeMode="cover"
          style={splashStyles.image}
        >
          <Animatable.Image
            animation="pulse"
            easing="ease-in-out"
            iterationCount="infinite"
            style={splashStyles.logo}
            source={require('@images/main_logo.png')}
          />
          <View
            style={{
              alignContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}
          >
            <Text style={splashStyles.texto}>
              {bienvenida == 'es' ? 'Bienvenido' : 'Welcome'}
            </Text>
          </View>
        </ImageBackground>
      ) : (
        <SafeAreaView style={mainStyles.containers}>
          <ScrollView
            style={{paddingHorizontal: Dimensions.get('screen').width * 0.025}}
          >
            <RenderHtml contentWidth={width} source={termText} />
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: Dimensions.get('screen').width * 0.045,
              }}
            >
              <MyButton
                style={{
                  width: Dimensions.get('screen').width * 0.4,
                  marginRight: Dimensions.get('screen').width * 0.05,
                }}
                titulo={'Confirm.'}
                onPress={() => aceptarTerminos()}
              />
              <MyButton
                style={{width: Dimensions.get('screen').width * 0.4}}
                titulo={'Cancel.'}
                onPress={() => rechazarTerminos()}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
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
          setGlobalLanguage(element);
        } else {
          setbienvenida(response[0].code);
          saveLanguague(response[0]).then(msg => {});
          setGlobalLanguage(response[0]);
        }
      });
    } else {
      response.forEach(element => {
        if (element._id == lenguaje._id) {
          setbienvenida(lenguaje.code);
          saveLanguague(lenguaje).then(msg => {});
          setGlobalLanguage(lenguaje);
        } else if (element.code == lenguaje.code) {
          setbienvenida(element.code);
          saveLanguague(element).then(msg => {});
          setGlobalLanguage(element);
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
    let terminosOK = acceptTerm;
    const response = await getUsuario();
    const pantallasID = await apiIdScreens();
    const lenguajes = await apiLanguage();
    let myActualLanguage = defaultLanguage;
    const lenguaje = await getLanguague();
    if (lenguaje == null) {
      lenguajes.forEach(element => {
        if (element.code == defecto) {
          myActualLanguage = element;
        } else {
          myActualLanguage = lenguajes[0];
        }
      });
    } else {
      lenguajes.forEach(element => {
        if (element._id == lenguaje._id) {
          myActualLanguage = element;
        } else if (element.code == lenguaje.code) {
          myActualLanguage = element;
        }
      });
    }
    setScreenId(pantallasID);
    pantallasID.forEach(pantalla => {
      updateTags(pantalla);
    });
    console.log('ESTOS LENGUAJES EN FETCH SESION', myActualLanguage, response);

    if (response == null) {
      setTimeout(() => {
        goToScreen('Login');
      }, 3000);
      return;
    }
    const terminos = await getTerms(myActualLanguage, response);
    let statusTerminos;
    console.log('ESTA FLAG X1');
    if (terminos != null) {
      console.log('ESTA FLAG X2');
      statusTerminos = await getStatusTerms(terminos._id, response._id);
    }
    if (statusTerminos != null) {
      console.log('ESTA FLAG X3', statusTerminos.status);
      terminosOK = statusTerminos.status;
    }
    console.log('FLAG 1 PRUEBA', statusTerminos);
    loginAction({type: 'sign-in', data: response});
    fetchCountries();
    getCurrenciesAf();
    getCurrencies();
    removeAllItemstoCart();
    console.log('ANTES DE IF ACCEPT TERM', acceptTerm);
    if (terminosOK != 1) {
      console.log('DENTRO DE IF ACCEPT TERM', acceptTerm);
      setusuarioAsincrono(response);
      setvisible(true);
      return;
    }
    setTimeout(() => {
      goToScreen('Home');
    }, 3000);
  }

  function aceptarTerminos() {
    setvisible(false);
    saveTermStatus(usuarioAsincrono._id, 1);
    setTimeout(() => {
      goToScreen('Home');
    }, 3000);
  }
  function rechazarTerminos() {
    setvisible(false);
    loginAction({
      type: 'sign-out',
      data: {},
      tags: {
        mensaje:
          tags.dialogAlertsScreen.o != ''
            ? tags.dialogAlertsScreen.o
            : 'Sesion Cerrada Exitosamente.',
      },
    });
    removeAllItemstoCart();
    goToScreen('Login');
  }

  function goToScreen(routeName) {
    props.navigation.replace(routeName);
  }
}
