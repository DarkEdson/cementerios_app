import React, {useState, useEffect, useContext} from 'react';
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
import {Image, FAB, CheckBox} from '@rneui/themed';
import Snackbar from 'react-native-snackbar';
import Carousel from 'react-native-reanimated-carousel';
import ReadMore from 'react-native-read-more-text';
import {useSharedValue} from 'react-native-reanimated';
import ImageView from 'react-native-image-viewing';
//URL de server
import {
  BASE_URL_IMG,
  PRODUCTS_URL,
  IMGEXTENSIONS,
  formatAmount,
} from '@utils/config';
//Recarga la screen
import {useIsFocused} from '@react-navigation/native';
//Componentes
import MyFloatButton from '@Components/common/MyFloatButton';
import MyTextInput from '@Components/common/MyTextInput';
import InformationIcon from '@Components/common/InformationIcon';
import CustomModal from '@Components/CustomModal/CustomModal';
import RankingModal from '@Components/RankingModal/RankingModal';
//Estilos Generales
import color from '@styles/colors';
import {
  mainStyles,
  CementeryScreen,
  informationIconStyles,
} from '@styles/stylesGeneral';
//Contextos
import {ScreentagContext} from '@context/ScreentagsContext';
import CardMultimedia from '@Components/CardMultimedia';
import {ProductContext} from '@context/ProductContext';
import {ShoppingCartContext} from '@context/ShoppingCartContext';
import {CementeriesContext} from '@context/CementeriesContext';
import {GlobalLanguageContext} from '@context/LanguageContext';
import {CountryContext} from '@context/CountryContext';
import {CementeryContext} from '@context/CementeryContext';
import {RouteBackContext} from '@context/RouteBackContext';
import {ProductsContext} from '@context/ProductsContext';
import {CategoryContext} from '@context/CategoryContext';
import {CurrenciesContext} from '@context/CurrencyContext';
import {UsuarioContext} from '@context/UsuarioContext';
import {RatingsContext} from '@context/RatingContext';
import {SedeContext} from '@context/SedeContext';

const PAGE_WIDTH = Dimensions.get('screen').width;

