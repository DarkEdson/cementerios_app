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
import MyTextInput from '@Components/common/MyTextInput';
import {UsuarioContext} from '@context/UsuarioContext';
import color from '@styles/colors';
import MyButton from '@Components/common/MyButton';

export default function EditProfileScreen(props) {
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
        titulo="Editar Usuario"
        onPressLeft={() => goToScreen('PersonalData')}
        iconLeft={true}
      />

      <ScrollView>
        <View style={styles.editField}>
          <Text style={styles.titleLabel}>Username:</Text>
          <MyTextInput
            keyboardType={null}
            placeholder="Username"
            value={data.username}
            onChangeText={user => setData({...data, username: user})}
            image="account"
          />
          <Text style={styles.titleLabel}>Name:</Text>
          <MyTextInput
            keyboardType={null}
            placeholder="Nombres"
            value={data.name}
            onChangeText={nombre => setData({...data, name: nombre})}
            image="account-circle"
          />
          <Text style={styles.titleLabel}>Lastname:</Text>
          <MyTextInput
            keyboardType={null}
            value={data.lastname}
            onChangeText={apellido => setData({...data, lastname: apellido})}
            placeholder="Apellidos"
            image="account-circle"
          />
          <Text style={styles.titleLabel}>e-mail</Text>
          <MyTextInput
            keyboardType={null}
            value={data.email}
            onChangeText={correo => setData({...data, email: correo})}
            placeholder="e-mail"
            image="email"
          />
          <Text style={styles.titleLabel}>Phone:</Text>
          <MyTextInput
            keyboardType={null}
            value={data.phone}
            onChangeText={tel => setData({...data, phone: tel})}
            placeholder="phone"
            image="card-account-details"
          />
          <Text style={styles.titleLabel}>Paypal ID:</Text>
          <MyTextInput
            keyboardType={null}
            value={data.paypal_id}
            onChangeText={paypalID => setData({...data, paypal_id: paypalID})}
            placeholder="PayPal ID"
            image="credit-card-outline"
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