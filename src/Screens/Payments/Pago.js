import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  Modal,
  Alert,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {Icon, FAB, ListItem, Button, Divider} from '@rneui/themed';
import Snackbar from 'react-native-snackbar';
import Feather from 'react-native-vector-icons/Feather';
import {WebView} from 'react-native-webview';
//Recarga la screen
import {useIsFocused} from '@react-navigation/native';
//URL de server
import {BASE_URL_IMG, formatAmount} from '@utils/config';
//Componentes
import CardProductoVenta from '@Components/CardSellProduct/';
import CardProductoCarrito from '../../Components/common/CardProductoCarrito';
import ToolBar from '@Components/common/toolBar';
import LargeButton from '@Components/common/largeButton';
import PurchaseModal from '@Components/PurchaseModal/PurchaseModal';
import PaymentModalList from '../../Components/common/PaymentMethodListModal';
import MyButton from '@Components/common/MyButton';
import MyButtonImage from '@Components/common/MyButtonImage';
import LinkModal from '@Components/LinkModal/LinkModal';
//Contextos
import {ScreentagContext} from '@context/ScreentagsContext';
import {ProductContext} from '@context/ProductContext';
import {ShoppingCartContext} from '@context/ShoppingCartContext';
import {UsuarioContext} from '@context/UsuarioContext';
import {GlobalLanguageContext} from '@context/LanguageContext';
import {CurrenciesContext} from '@context/CurrencyContext';
import {RouteBackContext} from '@context/RouteBackContext';
import {SedeContext} from '@context/SedeContext';
import {CategoriesContext} from '@context/CategoriesContext';
import {CategoryContext} from '@context/CategoryContext';
import {SedesContext} from '@context/SedesContext';
import {ProductsContext} from '@context/ProductsContext';
import {PromotionContext} from '../../context/PromotionContext';
import {CreditCardContext} from '@context/CreditCardContext';
//Estilos Generales
import color from '@styles/colors';
import {
  mainStyles,
  CementeryScreen,
  informationIconStyles,
} from '@styles/stylesGeneral';

