import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
  BackHandler,
} from 'react-native';
import BtnCategoria from '@Components/BtnCategoria/';
import ToolBar from '@Components/common/toolBar';
import {mainStyles} from '@styles/stylesGeneral';
import PaymentButton from '@Components/common/paymentButton';
import MyTextInput from '@Components/common/MyTextInput';
import {UsuarioContext} from '@context/UsuarioContext';
import color from '@styles/colors';
import MyButton from '@Components/common/MyButton';

export default function PaymentMethodScreen(props) {
  const [loginUser, loginAction] = useContext(UsuarioContext);
  const [data, setData] = useState({
    username: '',
    name: '',
    lastname: '',
    phone: '',
    paypal_id: '',
    email: '',
  });
  useEffect(() => {
    setData({
      ...data,
      username: loginUser.usuario.username,
      name: loginUser.usuario.name,
      lastname: loginUser.usuario.lastname,
      phone: loginUser.usuario.phone,
      paypal_id: loginUser.usuario.paypal_id,
      email: loginUser.usuario.email,
    });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={color.PRINCIPALCOLOR}
        barStyle="dark-content"
        translucent={true}
      />
      <ToolBar
        titulo="Metodos de Pago"
        onPressLeft={() => goToScreen('PersonalData')}
        iconLeft={true}
      />

      <ScrollView>
        <View style={styles.editField}>
          <Text style={styles.titleLabel}>Preferido:</Text>
          <PaymentButton
            iconLeft={true}
            titulo={'XXXX-XXXX-XXXX-5678'}
            iconRight={true}
          />
          <Text style={styles.titleLabel}>Tarjetas:</Text>
          <PaymentButton
            iconLeft={true}
            titulo={'XXXX-XXXX-XXXX-0123'}
            iconRight={true}
          />
          <PaymentButton
            iconLeft={true}
            titulo={'XXXX-XXXX-XXXX-1234'}
            iconRight={true}
          />
          <PaymentButton
            iconLeft={true}
            titulo={'XXXX-XXXX-XXXX-2345'}
            iconRight={true}
          />
          <PaymentButton
            iconLeft={true}
            titulo={'XXXX-XXXX-XXXX-4567'}
            iconRight={true}
          />
          <MyButton titulo="Guardar Cambios" onPress={() => {}} />
        </View>
      </ScrollView>
    </View>
  );

  function goToScreen(routeName) {
    props.navigation.navigate(routeName);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  titleLabel: {
    fontWeight: 'bold',
  },
  editField: {
    marginTop: 5,
    paddingHorizontal: 20,
  },
  promociones: {
    width: '100%',
    height: 180,
    borderWidth: 1,
    borderColor: 'red',
  },
  txtNuevoComponente: {
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 15,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
