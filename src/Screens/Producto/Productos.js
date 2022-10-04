import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  StatusBar,
  Platform,
  TextInput,
} from 'react-native';
//URL de server
import {BASE_URL_IMG, PRODUCTS_URL} from '@utils/config';
//Recarga la screen
import {useIsFocused} from '@react-navigation/native';
//Estilos Generales
import color from '@styles/colors';
//Componentes
import ToolBar from '@Components/common/toolBar';
import CardProducto from '@Components/CardProducto/index';
//Contextos
import {ScreentagContext} from '@context/ScreentagsContext';

//tags.ProductsScreen.labelsearch1 != '' ? tags.ProductsScreen.labelsearch1 : 'Cementerio, Producto, Categoría...'
export default function VistaProductos(props) {
  const {tags, updateTags} = useContext(ScreentagContext);

  const isFocused = useIsFocused();
  const getInitialData = async () => {};

  // Cargar informacion de la vista
  useEffect(() => {
    // Actualizar valores de la vista
    setPropsVista({
      label1: 'Productos',
      labelSearch: 'Cementerio, Producto, Categoría...',
      productos: [
        {
          urlImagen: `${BASE_URL_IMG}${PRODUCTS_URL}/Producto_1.jpg`,
          titulo: 'Perla Magistral 2',
          descripcion: 'Diamante, Oro..',
          precio: '$ 16.90',
          categoria: 'CMar',
          cementerio: 'capillas',
          idCementerio: 1,
        },
        {
          urlImagen: `${BASE_URL_IMG}${PRODUCTS_URL}/Producto_2.jpg`,
          titulo: 'Perla oceano 2',
          descripcion: 'Perla, cemento, cremacion, traslado, hundimiento..',
          precio: '$ 16.90',
          categoria: 'Buseo',
          cementerio: 'cementerio del mar',
          idCementerio: 2,
        },
        {
          urlImagen: `${BASE_URL_IMG}${PRODUCTS_URL}/Producto_3.jpg`,
          titulo: 'Perla Magistral 2',
          descripcion: 'Diamante, Oro..',
          precio: '$ 16.90',
          categoria: 'CMar',
          cementerio: 'capillas',
          idCementerio: 1,
        },
        {
          urlImagen: `${BASE_URL_IMG}${PRODUCTS_URL}/Producto_4.jpg`,
          titulo: 'Perla oceano 2',
          descripcion: 'Perla, cemento, cremacion, traslado, hundimiento..',
          precio: '$ 16.90',
          categoria: 'Buseo',
          cementerio: 'cementerio del mar',
          idCementerio: 2,
        },
        {
          urlImagen: `${BASE_URL_IMG}${PRODUCTS_URL}/Producto_5.jpg`,
          titulo: 'Perla oceano 2',
          descripcion: 'Perla, cemento, cremacion, traslado, hundimiento..',
          precio: '$ 16.90',
          categoria: 'Buseo',
          cementerio: 'cementerio del mar',
          idCementerio: 2,
        },
        {
          urlImagen: `${BASE_URL_IMG}${PRODUCTS_URL}/Producto_6.jpg`,
          titulo: 'Perla Magistral 2',
          descripcion: 'Diamante, Oro..',
          precio: '$ 16.90',
          categoria: 'CMar',
          cementerio: 'capillas',
          idCementerio: 1,
        },
        {
          urlImagen: `${BASE_URL_IMG}${PRODUCTS_URL}/Producto_7.jpg`,
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
        urlImagen: `${BASE_URL_IMG}${PRODUCTS_URL}/Producto_1.jpg`,
        titulo: 'Perla Magistral 2',
        descripcion: 'Diamante, Oro..',
        precio: '$ 16.90',
        categoria: 'CMar',
        cementerio: 'capillas',
        idCementerio: 1,
      },
      {
        urlImagen: `${BASE_URL_IMG}${PRODUCTS_URL}/Producto_2.jpg`,
        titulo: 'Perla oceano 2',
        descripcion: 'Perla, cemento, cremacion, traslado, hundimiento..',
        precio: '$ 16.90',
        categoria: 'Buseo',
        cementerio: 'cementerio del mar',
        idCementerio: 2,
      },
      {
        urlImagen: `${BASE_URL_IMG}${PRODUCTS_URL}/Producto_3.jpg`,
        titulo: 'Perla Magistral 2',
        descripcion: 'Diamante, Oro..',
        precio: '$ 16.90',
        categoria: 'CMar',
        cementerio: 'capillas',
        idCementerio: 1,
      },
      {
        urlImagen: `${BASE_URL_IMG}${PRODUCTS_URL}/Producto_4.jpg`,
        titulo: 'Perla oceano 2',
        descripcion: 'Perla, cemento, cremacion, traslado, hundimiento..',
        precio: '$ 16.90',
        categoria: 'Buseo',
        cementerio: 'cementerio del mar',
        idCementerio: 2,
      },
      {
        urlImagen: `${BASE_URL_IMG}${PRODUCTS_URL}/Producto_5.jpg`,
        titulo: 'Perla oceano 2',
        descripcion: 'Perla, cemento, cremacion, traslado, hundimiento..',
        precio: '$ 16.90',
        categoria: 'Buseo',
        cementerio: 'cementerio del mar',
        idCementerio: 2,
      },
      {
        urlImagen: `${BASE_URL_IMG}${PRODUCTS_URL}/Producto_6.jpg`,
        titulo: 'Perla Magistral 2',
        descripcion: 'Diamante, Oro..',
        precio: '$ 16.90',
        categoria: 'CMar',
        cementerio: 'capillas',
        idCementerio: 1,
      },
      {
        urlImagen: `${BASE_URL_IMG}${PRODUCTS_URL}/Producto_7.jpg`,
        titulo: 'Perla oceano 2',
        descripcion: 'Perla, cemento, cremacion, traslado, hundimiento..',
        precio: '$ 16.90',
        categoria: 'Buseo',
        cementerio: 'cementerio del mar',
        idCementerio: 2,
      },
    ]);
    if (isFocused) {
      getInitialData();
      console.log('isFocused in Products');
    }
  }, [props, isFocused]);

  // Variables de la vista
  const [propsVista, setPropsVista] = useState({
    label1: '',
    labelSearch: '',
    productos: [],
  });

  // Variable de trabajo
  const [arrProductosDisp, setArrProductosDisp] = useState([]);

  return (
    <View>
      <StatusBar
        backgroundColor={color.PRINCIPALCOLOR}
        barStyle="dark-content"
        translucent={true}
      />
      <ToolBar
        titulo={
          tags.ProductsScreen.labelproductos != ''
            ? tags.ProductsScreen.labelproductos
            : 'Productos'
        }
        onPressLeft={() => goToScreen('Initial')}
        iconLeft={true}
      />
      <View style={styles.containerHeader}>
        <View style={styles.searchSection}>
          <TextInput
            style={styles.input}
            placeholder={
              tags.ProductsScreen.labelsearch1 != ''
                ? tags.ProductsScreen.labelsearch1
                : 'Cementerio, Producto, Categoría...'
            }
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
      </View>

      <ScrollView style={styles.scroll}>
        <View style={styles.containerHeader}>
          {arrProductosDisp.map((promo, key) => {
            return (
              <CardProducto
                key={key}
                onPressProduct={() => goToScreen('Product')}
                urlImagen={promo.urlImagen}
                titulo={promo.titulo}
                descripcion={promo.descripcion}
                precio={promo.precio}
              />
            );
          })}
        </View>
        <View style={styles.boxTransparent} />
      </ScrollView>
    </View>
  );
  function goToScreen(routeName) {
    props.navigation.navigate(routeName);
  }
}

const styles = StyleSheet.create({
  titulo: {
    fontWeight: '800',
    fontSize: 30,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 25,
  },
  containerHeader: {
    backgroundColor: color.WHITE,
  },
  boxTransparent: {
    backgroundColor: color.WHITE,
    marginBottom: Dimensions.get('screen').height * 0.027,
  },
  scroll: {
    height: '80%',
  },
  searchSection: {
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
