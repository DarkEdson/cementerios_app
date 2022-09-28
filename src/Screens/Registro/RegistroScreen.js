import React, {useState, useContext, useEffect} from 'react';
import {View, Text, StatusBar, ScrollView} from 'react-native';
import Snackbar from 'react-native-snackbar';
import {SocialIcon} from '@rneui/themed';
//Configuracion general
import {REGISTER_SCREEN_ID} from '@utils/config';
//Estilos generales
import color from '@styles/colors';
import {mainStyles, registroStyles, loginStyles} from '@styles/stylesGeneral';
//Apis Generales
import {apiScreen} from '@Apis/ApisGenerales';
//Componentes
import MyTextInput from '@Components/common/MyTextInput';
import ToolBar from '@Components/common/toolBar';
import MyButton from '@Components/common/MyButton';
//Contextos
import {RegisterContext} from '@context/RegisterContext';
import {ScreenIdContext} from '@context/ScreensIDsContext';

export default function RegistroScreen(props) {
  const [registerUser, registerAction] = useContext(RegisterContext);
  const [ScreenId, setScreenId] = useContext(ScreenIdContext);

  const [labels, setLabels] = useState({
    btnapple: '',
    btnfacebook: '',
    btngoogle: '',
    btnsiguiente: '',
    header1: '',
    inputconfpassword: '',
    inputcorreo: '',
    inputpassword1: '',
    inputtipo: '',
    inputusuario1: '',
    label2: '',
  });

  let idScreen = '0';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [usertype, setUsertype] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [hidePasswordConfirm, setHidePasswordConfirm] = useState(true);

  useEffect(() => {
    async function obtenerEtiquetas() {
      console.log('Listado de Screen', ScreenId);
      ScreenId.forEach(screen => {
        if (screen.code == REGISTER_SCREEN_ID) {
          idScreen = screen._id;
          console.log('DATOS DEL SCREEN A OBTENER ETIQUETAS', screen);
        }
      });
      console.log('ID Del screen', idScreen);
      let etiquetas = await apiScreen(idScreen);
      if (etiquetas.length != 0) {
        setLabels({
          btnapple: etiquetas[0].description,
          btnfacebook:  etiquetas[1].description,
          btngoogle: etiquetas[2].description,
          btnsiguiente: etiquetas[3].description,
          header1: etiquetas[4].description,
          inputconfpassword: etiquetas[5].description,
          inputcorreo: etiquetas[6].description,
          inputpassword1: etiquetas[7].description,
          inputtipo: etiquetas[8].description,
          inputusuario1: etiquetas[9].description,
          label2: etiquetas[10].description,
        });
      }
      console.log(etiquetas, 'etiquetas en REGISTRO');
    }
    obtenerEtiquetas();
    return () => {};
  }, []);

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
        titulo={labels.header1 != '' ? labels.header1 : 'Introduce tus datos'}
        onPressLeft={() => goToScreen('Login')}
        iconLeft={true}
      />
      <View style={mainStyles.container}>
        <MyTextInput
          keyboardType={null}
          placeholder={
            labels.inputusuario1 != '' ? labels.inputusuario1 : 'Usuario'
          }
          image="account-circle"
          value={username}
          onChangeText={username => setUsername(username)}
          onEndEditing={e => handleValidUser(e.nativeEvent.text)}
        />
        <MyTextInput
          keyboardType="email-address"
          placeholder={
            labels.inputcorreo != '' ? labels.inputcorreo : 'Correo electrónico'
          }
          image="email"
          value={email}
          onChangeText={email => setEmail(email)}
        />
        <MyTextInput
          keyboardType={null}
          placeholder={
            labels.inputpassword1 != '' ? labels.inputpassword1 : 'Password'
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
            labels.inputconfpassword != ''
              ? labels.inputconfpassword
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
            labels.inputtipo != '' ? labels.inputtipo : 'Tipo usuario'
          }
          image="account-circle"
          value={usertype}
          onChangeText={usertype => setUsertype(usertype)}
        />
        <MyButton
          titulo={labels.btnsiguiente != '' ? labels.btnsiguiente : 'SIGUIENTE'}
          onPress={() => registroParcial()}
        />
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{color: color.GRAY, fontSize: 16}}>
            {labels.label2 != ''
              ? labels.label2
              : 'o crea tu cuenta con tus redes sociales.'}
          </Text>
        </View>
        <View style={registroStyles.containerSocial}>
          <SocialIcon
            style={registroStyles.buttonSocialIcon}
            title={labels.btnfacebook != ''
            ? labels.btnfacebook
            : "Continuar con Facebook"}
            button
            type="facebook"
          />
          <SocialIcon
            style={registroStyles.buttonSocialIcon}
            title={labels.btngoogle != ''
            ? labels.btngoogle
            : "Continuar con Google"}
            button
            type="google-plus-official"
          />
          <SocialIcon
            style={registroStyles.buttonSocialIcon}
            title={labels.btnapple != ''
            ? labels.btnapple
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
