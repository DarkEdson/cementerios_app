import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  Alert,
  StatusBar,
  ScrollView,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import {mainStyles, registroStyles, loginStyles} from '@styles/stylesGeneral';
import MyTextInput from '@Components/common/MyTextInput';
import color from '@styles/colors';
import ToolBar from '@Components/common/toolBar';
import {SocialIcon} from '@rneui/themed';
import MyButton from '@Components/common/MyButton';
import { RegisterContext } from '@context/RegisterContext';




export default function RegistroScreen(props) {
  const [registerUser, registerAction]= useContext(RegisterContext)
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [usertype, setUsertype] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [hidePasswordConfirm, setHidePasswordConfirm] = useState(true);

  const handlePasswordChange = val => {
    if (confirmPassword != ''){
      
      if (val == confirmPassword) {
        if (val.trim().length >= 8) {
          setPassword(val)
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
    }else{
      if (val.trim().length >= 8) {
        setPassword(val)
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
      setConfirmPassword(val)
    } else {
      Snackbar.show({
        text: 'Las contraseñas no coinciden',
        duration: Snackbar.LENGTH_LONG,
      });
    }
  };
  const handleValidUser = val => {

    if (val.trim().toString().length >= 4) {
      setUsername(val)
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
        titulo="Introduce tus datos"
        onPressLeft={() => goToScreen(props, 'Login')}
        iconLeft={true}
      />
      <View style={mainStyles.container}>
        <MyTextInput
          keyboardType={null}
          placeholder="Usuario"
          image="account-circle"
          value={username}
          onChangeText={username => setUsername(username)}
          onEndEditing={e => handleValidUser(e.nativeEvent.text)}
        />
        <MyTextInput
          keyboardType="email-address"
          placeholder="Correo electrónico"
          image="email"
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
          onEndEditing={e => handlePasswordChange(e.nativeEvent.text)}
        />
        <MyTextInput
          keyboardType={null}
          placeholder="Confirmar Password"
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
          placeholder="Tipo usuario"
          image="account-circle"
          value={usertype}
          onChangeText={usertype => setUsertype(usertype)}
        />
        <MyButton
          titulo="SIGUIENTE"
          onPress={() => registroParcial()}
        />
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{color: color.GRAY, fontSize: 16}}>
            o crea tu cuenta con tus redes sociales.{' '}
          </Text>
        </View>
        <View style={registroStyles.containerSocial}>
          <SocialIcon
            style={registroStyles.buttonSocialIcon}
            title="Continuar con Facebook"
            button
            type="facebook"
          />
          <SocialIcon
            style={registroStyles.buttonSocialIcon}
            title="Continuar con Google"
            button
            type="google-plus-official"
          />
        </View>
        <View style={loginStyles.boxTransparent} />
      </View>
    </ScrollView>
  );

  function registroParcial(){
    if (password == '' || password == ' ' || confirmPassword == '' || confirmPassword == ' '){
      Alert.alert('Contraseña Vacia', 'Revise las contraseñas, una esta vacia', [
        {
          text: 'Ok',
          onPress: () => {},
          style: 'cancel',
        },
      ]);
    }else  if (username == ' ' || username == '' || usertype == '' || usertype == ' '){
      Alert.alert('usuario o tipo de usuario', 'revise el campo usuario o tipo de usuario, no puede ir vacio', [
        {
          text: 'Ok',
          onPress: () => {},
          style: 'cancel',
        },
      ]);
    }
    else{
      registerAction({
        username,
        email, 
        password,
        usertype
      })
      goToScreen( 'RegistroAdd')
    }

  }

  function goToScreen(routeName) {
    props.navigation.navigate(routeName);
  }
}
