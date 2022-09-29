import React, {useState, useContext, useEffect} from 'react';
import {View, Text, StatusBar, ScrollView} from 'react-native';
import Snackbar from 'react-native-snackbar';
import {SocialIcon} from '@rneui/themed';
//Recarga la screen
import { useIsFocused } from "@react-navigation/native";
//Estilos generales
import color from '@styles/colors';
import {mainStyles, registroStyles, loginStyles} from '@styles/stylesGeneral';
//Componentes
import MyTextInput from '@Components/common/MyTextInput';
import ToolBar from '@Components/common/toolBar';
import MyButton from '@Components/common/MyButton';
//Contextos
import {RegisterContext} from '@context/RegisterContext';
import {ScreentagContext} from '@context/ScreentagsContext';

//tags.registerScreen.ubica
export default function RegistroScreen(props) {
  const [registerUser, registerAction] = useContext(RegisterContext);
  const {tags,updateTags,} = useContext(ScreentagContext);
  const isFocused = useIsFocused();
  const getInitialData = async () => {} 

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [usertype, setUsertype] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [hidePasswordConfirm, setHidePasswordConfirm] = useState(true);

  useEffect(() => {
    if(isFocused){ 
      getInitialData();
      console.log('isFocused')
  }
    return () => {};
  }, [props, isFocused]);

  const handlePasswordChange = val => {
    if (confirmPassword != '') {
      if (val == confirmPassword) {
        if (val.trim().length >= 8) {
          setPassword(val);
        } else {
          Snackbar.show({
            text: 'La contraseña debe ser de al menos 8 caracteres',
            duration: Snackbar.LENGTH_LONG,
          });
        }
      } else {
        if (val.trim().length >= 8) {
          Snackbar.show({
            text: 'Las contraseñas no coinciden',
            duration: Snackbar.LENGTH_LONG,
          });
        } else {
          Snackbar.show({
            text: 'La contraseña debe ser de al menos 8 caracteres y no coinciden',
            duration: Snackbar.LENGTH_LONG,
          });
        }
      }
    } else {
      if (val.trim().length >= 8) {
        setPassword(val);
      } else {
        Snackbar.show({
          text: 'La contraseña debe ser de al menos 8 caracteres',
          duration: Snackbar.LENGTH_LONG,
        });
      }
    }
  };
  const handlePasswordConfirm = val => {
    if (val == password) {
      setConfirmPassword(val);
    } else {
      Snackbar.show({
        text: 'Las contraseñas no coinciden',
        duration: Snackbar.LENGTH_LONG,
      });
    }
  };
  const handleValidUser = val => {
    if (val.trim().toString().length >= 4) {
      setUsername(val);
    } else {
      Snackbar.show({
        text: 'usuario debe ser de minimo 4 caracteres',
        duration: Snackbar.LENGTH_LONG,
      });
    }
  };

  return (
    <ScrollView
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="always"
      style={{backgroundColor: color.WHITE}}>
      <StatusBar backgroundColor={color.PRINCIPALCOLOR} translucent={true} />
      <ToolBar
        titulo={tags.registerScreen.header1 != '' ? tags.registerScreen.header1 : 'Introduce tus datos'}
        onPressLeft={() => goToScreen('Login')}
        iconLeft={true}
      />
      <View style={mainStyles.container}>
        <MyTextInput
          keyboardType={null}
          placeholder={
            tags.registerScreen.inputusuario1 != '' ? tags.registerScreen.inputusuario1 : 'Usuario'
          }
          image="account-circle"
          value={username}
          onChangeText={username => setUsername(username)}
          onEndEditing={e => handleValidUser(e.nativeEvent.text)}
        />
        <MyTextInput
          keyboardType="email-address"
          placeholder={
            tags.registerScreen.inputcorreo != '' ? tags.registerScreen.inputcorreo : 'Correo electrónico'
          }
          image="email"
          value={email}
          onChangeText={email => setEmail(email)}
        />
        <MyTextInput
          keyboardType={null}
          placeholder={
            tags.registerScreen.inputpassword1 != '' ? tags.registerScreen.inputpassword1 : 'Password'
          }
          image="lock"
          value={password}
          onChangeText={password => setPassword(password)}
          bolGone={true}
          secureTextEntry={hidePassword}
          onPressIcon={() => setHidePassword(!hidePassword)}
          onEndEditing={e => handlePasswordChange(e.nativeEvent.text)}
        />
        <MyTextInput
          keyboardType={null}
          placeholder={
            tags.registerScreen.inputconfpassword != ''
              ? tags.registerScreen.inputconfpassword
              : 'Confirmar Password'
          }
          image="lock"
          bolGone={true}
          value={confirmPassword}
          onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
          secureTextEntry={hidePasswordConfirm}
          onPressIcon={() => setHidePasswordConfirm(!hidePasswordConfirm)}
          onEndEditing={e => handlePasswordConfirm(e.nativeEvent.text)}
        />
        <MyTextInput
          keyboardType={null}
          placeholder={
            tags.registerScreen.inputtipo != '' ? tags.registerScreen.inputtipo : 'Tipo usuario'
          }
          image="account-circle"
          value={usertype}
          onChangeText={usertype => setUsertype(usertype)}
        />
        <MyButton
          titulo={tags.registerScreen.btnsiguiente != '' ? tags.registerScreen.btnsiguiente : 'SIGUIENTE'}
          onPress={() => registroParcial()}
        />
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{color: color.GRAY, fontSize: 16}}>
            {tags.registerScreen.label2 != ''
              ? tags.registerScreen.label2
              : 'o crea tu cuenta con tus redes sociales.'}
          </Text>
        </View>
        <View style={registroStyles.containerSocial}>
          <SocialIcon
            style={registroStyles.buttonSocialIcon}
            title={tags.registerScreen.btnfacebook != ''
            ? tags.registerScreen.btnfacebook
            : "Continuar con Facebook"}
            button
            type="facebook"
          />
          <SocialIcon
            style={registroStyles.buttonSocialIcon}
            title={tags.registerScreen.btngoogle != ''
            ? tags.registerScreen.btngoogle
            : "Continuar con Google"}
            button
            type="google-plus-official"
          />
          <SocialIcon
            style={registroStyles.buttonSocialIcon}
            title={tags.registerScreen.btnapple != ''
            ? tags.registerScreen.btnapple
            : "Continuar con Apple"}
            button
            type="twitter"
          />
        </View>
        <View style={loginStyles.boxTransparent} />
      </View>
    </ScrollView>
  );

  function registroParcial() {
    if (
      password == '' ||
      password == ' ' ||
      confirmPassword == '' ||
      confirmPassword == ' '
    ) {
      Snackbar.show({
        text: 'Revise las contraseñas, una esta vacia',
        duration: Snackbar.LENGTH_LONG,
      });
    } else if (
      username == ' ' ||
      username == '' ||
      usertype == '' ||
      usertype == ' '
    ) {
      Snackbar.show({
        text: 'No se admiten campos vacios, revise usuario o tipo de usuario',
        duration: Snackbar.LENGTH_LONG,
      });
    } else {
      registerAction({
        username,
        email,
        password,
        usertype,
      });
      goToScreen('RegistroAdd');
    }
  }

  function goToScreen(routeName) {
    props.navigation.navigate(routeName);
  }
}
