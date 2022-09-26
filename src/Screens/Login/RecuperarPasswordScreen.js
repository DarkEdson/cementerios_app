import React, {useState} from 'react';
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  StatusBar,
  Image,
  ImageBackground,
  ScrollView,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import {mainStyles, loginStyles} from '@styles/stylesGeneral';
import MyTextInput from '@Components/common/MyTextInput';
import color from '@styles/colors';
import ToolBar from '@Components/common/toolBar';

export default function RecuperarPasswordScreen(props) {
  return (
    <ScrollView
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="always"
      style={{backgroundColor: color.WHITE}}>
      <StatusBar backgroundColor={color.PRINCIPALCOLOR} translucent={true} />
      <ToolBar
        titulo="Contraseña"
        onPressLeft={() => goToScreen('Login')}
        iconLeft={true}
      />
      <View style={mainStyles.container}>
        <View style={loginStyles.logo}>
          <ImageBackground
            source={{
              uri: 'https://proyectocementeriogt.gq/images/logoBackground.png',
            }}
            resizeMode="stretch"
            style={loginStyles.logoBackground}>
            <Image
              source={{uri: 'https://proyectocementeriogt.gq/images/logo.png'}}
              style={loginStyles.logoImage}
            />
          </ImageBackground>
        </View>
        <Text style={mainStyles.titleText}>Recuperar{'\n'}Contraseña</Text>
        <MyTextInput
          keyboardType="email-address"
          placeholder="E-mail"
          image="account-circle"
        />
        <View style={mainStyles.btnMain}>
          <TouchableOpacity onPress={() => recuperarClave()}>
            <Text style={mainStyles.btntxt}> Recuperar</Text>
          </TouchableOpacity>
        </View>
        <Image
          style={loginStyles.logoImage}
          source={{uri: 'https://proyectocementeriogt.gq/images/banner.jpg'}}
        />
        <View style={loginStyles.boxTransparent} />
      </View>
    </ScrollView>
  );

  function recuperarClave() {
    Snackbar.show({
      text: 'Su contraseña fue reiniciada y enviada a su correo electronico',
      duration: Snackbar.LENGTH_LONG,
    });
  }
  function goToScreen(routeName) {
    props.navigation.navigate(routeName);
  }
}
