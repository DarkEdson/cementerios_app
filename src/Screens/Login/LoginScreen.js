import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  StatusBar,
  Image,
  ImageBackground,
  ScrollView,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
//Configuracion general
import {LOGIN_SCREEN_ID} from '@utils/config';
//Estilos generales
import {mainStyles, loginStyles} from '@styles/stylesGeneral';
import color from '@styles/colors';
//Apis Generales
import {apiScreen} from '@Apis/ApisGenerales';
//Componentes
import MyTextInput from '@Components/common/MyTextInput';
import MyButton from '@Components/common/MyButton';
import MyTextButton from '@Components/common/MyTextButton';
//Contextos
import {UsuarioContext} from '@context/UsuarioContext';
import {LanguaguesContext} from '@context/LanguaguesContext';
import {ScreenIdContext} from '@context/ScreensIDsContext';
import {AuthContext} from '@context/AuthContext';

export default function LoginScreen(props) {
  const [loginUser, loginAction] = useContext(UsuarioContext);
  const [Languagues, setLanguagues] = useContext(LanguaguesContext);
  const [ScreenId, setScreenId] = useContext(ScreenIdContext);
  const {login} = useContext(AuthContext);
  const [labels, setLabels] = useState({
    btnlogin: '',
    contrasena: '',
    inputpassword: '',
    inputusuario: '',
    label1: '',
  });
  const [hidePassword, setHidePassword] = useState(true);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  let idScreen = '0';

  useEffect(() => {
    async function obtenerEtiquetas() {
      console.log('Listado de Screen', ScreenId);
      ScreenId.forEach(screen => {
        if (screen.code == LOGIN_SCREEN_ID) {
          idScreen = screen._id;
          console.log('DATOS DEL SCREEN A OBTENER ETIQUETAS', screen);
        }
      });
      console.log('ID Del screen', idScreen);
      let etiquetas = await apiScreen(idScreen);
      if (etiquetas.length != 0) {
        setLabels({
          btnlogin: etiquetas[0].description,
          contrasena: etiquetas[1].description,
          inputpassword: etiquetas[2].description,
          inputusuario: etiquetas[3].description,
          label1: etiquetas[4].description,
        });
      }
      console.log(etiquetas, 'etiquetas en LOGIN');
    }
    obtenerEtiquetas();
    setEmail('');
    setPassword('');
    console.log(Languagues);
    return () => {};
  }, []);

  return (
    <ScrollView>
      <View style={mainStyles.container}>
        <StatusBar backgroundColor={color.PRINCIPALCOLOR} translucent={true} />
        <View style={loginStyles.logo}>
          <ImageBackground
            source={require('@images/logoBackground.png')}
            resizeMode="stretch"
            style={loginStyles.logoBackground}>
            <Image
              source={require('@images/logo.png')}
              style={loginStyles.logoImage}
            />
          </ImageBackground>
        </View>
        <MyTextInput
          keyboardType="email-address"
          placeholder={
            labels.inputusuario != '' ? labels.inputusuario : 'Usuario.'
          }
          image="account-circle"
          value={email}
          onChangeText={email => setEmail(email)}
        />
        <MyTextInput
          keyboardType={null}
          placeholder={
            labels.inputpassword != '' ? labels.inputpassword : 'Password.'
          }
          image="lock"
          value={password}
          onChangeText={password => setPassword(password)}
          bolGone={true}
          secureTextEntry={hidePassword}
          onPressIcon={() => setHidePassword(!hidePassword)}
        />
        <MyTextButton
          titulo={
            labels.label1 != ''
              ? labels.label1
              : 'Si no tiene cuenta, suscribase.'
          }
          margin={true}
          onPress={() => goToScreen('Registro')}
        />
        <MyButton
          titulo={labels.btnlogin != '' ? labels.btnlogin : 'LOGIN.'}
          onPress={() => iniciarSesion()}
        />
        <MyTextButton
          titulo={
            labels.contrasena != ''
              ? labels.contrasena
              : 'Olvide mi Contraseña.'
          }
          underline={true}
          onPress={() => goToScreen('RecuperarPassword')}
        />
        <View style={loginStyles.boxTransparent} />
      </View>
    </ScrollView>
  );

  function iniciarSesion() {
    console.log('boton login');
    if (email == '' || password == '') {
      Snackbar.show({
        text: 'Usuario o Contraseña en Blanco',
        duration: Snackbar.LENGTH_LONG,
      });
    } else {
      console.log(email, password);
      login(email, password, goToScreen, loginAction);
    }
  }
  function goToScreen(routeName) {
    props.navigation.navigate(routeName);
  }
}
