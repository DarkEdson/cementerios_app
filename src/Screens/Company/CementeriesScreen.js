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
//Recarga la screen
import {useIsFocused} from '@react-navigation/native';
//URL de server
import {BASE_URL_IMG} from '@utils/config';
//Estilos Generales
import {mainStyles} from '@styles/stylesGeneral';
import color from '@styles/colors';
//Contextos
import {CementeryContext} from '@context/CementeryContext';
import {UsuarioContext} from '@context/UsuarioContext';
import {ScreentagContext} from '@context/ScreentagsContext';
import {RouteBackContext} from '@context/RouteBackContext';
//Componentes
import ToolBar from '@Components/common/toolBar';
import CardColaborador from '@Components/CardColaborador/';

//tags.CementeriesScreen.placeholder != '' ? tags.CementeriesScreen.placeholder :
export default function CompanyScreen(props) {
  const [login, loginAction] = useContext(UsuarioContext);
  const [cementery, setCementery] = useContext(CementeryContext);
  const {RouteBack, setRouteBack, RouteBackComp, setRouteBackComp} =
    useContext(RouteBackContext);
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
        id: 1,
      },
      {
        urlImagen:
          'https://cementeriosdelmar.com/wp-content/uploads/2021/07/Capillas-Sen%CC%83oriales-cementerio-en-el-mar.jpg',
        titulo: 'Perla oceano 2',
        descripcion: 'Perla, cemento, cremacion, traslado, hundimiento..',
        precio: '$ 16.90',
        categoria: 'Buseo',
        cementerio: 'cementerio del mar',
        id: 2,
      },
      {
        urlImagen:
          'https://arandano.lajornadamaya.mx/img/images/WhatsApp%20Image%202021-11-01%20at%2019_09_32.jpeg',
        titulo: 'Perla Magistral 2',
        descripcion: 'Diamante, Oro..',
        precio: '$ 16.90',
        categoria: 'CMar',
        cementerio: 'capillas',
        id: 3,
      },
      {
        urlImagen:
          'https://cementeriosdelmar.com/wp-content/uploads/2021/07/Capillas-Sen%CC%83oriales-cementerio-en-el-mar.jpg',
        titulo: 'Perla oceano 2',
        descripcion: 'Perla, cemento, cremacion, traslado, hundimiento..',
        precio: '$ 16.90',
        categoria: 'Buseo',
        cementerio: 'cementerio del mar',
        id: 4,
      },
      {
        urlImagen:
          'https://cementeriosdelmar.com/wp-content/uploads/2021/07/Capillas-Sen%CC%83oriales-cementerio-en-el-mar.jpg',
        titulo: 'Perla oceano 2',
        descripcion: 'Perla, cemento, cremacion, traslado, hundimiento..',
        precio: '$ 16.90',
        categoria: 'Buseo',
        cementerio: 'cementerio del mar',
        id: 5,
      },
      {
        urlImagen:
          'https://arandano.lajornadamaya.mx/img/images/WhatsApp%20Image%202021-11-01%20at%2019_09_32.jpeg',
        titulo: 'Perla Magistral 2',
        descripcion: 'Diamante, Oro..',
        precio: '$ 16.90',
        categoria: 'CMar',
        cementerio: 'capillas',
        id: 6,
      },
      {
        urlImagen:
          'https://cementeriosdelmar.com/wp-content/uploads/2021/07/Capillas-Sen%CC%83oriales-cementerio-en-el-mar.jpg',
        titulo: 'Perla oceano 2',
        descripcion: 'Perla, cemento, cremacion, traslado, hundimiento..',
        precio: '$ 16.90',
        categoria: 'Buseo',
        cementerio: 'cementerio del mar',
        id: 7,
      },
    ]);
    if (isFocused) {
      getInitialData();
      console.log('isFocused Cementeries All');
    }
    //props, isFocused
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
        titulo={
          tags.CementeriesScreen.titulo != ''
            ? tags.CementeriesScreen.titulo
            : 'Cementerios'
        }
        onPressLeft={() => goToScreen('Initial')}
        iconLeft={true}
      />
      <View style={styles.containerHeader}>
        <View style={styles.searchSection}>
          <TextInput
            style={styles.input}
            placeholder={
              tags.CementeriesScreen.placeholder != ''
                ? tags.CementeriesScreen.placeholder
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

      <ScrollView>
        <View style={styles.containerHeader}>
          {arrProductosDisp.map((company, key) => {
            return (
              <CardColaborador
                key={key}
                onPressColab={() => selectCementery(company, 'Company')}
                urlImagen={company.urlImagen}
                nombre={company.titulo}
                descripcion={company.descripcion}
                precio={company.precio}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
  function selectCementery(cementery, routeName) {
    setCementery(cementery);
    goToScreen(routeName);
    setRouteBackComp('Cementeries');
  }

  function goToScreen(routeName) {
    props.navigation.navigate(routeName);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerHeader: {
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
    borderBottomWidth: 1,
    borderColor: 'grey',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 15,
    width: '85%',
    height: Platform.OS === 'ios' ? 40 : 50,
    backgroundColor: color.White,
  },
  input: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
  },
});
