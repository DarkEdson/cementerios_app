import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  Platform,
  ImageBackground,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
//URL de server
import {BASE_URL_IMG, PRODUCTS_URL} from '@utils/config';
//Recarga la screen
import {useIsFocused} from '@react-navigation/native';
//Componentes
import CardProducto from '@Components/CardProducto/';
import MyFloatButton from '@Components/common/MyFloatButton';
import ShoppingCarCard from '@Components/ShoppingCarCard/ShoppingCarCard';
import InformationIcon from '@Components/common/InformationIcon';
import CustomModal from '@Components/CustomModal/CustomModal';
//Estilos Generales
import color from '@styles/colors';
import {
  mainStyles,
  CementeryScreen,
  informationIconStyles,
} from '@styles/stylesGeneral';
//Contextos
import {CementeryContext} from '@context/CementeryContext';
import {ScreentagContext} from '@context/ScreentagsContext';
import {ShoppingCartContext} from '@context/ShoppingCartContext';
import {ProductContext} from '@context/ProductContext';
import {RouteBackContext} from '@context/RouteBackContext';
import {SedesContext} from '@context/SedesContext';
import {SedeContext} from '@context/SedeContext';

//tags.CompanyDetailScreen.mas != '' ? tags.CompanyDetailScreen.mas : 'Mas Populares'
export default function CompanyScreen(props) {
  const [cementery] = useContext(CementeryContext);
  const {tags} = useContext(ScreentagContext);
  const [sede, setSede] = useContext(SedeContext);
  const {ShoppingCart, carrito} = useContext(ShoppingCartContext);
  const [Product, setProduct] = useContext(ProductContext);
  const {RouteBack, setRouteBack, RouteBackComp, setRouteBackComp} =
    useContext(RouteBackContext);
  const {Sedes, isLoadingSedes, getSedes} = useContext(SedesContext);
  const [customModal, setCustomModal] = useState(false);
  const [imagenModal, setimagenModal] = useState(null);
  const [infoCart, setinfoCart] = useState('');
  const [totalCart, settotalCart] = useState(0);
  const [cant, setcant] = useState(2);

  const productos = [
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
      precio: '$ 14.90',
      categoria: 'Buseo',
      cementerio: 'cementerio del mar',
      idCementerio: 2,
    },
    {
      urlImagen: `${BASE_URL_IMG}${PRODUCTS_URL}/Producto_3.jpg`,
      titulo: 'Perla Magistral 3',
      descripcion: 'Diamante, Oro..',
      precio: '$ 15.90',
      categoria: 'CMar',
      cementerio: 'capillas',
      idCementerio: 3,
    },
  ];

  const isFocused = useIsFocused();
  const getInitialData = async () => {};

  const [shoppingCard, setShoppingCard] = useState(false);

  // Cargar informacion de la vista
  useEffect(() => {
    console.log('SEDES', Sedes);
    console.log('SEDE', sede);
    setcant(ShoppingCart.length);
    let info = '';
    let total = 0;
    ShoppingCart.forEach(titulo => {
      info = info + titulo.name + ' x' + titulo.cantidad + ', ';
      total = total + titulo.cantidad * titulo.price;
    });
    console.log(info);
    setinfoCart(info);
    settotalCart(total);
    console.log(cementery);
    if (isFocused) {
      getInitialData();
      console.log('isFocused Company Detail');
    }
    return () => {};
    //props, isFocused
  }, []);

  function abrirModal(multimedia) {
    setCustomModal(true);
    setimagenModal(multimedia);
  }

  return (
    <View style={CementeryScreen.vista}>
      <ImageBackground
        source={{uri: cementery.image}}
        resizeMode="stretch"
        style={CementeryScreen.imgProducto}>
        <Image
          source={require('@images/logo.png')}
          style={CementeryScreen.logoImage}
        />
      </ImageBackground>
      <ScrollView>
        <View style={CementeryScreen.descripcion}>
          <Text style={CementeryScreen.titulo}> {cementery.name} </Text>
          <Text style={CementeryScreen.categorias}>
            {' '}
            $$ • Mar • Arrecife • Perla
          </Text>
          <View style={CementeryScreen.HeaderView}>
            <InformationIcon
              transparent={true}
              tipo="material-community"
              image="brightness-percent"
              titulo="Promos"
              subtitulo="Discount"
              onPress={() => goToScreen('Promociones')}
            />
            <View style={informationIconStyles.verticleLine} />
            <InformationIcon
              tipo="ionicons"
              image="location-pin"
              titulo="Campeche"
              subtitulo="Sedes"
              onPress={() => {}}
            />
            <View style={informationIconStyles.verticleLine} />
            <InformationIcon
              transparent={true}
              tipo="ant-design"
              image="star"
              titulo="4.3"
              subtitulo="(200+ Ratings)"
              onPress={() => {}}
            />
          </View>
        </View>

        <View style={CementeryScreen.detalleProd}>
          <View style={[CementeryScreen.categories, CementeryScreen.titles]}>
            <TouchableOpacity>
              <Text style={CementeryScreen.titleFooterText}>
                {tags.CompanyDetailScreen.todos != ''
                  ? tags.CompanyDetailScreen.todos
                  : 'Todos los Productos'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={CementeryScreen.subtitleFooterText}>Perlas</Text>
            </TouchableOpacity>
          </View>
          <Text style={CementeryScreen.title2Text}>
            {tags.CompanyDetailScreen.mas != ''
              ? tags.CompanyDetailScreen.mas
              : 'Mas Populares'}
          </Text>
          {productos.map((product, key) => {
            return (
              <CardProducto
                key={key}
                onPressProduct={() => selectedProduct(product, 'Product')}
                urlImagen={product.urlImagen}
                titulo={product.titulo}
                descripcion={product.descripcion}
                precio={product.precio}
              />
            );
          })}
          <View style={mainStyles.boxTransparent} />
        </View>
      </ScrollView>
      {/* Boton para regresar a la vista anterior */}
      <MyFloatButton
        tipo="material-icon-community"
        image="chevron-left"
        left={true}
        onPress={() => goToScreen(RouteBackComp)}
      />
      <MyFloatButton
        tipo="font-awesome-5"
        image="expand"
        onPress={() => {
          abrirModal(cementery.image);
        }}
      />
      {/* Seccion de carrito de compra */}
      {carrito ? (
        <ShoppingCarCard
          tipo="ionicons"
          image="shopping-basket"
          onPress={() => {}}
          cantidad={cant}
          titulo={
            cant > 1
              ? tags.CompanyDetailScreen.label1p != ''
                ? tags.CompanyDetailScreen.label1p
                : ' Productos Agregados'
              : tags.CompanyDetailScreen.label1s != ''
              ? tags.CompanyDetailScreen.label1s
              : 'Producto Agregado'
          }
          info={infoCart}
          total={'$' + totalCart}
        />
      ) : null}
      {customModal == false ? null : (
        <CustomModal
          customModal={customModal}
          setCustomModal={setCustomModal}
          urlImagen={imagenModal}
        />
      )}
    </View>
  );
  function goToScreen(routeName) {
    props.navigation.navigate(routeName);
  }
  function selectedProduct(producto, routeName) {
    setProduct(producto);
    goToScreen(routeName);
    setRouteBack('Company');
  }
}
