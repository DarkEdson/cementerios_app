import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  ImageBackground,
  ScrollView,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
//Recarga la screen
import {useIsFocused} from '@react-navigation/native';
//Estilos Generales
import {mainStyles, loginStyles} from '@styles/stylesGeneral';
import color from '@styles/colors';
//Componentes
import MyTextInput from '@Components/common/MyTextInput';
import ToolBar from '@Components/common/toolBar';
//Contextos
import {ScreentagContext} from '@context/ScreentagsContext';
import { apiPasswordRestore } from '@Apis/ApisGenerales';

//tags.PasswordRecoveryScreen.btn != '' ? tags.PasswordRecoveryScreen.btn :
export default function RecuperarPasswordScreen(props) {
  const {tags, updateTags} = useContext(ScreentagContext);
  const [email, setemail] = useState('')
  const isFocused = useIsFocused();
  const getInitialData = async () => {};

  useEffect(() => {
    if (isFocused) {
      getInitialData();
      console.log('isFocused Promo');
    }
    //props, isFocused
  }, []);
  return (
    <SafeAreaView style={mainStyles.containers} >
    <ScrollView
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="always"
      style={{backgroundColor: color.WHITE}}>
      <StatusBar backgroundColor={color.PRINCIPALCOLOR} translucent={true} />
      <ToolBar
        titulo={
          tags.PasswordRecoveryScreen.titulo != ''
            ? tags.PasswordRecoveryScreen.titulo
            : 'Contraseña'
        }
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
        <Text style={mainStyles.titleText}>
          {tags.PasswordRecoveryScreen.recuperar != ''
            ? tags.PasswordRecoveryScreen.recuperar
            : 'Recuperar Contraseña'}
        </Text>
        <MyTextInput
          keyboardType="email-address"
          placeholder={
            tags.PasswordRecoveryScreen.email != ''
              ? tags.PasswordRecoveryScreen.email
              : 'E-mail'
          }
          image="account-circle"
          value={email}
          onChangeText={email => setemail(email)}
        />
        <View style={mainStyles.btnMain}>
          <TouchableOpacity onPress={() => recuperarClave()}>
            <Text style={mainStyles.btntxt}>
              {' '}
              {tags.PasswordRecoveryScreen.btn != ''
                ? tags.PasswordRecoveryScreen.btn
                : 'Recuperar'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={loginStyles.boxTransparent} />
      </View>
    </ScrollView>
    </SafeAreaView>
  );

  function recuperarClave() {
    if (email == ''){
      Snackbar.show({
        text:  'Ingrese correo',
        duration: Snackbar.LENGTH_LONG,
      });
    }else{

      apiPasswordRestore(email)
      Snackbar.show({
        text: tags.dialogAlertsScreen.d != ''
        ? tags.dialogAlertsScreen.d
        : 'Su contraseña fue reiniciada y enviada a su correo electronico',
        duration: Snackbar.LENGTH_LONG,
      });
    }
    
   
  }

  function goToScreen(routeName) {
    props.navigation.navigate(routeName);
  }
}
