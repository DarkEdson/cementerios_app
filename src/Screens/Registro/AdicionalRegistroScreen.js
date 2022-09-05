import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import {mainStyles, registroStyles} from '@styles/stylesGeneral';
import MyTextInput from '@Components/common/MyTextInput';
import color from '@styles/colors';
import {UsuarioContext} from '@context/UsuarioContext';
import ToolBar from '@Components/common/toolBar';
import {CheckBox} from '@rneui/themed';
import MyButton from '@Components/common/MyButton';

export default function RegistroScreen(props) {
  const [login, loginAction] = useContext(UsuarioContext);
  return (
    <ScrollView
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="always"
      style={{backgroundColor: color.WHITE}}>
      <StatusBar backgroundColor={color.PRINCIPALCOLOR} translucent={true} />
      <ToolBar
        titulo="Completa tus datos"
        onPressLeft={() => goToScreen('Registro')}
        iconLeft={true}
      />
      <View style={mainStyles.container}>
        <MyTextInput
          keyboardType={null}
          placeholder="Nombres"
          image="account-circle"
        />
        <MyTextInput
          keyboardType={null}
          placeholder="Apellidos"
          image="account-circle"
        />
        <MyTextInput
          keyboardType={null}
          placeholder="Número de ID"
          image="card-account-details"
        />
        <MyTextInput
          keyboardType={null}
          placeholder="PayPal ID"
          image="credit-card-outline"
        />

        <CheckBox
          containerStyle={registroStyles.checkBox}
          textStyle={{color: color.PRINCIPALCOOR}}
          title="He leído y acepto los términos y condiciones"
          checked={false}
          checkedColor={color.PRINCIPALCOLOR}
        />
        <MyButton
          titulo="COMPLETAR REGISTRO"
          onPress={() => goToScreen('Login')}
        />
      </View>
    </ScrollView>
  );
  function registrar() {
    if (email == '' || password == '') {
      Alert.alert(
        'Datos Incorrectos',
        '¿Debe Ingresar un Usuario y una Contraseña ?',
        [
          {
            text: 'Ok',
            onPress: () => {},
            style: 'cancel',
          },
        ],
      );
    } else {
      loginAction({
        type: 'register',
        data: {
          email,
          password,
        },
      });
      goToScreen('Home');
    }
  }
  function goToScreen(routeName) {
    props.navigation.navigate(routeName);
  }
}
