import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Alert,
  BackHandler,
} from 'react-native';
import {Icon, Avatar} from '@rneui/themed';
//Recarga la screen
import {useIsFocused} from '@react-navigation/native';
//Componentes
import MyTextButton from '@Components/common/MyTextButton';
import ToolBar from '@Components/common/toolBar';
//Estilos
import {loginStyles, mainStyles} from '@styles/stylesGeneral';
import color from '@styles/colors';
//Contextos
import {UsuarioContext} from '@context/UsuarioContext';
import {ScreentagContext} from '@context/ScreentagsContext';
import {ShoppingCartContext} from '@context/ShoppingCartContext';
//URL de server
import {BASE_URL_IMG} from '@utils/config';

export default function ProfileScreen(props) {
  const [loginUser, loginAction] = useContext(UsuarioContext);
  const {removeAllItemstoCart} = useContext(ShoppingCartContext);
  const {tags} = useContext(ScreentagContext);

  const isFocused = useIsFocused();
  const getInitialData = async () => {};

  useEffect(() => {
    if (isFocused) {
      getInitialData();
      console.log('isFocused Profile');
    }
    return () => {};
    //props, isFocused
  }, []);

  return (
    <SafeAreaView style={mainStyles.containersp}>
      <ScrollView>
        <View style={styles.container}>
          <StatusBar
            backgroundColor={color.PRINCIPALCOLOR}
            barStyle="dark-content"
            translucent={true}
          />

          <ToolBar
            titulo={
              tags.perfilScreen.perfil != ''
                ? tags.perfilScreen.perfil
                : 'Perfil'
            }
            onPressLeft={() => goToScreen('Home')}
            iconLeft={true}
          />
          <View style={styles.headerContainer}>
            <TouchableOpacity
              style={styles.btnProfile}
              onPress={() => {
                console.log('editar imagen');
              }}>
              {loginUser.usuario.avatar ? (
                <Avatar
                  rounded
                  source={{
                    uri: `${BASE_URL_IMG}${loginUser.usuario.avatar}`,
                  }}
                  size="large"
                />
              ) : (
                <Icon
                  size={65}
                  color={color.BLACK}
                  type={'material-community'}
                  name="account"
                />
              )}
              <Avatar.Accessory size={23} />
            </TouchableOpacity>
            <Text style={styles.txtNuevoComponente}>
              {loginUser.usuario.name + ' ' + loginUser.usuario.lastname}
            </Text>
            <MyTextButton
              titulo={
                tags.perfilScreen.editar != ''
                  ? tags.perfilScreen.editar
                  : 'Editar datos personales'
              }
              style={{marginBottom: 20}}
              onPress={() => goToScreen('PersonalData')}
            />
          </View>
          {loginUser.usuario.role == 'seller' ||
          loginUser.usuario.role == 'SELLER' ||
          loginUser.usuario.role == 'Seller' ? (
            <Text style={styles.txtComponente}>
              {tags.perfilScreen.codigov != ''
                ? tags.perfilScreen.codigov
                : 'Codigo de vendedor'}
            </Text>
          ) : (
            <Text style={styles.txtComponente} />
          )}
          <View style={{backgroundColor: color.WHITE}}>
            {loginUser.usuario.role == 'seller' ||
            loginUser.usuario.role == 'SELLER' ||
            loginUser.usuario.role == 'Seller' ? (
              <Text style={styles.txtComponente}>
                {loginUser.usuario.id_number
                  ? loginUser.usuario.id_number
                  : loginUser.usuario.vendorcode}
              </Text>
            ) : (
              <TouchableOpacity onPress={() => {}}>
                <Text style={styles.txtComponente}>
                  {tags.perfilScreen.help != ''
                    ? tags.perfilScreen.help
                    : 'Ayuda'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.boxTransparent2} />
          <View style={{backgroundColor: color.WHITE}}>
            <TouchableOpacity onPress={() => desconectarse()}>
              <Text style={styles.txtComponente}>
                {tags.perfilScreen.cerrar != ''
                  ? tags.perfilScreen.cerrar
                  : 'Cerrar Sesión'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={mainStyles.logo}>
            <ImageBackground
              source={require('@images/profilepic.png')}
              resizeMode="stretch"
              style={loginStyles.logoBackground}>
              <Image
                source={require('@images/logo.png')}
                style={loginStyles.logoImage}
              />
            </ImageBackground>
          </View>
          <View style={styles.boxTransparent} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
  function desconectarse() {
    Alert.alert(
      tags.closeSessionScreen.titulo != ''
        ? tags.closeSessionScreen.titulo
        : 'Salir',
      tags.closeSessionScreen.mensaje != ''
        ? tags.closeSessionScreen.mensaje
        : '¿Esta seguro que \ndesea cerrar sesion?',
      [
        {
          text:
            tags.closeSessionScreen.btnsi != ''
              ? tags.closeSessionScreen.btnsi
              : 'Si',
          onPress: () => {
            loginAction({
              type: 'sign-out',
              data: {},
              tags: {
                mensaje:
                  tags.dialogAlertsScreen.o != ''
                    ? tags.dialogAlertsScreen.o
                    : 'Sesion Cerrada Exitosamente.',
              },
            });
            removeAllItemstoCart();
            goToScreen('Login');
          },
        },
        {
          text:
            tags.closeSessionScreen.btnno != ''
              ? tags.closeSessionScreen.btnno
              : 'No',
          onPress: () => {},
          style: 'cancel',
        },
      ],
    );
  }

  function goToScreen(routeName) {
    props.navigation.navigate(routeName);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  boxTransparent: {
    marginBottom: Dimensions.get('screen').height * 0.01,
  },
  boxTransparent2: {
    marginBottom: Dimensions.get('screen').height * 0.05,
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: color.WHITE,
    height: '40%',
    width: '100%',
  },
  txtNuevoComponente: {
    marginTop: 20,
    marginHorizontal: 20,
    marginBottom: 5,
    fontSize: 20,
    fontWeight: 'bold',
    color: color.BLACK,
  },
  btnProfile: {
    marginTop: 20,
    height: 75,
    width: 75,
    borderRadius: 100,
    backgroundColor: color.PRINCIPALCOLOR,
  },
  txtComponente: {
    marginVertical: 15,
    marginHorizontal: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: color.BLACK,
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
