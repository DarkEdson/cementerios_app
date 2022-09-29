import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import {CheckBox} from '@rneui/themed';
//Recarga la screen
import {useIsFocused} from '@react-navigation/native';
//Estilos generales
import {mainStyles, registroStyles} from '@styles/stylesGeneral';
import color from '@styles/colors';
//Componentes
import MyTextInput from '@Components/common/MyTextInput';
import ToolBar from '@Components/common/toolBar';
import MyButton from '@Components/common/MyButton';
//Contextos
import {RegisterContext} from '@context/RegisterContext';
import {AuthContext} from '@context/AuthContext';
import {UsuarioContext} from '@context/UsuarioContext';
import {ScreentagContext} from '@context/ScreentagsContext';

//tags.registerAddScreen.ubica
export default function RegistroScreen(props) {
  const [loginUser, loginAction] = useContext(UsuarioContext);
  const {tags, updateTags} = useContext(ScreentagContext);
  const {register} = useContext(AuthContext);
  const [registerUser, registerAction] = useContext(RegisterContext);

  const isFocused = useIsFocused();
  const getInitialData = async () => {};

  const [TC, setTC] = useState(false);
  const [data, setData] = useState({
    name: '',
    lastname: '',
    paypal_id: '',
    id_number: '',
  });

  useEffect(() => {
    setData({
      ...data,
      email: registerUser.email,
      password: registerUser.password,
      username: registerUser.username,
    });
    if (isFocused) {
      getInitialData();
      console.log('isFocused Register ADD');
    }

    return () => {};
  }, [props, isFocused]);

  return (
    <ScrollView
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="always"
      style={{backgroundColor: color.WHITE}}>
      <StatusBar backgroundColor={color.PRINCIPALCOLOR} translucent={true} />
      <ToolBar
        titulo={
          tags.registerAddScreen.completa != ''
            ? tags.registerAddScreen.completa
            : 'Completa tus datos'
        }
        onPressLeft={() => goToScreen('Registro')}
        iconLeft={true}
      />
      <View style={mainStyles.container}>
        <MyTextInput
          keyboardType={null}
          placeholder={
            tags.registerAddScreen.inputnombres != ''
              ? tags.registerAddScreen.inputnombres
              : 'Nombres'
          }
          value={data.name}
          onChangeText={nombre => setData({...data, name: nombre})}
          image="account-circle"
        />
        <MyTextInput
          keyboardType={null}
          value={data.lastname}
          onChangeText={apellido => setData({...data, lastname: apellido})}
          placeholder={
            tags.registerAddScreen.inputapellidos != ''
              ? tags.registerAddScreen.inputapellidos
              : 'Apellidos'
          }
          image="account-circle"
        />
        <MyTextInput
          keyboardType={null}
          value={data.id_number}
          onChangeText={numeroID => setData({...data, id_number: numeroID})}
          placeholder={
            tags.registerAddScreen.inputnumid != ''
              ? tags.registerAddScreen.inputnumid
              : 'Número de ID'
          }
          image="card-account-details"
        />
        <MyTextInput
          keyboardType={null}
          value={data.paypal_id}
          onChangeText={paypalID => setData({...data, paypal_id: paypalID})}
          placeholder={
            tags.registerAddScreen.inputpaypalid != ''
              ? tags.registerAddScreen.inputpaypalid
              : 'PayPal ID'
          }
          image="credit-card-outline"
        />

        <CheckBox
          containerStyle={registroStyles.checkBox}
          textStyle={{color: color.PRINCIPALCOOR}}
          onPress={() => {
            console.log(data);
            console.log(!TC);
            setData({...data, termino: !TC});
            setTC(!TC);
          }}
          checked={TC}
          title="He leído y acepto los términos y condiciones"
          checkedColor={color.PRINCIPALCOLOR}
        />
        <MyButton
          titulo={
            tags.registerAddScreen.btncompletar != ''
              ? tags.registerAddScreen.btncompletar
              : 'COMPLETAR REGISTRO'
          }
          onPress={() => goToScreen('Login')}
        />
      </View>
    </ScrollView>
  );
  function registrar() {
    console.log(data);
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
      register(data, goToScreen, loginAction);
    }
  }
  function goToScreen(routeName) {
    props.navigation.navigate(routeName);
  }
}
