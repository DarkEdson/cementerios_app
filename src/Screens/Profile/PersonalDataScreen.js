import React, {useContext, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
  BackHandler,
} from 'react-native';
import MyTextButton from '@Components/common/MyTextButton';
import ToolBar from '@Components/common/toolBar';
import {Icon, Avatar} from '@rneui/themed';
import {loginStyles, mainStyles} from '@styles/stylesGeneral';
import {UsuarioContext} from '@context/UsuarioContext';
import color from '@styles/colors';
import LargeButton from '@Components/common/largeButton';

export default function PersonalDataScreen(props) {
  const [loginUser, loginAction] = useContext(UsuarioContext);
  useEffect(() => {}, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <StatusBar
          backgroundColor={color.PRINCIPALCOLOR}
          barStyle="dark-content"
          translucent={true}
        />
        <ToolBar
          titulo="Datos Personales"
          onPressLeft={() => goToScreen('Profile')}
          iconLeft={true}
        />
        <Text style={styles.txtComponente}>Nombre</Text>
        <View style={{backgroundColor: color.WHITE}}>
          <Text style={styles.txtComponente}>
            {' '}
            {loginUser.usuario.name + ' ' + loginUser.usuario.lastname}
          </Text>
        </View>
        <Text style={styles.txtComponente}>e-mail</Text>
        <View style={{backgroundColor: color.WHITE}}>
          <Text style={styles.txtComponente}>{loginUser.usuario.email}</Text>
        </View>
        <Text style={styles.txtComponente}>Codigo de vendedor</Text>
        <View style={{backgroundColor: color.WHITE}}>
          <Text style={styles.txtComponente}>
            {loginUser.usuario.id_number}
          </Text>
        </View>
        <Text style={styles.txtComponente}>Editar</Text>
        <View style={{backgroundColor: color.WHITE}}>
          <View style={styles.espacio}>
            <LargeButton
              titulo="Informacion personal"
              onPressRight={() => goToScreen('EditProfile')}
              iconRight={true}
            />
          </View>
          <View style={styles.espacio}>
            <LargeButton
              titulo="Contraseña         "
              onPressRight={() => goToScreen('PasswordChange')}
              iconRight={true}
            />
          </View>
          <View style={styles.espacio}>
            <LargeButton
              titulo="Metodos de Pago"
              onPressRight={() => goToScreen('PaymentMethod')}
              iconRight={true}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );

  function goToScreen(routeName) {
    props.navigation.navigate(routeName);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: color.WHITE,
    height: '40%',
    width: '100%',
  },
  espacio: {
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    height: 50,
    marginBottom: 3,
    borderBottomWidth: 1,
    borderColor: 'grey',
    flexDirection: 'row',
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
    height: 70,
    width: 70,
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
