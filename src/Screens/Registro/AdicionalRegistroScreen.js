import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import {mainStyles, registroStyles} from '@styles/stylesGeneral';
import MyTextInput from '@Components/common/MyTextInput';
import color from '@styles/colors';
import ToolBar from '@Components/common/toolBar';
import {CheckBox} from '@rneui/themed';
import MyButton from '@Components/common/MyButton';
import {RegisterContext} from '@context/RegisterContext';
import {AuthContext} from '@context/AuthContext';
import {UsuarioContext} from '@context/UsuarioContext';

export default function RegistroScreen(props) {
  const [loginUser, loginAction] = useContext(UsuarioContext);
  const {register} = useContext(AuthContext);
  const [registerUser, registerAction] = useContext(RegisterContext);
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
    return () => {};
  }, []);

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
          value={data.name}
          onChangeText={nombre => setData({...data, name: nombre})}
          image="account-circle"
        />
        <MyTextInput
          keyboardType={null}
          value={data.lastname}
          onChangeText={apellido => setData({...data, lastname: apellido})}
          placeholder="Apellidos"
          image="account-circle"
        />
        <MyTextInput
          keyboardType={null}
          value={data.id_number}
          onChangeText={numeroID => setData({...data, id_number: numeroID})}
          placeholder="Número de ID"
          image="card-account-details"
        />
        <MyTextInput
          keyboardType={null}
          value={data.paypal_id}
          onChangeText={paypalID => setData({...data, paypal_id: paypalID})}
          placeholder="PayPal ID"
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
          titulo="COMPLETAR REGISTRO"
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
