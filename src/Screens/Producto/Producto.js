import React, { useState, useEffect, useContext } from 'react';
import {
  Text,
  View,
  Platform,
  Dimensions,
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  //Image,
  TouchableOpacity,
} from 'react-native';
import { Image, FAB } from '@rneui/themed';
import Carousel from 'react-native-reanimated-carousel';

import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

//URL de server
import { BASE_URL_IMG, PRODUCTS_URL } from '@utils/config';
//Recarga la screen
import { useIsFocused } from '@react-navigation/native';
//Componentes
import MyFloatButton from '@Components/common/MyFloatButton';
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
import { ScreentagContext } from '@context/ScreentagsContext';
import CardMultimedia from '@Components/CardMultimedia';
import { ProductContext } from '@context/ProductContext';
import { ShoppingCartContext } from '@context/ShoppingCartContext';
import { CementeriesContext } from '@context/CementeriesContext';
import { CementeryContext } from '@context/CementeryContext';
import { RouteBackContext } from '@context/RouteBackContext';
import { ProductsContext } from '@context/ProductsContext';
import { CategoryContext } from '@context/CategoryContext';
import { SedeContext } from '@context/SedeContext';

const PAGE_WIDTH = Dimensions.get('screen').width;

//tags.ProductDetailScreen.btnagregar != '' ? tags.ProductDetailScreen.btnagregar :
export default function VistaProducto(props) {
  const { tags } = useContext(ScreentagContext);
  const [Product, setProduct] = useContext(ProductContext);
  const { addItemtoCart,ShoppingCart, setafiliateCart, removeAllItemstoCart,afiliateCart,rutaCart } = useContext(ShoppingCartContext);
  const [cementery] = useContext(CementeryContext);
  const { Cementeries } =
    useContext(CementeriesContext);
  const [sede, setSede] = useContext(SedeContext);
  const { RouteBack, setRouteBack } = useContext(RouteBackContext);
  const [customModal, setCustomModal] = useState(false);
  const [imagenModal, setimagenModal] = useState(null);
  const [itemModal, setitemModal] = useState(null)
  const { Category } = useContext(CategoryContext);
  const { ProductMultimedia, isLoadingProducts } = useContext(ProductsContext);

  const isFocused = useIsFocused();
  const getInitialData = async () => { };

  const progressValue = useSharedValue(0);
  const baseOptions = {
    vertical: false,
    width: PAGE_WIDTH,
    height: PAGE_WIDTH * 0.41,
  };
  // Cargar informacion de la vista
  useEffect(() => {
    console.log('Producto escogido', Product);
    if(!rutaCart){
      if (ShoppingCart.length >=1){
        if(sede.idAffiliate!=afiliateCart._id){
          console.log('LIMPIE CARRITO EN PRODUCTOS')
          setafiliateCart({})
          removeAllItemstoCart()
        }
    }
    }
    
    // Actualizar valores de la vista
    setPropsVista({
      rating: {
        valor: 4.9,
        label: 'Ratink',
      },
    });

    if (isFocused) {
      getInitialData();
      console.log('isFocused in Product Detail');
    }
    //props, isFocused
  }, []);

  // Variables de la vista
  const [propsVista, setPropsVista] = useState({
    rating: {
      valor: 0,
      label: '',
    },
  });

  const [cantProductos, setCantProductos] = useState(1);

  function suma() {
    let aumenta = cantProductos;
    console.log(aumenta, 'aumenta');
    setCantProductos(aumenta + 1);
  }

  function resta() {
    let disminuye = cantProductos;
    console.log(disminuye, 'disminuye');
    setCantProductos(disminuye - 1);
  }

  function abrirModal(multimedia) {
    setCustomModal(true);
    setimagenModal(multimedia.name);
    setitemModal(multimedia);
  }

  return (

    <View style={styles.vista}>
      <Image
        containerStyle={styles.imgProducto}
        PlaceholderContent={<ActivityIndicator />}
        source={{
          uri: Product.principalImage,
        }}
      />
      <ScrollView>
        <View style={styles.descripcion}>
          <Text style={styles.titulo}> {Product.name} </Text>
          <Text style={styles.categorias}> {Category.name} </Text>
          <View style={CementeryScreen.HeaderView}>
            <InformationIcon
              tipo="font-awesome-5"
              image="dollar-sign"
              titulo={Product.price}
              subtitulo={tags.ProductDetailScreen.precio != ''
                ? tags.ProductDetailScreen.precio
                : 'Precio'}
              onPress={() => { }}
            />
            <View style={informationIconStyles.verticleLine} />
            <InformationIcon
              tipo="ionicons"
              image="location-pin"
              titulo={sede.name}
              subtitulo={tags.ProductDetailScreen.sede != ''
                ? tags.ProductDetailScreen.sede
                : 'Sede'}
            />
            <View style={informationIconStyles.verticleLine} />
            <InformationIcon
              transparent={true}
              tipo="ant-design"
              image="star"
              titulo={propsVista.rating.valor}
              subtitulo={propsVista.rating.label}
            />
          </View>
        </View>

        <View style={styles.detalleProd}>
          <Text style={styles.titulo2}>
            {' '}
            {tags.ProductDetailScreen.detalle != ''
              ? tags.ProductDetailScreen.detalle
              : 'Detalle'}{' '}
          </Text>
          <Text style={styles.descDato} numberOfLines={2}>
            {Product.description}
          </Text>
          <View style={styles.multimedia}>
            {isLoadingProducts ? (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '10%',
                }}>
                <FAB
                  loading
                  color={color.PRINCIPALCOLOR}
                  visible={isLoadingProducts}
                  icon={{ name: 'add', color: 'white' }}
                  size="small"
                />
              </View>
            ) : ProductMultimedia.length >= 1 ? (
              <Carousel
                {...baseOptions}
                style={{
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}
                loop={true}
                pagingEnabled={true}
                snapEnabled={true}
                autoPlay={true}
                autoPlayInterval={1500}
                onProgressChange={(_, absoluteProgress) =>
                  (progressValue.value = absoluteProgress)
                }
                mode="parallax"
                modeConfig={{
                  parallaxScrollingScale: 0.85,
                  parallaxScrollingOffset: 260,
                }}
                data={ProductMultimedia}
                renderItem={({ item }) => {
                  return (
                    <CardMultimedia
                      style={styles.imgDetalle}
                      urlImagen={item}
                      onPressMultimedia={() => {
                        console.log(item);
                        abrirModal(item);
                      }}
                      textStyle={styles.imgTitulo}
                    />
                  );
                }}
              />
            ) : (
              <View style={styles.noPromoView}>
                <Text style={styles.promoText}>No Multimedia</Text>
              </View>
            )}
            {ProductMultimedia.length >= 1
              ? !!progressValue && (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: 100,
                    marginTop: 10,
                    alignSelf: 'center',
                  }}>
                  {ProductMultimedia.map((item, index) => {
                    return (
                      <PaginationItem
                        animValue={progressValue}
                        index={index}
                        key={index}
                        length={ProductMultimedia.length}
                      />
                    );
                  })}
                </View>
              )
              : null}
            <View style={styles.numCant}>
              <TouchableOpacity
                style={styles.btnCant}
                onPress={() => {
                  if (cantProductos <= 1) {
                    console.log('no puede ser 0');
                  } else {
                    resta();
                  }
                }}>
                <Text style={styles.txtCantBtn}> - </Text>
              </TouchableOpacity>
              <Text style={styles.txtCant}> {cantProductos} </Text>
              <TouchableOpacity
                style={styles.btnCant}
                onPress={() => {
                  suma();
                }}>
                <Text style={styles.txtCantBtn}> + </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.btnAgregar}
              onPress={() => itemToCart(Product, 'Payments')}>
              <Text style={styles.txtAgregar}>
                {tags.ProductDetailScreen.btnagregar != ''
                  ? tags.ProductDetailScreen.btnagregar
                  : 'Agregar'}
              </Text>
            </TouchableOpacity>
            <View style={mainStyles.boxTransparent} />
          </View>
        </View>
      </ScrollView>
      {/* Boton para regresar a la vista anterior */}
      <MyFloatButton
        tipo="material-icon-community"
        image="chevron-left"
        left={true}
        onPress={() => goToScreen(RouteBack)}
      />
      {customModal == false ? null : (
        <CustomModal
          customModal={customModal}
          setCustomModal={setCustomModal}
          urlImagen={imagenModal}
          textStyle={styles.imgTitulo}
          item={itemModal}
        />
      )}
    </View>

  );
  function goToScreen(routeName) {
    props.navigation.navigate(routeName);
  }

  function PaginationItem(index, length, animValue) {
    const width = 10;

    const animStyle = useAnimatedStyle(() => {
      return {
        width: animValue?.value,
      };
    }, [width]);

    return (
      <View
        style={{
          backgroundColor: 'white',
          width,
          height: width,
          borderRadius: 50,
          overflow: 'hidden',
          transform: [
            {
              rotateZ: '0deg',
            },
          ],
        }}>
        <Animated.View
          style={[
            {
              borderRadius: 50,
              backgroundColor: color.PRINCIPALCOLOR,
              flex: 1,
            },
            animStyle,
          ]}
        />
      </View>
    );
  }

  function itemToCart(producto, routeName) {
    let item = { ...producto, cantidad: cantProductos };
    console.log(item);
    if (rutaCart) {
      setafiliateCart(cementery)
    } else {
      Cementeries.forEach(Afiliado=>{
        if(sede.idAffiliate==Afiliado._id){
          setafiliateCart(Afiliado)
        }
      })     
    }
    addItemtoCart(item);
    goToScreen(routeName);
  }
}

