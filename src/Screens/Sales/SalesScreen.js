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

export default function SalesScreen(props) {
  const [login, loginAction] = useContext(UsuarioContext);

  return (
    <ScrollView>
      <View style={styles.container}>
        <StatusBar
          backgroundColor={color.PRINCIPALCOLOR}
          barStyle="dark-content"
          translucent={true}
        />
        <ToolBar
          titulo="Ventas"
          onPressLeft={() => goToScreen('Initial')}
          iconLeft={true}
        />

        <Text style={styles.txtNuevoComponente}> Card de productos </Text>
        <CardProducto
          urlImagen="https://cementeriosdelmar.com/wp-content/uploads/2021/07/Capillas-Sen%CC%83oriales-cementerio-en-el-mar.jpg"
          titulo="Perla Magistral"
          descripcion="Perla, cemento, cremacion, traslado, hundimiento.."
          precio="$ 12.50"
        />
        <CardProducto
          urlImagen="https://arandano.lajornadamaya.mx/img/images/WhatsApp%20Image%202021-11-01%20at%2019_09_32.jpeg"
          titulo="Perla oceano 2"
          descripcion="Perla, cemento, cremacion, traslado, hundimiento.."
          precio="$ 16.90"
        />
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
    backgroundColor: color.WHITE,
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
