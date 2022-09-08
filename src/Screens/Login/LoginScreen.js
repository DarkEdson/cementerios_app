import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Alert,
  StatusBar,
  Image,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {mainStyles, loginStyles} from '@styles/stylesGeneral';
import MyTextInput from '@Components/common/MyTextInput';
import MyButton from '@Components/common/MyButton';
import MyTextButton from '@Components/common/MyTextButton';
import {UsuarioContext} from '@context/UsuarioContext';
import {AuthContext} from '@context/AuthContext';
import color from '@styles/colors';

export default function LoginScreen(props) {
  const [loginUser, loginAction] = useContext(UsuarioContext);
  const {login} = useContext(AuthContext);
  const [hidePassword, setHidePassword] = useState(true);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    setEmail('');
    setPassword('');
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
          placeholder="Usuario"
          image="account-circle"
          value={email}
          onChangeText={email => setEmail(email)}
        />
        <MyTextInput
          keyboardType={null}
          placeholder="Password"
          image="lock"
          value={password}
          onChangeText={password => setPassword(password)}
          bolGone={true}
          secureTextEntry={hidePassword}
          onPressIcon={() => setHidePassword(!hidePassword)}
        />
        <MyTextButton
          titulo="Si no tiene cuenta, suscribase."
          margin={true}
          onPress={() => goToScreen('Registro')}
        />
        <MyButton titulo="LOGIN" onPress={() => iniciarSesion()} />
        <MyTextButton
          titulo="Olvide mi Contraseña."
          underline={true}
          onPress={() => goToScreen('RecuperarPassword')}
        />
        <View style={loginStyles.boxTransparent} />
      </View>
    </ScrollView>
  );

  function iniciarSesion() {
    if (email == '' || password == '') {
      Alert.alert(
        'Datos en blanco',
        '¿Debe Ingresar un Usuario y7o una Contraseña ?',
        [
          {
            text: 'Ok',
            onPress: () => {},
            style: 'cancel',
          },
        ],
      );
    } else {
      login(email, password, goToScreen, loginAction);
    }
  }
  function goToScreen(routeName) {
    props.navigation.navigate(routeName);
  }
}