const styles = StyleSheet.create({
  vista: {
    height: '100%',
    backgroundColor: color.WHITE,
  },
  noPromoView: {
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  promoText: {
    fontSize: 20,
    fontWeight: '600',
    color: color.PRINCIPALCOLOR,
  },
  descripcion: {
    paddingLeft: 20,
    paddingTop: 10,
    paddingRight: 20,
    borderBottomWidth: 3,
    borderColor: '#dbdbdb',
  },
  detalleProd: {
    paddingLeft: 20,
    paddingTop: 10,
    paddingRight: 20,
    marginTop: 5,
  },
  titulo: {
    fontWeight: '700',
    fontSize: 23,
    textAlign: 'left',
    marginTop: 5,
    marginBottom: 5,
  },
  titulo2: {
    fontWeight: '800',
    fontSize: 23,
    textAlign: 'left',
    marginTop: 5,
    marginBottom: 5,
    color: 'skyblue',
  },
  categorias: {
    fontWeight: '600',
    fontSize: 15,
    textAlign: 'left',
    color: 'grey',
  },
  datos: {
    height: 90,
    flexDirection: 'row',
  },
  precio: {
    width: '30%',
    height: '100%',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
  },
  sede: {
    width: '40%',
    height: '100%',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
  },
  rating: {
    width: '30%',
    height: '100%',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
  },
  valDato: {
    fontWeight: '600',
    fontSize: 15,
    textAlign: 'left',
    marginLeft: 10,
  },
  descDato: {
    fontWeight: '400',
    fontSize: 15,
    textAlign: 'left',
    marginLeft: 10,
    color: 'grey',
  },
  multimedia: {
    marginTop: 20,
  },
  imgDetalle: {
    height: 150,
    width: 150,
    borderRadius: 20,
  },
  imgTitulo: {
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'left',
    marginTop: 5,
    marginBottom: 5,
    color: color.PRINCIPALCOLOR
  },
  scroll: {
    height: '80%',
  },
  imgProducto: {
    height: 300,
    width: '100%',
  },
  txtRegresar: {
    fontSize: 15,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
  },
  btnRegresar: {
    width: 45,
    height: 45,
    position: 'absolute',
    backgroundColor: 'rgba(166, 166, 166, 0.85)',
    borderRadius: 45,
    top: 0,
    left: 0,
    marginLeft: 15,
    marginTop: 25,
    justifyContent: 'center',
    alignContent: 'center',
  },
  agregarProducto: {
    width: '50%',
    height: 90,
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    bottom: Platform.OS === 'ios' ? 0 : 20,
    alignSelf: 'center',
    flexDirection: 'column',
  },
  numCant: {
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 10,
    alignSelf: 'center',
  },
  btnCant: {
    borderWidth: 1,
    borderColor: 'skyblue',
    width: 35,
    height: 35,
    borderRadius: 35,
    marginLeft: 10,
    marginRight: 10,
    alignContent: 'center',
    justifyContent: 'center',
  },
  txtCantBtn: {
    fontSize: 17,
    fontWeight: '800',
    color: 'skyblue',
    textAlign: 'center',
  },
  txtCant: {
    fontSize: 20,
    marginTop: 5,
    fontWeight: '800',
  },
  btnAgregar: {
    width: '80%',
    marginLeft: '10%',
    marginRight: '10%',
    borderRadius: 10,
    backgroundColor: 'skyblue',
    height: 40,
    justifyContent: 'center',
    alignContent: 'center',
  },
  txtAgregar: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
  },
});
