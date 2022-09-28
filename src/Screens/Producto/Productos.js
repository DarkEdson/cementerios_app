import React, {useState, useEffect} from 'react';
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
import ToolBar from '@Components/common/toolBar';
import color from '@styles/colors';
import CardProducto from '@Components/CardProducto/index';

export default function VistaProductos(props) {
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
    <View>
      <StatusBar
        backgroundColor={color.PRINCIPALCOLOR}
        barStyle="dark-content"
        translucent={true}
      />
      <ToolBar
        titulo={propsVista.label1}
        onPressLeft={() => goToScreen('Initial')}
        iconLeft={true}
      />
      <View style={styles.containerHeader}>
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
      </View>

      <ScrollView style={styles.scroll}>
        <View style={styles.containerHeader}>
          {arrProductosDisp.map(promo => {
            return (
              <CardProducto
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
