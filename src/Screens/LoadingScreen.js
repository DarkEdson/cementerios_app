import React, {useState, useContext, useEffect} from 'react';
import {View, Text, Alert, ActivityIndicator} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {splashStyles} from '@styles/stylesGeneral';
import {getUsuario} from '@storage/UsuarioAsyncStorage';
import {UsuarioContext} from '@context/UsuarioContext';
import {AuthContext} from '@context/AuthContext';
import Snackbar from 'react-native-snackbar';

export default function LoadingScreen(props) {
  const [loginUser, loginAction] = useContext(UsuarioContext);
  const {errorInfo} = useContext(AuthContext);

  useEffect(() => {
    console.log(errorInfo, 'en loading screen');
    console.log(loginUser);
    fetchSesion(loginAction);
  }, []);

  return (
    <View style={splashStyles.containerLoading}>
      <Animatable.Image
        animation="pulse"
        easing="ease-in-out"
        iterationCount="infinite"
        style={splashStyles.logo}
        source={require('@images/main_logo.png')}
      />
      <Text>Iniciando Sesion</Text>
      <ActivityIndicator size={'large'} />
    </View>
  );

  async function fetchSesion(loginAction) {
    const response = await getUsuario();
    console.log(response);
    console.log(errorInfo, 'en fetch');
    if (errorInfo != null) {
      Alert.alert('Datos Incorrectos', errorInfo, [
        {
          text: 'Ok',
          onPress: () => {},
          style: 'cancel',
        },
      ]);
      setTimeout(() => {
        goToScreen('Login');
      }, 1000);
      return;
    }
    loginAction({type: 'sign-in', data: response});
    setTimeout(() => {
      Snackbar.show({
        text: 'Inicio de sesión exitoso',
        duration: Snackbar.LENGTH_LONG,
      });
      goToScreen('Home');
    }, 1000);
  }

  function goToScreen(routeName) {
    props.navigation.replace(routeName);
  }
}
