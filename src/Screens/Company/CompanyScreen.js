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
import { ShoppingCartContext } from '@context/ShoppingCartContext';

//tags.CompanyDetailScreen.mas != '' ? tags.CompanyDetailScreen.mas : 'Mas Populares'
export default function CompanyScreen(props) {
  const [cementery] = useContext(CementeryContext);
  const {tags, updateTags} = useContext(ScreentagContext);
  const {ShoppingCart, carrito} = useContext(ShoppingCartContext)
  const [customModal, setCustomModal] = useState(false);
  const [imagenModal, setimagenModal] = useState(null);
  const [infoCart, setinfoCart] = useState('')
  const [cant, setcant] = useState(2);

  const isFocused = useIsFocused();
  const getInitialData = async () => {};

  const [shoppingCard, setShoppingCard] = useState(false);

  // Cargar informacion de la vista
  useEffect(() => {
    setcant(ShoppingCart.length)
    let info = ''
    ShoppingCart.forEach(
      titulo=>{
        info = info + titulo.titulo + ', '
      }
    )
    console.log(info)
    setinfoCart(info)
    console.log(cementery);
    if (isFocused) {
      getInitialData();
      console.log('isFocused Company Detail');
    }
    return () => {};
  }, [props, isFocused]);

  function abrirModal(multimedia) {
    setCustomModal(true);
    setimagenModal(multimedia);
  }

  return (
    <View style={CementeryScreen.vista}>
      <ImageBackground
        source={{uri: cementery.urlImagen}}
        resizeMode="stretch"
        style={CementeryScreen.imgProducto}>
        <Image
          source={require('@images/logo.png')}
          style={CementeryScreen.logoImage}
        />
      </ImageBackground>
      <ScrollView>
      <View style={CementeryScreen.descripcion}>
        <Text style={CementeryScreen.titulo}> {cementery.titulo} </Text>
        <Text style={CementeryScreen.categorias}>
          {' '}
          $$ • Mar • Arrecife • Perla
        </Text>
        <View style={CementeryScreen.HeaderView}>
          <InformationIcon
            tipo="font-awesome-5"
            image="dollar-sign"
            titulo="Free"
            subtitulo="Tour"
            onPress={() => {}}
          />
          <View style={informationIconStyles.verticleLine} />
          <InformationIcon
            tipo="ionicons"
            image="location-pin"
            titulo="Campeche"
            subtitulo="Ubicaciones"
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
          <CardProducto
            urlImagen="https://arandano.lajornadamaya.mx/img/images/WhatsApp%20Image%202021-11-01%20at%2019_09_32.jpeg"
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
          <View style={mainStyles.boxTransparent} />
        </View>
      </ScrollView>
      {/* Boton para regresar a la vista anterior */}
      <MyFloatButton
        tipo="material-icon-community"
        image="chevron-left"
        left={true}
        onPress={() => goToScreen('Home')}
      />
      <MyFloatButton
        tipo="font-awesome-5"
        image="expand"
        onPress={() => {
          abrirModal(cementery.urlImagen);
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
          total="$150.53"
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
}
