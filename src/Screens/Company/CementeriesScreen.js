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
  Platform,
  TextInput,
} from 'react-native';
import {mainStyles} from '@styles/stylesGeneral';
import {UsuarioContext} from '@context/UsuarioContext';
import ToolBar from '@Components/common/toolBar';
import {CementeryContext} from '@context/CementeryContext';
import color from '@styles/colors';
import MyButton from '@Components/common/MyButton';
import CardPromocion from '@Components/CardPromocion/';

export default function CompanyScreen(props) {
  const [login, loginAction] = useContext(UsuarioContext);
  const [cementery] = useContext(CementeryContext);

  // Cargar informacion de la vista
  useEffect(() => {
    // Actualizar valores de la vista
    setPropsVista({
      label1: 'Productos',
      labelSearch: 'Cementerio, Producto, Categoría...',
      productos: [
        {
          urlImagen:
            'https://arandano.lajornadamaya.mx/img/images/WhatsApp%20Image%202021-11-01%20at%2019_09_32.jpeg',
          titulo: 'Perla Magistral 2',
          descripcion: 'Diamante, Oro..',
          precio: '$ 16.90',
          categoria: 'CMar',
          cementerio: 'capillas',
          idCementerio: 1,
        },
        {
          urlImagen:
            'https://cementeriosdelmar.com/wp-content/uploads/2021/07/Capillas-Sen%CC%83oriales-cementerio-en-el-mar.jpg',
          titulo: 'Perla oceano 2',
          descripcion: 'Perla, cemento, cremacion, traslado, hundimiento..',
          precio: '$ 16.90',
          categoria: 'Buseo',
          cementerio: 'cementerio del mar',
          idCementerio: 2,
        },
        {
          urlImagen:
            'https://arandano.lajornadamaya.mx/img/images/WhatsApp%20Image%202021-11-01%20at%2019_09_32.jpeg',
          titulo: 'Perla Magistral 2',
          descripcion: 'Diamante, Oro..',
          precio: '$ 16.90',
          categoria: 'CMar',
          cementerio: 'capillas',
          idCementerio: 1,
        },
        {
          urlImagen:
            'https://cementeriosdelmar.com/wp-content/uploads/2021/07/Capillas-Sen%CC%83oriales-cementerio-en-el-mar.jpg',
          titulo: 'Perla oceano 2',
          descripcion: 'Perla, cemento, cremacion, traslado, hundimiento..',
          precio: '$ 16.90',
          categoria: 'Buseo',
          cementerio: 'cementerio del mar',
          idCementerio: 2,
        },
        {
          urlImagen:
            'https://cementeriosdelmar.com/wp-content/uploads/2021/07/Capillas-Sen%CC%83oriales-cementerio-en-el-mar.jpg',
          titulo: 'Perla oceano 2',
          descripcion: 'Perla, cemento, cremacion, traslado, hundimiento..',
          precio: '$ 16.90',
          categoria: 'Buseo',
          cementerio: 'cementerio del mar',
          idCementerio: 2,
        },
        {
          urlImagen:
            'https://arandano.lajornadamaya.mx/img/images/WhatsApp%20Image%202021-11-01%20at%2019_09_32.jpeg',
          titulo: 'Perla Magistral 2',
          descripcion: 'Diamante, Oro..',
          precio: '$ 16.90',
          categoria: 'CMar',
          cementerio: 'capillas',
          idCementerio: 1,
        },
        {
          urlImagen:
            'https://cementeriosdelmar.com/wp-content/uploads/2021/07/Capillas-Sen%CC%83oriales-cementerio-en-el-mar.jpg',
          titulo: 'Perla oceano 2',
          descripcion: 'Perla, cemento, cremacion, traslado, hundimiento..',
          precio: '$ 16.90',
          categoria: 'Buseo',
          cementerio: 'cementerio del mar',
          idCementerio: 2,
        },
      ],
    });

    setArrProductosDisp([
      {
        urlImagen:
          'https://arandano.lajornadamaya.mx/img/images/WhatsApp%20Image%202021-11-01%20at%2019_09_32.jpeg',
        titulo: 'Perla Magistral 2',
        descripcion: 'Diamante, Oro..',
        precio: '$ 16.90',
        categoria: 'CMar',
        cementerio: 'capillas',
        idCementerio: 1,
      },
      {
        urlImagen:
          'https://cementeriosdelmar.com/wp-content/uploads/2021/07/Capillas-Sen%CC%83oriales-cementerio-en-el-mar.jpg',
        titulo: 'Perla oceano 2',
        descripcion: 'Perla, cemento, cremacion, traslado, hundimiento..',
        precio: '$ 16.90',
        categoria: 'Buseo',
        cementerio: 'cementerio del mar',
        idCementerio: 2,
      },
      {
        urlImagen:
          'https://arandano.lajornadamaya.mx/img/images/WhatsApp%20Image%202021-11-01%20at%2019_09_32.jpeg',
        titulo: 'Perla Magistral 2',
        descripcion: 'Diamante, Oro..',
        precio: '$ 16.90',
        categoria: 'CMar',
        cementerio: 'capillas',
        idCementerio: 1,
      },
      {
        urlImagen:
          'https://cementeriosdelmar.com/wp-content/uploads/2021/07/Capillas-Sen%CC%83oriales-cementerio-en-el-mar.jpg',
        titulo: 'Perla oceano 2',
        descripcion: 'Perla, cemento, cremacion, traslado, hundimiento..',
        precio: '$ 16.90',
        categoria: 'Buseo',
        cementerio: 'cementerio del mar',
        idCementerio: 2,
      },
      {
        urlImagen:
          'https://cementeriosdelmar.com/wp-content/uploads/2021/07/Capillas-Sen%CC%83oriales-cementerio-en-el-mar.jpg',
        titulo: 'Perla oceano 2',
        descripcion: 'Perla, cemento, cremacion, traslado, hundimiento..',
        precio: '$ 16.90',
        categoria: 'Buseo',
        cementerio: 'cementerio del mar',
        idCementerio: 2,
      },
      {
        urlImagen:
          'https://arandano.lajornadamaya.mx/img/images/WhatsApp%20Image%202021-11-01%20at%2019_09_32.jpeg',
        titulo: 'Perla Magistral 2',
        descripcion: 'Diamante, Oro..',
        precio: '$ 16.90',
        categoria: 'CMar',
        cementerio: 'capillas',
        idCementerio: 1,
      },
      {
        urlImagen:
          'https://cementeriosdelmar.com/wp-content/uploads/2021/07/Capillas-Sen%CC%83oriales-cementerio-en-el-mar.jpg',
        titulo: 'Perla oceano 2',
        descripcion: 'Perla, cemento, cremacion, traslado, hundimiento..',
        precio: '$ 16.90',
        categoria: 'Buseo',
        cementerio: 'cementerio del mar',
        idCementerio: 2,
      },
    ]);
  }, []);

  // Variables de la vista
  const [propsVista, setPropsVista] = useState({
    label1: '',
    labelSearch: '',
    productos: [],
  });

  // Variable de trabajo
  const [arrProductosDisp, setArrProductosDisp] = useState([]);

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={color.PRINCIPALCOLOR}
        barStyle="dark-content"
        translucent={true}
      />
      <ToolBar
        titulo="Cementerios"
        onPressLeft={() => goToScreen('Initial')}
        iconLeft={true}
      />

      <View style={styles.searchSection}>
        <TextInput
          style={styles.input}
          placeholder={propsVista.labelSearch}
          onChangeText={val => {
            setArrProductosDisp(
              propsVista.productos.filter(
                p =>
                  p.cementerio
                    .toLocaleLowerCase()
                    .includes(val.toLocaleLowerCase()) ||
                  p.titulo
                    .toLocaleLowerCase()
                    .includes(val.toLocaleLowerCase()) ||
                  p.categoria
                    .toLocaleLowerCase()
                    .includes(val.toLocaleLowerCase()) ||
                  p.descripcion
                    .toLocaleLowerCase()
                    .includes(val.toLocaleLowerCase()),
              ),
            );
          }}
        />
      </View>
      <ScrollView>
        <View />
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
  },
  containerHeader: {
    backgroundColor: color.White,
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
  titulo: {
    fontWeight: '800',
    fontSize: 30,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 25,
  },
  scroll: {
    height: '80%',
  },
  searchSection: {
    backgroundColor: color.White,
    borderBottomWidth: 1,
    borderColor: 'grey',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 15,
    width: '85%',
    height: Platform.OS === 'ios' ? 40 : 50,
  },
  input: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
  },
});
