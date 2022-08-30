import React, {useContext, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  Alert,
  BackHandler,
} from 'react-native';
import {UsuarioContext} from '@context/UsuarioContext';
import color from '@styles/colors';
import MyButton from '@Components/common/MyButton';
import CardPromocion from '@Components/CardPromocion/';
import BtnCategoria from '@Components/BtnCategoria/';
import ToolBarSession from '@Components/common/toolBarSession';
import MyTextButton from '@Components/common/MyTextButton';
import CardColaborador from '@Components/CardColaborador/';

function useBackButton(handler) {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handler);

    return () => {
      console.log('hardwareBackPress Close');
      BackHandler.removeEventListener('hardwareBackPress', handler);
    };
  }, [handler]);
}

export default function HomeScreen(props) {
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
        <ToolBarSession
          titulo="Ubicación"
          onPressLeft={() => goToScreen('Principal')}
          iconLeft={true}
        />
        <Text style={styles.txtNuevoComponente}>
          {' '}
          Bienvenido {'\n' + login.usuario.email}{' '}
        </Text>
        <CardPromocion
          titulo="30% de descuento"
          descripcion="Descuesto en momentos y memorias al adquir un espacio en el cementerio"
          bgColor="#fadf8e"
          urlImagen="https://img.freepik.com/vector-premium/chico-dibujos-animados-buceo_33070-3880.jpg?w=2000"
        />
        <View style={styles.categories}>
          <BtnCategoria
            urlImagen="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf6xM2nAd-gXu4cvl4MImqd-G0J1qtJGhH_w&usqp=CAU"
            titulo="Viajes en Lancha"
          />
          <BtnCategoria
            urlImagen="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvvrsxGFFwp4ylemzQNDVJQXBU-PCB3FP1og&usqp=CAU"
            titulo="Flores"
          />
          <BtnCategoria
            urlImagen="https://flyclipart.com/thumb2/flat-location-logo-icons-png-934757.png"
            titulo="Ubicaciones"
          />
          <BtnCategoria
            urlImagen="https://img2.freepng.es/20190208/aqt/kisspng-diving-mask-snorkeling-underwater-diving-scuba-div-spearfishing-today-mexicoampaposs-top-caribbean-5c5d6a5d360982.2594144115496259492214.jpg"
            titulo="Buceo"
          />
        </View>
        <View style={[styles.categories, styles.titles]}>
          <Text style={styles.titleText}>Cementerios</Text>
          <MyTextButton
            titulo="Ver todos"
            underline={true}
            onPress={() => {}}
          />
        </View>
        <View style={styles.categories}>
          <CardColaborador
            urlImagen="https://img.europapress.es/fotoweb/fotonoticia_20180301191246_1200.jpg"
            nombre="Cementarios del mar"
          />
          <CardColaborador
            urlImagen="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4HjGP0stpZVJ6HPn06tbnaxp6oWpD4Kps1g&usqp=CAU"
            nombre="Capillas senoriales"
          />
        </View>
        <MyButton titulo="LOGOUT" onPress={() => desconectarse()} />
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
    backgroundColor: color.WHITE,
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    marginLeft: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: color.BLACK,
  },
  titles: {
    marginRight: 20,
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
