import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  Platform,
  ImageBackground,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Icon, FAB} from '@rneui/themed';
import Carousel from 'react-native-reanimated-carousel';
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
import {CategoriesContext} from '@context/CategoriesContext';
import {CategoryContext} from '@context/CategoryContext';
import {SedesContext} from '@context/SedesContext';
import {SedeContext} from '@context/SedeContext';
import {ProductsContext} from '@context/ProductsContext';
import {GlobalLanguageContext} from '@context/LanguageContext';

//tags.CompanyDetailScreen.mas != '' ? tags.CompanyDetailScreen.mas : 'Mas Populares'
export default function CompanyScreen(props) {
  const [cementery] = useContext(CementeryContext);
  const {tags} = useContext(ScreentagContext);
  const [sede, setSede] = useContext(SedeContext);
  const {ShoppingCart, carrito} = useContext(ShoppingCartContext);
  const [Product, setProduct] = useContext(ProductContext);
  const {RouteBack, setRouteBack, RouteBackComp, setRouteBackComp} =
    useContext(RouteBackContext);
  const {categories} = useContext(CategoriesContext);
  const {} = useContext(CategoryContext);
  const {Sedes, getSede} = useContext(SedesContext);
  const [customModal, setCustomModal] = useState(false);
  const [imagenModal, setimagenModal] = useState(null);
  const [infoCart, setinfoCart] = useState('');
  const [totalCart, settotalCart] = useState(0);
  const [GlobalLanguage] = useContext(GlobalLanguageContext);
  const [cant, setcant] = useState(2);
  const {
    ProductsSedes,
    isLoadingProducts,
    getProductsbySede,
    getMultimediabyProduct,
  } = useContext(ProductsContext);

  const isFocused = useIsFocused();
  const getInitialData = async () => {};
  const [productsFilter, setproductsFilter] = useState([]);
  const [isFilterC, setisFilterC] = useState(false);
  const [isFilterS, setisFilterS] = useState(false);
  const [categoriesArray, setcategoriesArray] = useState([
    {
      _id: '0',
      code: 'c00',
      description: 'All Products',
      image: 'none',
      name: 'All',
    },
  ]);
  // Cargar informacion de la vista
  useEffect(() => {
    let cats = [];
    if (GlobalLanguage.code == 'en') {
      cats.push({
        _id: '0',
        code: 'c00',
        description: 'All Products',
        image: 'none',
        name: 'All',
      });
    } else {
      cats.push({
        _id: '0',
        code: 'c00',
        description: 'Todos los Productos',
        image: 'none',
        name: 'Todos',
      });
    }
    categories.forEach(cat => {
      cats.push(cat);
    });
    cats = cats.sort((a, b) => a._id.localeCompare(b._id));
    setcategoriesArray(cats);
    console.log('SEDES', Sedes);
    console.log('SEDE', sede);
    getProductsbySede(sede, GlobalLanguage);
    setcant(ShoppingCart.length);
    let info = '';
    let total = 0;
    ShoppingCart.forEach(titulo => {
      info = info + titulo.name + ' x' + titulo.cantidad + ', ';
      total = total + titulo.cantidad * parseFloat(titulo.price);
    });
    console.log(info, total);
    setinfoCart(info);
    settotalCart(total);
    console.log(cementery);
    if (isFocused) {
      getInitialData();
      console.log('isFocused COMPANY DETAIL');
    }
    return () => {};
    //props, isFocused
  }, []);

  function abrirModal(multimedia) {
    setCustomModal(true);
    setimagenModal(multimedia);
  }

  return (
    <SafeAreaView style={mainStyles.containers}>
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
                titulo={sede.name}
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
              <Carousel
                width={90}
                height={40}
                loop
                onSnapToItem={index => {
                  console.log('current index:', index);
                  console.log('current item:', categoriesArray[index]);
                  selectedCategory(categoriesArray[index]);
                }}
                autoPlay={false}
                data={categoriesArray}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => {
                      console.log(item);
                    }}>
                    <Text style={CementeryScreen.subtitleFooterText}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
            <Text style={CementeryScreen.title2Text}>
              {tags.CompanyDetailScreen.mas != ''
                ? tags.CompanyDetailScreen.mas
                : 'Mas Populares'}
            </Text>
            {isLoadingProducts ? (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '25%',
                }}>
                <FAB
                  loading
                  color={color.PRINCIPALCOLOR}
                  visible={isLoadingProducts}
                  icon={{name: 'add', color: 'white'}}
                  size="small"
                />
              </View>
            ) : ProductsSedes.length >= 0 ? (
              ProductsSedes.map((product, key) => {
                return (
                  <CardProducto
                    key={key}
                    onPressProduct={() => selectedProduct(product, 'Product')}
                    urlImagen={product.principalImage}
                    titulo={product.name}
                    descripcion={product.description}
                    precio={product.price}
                  />
                );
              })
            ) : null}
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
            item={{descrition: '.'}}
          />
        )}
      </View>
    </SafeAreaView>
  );
  function goToScreen(routeName) {
    props.navigation.navigate(routeName);
  }
  function selectedProduct(producto, routeName) {
    categories.forEach(category => {
      if (category._id == producto.idCategory) {
        setCategory(category);
        setProduct(producto);
        getMultimediabyProduct(producto);
        getSede(producto.idHeadquarter, setSede);
        goToScreen(routeName);
        setRouteBack('Company');
      }
    });
  }

  function selectedCategory(cat) {
    //c
    let productF = [];
    ProductsSedes.forEach(prod => {
      if (prod.idCategory == cat._id) {
        productF.push(prod);
        setisFilterC(true);
      }
    });
    if (cat._id == '0') {
      setisFilterC(false);
      productF = [];
    }
    console.log(productF);
    setproductsFilter(productF);
  }

  function selectedSede(sede) {
    //d
  }
}
