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
import {Image, FAB, CheckBox, Divider} from '@rneui/themed';
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
  const {
    isLoadingRatings,
    createRatings,
    ratings,
    ratingsComments,
    getRatings,
    findProdSell,
    productoVendido,
    getRatingsComments,
  } = useContext(RatingsContext);
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
  const [engancheReal, setengancheReal] = useState(0);
  const [financing, setFinancing] = useState([
    {
      number_of_installments: '0',
      initial_percentage: '0',
      final_percentage: '100',
    },
  ]);
  const {Category} = useContext(CategoryContext);
  const [checked, setChecked] = useState(1);
  const [cuotas, setCuotas] = useState(0);
  const [valorCuotas, setvalorCuotas] = useState(0);
  const [cuotasMax, setcuotasMax] = useState(0);
  const [porcent, setPorcent] = useState(1);
  const [realPercent, setrealPercent] = useState(100);
  const isFocused = useIsFocused();
  const getInitialData = async () => {};
  const [checked1, setchecked1] = useState(true);
  const [checked2, setchecked2] = useState(false);
  const [visibleMethod, setvisibleMethod] = useState(false);

  const progressValue = useSharedValue(0);
  const baseOptions = {
    vertical: false,
    width: PAGE_WIDTH * 0.4,
    height: PAGE_WIDTH / 2.5,
  };
  // Cargar informacion de la vista
  useEffect(() => {
    console.log('Producto?', Product);
    (async () => {
      await findProdSell(
        GlobalLanguage._id,
        loginUser.usuario._id,
        Product._id,
      );
      console.log('SE VENDIO EL PRODUCTO?', productoVendido);
      if (!productoVendido) {
        await getRatingsComments(
          GlobalLanguage._id,
          country.value,
          Product._id,
        );
      }
      await getRatingsComments(GlobalLanguage._id, country.value, Product._id);
    })();

    console.log('ITEM EDITABLE?', editable);
    if (editable) {
      setCantProductos(Product.cantidad);
    } else {
      setCantProductos(1);
    }
    console.log(
      'ESTE PRODUCTO ESCOGIDO',
      Product,
      'CON el PRECIO',
      Product.price,
    );
    if (Product.type == '2') {
      let financingGroup = financing;
      console.log('FINANCIAMIENTO A VER', financing, Product.financing);
      if (financingGroup.includes(Product.financing[0])) {
        console.log('existe');
      } else {
        financingGroup = Product.financing;
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
                    ? Product.currency.code +
                      '.' +
                      (Product.price.includes(',')
                        ? formatAmount(
                            (parseFloat(Product.price.replace(/,/g, '')) *
                              100) /
                              100,
                          )
                        : formatAmount((parseFloat(Product.price) * 100) / 100))
                    : Product.currency.code +
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
                      ? tags.ProductDetailScreen.precio +
                        ' ' +
                        (tags.ProductDetailScreen.financing != ''
                          ? tags.ProductDetailScreen.financing
                          : ' Financiado')
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
              <Divider />
              <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                <CheckBox
                  title={
                    tags.ProductDetailScreen.cash != ''
                      ? tags.ProductDetailScreen.cash
                      : 'Cash'
                  }
                  containerStyle={styles.container}
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  checked={checked1}
                  onPress={() => {
                    setchecked2(!checked2);
                    setchecked1(!checked1);
                    setvisibleMethod(false);
                    setrealPercent(100);
                    setPorcent(1);
                    setCuotas(0);
                    if (Product.price.includes(',')) {
                      setengancheReal(
                        parseFloat(Product.price.replace(/,/g, '')),
                      );
                    } else {
                      setengancheReal(parseFloat(Product.price));
                    }
                  }}
                />
                <CheckBox
                  title={
                    tags.ProductDetailScreen.financing != ''
                      ? tags.ProductDetailScreen.financing
                      : 'FINANCIAMIENTO'
                  }
                  containerStyle={styles.container}
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  checked={checked2}
                  onPress={() => {
                    setchecked2(!checked2);
                    setchecked1(!checked1);
                    setvisibleMethod(true);
                    if (Product.price.includes(',')) {
                      setengancheReal(
                        parseFloat(Product.price.replace(/,/g, '')),
                      );
                    } else {
                      setengancheReal(parseFloat(Product.price));
                    }
                    setCuotas(0);
                  }}
                />
              </View>
              <Divider />
              {visibleMethod ? (
                Product.type == '2' ? (
                  <View>
                    <Text style={styles.titulo2}>
                      {tags.ProductDetailScreen.financing != ''
                        ? tags.ProductDetailScreen.financing
                        : 'FINANCIAMIENTO'}
                    </Text>
                    <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                      <View style={{width: '60%', marginHorizontal: '3%'}}>
                        <MyTextInput
                          keyboardType="numeric"
                          placeholder={
                            tags.ProductDetailScreen.enganche != ''
                              ? tags.ProductDetailScreen.enganche
                              : 'Enganche'
                          }
                          image="percent-outline"
                          value={realPercent}
                          onChangeText={porcentaje => {
                            financing.forEach(financia => {
                              if (
                                parseInt(financia.initial_percentage) <=
                                  parseInt(porcentaje) &&
                                parseInt(porcentaje) <=
                                  parseInt(financia.final_percentage)
                              ) {
                                console.log(
                                  'PRUEBA EN IF DE PORCENTAJE',
                                  porcentaje,
                                  financia.initial_percentage,
                                  financia.final_percentage,
                                  parseInt(financia.number_of_installments),
                                );
                                setrealPercent(parseInt(porcentaje));
                                setPorcent(parseInt(porcentaje) / 100);
                                setcuotasMax(financia.number_of_installments);
                              } else if (porcentaje == '') {
                                setrealPercent(100);
                                setPorcent(1);
                              }
                            });
                            if (Product.price.includes(',')) {
                              setengancheReal(
                                (parseFloat(Product.price.replace(/,/g, '')) *
                                  parseInt(porcentaje)) /
                                  100,
                              );
                              100;
                            } else {
                              setengancheReal(
                                (parseFloat(Product.price) *
                                  parseInt(porcentaje)) /
                                  100,
                              );
                            }
                          }}
                          onEndEditing={porcentaje => {
                            financing.forEach(financia => {
                              if (
                                parseInt(financia.initial_percentage) <=
                                  parseInt(porcentaje.nativeEvent.text) &&
                                parseInt(porcentaje.nativeEvent.text) <=
                                  parseInt(financia.final_percentage)
                              ) {
                                console.log(
                                  'PRUEBA EN IF DE PORCENTAJE',
                                  porcentaje.nativeEvent.text,
                                  financia.initial_percentage,
                                  financia.final_percentage,
                                  parseInt(financia.number_of_installments),
                                );
                                setrealPercent(porcentaje.nativeEvent.text);
                                setPorcent(
                                  parseInt(porcentaje.nativeEvent.text) / 100,
                                );
                                console.log('PORCENT?', porcent);
                                setcuotasMax(financia.number_of_installments);
                              } else if (porcentaje.nativeEvent.text == '') {
                                setrealPercent(100);
                                setPorcent(1);
                              }
                            });
                          }}
                        />
                      </View>
                      <View style={{width: '40%'}}>
                        <Text style={styles.subtitulos}>
                          {Product.type == '2'
                            ? Product.currency.code +
                              '.' +
                              (Product.price.includes(',')
                                ? formatAmount(
                                    (parseFloat(
                                      Product.price.replace(/,/g, ''),
                                    ) *
                                      parseInt(realPercent)) /
                                      100,
                                  )
                                : formatAmount(
                                    (parseFloat(Product.price) *
                                      parseInt(realPercent)) /
                                      100,
                                  ))
                            : Product.currency.code +
                              '.' +
                              (Product.price.includes(',')
                                ? formatAmount(
                                    parseFloat(Product.price.replace(/,/g, '')),
                                  )
                                : formatAmount(parseFloat(Product.price)))}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.promoText}>
                      {tags.ProductDetailScreen.cuotas != ''
                        ? tags.ProductDetailScreen.cuotas
                        : 'Cuotas'}
                    </Text>
                    <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                      <View style={{width: '60%', marginHorizontal: '3%'}}>
                        <MyTextInput
                          keyboardType="numeric"
                          placeholder={
                            tags.ProductDetailScreen.cuotas != ''
                              ? tags.ProductDetailScreen.cuotas
                              : 'Cuotas'
                          }
                          image="contrast"
                          value={cuotas}
                          onChangeText={cuotas => {
                            let cuotasMonto;
                            console.log('PORCENT?', porcent);
                            console.log(cuotas, parseInt(cuotasMax));
                            if (cuotas <= parseInt(cuotasMax)) {
                              setCuotas(cuotas);
                            } else {
                              Snackbar.show({
                                text: `${
                                  tags.ProductDetailScreen.txtCuotasMsj != ''
                                    ? tags.ProductDetailScreen.txtCuotasMsj
                                    : 'Cantidad maxima de cuotas es:'
                                } ${cuotasMax}`,
                                duration: Snackbar.LENGTH_LONG,
                              });
                              setCuotas(cuotasMax);
                            }
                            cuotasMonto = Product.price.includes(',')
                              ? (parseFloat(Product.price.replace(/,/g, '')) -
                                  engancheReal) /
                                (parseInt(cuotas) == 0
                                  ? 1
                                  : parseInt(cuotas))
                              : (parseFloat(Product.price) - engancheReal) /
                                (parseInt(cuotas) == 0
                                  ? 1
                                  : parseInt(cuotas));

                            setvalorCuotas(cuotasMonto);
                          }}
                          onEndEditing={cuotas => {
                            let cuotasMonto;
                            if (
                              parseInt(cuotas.nativeEvent.text) <=
                              parseInt(cuotasMax)
                            ) {
                              setCuotas(cuotas.nativeEvent.text);
                            } else {
                              Snackbar.show({
                                text: `${
                                  tags.ProductDetailScreen.txtCuotasMsj != ''
                                    ? tags.ProductDetailScreen.txtCuotasMsj
                                    : 'Cantidad maxima de cuotas es:'
                                } ${cuotasMax}`,
                                duration: Snackbar.LENGTH_LONG,
                              });
                              setCuotas(cuotasMax);
                            }
                            cuotasMonto = Product.price.includes(',')
                              ? (parseFloat(Product.price.replace(/,/g, '')) -
                                  engancheReal) /
                                (parseInt(cuotas.nativeEvent.text) == 0
                                  ? 1
                                  : parseInt(cuotas.nativeEvent.text))
                              : (parseFloat(Product.price) - engancheReal) /
                                (parseInt(cuotas.nativeEvent.text) == 0
                                  ? 1
                                  : parseInt(cuotas.nativeEvent.text));

                            console.log('CUOTAS NAVIE EVENT',cuotas.nativeEvent.text)
                          }}
                        />
                      </View>
                      <View style={{width: '40%'}}>
                        <Text style={styles.subtitulos}>
                          {cuotas == 0
                            ? 'Agregue cuotas'
                            : Product.currency.code +
                              '.' +
                              (Product.price.includes(',')
                                ? formatAmount(
                                    (parseFloat(
                                      Product.price.replace(/,/g, ''),
                                    ) -
                                      engancheReal) /
                                      (cuotas == 0 ? 1 : cuotas),
                                  )
                                : Product.currency.code +
                                  '.' +
                                  formatAmount(
                                    (parseFloat(Product.price) - engancheReal) /
                                      (cuotas == 0 ? 1 : cuotas),
                                  ))}
                        </Text>
                      </View>
                    </View>
                  </View>
                ) : null
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
            ratingsComments={ratingsComments}
            productoVendido={productoVendido}
            noComments={
              tags.ProductDetailScreen.txtComments != ''
                ? tags.ProductDetailScreen.txtComments
                : 'No hay comentarios aun'
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
  function goToScreen(routeName) {
    seteditable(false);
    props.navigation.navigate(routeName);
  }
  function calculoTienda() {
    console.log('CALCULOS');
  }
  function itemToCart(producto, routeName) {
    let item;
    if (producto.type == '2' && porcent < 1) {
      item = {
        ...producto,
        cantidad: cantProductos,
        moneda: producto.currency.code,
        financing: {
          number_of_installments: `${cuotas}`,
          percentage: `${realPercent}`,
        },
        summaryFinancing: {
          value_of_installment: valorCuotas,
          precio_sin_enganche: Product.price.includes(',')
            ? parseFloat(Product.price.replace(/,/g, '')) -
              parseFloat(Product.price.replace(/,/g, '')) *
                (parseInt(realPercent) / 100)
            : parseFloat(Product.price) -
              parseFloat(Product.price) * (parseInt(realPercent) / 100),
        },
        priceFinancing: Product.price.includes(',')
          ? formatAmount(
              parseFloat(Product.price.replace(/,/g, '')) *
                (parseInt(realPercent) / 100),
            )
          : formatAmount(
              parseFloat(Product.price) * (parseInt(realPercent) / 100),
            ),
      };
    } else if (producto.type == '2' && porcent == 1) {
      item = {
        ...producto,
        cantidad: cantProductos,
        moneda: producto.currency.code,
        type: '1',
      };
      delete item.financing;
    } else {
      item = {
        ...producto,
        cantidad: cantProductos,
        moneda: producto.currency.code,
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
    if (porcent == 1 && cuotas == 0 && checked2 == true) {
      Snackbar.show({
        text: `Ingrese enganche, hasta maximo de 99%`,
        duration: Snackbar.LENGTH_LONG,
      });
    } else {
      if (
        (cuotas == 0 && checked2 == true) ||
        (cuotas == '' && checked2 == true)
      ) {
        Snackbar.show({
          text: `Ingrese Cuotas hasta un maximo de ${cuotasMax}`,
          duration: Snackbar.LENGTH_LONG,
        });
      } else {
        if (editable) {
          updateItemtoCart(item, calculoTienda);
        } else {
          addItemtoCart(item);
        }
        goToScreen(routeName);
      }
    }
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
  subtitulos: {
    fontWeight: '500',
    fontSize: 18,
    textAlign: 'left',
    marginTop: '14%',
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
