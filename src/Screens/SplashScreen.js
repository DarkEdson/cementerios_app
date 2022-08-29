import React, {Component, useContext, useEffect} from 'react';
import {View, Text, ImageBackground} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {splashStyles} from '@styles/stylesGeneral';
import {getUsuario} from '@storage/UsuarioAsyncStorage';
import {UsuarioContext} from '@context/UsuarioContext';

export default function SplashScreen(props) {
  const [login, loginAction] = useContext(UsuarioContext);

  useEffect(() => {
    fetchSesion(loginAction);
  }, []);
  /*
  componentDidMount() {
    setTimeout(
      () => {
        //aqui va el if para ir a Home o a Login
        this.goToScreen('Login');
      },
      5000,
      this,
    );
  }*/

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
          source={require('@images/logo.png')}
        />
        <Text style={splashStyles.texto}>Bienvenidos</Text>
      </ImageBackground>
    </View>
  );

  async function fetchSesion(loginAction) {
    const response = await getUsuario();
    console.log(response);
    if (response == null) {
      setTimeout(() => {
        goToScreen('Login');
      }, 3000);
      return;
    }
    loginAction({type: 'sign-in', data: response});
    setTimeout(() => {
      goToScreen('Principal');
    }, 500);
  }
  function goToScreen(routeName) {
    props.navigation.replace(routeName);
  }
}