//tags.PaymentScreen.agregar != '' ? tags.PaymentScreen.agregar :
export default function VistaPago(props) {
  const [loginUser] = useContext(UsuarioContext);
  const {tags} = useContext(ScreentagContext);
  const {
    creditCards,
    creditCard,
    updateCard,
    deleteCard,
    isLoadingCreditCards,
  } = useContext(CreditCardContext);
  const {promotionList, validPromo, setpromotionList} = useContext(
    PromotionContext,
  );
  const [Product, setProduct] = useContext(ProductContext);
  const [visible, setVisible] = useState(false);
  const [visiblePago, setVisiblePago] = useState(false);
  const [GlobalLanguage] = useContext(GlobalLanguageContext);
  const [sede, setSede] = useContext(SedeContext);
  const {Currency, getCurrency} = useContext(CurrenciesContext);
  const {categories} = useContext(CategoriesContext);
  const {setCategory} = useContext(CategoryContext);
  const {getSedeDirect} = useContext(SedesContext);
  const {getMultimediabyProduct} = useContext(ProductsContext);
  const [formaPago, setformaPago] = useState('Tarjeta de Credito');
  const [formasPago, setformasPago] = useState([
    {id: 1, name: 'Tarjeta de Credito'},
    {id: 2, name: 'Paypal'},
    {id: 3, name: 'Link de Pago'},
  ]);
  const [opcionPago, setopcionPago] = useState(1);

  const {
    ShoppingCart,
    removeItemtoCart,
    recipe,
    sendShoppingCartSell,
    isLoadingCart,
    setisLoadingCart,
    updateItemtoCart,
    seteditable,
    sendPaypalData,
    linkPago,
    tokenPago,
    flagPaypal,
    getPaypalAnswer,
    generaLinkPago,
  } = useContext(ShoppingCartContext);
  const {RouteBack} = useContext(RouteBackContext);
  //Inicia para PayPal
  const [showGateway, setShowGateway] = useState(false);
  const [linkFlagModal, setLinkFlagModal] = useState(false);
  const [linkCart, setLinkCart] = useState(null);
  const [prog, setProg] = useState(false);
  const [progClr, setProgClr] = useState('#000');
  //Finaliza para PayPal
  const isFocused = useIsFocused();
  const getInitialData = async () => {};

  // Cargar informacion de la vista
  useEffect(() => {
    //setisLoadingCart(false)
    console.log(promotionList, validPromo);
    console.log('TAGS', tags.PaymentScreen);
    // Productos del carrito
    console.log(ShoppingCart, 'DENTRO DE VISTA COMPRAR');
    calculoTienda(ShoppingCart);
    if (isFocused) {
      getInitialData();
      console.log('isFocused Payment');
    }
    //props, isFocused
  }, [props, isFocused]);

  // Variables del carrito de compras
  const [productosCarrito, setProductosCarrito] = useState([]);
  const [valoresVenta, setValoresVenta] = useState({
    subTotal: 0,
    entrega: 0,
    total: 0,
  });
  const toggleLinkDialog = () => {
    setLinkFlagModal(true);
  };
  const toggleDialog = () => {
    setVisible(true);
  };

  const togglePaymentDialog = () => {
    setVisiblePago(true);
  };

  function terminarCompra() {
    console.log(opcionPago, formaPago);
    switch (opcionPago) {
      case 1:
        realizarPago();
        break;
      case 2:
        pagarPaypal();
        break;
      case 3:
        crearLink();
        break;
      default:
        console.log('no hay opcion para esta forma de pago');
        break;
    }
  }

  function calculoTienda(ShoppingCart) {
    let subtotal = 0;
    let descPercent = 0.0;
    let descuento = 0;
    let sendProds = [];
    ShoppingCart.forEach(item => {
      let precioItem;
      if (item.type == '2') {
        if (item.priceFinancing.includes(',')) {
          precioItem = item.priceFinancing.replace(/,/g, '');
        } else {
          precioItem = item.priceFinancing;
        }
      } else {
        if (item.price.includes(',')) {
          precioItem = item.price.replace(/,/g, '');
        } else {
          precioItem = item.price;
        }
      }

      console.log('valor item', precioItem, parseFloat(precioItem));
      subtotal = subtotal + item.cantidad * parseFloat(precioItem);
      if (item.type == '2') {
        sendProds.push({
          idProduct: item._id,
          quantity: item.cantidad,
          paid_value: item.cantidad * parseFloat(precioItem),
          financing: item.financing,
        });
      } else {
        sendProds.push({
          idProduct: item._id,
          quantity: item.cantidad,
          paid_value: item.cantidad * parseFloat(precioItem),
        });
      }
    });
    if (promotionList.length >= 1) {
      if (validPromo.type == 'V' || validPromo.type == 'v') {
        descuento = subtotal * (parseFloat(validPromo.discount) / 100);
        console.log('descuento?', subtotal, descuento);
      }
    }
    //Consultar Moneda
    getCurrency({_id: sede.idAffiliate});
    console.log('DATOS DE MONEDa', Currency);
    // Calcular valores de la vista
    setValoresVenta({
      subTotal: formatAmount(subtotal),
      entrega: formatAmount(descuento),
      total: formatAmount(subtotal - descuento),
    });
    console.log('PRODS A ENVIAR', sendProds);
    setProductosCarrito(sendProds);
  }
  const [cantProductos, setCantProductos] = useState(1);

  function suma(prod) {
    let aumenta = prod.cantidad;
    let producto = {
      ...prod,
      cantidad: prod.cantidad + 1,
    };
    console.log(aumenta, 'aumenta');
    setCantProductos(aumenta + 1);
    updateItemtoCart(producto, calculoTienda);
  }

  function resta(prod) {
    let disminuye = prod.cantidad;
    let producto = {
      ...prod,
      cantidad: prod.cantidad - 1,
    };
    console.log(disminuye, 'disminuye');
    setCantProductos(disminuye - 1);
    updateItemtoCart(producto, calculoTienda);
  }
  return (
    <SafeAreaView style={mainStyles.containers}>
      {isLoadingCart ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '50%',
          }}
        >
          <FAB
            loading
            color={color.PRINCIPALCOLOR}
            visible={isLoadingCart}
            icon={{name: 'add', color: 'white'}}
            size="small"
          />
        </View>
      ) : isLoadingCreditCards ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '50%',
          }}
        >
          <FAB
            loading
            color={color.PRINCIPALCOLOR}
            visible={isLoadingCreditCards}
            icon={{name: 'add', color: 'white'}}
            size="small"
          />
        </View>
      ) : (
        <View style={styles.vista}>
          <View
            style={{
              backgroundColor: color.PRINCIPALCOLOR,
            }}
          >
            <ToolBar
              titulo={
                tags.PaymentScreen.compra != ''
                  ? tags.PaymentScreen.compra
                  : 'Compra'
              }
              onPressLeft={() => {
                goToScreen('Productos');
                seteditable(false);
              }}
              iconLeft={true}
              style={{
                backgroundColor: color.PRINCIPALCOLOR,
                borderBottomColor: color.PRINCIPALCOLOR,
                borderBottomWidth: 0.5,
              }}
            />
            <View style={styles.subHeader}>
              <Text style={{...styles.txtTituloHeader, fontWeight: '600'}}>
                Confirma tu Compra
              </Text>
              <Text style={styles.valorCuentaHeader}>
                Total: {''}
                <Text style={{color: color.PRINCIPALCOLOR}}>
                  {' '}
                  {Currency.code + '.' + valoresVenta.total}
                </Text>
              </Text>
            </View>
          </View>
          <ScrollView
            style={{
              backgroundColor: color.INPUTCOLOR,
            }}
          >
            <>
              <Text style={styles.sectionHeader}>
                1. Productos{' '}
                {'(' +
                  ShoppingCart.length +
                  ' Producto' +
                  (ShoppingCart.length <= 1 ? '' : 's') +
                  ')'}
              </Text>
              <ScrollView style={styles.productos}>
                {ShoppingCart.map((prod, key) => {
                  return (
                    <ListItem.Swipeable
                      key={key}
                      leftContent={() => (
                        <Button
                          title="Info"
                          onPress={() => editarItem(prod)}
                          icon={{name: 'info', color: 'white'}}
                          buttonStyle={{
                            minHeight: '100%',
                            backgroundColor: color.PRINCIPALCOLOR,
                          }}
                        />
                      )}
                      rightContent={() => (
                        <Button
                          title={
                            tags.PaymentScreen.deleteBtn != ''
                              ? tags.PaymentScreen.deleteBtn
                              : 'Delete'
                          }
                          onPress={() => borrarItem(prod)}
                          icon={{name: 'delete', color: 'white'}}
                          buttonStyle={{
                            minHeight: '100%',
                            backgroundColor: 'red',
                          }}
                        />
                      )}
                    >
                      <ListItem.Content>
                        <View
                          style={{
                            height: 175,
                          }}
                        >
                          <CardProductoCarrito
                            key={key}
                            urlImagen={prod.principalImage}
                            producto={prod}
                            suma={suma}
                            resta={resta}
                            cantProductos={cantProductos}
                            titulo={prod.name}
                            descripcion={prod.description}
                            moneda={
                              prod.moneda
                                ? prod.moneda
                                : prod.currency.code
                                ? prod.currency.code
                                : '$'
                            }
                            precio={
                              prod.type == '2'
                                ? prod.priceFinancing.includes(',')
                                  ? formatAmount(
                                      parseFloat(
                                        prod.priceFinancing.replace(/,/g, ''),
                                      ),
                                    )
                                  : formatAmount(
                                      parseFloat(prod.priceFinancing),
                                    )
                                : prod.price.includes(',')
                                ? formatAmount(
                                    parseFloat(prod.price.replace(/,/g, '')),
                                  )
                                : formatAmount(parseFloat(prod.price))
                            }
                            cantidad={prod.cantidad}
                          />
                          <Divider orientation="vertical" />
                        </View>
                      </ListItem.Content>
                    </ListItem.Swipeable>
                  );
                })}
              </ScrollView>
            </>
            <Text style={styles.sectionHeader}>2. Formas de Pago</Text>
            <View style={styles.whiteSection}>
              <View style={styles.espacio}>
                <View style={styles.txtForm}>
                  <Text style={{fontSize: 15, fontWeight: '500'}}>
                    {formaPago}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.btnForm}
                  onPress={togglePaymentDialog}
                >
                  <Text style={styles.txtChangeForm}>Cambiar</Text>
                </TouchableOpacity>
              </View>
              {opcionPago == 1 ? (
                creditCards.length >= 1 ? (
                  <View>
                    <View
                      style={{
                        alignItems: 'center',
                      }}
                    >
                      <Text style={{fontSize: 15, fontWeight: '500'}}>
                        Seleccione Tarjeta de Credito
                      </Text>
                    </View>
                    <View style={styles.espacio}>
                      <LargeButton
                        colorStyle={{
                          color: color.PRINCIPALCOLOR,
                          fontWeight: '600',
                        }}
                        titulo={'****-****-****-' + creditCard.last4}
                        onPressRight={() => {
                          toggleDialog();
                        }}
                        iconRight={true}
                      />
                    </View>
                  </View>
                ) : (
                  <View>
                    <View style={styles.espacio}>
                      <LargeButton
                        colorStyle={{
                          color: color.PRINCIPALCOLOR,
                          fontWeight: '600',
                        }}
                        titulo={'No Cards'}
                        onPressRight={() => goToScreen('PaymentMethod')}
                        iconRight={true}
                      />
                    </View>
                  </View>
                )
              ) : null}
            </View>
            <Text style={styles.sectionHeader}>3. Promociones</Text>
            <View style={styles.whiteSection}>
              <View style={[styles.espacio, {paddingTop: 5}]}>
                <LargeButton
                  colorStyle={{
                    color: color.PRINCIPALCOLOR,
                    fontWeight: '600',
                  }}
                  titulo={
                    tags.PaymentScreen.codigo != ''
                      ? tags.PaymentScreen.codigo
                      : 'Codigo de Promocion'
                  }
                  onPressRight={() => goToScreen('PromoCode')}
                  iconRight={true}
                />
              </View>
            </View>
            <Text style={styles.sectionHeader}>4. Resumen</Text>
            <View
              style={{
                backgroundColor: 'white',
                width: '92%',
                marginLeft: '4%',
                marginRight: '4%',
                marginTop: 7,
                marginBottom: 7,
              }}
            >
              <View style={styles.espacio3}>
                <View
                  style={{
                    width: '50%',
                    marginLeft: '-1%',
                  }}
                >
                  <Text style={styles.txtPrices2}>
                    {tags.PaymentScreen.subtotal != ''
                      ? tags.PaymentScreen.subtotal
                      : 'Subtotal'}
                  </Text>
                  <Text style={styles.txtPrices2}>
                    {'(' +
                      ShoppingCart.length +
                      ' Producto' +
                      (ShoppingCart.length <= 1 ? '' : 's') +
                      ')'}{' '}
                  </Text>
                </View>
                <Text style={styles.valorCuenta}>
                  {' '}
                  {Currency.code + '.' + valoresVenta.subTotal}
                </Text>
              </View>
              <View style={styles.espacio}>
                <Text style={styles.txtTitulo}>
                  {tags.PaymentScreen.entrega != ''
                    ? tags.PaymentScreen.entrega
                    : 'Entrega'}
                </Text>
                <Text style={styles.valorCuenta}>
                  {Currency.code + '.' + valoresVenta.entrega}
                </Text>
              </View>
              <Divider orientation="vertical" />
              <View style={styles.espacio2}>
                <Text style={{...styles.txtTitulo, fontWeight: '700'}}>
                  {tags.PaymentScreen.total != ''
                    ? tags.PaymentScreen.total
                    : 'Total (incl. IVA)'}
                </Text>
                <Text style={styles.valorCuenta}>
                  {Currency.code + '.' + valoresVenta.total}
                </Text>
              </View>
            </View>
          </ScrollView>
          {visiblePago == false ? null : (
            <PaymentModalList
              setCustomModal={setVisiblePago}
              formaPago={formaPago}
              customModal={visiblePago}
              formasPago={formasPago}
              setopcionPago={setopcionPago}
              tags={tags.sedeSelectScreen}
              setFormaPago={setformaPago}
            />
          )}
          <View
            style={{
              backgroundColor: color.PRINCIPALCOLOR,
            }}
          >
            <TouchableOpacity onPress={terminarCompra}>
              <Text
                style={{
                  ...styles.txtTituloFooter,
                  fontWeight: '600',
                  height: 40,
                }}
              >
                Terminar Compra
              </Text>
            </TouchableOpacity>
          </View>
          {visible == false ? null : (
            <PurchaseModal
              customModal={visible}
              setCustomModal={setVisible}
              deleteCards={deleteCard}
              updateCards={updateCard}
            />
          )}
          {showGateway ? (
            <Modal
              visible={showGateway}
              onDismiss={() => setShowGateway(false)}
              onRequestClose={() => setShowGateway(false)}
              animationType={'fade'}
              transparent
            >
              <SafeAreaView style={mainStyles.containers}>
                <View style={styles.wbHead}>
                  <TouchableOpacity
                    style={{padding: 13}}
                    onPress={() => {
                      confirmarPaypal();
                    }}
                  >
                    <Feather name={'x'} size={24} />
                  </TouchableOpacity>
                  <Text
                    style={{
                      flex: 1,
                      textAlign: 'center',
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: '#00457C',
                    }}
                  >
                    PayPal GateWay
                  </Text>
                  <View style={{padding: 13}}>
                    <ActivityIndicator size={24} color={'#00457C'} />
                  </View>
                </View>
                <WebView
                  source={{uri: linkPago}}
                  style={{flex: 1}}
                  onMessage={onMessage}
                  onLoadStart={() => {
                    setProg(true);
                    setProgClr('#000');
                  }}
                  onLoadProgress={() => {
                    setProg(true);
                    setProgClr('#00457C');
                  }}
                  onLoadEnd={() => {
                    setProg(false);
                  }}
                  onLoad={() => {
                    setProg(false);
                  }}
                />
              </SafeAreaView>
            </Modal>
          ) : null}
          {linkFlagModal == false ? null : (
            <LinkModal
              customModal={linkFlagModal}
              tags={tags}
              setCustomModal={setLinkFlagModal}
              shoppingCart={linkCart}
              generaLink={generaLinkPago}
            />
          )}
        </View>
      )}
    </SafeAreaView>
  );

  function realizarPago() {
    console.log(loginUser.usuario);
    let sendPromos = [];
    if (promotionList.length >= 1) {
      promotionList.map(promo => {
        sendPromos.push({
          idPromotion: promo.idPromotion,
          type: promo.type,
        });
      });
    }
    if (productosCarrito.length >= 1) {
      if (creditCards.length >= 1) {
        let totalVenta;
        if (valoresVenta.total.includes(',')) {
          totalVenta = valoresVenta.total.replace(/,/g, '');
        } else {
          totalVenta = valoresVenta.total;
        }
        console.log(totalVenta);
        let sendData = {
          idCurrency: Currency._id,
          idLanguage: GlobalLanguage._id,
          idUser: loginUser.usuario._id,
          value: totalVenta,
          type: 'credit_card',
          products: productosCarrito,
          promotions: sendPromos,
          /*     {
                "idPromotion": "633b2bd9880e100adaf47a89",
                "type": "V"
            },
            {
                "idPromotion": "633b2bd9880e100adaf47a89",
                "type": "P"
            }*/
        };
        console.log(sendData);
        sendShoppingCartSell(
          sendData,
          goToScreen,
          'Initial',
          setpromotionList,
          tags.PaymentScreen,
        );
      } else {
        Snackbar.show({
          text:
            tags.PaymentScreen.methodPay != ''
              ? tags.PaymentScreen.methodPay
              : 'Ingrese un metodo de pago',
          duration: Snackbar.LENGTH_LONG,
        });
        goToScreen('PaymentMethod');
      }
    } else {
      Snackbar.show({
        text:
          tags.PaymentScreen.emptyCart != ''
            ? tags.PaymentScreen.emptyCart
            : 'Carrito Vacio, Agregue un producto',
        duration: Snackbar.LENGTH_LONG,
      });
    }

    //P
  }

  //FUNCIONES PAYPAL
  function pagarPaypal() {
    let sendPromos = [];
    if (promotionList.length >= 1) {
      promotionList.map(promo => {
        sendPromos.push({
          idPromotion: promo.idPromotion,
          type: promo.type,
        });
      });
    }
    if (productosCarrito.length >= 1) {
      let totalVenta;
      if (valoresVenta.total.includes(',')) {
        totalVenta = valoresVenta.total.replace(/,/g, '');
      } else {
        totalVenta = valoresVenta.total;
      }
      console.log(totalVenta);
      let sendData = {
        idCurrency: Currency._id,
        idLanguage: GlobalLanguage._id,
        idUser: loginUser.usuario._id,
        value: totalVenta,
        type: 'paypal',
        products: productosCarrito,
        promotions: sendPromos,
      };
      console.log(sendData);
      sendPaypalData(sendData, Currency.code, setShowGateway);
    } else {
      Snackbar.show({
        text:
          tags.PaymentScreen.emptyCart != ''
            ? tags.PaymentScreen.emptyCart
            : 'Carrito Vacio, Agregue un producto',
        duration: Snackbar.LENGTH_LONG,
      });
    }
  }

  //FUNCION CONFIRM PAYPAL
  function confirmarPaypal() {
    setShowGateway(false);
    getPaypalAnswer(
      tokenPago,
      goToScreen,
      'Initial',
      setpromotionList,
      tags.PaymentScreen,
    );
    console.log('FLAGS TEST', flagPaypal);
    console.log('MENSAJE DE WEBMODAL', tokenPago);
  }

  //FUNCION GENERA LINK PAGO
  function crearLink() {
    let sendPromos = [];
    if (promotionList.length >= 1) {
      promotionList.map(promo => {
        sendPromos.push({
          idPromotion: promo.idPromotion,
          type: promo.type,
        });
      });
    }
    if (productosCarrito.length >= 1) {
      let totalVenta;
      if (valoresVenta.total.includes(',')) {
        totalVenta = valoresVenta.total.replace(/,/g, '');
      } else {
        totalVenta = valoresVenta.total;
      }
      console.log(totalVenta);
      let sendData = {
        idCurrency: Currency._id,
        idLanguage: GlobalLanguage._id,
        idUser: loginUser.usuario._id,
        value: totalVenta,
        type: 'paypal',
        products: productosCarrito,
        promotions: sendPromos,
      };
      console.log(sendData);
      setLinkCart(sendData);
      toggleLinkDialog();
    } else {
      Snackbar.show({
        text:
          tags.PaymentScreen.emptyCart != ''
            ? tags.PaymentScreen.emptyCart
            : 'Carrito Vacio, Agregue un producto',
        duration: Snackbar.LENGTH_LONG,
      });
    }
  }

  function goToScreen(routeName) {
    props.navigation.navigate(routeName);
  }

  function editarItem(item) {
    categories.forEach(category => {
      if (category._id == item.idCategory) {
        setCategory(category);
        seteditable(true);
        setProduct(item);
        getMultimediabyProduct(item);
        getSedeDirect(item.idHeadquarter, setSede, goToScreen, 'Product');
      }
    });
  }

  function borrarItem(item) {
    console.log(item);
    Alert.alert(
      tags.PaymentScreen.deleteTitle != ''
        ? tags.PaymentScreen.deleteTitle
        : 'Borrar Item',
      tags.PaymentScreen.deleteMsg != ''
        ? tags.PaymentScreen.deleteMsg
        : '¿Seguro que desea borrar \nel producto seleccionado?',
      [
        {
          text:
            tags.closeSessionScreen.btnsi != ''
              ? tags.closeSessionScreen.btnsi
              : 'Si',
          onPress: () => {
            removeItemtoCart(item, goToScreen);
            let subtotal = 0;
            let descuento = 0;
            let sendProds = [];
            // Productos del carrito
            if (ShoppingCart.length >= 1) {
              ShoppingCart.forEach(item => {
                let precioItem;
                if (item.price.includes(',')) {
                  precioItem = item.price.replace(/,/g, '');
                } else {
                  precioItem = item.price;
                }
                subtotal = subtotal + item.cantidad * parseFloat(precioItem);
                sendProds.push({
                  idProduct: item._id,
                  quantity: item.cantidad,
                  paid_value: item.cantidad * parseFloat(precioItem),
                });
              });
            }
            console.log('CARRITO TRAS BORRAR ITEM', ShoppingCart);
            if (ShoppingCart.length == 0) {
              subtotal = 0;
              descuento = 0;
              sendProds = [];
            }
            // Calcular valores de la vista
            setValoresVenta({
              subTotal: subtotal,
              entrega: descuento,
              total: subtotal - descuento,
            });
            console.log('PRODS A ENVIAR BORRADOS DEBE SER 0', sendProds);
            setProductosCarrito(sendProds);
          },
        },
        {
          text:
            tags.closeSessionScreen.btnno != ''
              ? tags.closeSessionScreen.btnno
              : 'No',
          onPress: () => {},
          style: 'cancel',
        },
      ],
    );
  }

  //funciones para Paypal

  function onMessage(e) {
    let data = e.nativeEvent.data;
    setShowGateway(false);
  }
}

