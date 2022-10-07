import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  StatusBar,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
//Recarga la screen
import {useIsFocused} from '@react-navigation/native';
//Estilos generales
import {mainStyles, loginStyles} from '@styles/stylesGeneral';
import color from '@styles/colors';
//Componentes
import MyTextInput from '@Components/common/MyTextInput';
import MyButton from '@Components/common/MyButton';
import MyTextButton from '@Components/common/MyTextButton';
//Contextos
import {UsuarioContext} from '@context/UsuarioContext';
import {ScreentagContext} from '@context/ScreentagsContext';
import {AuthContext} from '@context/AuthContext';

//tags.loginScreen.ubica
export default function LoginScreen(props) {
  const [loginUser, loginAction] = useContext(UsuarioContext);
  const {login} = useContext(AuthContext);
  const {tags, updateTags} = useContext(ScreentagContext);
  const isFocused = useIsFocused();
  const getInitialData = async () => {};
  const [hidePassword, setHidePassword] = useState(true);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    setEmail('');
    setPassword('');
    if (isFocused) {
      getInitialData();
      console.log('isFocused in Login');
    }
    return () => {};
    //props, isFocused
  }, []);

  return (
    <SafeAreaView style={mainStyles.containers} >
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
            tags.loginScreen.inputusuario != ''
              ? tags.loginScreen.inputusuario
              : 'Usuario.'
          }
          image="account-circle"
          value={email}
          onChangeText={email => setEmail(email)}
        />
        <MyTextInput
          keyboardType={null}
          placeholder={
            tags.loginScreen.inputpassword != ''
              ? tags.loginScreen.inputpassword
              : 'Password.'
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
            tags.loginScreen.label1 != ''
              ? tags.loginScreen.label1
              : 'Si no tiene cuenta, suscribase.'
          }
          margin={true}
          onPress={() => goToScreen('Registro')}
        />
        <MyButton
          titulo={
            tags.loginScreen.btnlogin != ''
              ? tags.loginScreen.btnlogin
              : 'LOGIN.'
          }
          onPress={() => iniciarSesion()}
        />
        <MyTextButton
          titulo={
            tags.loginScreen.contrasena != ''
              ? tags.loginScreen.contrasena
              : 'Olvide mi Contraseña.'
          }
          underline={true}
          onPress={() => goToScreen('RecuperarPassword')}
        />
        <View style={loginStyles.boxTransparent} />
      </View>
    </ScrollView>
    </SafeAreaView>
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
