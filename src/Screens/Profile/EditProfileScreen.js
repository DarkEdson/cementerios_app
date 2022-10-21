import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import {Icon, FAB} from '@rneui/themed';
//Recarga la screen
import {useIsFocused} from '@react-navigation/native';
//Estilos Generales
import {mainStyles} from '@styles/stylesGeneral';
import color from '@styles/colors';
//Componentes
import MyTextInput from '@Components/common/MyTextInput';
import {UsuarioContext} from '@context/UsuarioContext';
import ToolBar from '@Components/common/toolBar';
import MyButton from '@Components/common/MyButton';
//Contextos
import {ScreentagContext} from '@context/ScreentagsContext';
import {AuthContext} from '@context/AuthContext';

//tags.EditUserScreen.btn != '' ? tags.EditUserScreen.btn :
export default function EditProfileScreen(props) {
  const [loginUser, loginAction] = useContext(UsuarioContext);
  const {tags} = useContext(ScreentagContext);
  const {actualizaUsuario, isLoading} = useContext(AuthContext);

  const isFocused = useIsFocused();
  const getInitialData = async () => {};

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
    if (isFocused) {
      getInitialData();
      console.log('isFocused Edit User Data');
    }
    //props, isFocused
  }, []);

  return (
    <SafeAreaView style={mainStyles.containers}>
      {isLoading ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '50%',
          }}>
          <FAB
            loading
            color={color.PRINCIPALCOLOR}
            visible={isLoading}
            icon={{name: 'add', color: 'white'}}
            size="small"
          />
        </View>
      ) : (
        <View style={styles.container}>
          <StatusBar
            backgroundColor={color.PRINCIPALCOLOR}
            barStyle="dark-content"
            translucent={true}
          />
          <ToolBar
            titulo={
              tags.EditUserScreen.titulo != ''
                ? tags.EditUserScreen.titulo
                : 'Editar Usuario'
            }
            onPressLeft={() => goToScreen('PersonalData')}
            iconLeft={true}
          />

          <ScrollView>
            <View style={styles.editField}>
              <Text style={styles.titleLabel}>{
                  tags.EditUserScreen.username != ''
                    ? tags.EditUserScreen.username
                    : 'Username'
                }</Text>
              <MyTextInput
                keyboardType={null}
                placeholder={
                  tags.EditUserScreen.username != ''
                    ? tags.EditUserScreen.username
                    : 'Username'
                }
                value={data.username}
                onChangeText={user => setData({...data, username: user})}
                image="account"
              />
              <Text style={styles.titleLabel}>{
                  tags.EditUserScreen.name != ''
                    ? tags.EditUserScreen.name
                    : 'Nombres'
                }</Text>
              <MyTextInput
                keyboardType={null}
                placeholder={
                  tags.EditUserScreen.name != ''
                    ? tags.EditUserScreen.name
                    : 'Nombres'
                }
                value={data.name}
                onChangeText={nombre => setData({...data, name: nombre})}
                image="account-circle"
              />
              <Text style={styles.titleLabel}>{
                  tags.EditUserScreen.lastname != ''
                    ? tags.EditUserScreen.lastname
                    : 'Apellidos'
                }</Text>
              <MyTextInput
                keyboardType={null}
                value={data.lastname}
                onChangeText={apellido =>
                  setData({...data, lastname: apellido})
                }
                placeholder={
                  tags.EditUserScreen.lastname != ''
                    ? tags.EditUserScreen.lastname
                    : 'Apellidos'
                }
                image="account-circle"
              />
              <Text style={styles.titleLabel}>{
                  tags.EditUserScreen.email != ''
                    ? tags.EditUserScreen.email
                    : 'e-mail'
                }</Text>
              <MyTextInput
                keyboardType={null}
                value={data.email}
                onChangeText={correo => setData({...data, email: correo})}
                placeholder={
                  tags.EditUserScreen.email != ''
                    ? tags.EditUserScreen.email
                    : 'e-mail'
                }
                image="email"
              />
              <Text style={styles.titleLabel}>{
                  tags.EditUserScreen.phone != ''
                    ? tags.EditUserScreen.phone
                    : 'phone'
                }</Text>
              <MyTextInput
                keyboardType={null}
                value={data.phone}
                onChangeText={tel => setData({...data, phone: tel})}
                placeholder={
                  tags.EditUserScreen.phone != ''
                    ? tags.EditUserScreen.phone
                    : 'phone'
                }
                image="card-account-details"
              />
              <Text style={styles.titleLabel}>{
                  tags.EditUserScreen.paypalid != ''
                    ? tags.EditUserScreen.paypalid
                    : 'PayPal ID'
                }</Text>
              <MyTextInput
                keyboardType={null}
                value={data.paypal_id}
                onChangeText={paypalID =>
                  setData({...data, paypal_id: paypalID})
                }
                placeholder={
                  tags.EditUserScreen.paypalid != ''
                    ? tags.EditUserScreen.paypalid
                    : 'PayPal ID'
                }
                image="credit-card-outline"
              />
              <MyButton
                titulo={
                  tags.EditUserScreen.btn != ''
                    ? tags.EditUserScreen.btn
                    : 'Guardar Cambios'
                }
                onPress={() => actualizandoUsuario()}
              />
            </View>
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
  function actualizandoUsuario() {
    if (data.username == '') {
      mensajeSnack(
        tags.EditUserScreen.whiteusername != ''
          ? tags.EditUserScreen.whiteusername
          : 'Usuario en Blanco',
      );
    } else if (data.name == '') {
      mensajeSnack(
        tags.EditUserScreen.whitename != ''
          ? tags.EditUserScreen.whitename
          : 'Nombre en Blanco',
      );
    } else if (data.lastname == '') {
      mensajeSnack(
        tags.EditUserScreen.whitelastname != ''
          ? tags.EditUserScreen.whitelastname
          : 'Apellido en Blanco',
      );
    } else if (data.email == '') {
      mensajeSnack(
        tags.EditUserScreen.whiteemail != ''
          ? tags.EditUserScreen.whiteemail
          : 'Correo en Blanco',
      );
    } else {
      actualizaUsuario(
        data,
        loginUser.usuario._id,
        loginAction,
        tags.EditUserScreen,
      );
    }
    //F
  }
  function mensajeSnack(msj) {
    Snackbar.show({
      text: msj,
      duration: Snackbar.LENGTH_LONG,
    });
  }

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