const styles = StyleSheet.create({
  vista: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  titulo: {
    fontWeight: '800',
    fontSize: 30,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 25,
  },
  subHeader: {
    backgroundColor: color.WHITE,
    borderBottomColor: color.GRAY,
    borderBottomWidth: 0.6,
    flexDirection: 'row',
    paddingVertical: 5,
  },
  productos: {
    width: '92%',
    marginLeft: '4%',
    marginRight: '4%',
    marginTop: 7,
    marginBottom: 7,
  },
  btnAgregar: {
    width: '80%',
    marginLeft: '10%',
    marginRight: '10%',
    borderRadius: 10,
    backgroundColor: 'skyblue',
    height: 40,
    justifyContent: 'center',
    marginTop: 30,
  },
  txtAgregar: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingLeft: 7,
    paddingTop: 7,
  },
  espacio: {
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    height: 50,
    marginBottom: 3,
    borderColor: 'grey',
    flexDirection: 'row',
  },
  espacio2: {
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    height: 50,
    marginBottom: 3,
    borderBottomWidth: 2,
    borderColor: 'grey',
    flexDirection: 'row',
  },
  espacio3: {
    width: '90%',
    height: 50,
    marginBottom: 3,
    borderColor: 'grey',
    flexDirection: 'row',
    marginLeft: '5%',
    marginRight: '5%',
  },
  txtTitulo: {
    fontSize: 17,
    textAlign: 'left',
    width: '50%',
    alignSelf: 'center',
  },
  txtPrices: {
    fontSize: 17,
    textAlign: 'left',
    width: '50%',
    alignSelf: 'center',
  },
  txtPrices2: {
    fontSize: 17,
    textAlign: 'left',
  },
  valorCuenta: {
    borderColor: 'black',
    //  borderWidth:1,
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'right',
    width: '50%',
    alignSelf: 'center',
  },
  txtTituloHeader: {
    fontSize: 15,
    textAlign: 'center',
    width: '45%',
    alignSelf: 'center',
  },
  txtTituloFooter: {
    fontSize: 20,
    textAlign: 'center',
    alignSelf: 'center',
  },
  btnForm: {
    alignItems: 'flex-end',
    alignContent: 'flex-end',
    width: '30%',
    paddingTop: 15,
  },
  txtForm: {
    width: '75%',
    alignContent: 'center',
    alignItems: 'center',
    paddingTop: 13,
  },
  whiteSection: {
    backgroundColor: 'white',
    width: '92%',
    marginLeft: '4%',
    marginRight: '4%',
    marginTop: 7,
    marginBottom: 7,
  },
  txtChangeForm: {
    fontSize: 14,
    borderBottomWidth: 1,
    fontWeight: '400',
    textAlign: 'center',
    alignSelf: 'center',
  },
  valorCuentaHeader: {
    borderColor: 'black',
    //  borderWidth:1,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    width: '55%',
    alignSelf: 'center',
  },
  txtUnico1: {
    fontWeight: '500',
    fontSize: 19,
    textAlign: 'center',
    alignSelf: 'center',
    color: 'skyblue',
  },
  txtUnico2: {
    fontWeight: '400',
    fontSize: 18,
    textAlign: 'center',
    alignSelf: 'center',
  },
  webViewCon: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  wbHead: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    zIndex: 25,
    elevation: 2,
  },
});