//tags.ProductDetailScreen.btnagregar != '' ? tags.ProductDetailScreen.btnagregar :
export default function VistaProducto(props) {
  const {tags} = useContext(ScreentagContext);
  const [loginUser] = useContext(UsuarioContext);
  const {isLoadingRatings, createRatings, ratings, getRatings} = useContext(
    RatingsContext,
  );
  const [GlobalLanguage] = useContext(GlobalLanguageContext);
  const {country} = useContext(CountryContext);
  const [Product, setProduct] = useContext(ProductContext);
  const {
    addItemtoCart,
    updateItemtoCart,
    ShoppingCart,
    setafiliateCart,
    removeAllItemstoCart,
    afiliateCart,
    rutaCart,
    editable,
    seteditable,
  } = useContext(ShoppingCartContext);
  const [cementery] = useContext(CementeryContext);
  const {Cementeries} = useContext(CementeriesContext);
  const [sede, setSede] = useContext(SedeContext);
  const {RouteBack, setRouteBack} = useContext(RouteBackContext);
  const {ProductMultimedia, isLoadingProducts} = useContext(ProductsContext);
  const {Currency, getCurrency} = useContext(CurrenciesContext);
  const [customModal, setCustomModal] = useState(false);
  const [ratingModal, setRatingmodal] = useState(false);
  const [imagenModal, setimagenModal] = useState(null);
  const [itemModal, setitemModal] = useState(null);
  const [visible, setIsVisible] = useState(false);
  const [ProductImages, setProductImages] = useState([]);
  const [ProductVideos, setProductVideos] = useState([]);
  const [financing, setFinancing] = useState([
    {number_of_installments: '0', percentage: '100'},
  ]);
  const {Category} = useContext(CategoryContext);
  const [checked, setChecked] = useState(1);
  const [cuotas, setCuotas] = useState(0);
  const [porcent, setPorcent] = useState(1);
  const isFocused = useIsFocused();
  const getInitialData = async () => {};

  const progressValue = useSharedValue(0);
  const baseOptions = {
    vertical: false,
    width: PAGE_WIDTH * 0.4,
    height: PAGE_WIDTH / 2.5,
  };
  // Cargar informacion de la vista
  useEffect(() => {
    console.log('ITEM EDITABLE?', editable);
    if (editable) {
      setCantProductos(Product.cantidad);
    } else {
      setCantProductos(1);
    }
    console.log('ESTE PRODUCTO ESCOGIDO', Product);
    if (Product.type == '2') {
      let financingGroup = financing;
      console.log('FINANCIAMIENTO A VER', financing, Product.financing);
      if (financingGroup.includes(Product.financing)) {
        console.log('existe');
      } else {
        financingGroup.push(Product.financing);
      }
      console.log('GRUPO DE FINANCIERO', financingGroup);
      setFinancing(financingGroup);
    }
    console.log(rutaCart);
    //Vacia Carrito si no viene de Afiliado
    if (rutaCart == false) {
      if (ShoppingCart.length >= 1) {
        if (sede.idAffiliate != afiliateCart._id) {
          console.log('LIMPIE CARRITO EN PRODUCTOS');
          setafiliateCart({});
          removeAllItemstoCart();
        }
      }
    }
    if (ProductMultimedia.length >= 1) {
      divideMultimedia();
    }
    //Consultar Moneda
    getCurrency({_id: sede.idAffiliate});
    // Actualizar valores de la vista
    ratings.map(prod => {
      if (prod._id == Product._id) {
        //F
        setPropsVista({
          rating: {
            valor: prod.ranking,
            label: 'Rating',
          },
        });
      }
    });
    if (isFocused) {
      getInitialData();
      console.log('isFocused in Product Detail');
    }
    //props, isFocused
  }, []);

  const toggleDialog = () => {
    setRatingmodal(true);
  };

  function divideMultimedia() {
    let extension = [];
    let imagenes = [];
    let imagen = {};
    let videos = [];
    ProductMultimedia.map(prod => {
      extension = prod.name.split('.');
      if (IMGEXTENSIONS.includes(extension[extension.length - 1])) {
        imagenes.push({uri: prod.name});
        imagen = prod;
      } else {
        videos.push(prod);
      }
    });
    videos.push(imagen);
    console.log(videos);
    setProductImages(imagenes);
    setProductVideos(videos);
  }

  // Variables de la vista
  const [propsVista, setPropsVista] = useState({
    rating: {
      valor: 0,
      label: 'Rating',
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
    let extension = multimedia.name.split('.');
    if (IMGEXTENSIONS.includes(extension[extension.length - 1])) {
      setIsVisible(true);
    } else {
      setCustomModal(true);
      setimagenModal(multimedia.name);
      setitemModal(multimedia);
    }
  }

  const renderTruncatedFooter = handlePress => {
    return (
      <Text
        style={{color: color.PRINCIPALCOLOR, marginTop: 5}}
        onPress={handlePress}
      >
        Read more
      </Text>
    );
  };

  const renderRevealedFooter = handlePress => {
    return (
      <Text
        style={{color: color.PRINCIPALCOLOR, marginTop: 5}}
        onPress={handlePress}
      >
        Show less
      </Text>
    );
  };

  const handleTextReady = () => {
    // ...
  };
  return (
    <SafeAreaView style={mainStyles.containers}>
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
                //Product.price.includes(',') ? formatAmount(parseFloat(Product.price.replace(/,/g, ''))) : formatAmount(parseFloat(Product.price))
                titulo={
                  Product.type == '2'
                    ? Product.currency.symbol +
                      '.' +
                      (Product.price.includes(',')
                        ? formatAmount(
                            parseFloat(Product.price.replace(/,/g, '')) *
                              porcent,
                          )
                        : formatAmount(parseFloat(Product.price) * porcent))
                    : Product.currency.symbol +
                      '.' +
                      (Product.price.includes(',')
                        ? formatAmount(
                            parseFloat(Product.price.replace(/,/g, '')),
                          )
                        : formatAmount(parseFloat(Product.price)))
                }
                subtitulo={
                  Product.type == '2'
                    ? tags.ProductDetailScreen.precio != ''
                      ? tags.ProductDetailScreen.precio + ' Financiado'
                      : 'Precio Financiado'
                    : tags.ProductDetailScreen.precio != ''
                    ? tags.ProductDetailScreen.precio
                    : 'Precio'
                }
                onPress={() => {}}
              />
              <View style={informationIconStyles.verticleLine} />
              <InformationIcon
                tipo="ionicons"
                image="location-pin"
                titulo={sede.name}
                subtitulo={
                  tags.ProductDetailScreen.sede != ''
                    ? tags.ProductDetailScreen.sede
                    : 'Sede'
                }
              />
              <View style={informationIconStyles.verticleLine} />
              <InformationIcon
                transparent={true}
                tipo="ant-design"
                image="star"
                titulo={propsVista.rating.valor}
                subtitulo={propsVista.rating.label}
                onPress={() => {
                  toggleDialog();
                }}
              />
            </View>
          </View>

          <View style={styles.detalleProd}>
            <Text style={styles.titulo2}>
              {tags.ProductDetailScreen.detalle != ''
                ? tags.ProductDetailScreen.detalle
                : 'Detalle'}{' '}
            </Text>
            <ReadMore
              numberOfLines={3}
              renderTruncatedFooter={renderTruncatedFooter}
              renderRevealedFooter={renderRevealedFooter}
              onReady={handleTextReady}
            >
              <Text
                style={styles.descDato}
                //numberOfLines={10}
              >
                {Product.description}
              </Text>
            </ReadMore>
            <View style={styles.multimedia}>
              {isLoadingProducts ? (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '10%',
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
              ) : ProductMultimedia.length >= 1 ? (
                <Carousel
                  {...baseOptions}
                  style={{width: '100%', marginLeft: '5%'}}
                  loop
                  autoPlay={true}
                  autoPlayInterval={2000}
                  data={ProductVideos}
                  renderItem={({item}) => (
                    <CardMultimedia
                      style={styles.imgDetalle}
                      urlImagen={item}
                      onPressMultimedia={() => {
                        console.log(item);
                        abrirModal(item);
                      }}
                      textStyle={styles.imgTitulo}
                    />
                  )}
                />
              ) : (
                <View style={styles.noPromoView}>
                  <Text style={styles.promoText}>No Multimedia</Text>
                </View>
              )}
              {ProductImages.length >= 1 ? (
                <ImageView
                  images={ProductImages}
                  imageIndex={0}
                  visible={visible}
                  onRequestClose={() => setIsVisible(false)}
                />
              ) : null}
              {Product.type == '2' ? (
                <View>
                  <Text style={styles.titulo2}>Financiamiento</Text>
                  {financing.map((financiamiento, i) => {
                    return (
                      <CheckBox
                        key={i}
                        title={
                          `${financiamiento.percentage} % -> ` +
                          (tags.ProductDetailScreen.precio != ''
                            ? tags.ProductDetailScreen.precio + ': '
                            : 'Precio: ') +
                          (Product.currency.symbol +
                            '.' +
                            (Product.price.includes(',')
                              ? formatAmount(
                                  parseFloat(Product.price.replace(/,/g, '')) *
                                    (parseInt(financiamiento.percentage) / 100),
                                )
                              : formatAmount(
                                  parseFloat(Product.price) *
                                    (parseInt(financiamiento.percentage) / 100),
                                )))
                        }
                        containerStyle={styles.container}
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                        checked={checked === i + 1}
                        onPress={() => {
                          // setsede(sede);
                          if (checked == 1) {
                            setCuotas(financiamiento.number_of_installments);
                          }
                          setPorcent(parseInt(financiamiento.percentage) / 100);
                          setChecked(i + 1);
                        }}
                      />
                    );
                  })}
                  {checked == 2 ? (
                    <MyTextInput
                      keyboardType="number"
                      placeholder="cuotas"
                      image="contrast"
                      value={cuotas}
                      onChangeText={cuotas => {
                        if (
                          cuotas <= Product.financing.number_of_installments
                        ) {
                          setCuotas(cuotas);
                        } else {
                          Snackbar.show({
                            text: `Cantidad maxima de cuotas es: ${Product.financing.number_of_installments}`,
                            duration: Snackbar.LENGTH_LONG,
                          });
                          setCuotas(Product.financing.number_of_installments);
                        }
                      }}
                    />
                  ) : null}
                </View>
              ) : null}
              <View style={styles.numCant}>
                <TouchableOpacity
                  style={styles.btnCant}
                  onPress={() => {
                    if (cantProductos <= 1) {
                      console.log('no puede ser 0');
                    } else {
                      resta();
                    }
                  }}
                >
                  <Text style={styles.txtCantBtn}> - </Text>
                </TouchableOpacity>
                <Text style={styles.txtCant}> {cantProductos} </Text>
                <TouchableOpacity
                  style={styles.btnCant}
                  onPress={() => {
                    suma();
                  }}
                >
                  <Text style={styles.txtCantBtn}> + </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.btnAgregar}
                onPress={() => itemToCart(Product, 'Payments')}
              >
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
        {ratingModal == false ? null : (
          <RankingModal
            customModal={ratingModal}
            tags={tags.sedeSelectScreen}
            setCustomModal={setRatingmodal}
            user={loginUser.usuario}
            prod={Product}
            calificar={createRatings}
            getRatings={getRatings}
            idLang={GlobalLanguage._id}
            idPais={country.value}
          />
        )}
      </View>
    </SafeAreaView>
  );
  function goToScreen(routeName) {
    seteditable(false);
    props.navigation.navigate(routeName);
  }

  function itemToCart(producto, routeName) {
    let item;
    if (producto.type == '2' && porcent < 1) {
      item = {
        ...producto,
        cantidad: cantProductos,
        moneda: producto.currency.symbol,
        financing: {
          number_of_installments: `${cuotas}`,
          percentage: `${producto.financing.percentage}`,
        },
        priceFinancing: Product.price.includes(',')
          ? formatAmount(
              parseFloat(Product.price.replace(/,/g, '')) *
                (parseInt(producto.financing.percentage) / 100),
            )
          : formatAmount(
              parseFloat(Product.price) *
                (parseInt(producto.financing.percentage) / 100),
            ),
      };
    } else if (producto.type == '2' && porcent == 1) {
      item = {
        ...producto,
        cantidad: cantProductos,
        moneda: producto.currency.symbol,
        type: '1',
      };
      delete item.financing;
    } else {
      item = {
        ...producto,
        cantidad: cantProductos,
        moneda: producto.currency.symbol,
      };
      delete item.financing;
    }

    console.log('ITEM A AGREGAR O EDITAR EN EL CARRITO', item);
    if (rutaCart) {
      setafiliateCart(cementery);
    } else {
      Cementeries.forEach(Afiliado => {
        if (sede.idAffiliate == Afiliado._id) {
          setafiliateCart(Afiliado);
        }
      });
    }
    console.log('SERA EDITADO?', editable);
    if (editable) {
      updateItemtoCart(item);
    } else {
      addItemtoCart(item);
    }

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
    textAlign: 'justify',
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
    color: color.PRINCIPALCOLOR,
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
