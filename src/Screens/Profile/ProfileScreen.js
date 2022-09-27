import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
  BackHandler,
} from 'react-native';
import {Icon, Avatar} from '@rneui/themed';
//Componentes
import MyTextButton from '@Components/common/MyTextButton';
import ToolBar from '@Components/common/toolBar';
//Estilos
import {loginStyles, mainStyles} from '@styles/stylesGeneral';
import color from '@styles/colors';
//Contextos
import {UsuarioContext} from '@context/UsuarioContext';

function useBackButton(handler) {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handler);

    return () => {
      console.log('hardwareBackPress Close');
      BackHandler.removeEventListener('hardwareBackPress', handler);
    };
  }, [handler]);
}

export default function ProfileScreen(props) {
  const [loginUser, loginAction] = useContext(UsuarioContext);

  useEffect(() => {}, []);

  useBackButton(desconectarse);
  return (
    <ScrollView>
      <View style={styles.container}>
        <StatusBar
          backgroundColor={color.PRINCIPALCOLOR}
          barStyle="dark-content"
          translucent={true}
        />

        <ToolBar
          titulo="Perfil"
          onPressLeft={() => goToScreen('Home')}
          iconLeft={true}
        />
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.btnProfile}
            onPress={() => {
              console.log('editar imagen');
            }}>
            {loginUser.usuario.avatar != '' ? (
              <Avatar
                rounded
                source={{
                  uri: `https://proyectocementeriogt.gq/images/${loginUser.usuario.avatar}`,
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
            <View
              style={{
                zIndex: 2,
                bottom: 21,
                left: 50,
                width: 29,
                backgroundColor: 'transparent',
              }}>
              <Icon
                size={25}
                color={color.BLACK}
                type={'material-community'}
                name="pencil"
              />
            </View>
          </TouchableOpacity>
          <Text style={styles.txtNuevoComponente}>
            {loginUser.usuario.name + ' ' + loginUser.usuario.lastname}
          </Text>
          <MyTextButton
            titulo="Editar datos personales"
            style={{marginBottom: 20}}
            onPress={() => goToScreen('PersonalData')}
          />
        </View>
        <Text style={styles.txtComponente}>Codigo de vendedor</Text>
        <View style={{backgroundColor: color.WHITE}}>
          <Text style={styles.txtComponente}>
            {loginUser.usuario.id_number}
          </Text>
        </View>

        <View style={{backgroundColor: color.WHITE}}>
          <TouchableOpacity onPress={() => desconectarse()}>
            <Text style={styles.txtComponente}>Cerrar Sesión</Text>
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
  );
  function desconectarse() {
    Alert.alert('Salir', '¿Esta seguro que \ndesea cerrar sesion?', [
      {
        text: 'Si',
        onPress: () => {
          loginAction({
            type: 'sign-out',
            data: {},
          });
          goToScreen('Login');
        },
      },
      {
        text: 'No',
        onPress: () => {},
        style: 'cancel',
      },
    ]);
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
