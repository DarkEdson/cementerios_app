import React, {useContext, useEffect} from 'react';
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
import CardColaborador from '@Components/CardColaborador/';
import CardProducto from '@Components/CardProducto/';
import CardPromocion from '@Components/CardPromocion/';
import {mainStyles} from '@styles/stylesGeneral';
import {UsuarioContext} from '@context/UsuarioContext';
import color from '@styles/colors';
import MyButton from '@Components/common/MyButton';

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
  const [login, loginAction] = useContext(UsuarioContext);

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
          titulo="USUARIO"
          onPressLeft={() => goToScreen('Home')}
          iconLeft={true}
        />

        <Text style={styles.txtNuevoComponente}>
          {' '}
          Bienvenido {'\n' + login.usuario.email}{' '}
        </Text>
        <MyButton titulo="LOGOUT" onPress={() => desconectarse()} />
        <Text style={styles.txtNuevoComponente}> PERFIL </Text>
        <CardPromocion
          titulo="30% de descuento"
          descripcion="Descuesto en momentos y memorias al adquir un espacio en el cementerio"
          bgColor="#fadf8e"
          urlImagen="https://img.freepik.com/vector-premium/chico-dibujos-animados-buceo_33070-3880.jpg?w=2000"
        />
        <Image
          source={{
            uri: 'https://img.freepik.com/vector-premium/chico-dibujos-animados-buceo_33070-3880.jpg?w=2000',
          }}
        />
        <CardPromocion
          titulo="40% de descuento"
          descripcion="Descuento en viaje en lancha en acuatic."
          bgColor="#f5c48c"
          urlImagen="https://img.freepik.com/vector-premium/chico-dibujos-animados-buceo_33070-3880.jpg?w=2000"
        />
        <Text style={styles.txtNuevoComponente}> Boton de categoria </Text>
        <BtnCategoria
          urlImagen="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvvrsxGFFwp4ylemzQNDVJQXBU-PCB3FP1og&usqp=CAU"
          titulo="Viajes en lancha"
        />
        <BtnCategoria
          urlImagen="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvvrsxGFFwp4ylemzQNDVJQXBU-PCB3FP1og&usqp=CAU"
          titulo="Flores"
        />
        <Text style={styles.txtNuevoComponente}> Card de colaborador </Text>
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
