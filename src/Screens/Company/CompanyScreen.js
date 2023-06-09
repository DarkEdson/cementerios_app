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
import ImageView from 'react-native-image-viewing';
//URL de server
import {BASE_URL_IMG, PRODUCTS_URL, formatAmount} from '@utils/config';
//Recarga la screen
import {useIsFocused} from '@react-navigation/native';
//Componentes
import CardProducto from '@Components/CardProducto/';
import MyFloatButton from '@Components/common/MyFloatButton';
import ShoppingCarCard from '@Components/ShoppingCarCard/ShoppingCarCard';
import InformationIcon from '@Components/common/InformationIcon';
import CustomModal from '@Components/CustomModal/CustomModal';
import CustomModalList from '@Components/CustomModalList/CustomModalList';

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
import {CountryContext} from '@context/CountryContext';
import {SedesContext} from '@context/SedesContext';
import {SedeContext} from '@context/SedeContext';
import {ProductsContext} from '@context/ProductsContext';
import {GlobalLanguageContext} from '@context/LanguageContext';
import {CurrenciesContext} from '@context/CurrencyContext';

//tags.CompanyDetailScreen.mas != '' ? tags.CompanyDetailScreen.mas : 'Mas Populares'
export default function CompanyScreen(props) {
  const [cementery] = useContext(CementeryContext);
  const {tags} = useContext(ScreentagContext);
  const [sede, setSede] = useContext(SedeContext);
  const {
    ShoppingCart,
    carrito,
    removeAllItemstoCart,
    afiliateCart,
    setafiliateCart,
  } = useContext(ShoppingCartContext);
  const {
    country,
  } = useContext(CountryContext);
  const [Product, setProduct] = useContext(ProductContext);
  const {RouteBack, setRouteBack, RouteBackComp, setRouteBackComp} = useContext(
    RouteBackContext,
  );
  const {categories} = useContext(CategoriesContext);
  const {setCategory} = useContext(CategoryContext);
  const {Sedes, isLoadingSedes, getSedeDirect} = useContext(SedesContext);
  const [customModal, setCustomModal] = useState(false);
  const [imagenModal, setimagenModal] = useState(null);
  const [infoCart, setinfoCart] = useState('');
  const [totalCart, settotalCart] = useState(0);
  const [GlobalLanguage] = useContext(GlobalLanguageContext);
  const {Currency, getCurrency} = useContext(CurrenciesContext);
  const [cant, setcant] = useState(2);
  const {
    ProductsSedes,
    isLoadingProducts,
    getProductsbySede,
    getProductsbySedewithCat,
    getMultimediabyProduct,
    productRankingSede,
  } = useContext(ProductsContext);
  const [visible, setVisible] = useState(false);
  const [visibleImg, setIsVisibleImg] = useState(false);
  const isFocused = useIsFocused();
  const getInitialData = async () => {};
  const [productsFilter, setproductsFilter] = useState([]);
  const [isFilterC, setisFilterC] = useState(false);
  const [activeCat, setactiveCat] = useState({});
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
    if (ShoppingCart.length >= 1) {
      if (sede.idAffiliate != afiliateCart._id) {
        console.log('LIMPIE CARRITO EN CEMENTERIOS');
        setafiliateCart({});
        removeAllItemstoCart();
      }
    }
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
    console.log('RANKING SEDE', productRankingSede);
    getProductsbySede(sede, GlobalLanguage);
    setcant(ShoppingCart.length);
    let info = '';
    let total = 0;
    ShoppingCart.forEach(titulo => {
      let precioItem;
      if (titulo.price.includes(',')) {
        precioItem = titulo.price.replace(/,/g, '');
      } else {
        precioItem = titulo.price;
      }
      info = info + titulo.name + ' x' + titulo.cantidad + ', ';
      total = total + titulo.cantidad * parseFloat(precioItem);
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

  const toggleDialog = () => {
    setVisible(true);
  };

  return (
    <SafeAreaView style={mainStyles.containers}>
      <View style={CementeryScreen.vista}>
        <ImageBackground
          source={{uri: cementery.image}}
          resizeMode="center"
          style={CementeryScreen.imgProducto}
        />
        <ScrollView>
          <View style={CementeryScreen.descripcion}>
            <Text style={CementeryScreen.titulo}> {cementery.name} </Text>
            <View style={{flexDirection: 'row'}}>
              {categories.map((cat, key) => {
                if (key != categories.length - 1) {
                  return (
                    <Text key={key} style={CementeryScreen.categorias}>
                      {' ' + cat.name + '  •'}
                    </Text>
                  );
                } else {
                  return (
                    <Text key={key} style={CementeryScreen.categorias}>
                      {' ' + cat.name + '  '}
                    </Text>
                  );
                }
              })}
            </View>
            <View style={CementeryScreen.HeaderView}>
              <InformationIcon
                transparent={true}
                tipo="material-community"
                image="brightness-percent"
                titulo="Promos"
                subtitulo={
                  tags.CompanyDetailScreen.precio != ''
                    ? tags.CompanyDetailScreen.precio
                    : 'Descuento'
                }
                onPress={() => goToScreen('Promociones')}
              />
              <View style={informationIconStyles.verticleLine} />
              <InformationIcon
                tipo="ionicons"
                image="location-pin"
                titulo={sede ? sede.name : 'sin sede'}
                subtitulo={
                  tags.CompanyDetailScreen.sede != ''
                    ? tags.CompanyDetailScreen.sede
                    : 'Sede'
                }
                onPress={() => {
                  toggleDialog();
                }}
              />
              <View style={informationIconStyles.verticleLine} />
              <InformationIcon
                transparent={true}
                tipo="ant-design"
                image="star"
                titulo={productRankingSede ? productRankingSede : 0}
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
                  if (categoriesArray[index] != '0') {
                    setisFilterC(true);
                  } else {
                    setisFilterC(false);
                  }
                  selectedCategory(categoriesArray[index]);
                }}
                autoPlay={false}
                data={categoriesArray}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => {
                      console.log(item);
                    }}
                  >
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
                }}
              >
                <FAB
                  loading
                  color={color.PRINCIPALCOLOR}
                  visible={isLoadingProducts}
                  icon={{name: 'add', color: 'white'}}
                  size="small"
                />
              </View>
            ) : isLoadingSedes ? (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '25%',
                }}
              >
                <FAB
                  loading
                  color={color.PRINCIPALCOLOR}
                  visible={isLoadingSedes}
                  icon={{name: 'add', color: 'white'}}
                  size="small"
                />
              </View>
            ) : productsFilter.length >= 0 && isFilterC ? (
              productsFilter.length >= 1 ? (
                productsFilter.map((product, key) => {
                  return (
                    <CardProducto
                      key={key}
                      onPressProduct={() => selectedProduct(product, 'Product')}
                      urlImagen={product.principalImage}
                      titulo={product.name}
                      descripcion={product.keywords}
                      moneda={product.currency.code}
                      precio={product.price}
                    />
                  );
                })
              ) : (
                <View style={mainStyles.noPromoView}>
                  <Text style={mainStyles.promoText}>No Product</Text>
                </View>
              )
            ) : ProductsSedes.length >= 1 ? (
              ProductsSedes.map((product, key) => {
                return (
                  <CardProducto
                    key={key}
                    onPressProduct={() => selectedProduct(product, 'Product')}
                    urlImagen={product.principalImage}
                    titulo={product.name}
                    descripcion={product.keywords}
                    moneda={product.currency.code}
                    precio={
                      product.price.includes(',')
                        ? formatAmount(
                            parseFloat(product.price.replace(/,/g, '')),
                          )
                        : formatAmount(parseFloat(product.price))
                    }
                  />
                );
              })
            ) : (
              <View style={mainStyles.noPromoView}>
                <Text style={mainStyles.promoText}> {tags.CompanyDetailScreen.sinprods != ''
                ? tags.CompanyDetailScreen.sinprods
                : 'Sin Productos en '} {country.label}</Text>
              </View>
            )}
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
            setIsVisibleImg(true);
            //   abrirModal(cementery.image);
          }}
        />
        {/* Seccion de carrito de compra */}
        {carrito ? (
          <ShoppingCarCard
            tipo="ionicons"
            image="shopping-basket"
            onPress={() => goToScreen('Payments')}
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
        <ImageView
          images={[{uri: cementery.image}]}
          imageIndex={0}
          visible={visibleImg}
          onRequestClose={() => setIsVisibleImg(false)}
        />
        {customModal == false ? null : (
          <CustomModal
            customModal={customModal}
            setCustomModal={setCustomModal}
            urlImagen={imagenModal}
            item={{descrition: '.'}}
          />
        )}
        {visible == false ? null : (
          <CustomModalList
            customModal={visible}
            tags={tags.sedeSelectScreen}
            setCustomModal={setVisible}
            sedes={Sedes}
            sede={sede}
            setSede={setSede}
            activeCat={activeCat}
            selectedCategory={selectedSede}
            getProdbySedewithCat={getProductsbySedewithCat}
            getProdbySede={getProductsbySede}
            GlobalLang={GlobalLanguage}
            prods={ProductsSedes}
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
        setRouteBack('Company');
        getSedeDirect(producto.idHeadquarter, setSede, goToScreen, routeName);
      }
    });
  }

  function selectedCategory(cat) {
    //c
    let productF = [];
    ProductsSedes.forEach(prod => {
      if (prod.idCategory == cat._id) {
        productF.push(prod);
      }
      setisFilterC(true);
    });
    setactiveCat(cat);
    if (cat._id == '0') {
      setisFilterC(false);
      productF = [];
      setactiveCat({});
    }
    console.log(productF, isFilterC);
    setproductsFilter(productF);
  }

  function selectedSede(cat, prodSede) {
    let productF = [];
    prodSede.forEach(prod => {
      if (prod.idCategory == cat._id) {
        productF.push(prod);
      }
      setisFilterC(true);
    });
    setactiveCat(cat);
    if (cat._id == '0') {
      setisFilterC(false);
      productF = [];
      setactiveCat({});
    }
    console.log(productF, isFilterC, 'FILTRADOS POR SEDE Y CAT');
    setproductsFilter(productF);
  }
}
