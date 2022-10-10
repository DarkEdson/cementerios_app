import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  Alert,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {Icon, FAB, ListItem, Button} from '@rneui/themed';
import Snackbar from 'react-native-snackbar';
//Recarga la screen
import {useIsFocused} from '@react-navigation/native';
//URL de server
import {BASE_URL_IMG} from '@utils/config';
//Componentes
import CardProductoVenta from '@Components/CardSellProduct/';
import ToolBar from '@Components/common/toolBar';
import LargeButton from '@Components/common/largeButton';
import MyButton from '@Components/common/MyButton';
//Contextos
import {ScreentagContext} from '@context/ScreentagsContext';
import {ShoppingCartContext} from '@context/ShoppingCartContext';
import {UsuarioContext} from '@context/UsuarioContext';
import {GlobalLanguageContext} from '@context/LanguageContext';
import {CurrenciesContext} from '@context/CurrencyContext';
import {RouteBackContext} from '@context/RouteBackContext';
import {SedeContext} from '@context/SedeContext';
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
  const [GlobalLanguage] = useContext(GlobalLanguageContext);
  const [sede, setSede] = useContext(SedeContext);
  const {Currency, getCurrency} = useContext(CurrenciesContext);
  const {
    ShoppingCart,
    removeItemtoCart,
    recipe,
    sendShoppingCartSell,
    isLoadingCart,
  } = useContext(ShoppingCartContext);
  const {RouteBack} = useContext(RouteBackContext);
  const isFocused = useIsFocused();
  const getInitialData = async () => {};

  // Cargar informacion de la vista
  useEffect(() => {
    let subtotal = 0;
    let descuento = 0;
    let sendProds = [];
    // Productos del carrito
    console.log(ShoppingCart, 'DENTRO DE VISTA COMPRAR');
    ShoppingCart.forEach(item => {
      let precioItem;
      if (item.price.includes(',')) {
        precioItem = item.price.replace(/,/g, '');
      } else {
        precioItem = item.price;
      }
      console.log('valor item', precioItem, parseFloat(precioItem));
      subtotal = subtotal + item.cantidad * parseFloat(precioItem);
      sendProds.push({
        idProduct: item._id,
        quantity: item.cantidad,
        paid_value: item.cantidad * parseFloat(precioItem),
      });
    });
    //Consultar Moneda
    getCurrency({_id: sede.idAffiliate});
    console.log(Currency);
    // Calcular valores de la vista
    setValoresVenta({
      subTotal: subtotal,
      entrega: descuento,
      total: subtotal - descuento,
    });
    console.log('PRODS A ENVIAR', sendProds);
    setProductosCarrito(sendProds);
    if (isFocused) {
      getInitialData();
      console.log('isFocused Payment');
    }
    //props, isFocused
  }, []);

  // Variables del carrito de compras
  const [productosCarrito, setProductosCarrito] = useState([]);
  const [valoresVenta, setValoresVenta] = useState({
    subTotal: 0,
    entrega: 0,
    total: 0,
  });

  return (
    <SafeAreaView style={mainStyles.containers}>
      {isLoadingCart ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '50%',
          }}>
          <FAB
            loading
            color={color.PRINCIPALCOLOR}
            visible={isLoadingCart}
            icon={{name: 'add', color: 'white'}}
            size="small"
          />
        </View>
      ) : (
        <View style={styles.vista}>
          <ToolBar
            titulo={
              tags.PaymentScreen.compra != ''
                ? tags.PaymentScreen.compra
                : 'Compra'
            }
            onPressLeft={() => goToScreen('Productos')}
            iconLeft={true}
          />
          <ScrollView>
            <View>
              <View style={styles.productos}>
                {ShoppingCart.map((prod, key) => {
                  return (
                    <ListItem.Swipeable
                      key={key}
                      bottomDivider
                      leftContent={() => (
                        <Button
                          title="Info"
                          onPress={() => {
                            console.log(prod);
                          }}
                          icon={{name: 'info', color: 'white'}}
                          buttonStyle={{minHeight: '100%'}}
                        />
                      )}
                      rightContent={() => (
                        <Button
                          title="Delete"
                          onPress={() => borrarItem(prod)}
                          icon={{name: 'delete', color: 'white'}}
                          buttonStyle={{
                            minHeight: '100%',
                            backgroundColor: 'red',
                          }}
                        />
                      )}>
                      <ListItem.Content>
                        <CardProductoVenta
                          key={key}
                          urlImagen={prod.principalImage}
                          titulo={prod.name}
                          descripcion={prod.description}
                          moneda={prod.moneda ? prod.moneda : Currency.symbol}
                          precio={prod.price}
                          cantidad={prod.cantidad}
                        />
                      </ListItem.Content>
                      <ListItem.Chevron />
                    </ListItem.Swipeable>
                  );
                })}
              </View>
              <View style={styles.espacio}>
                <Text style={styles.txtTitulo}>
                  {tags.PaymentScreen.subtotal != ''
                    ? tags.PaymentScreen.subtotal
                    : 'Subtotal'}
                </Text>
                <Text style={styles.valorCuenta}>
                  {' '}
                  {Currency.symbol + '.' + valoresVenta.subTotal}
                </Text>
              </View>
              <View style={styles.espacio}>
                <Text style={styles.txtTitulo}>
                  {tags.PaymentScreen.entrega != ''
                    ? tags.PaymentScreen.entrega
                    : 'Entrega'}
                </Text>
                <Text style={styles.valorCuenta}>
                  {Currency.symbol + '.' + valoresVenta.entrega}
                </Text>
              </View>
              <View style={styles.espacio2}>
                <Text style={{...styles.txtTitulo, fontWeight: '700'}}>
                  {tags.PaymentScreen.total != ''
                    ? tags.PaymentScreen.total
                    : 'Total (incl. IVA)'}
                </Text>
                <Text style={styles.valorCuenta}>
                  {Currency.symbol + '.' + valoresVenta.total}
                </Text>
              </View>
              <View style={styles.espacio}>
                <LargeButton
                  titulo={
                    tags.PaymentScreen.agregar != ''
                      ? tags.PaymentScreen.agregar
                      : 'Agregar mas productos'
                  }
                  onPressRight={() => goToScreen('Initial')}
                  iconRight={true}
                />
              </View>
              <View style={styles.espacio}>
                <LargeButton
                  colorStyle={{color: color.PRINCIPALCOLOR, fontWeight: '600'}}
                  titulo={
                    tags.PaymentScreen.codigo != ''
                      ? tags.PaymentScreen.codigo
                      : 'Codigo de Promocion'
                  }
                  onPressRight={() => goToScreen('PromoCode')}
                  iconRight={true}
                />
              </View>
              <View style={{alignItems: 'center'}}>
                <MyButton
                  titulo={
                    tags.PaymentScreen.pagar != ''
                      ? tags.PaymentScreen.pagar +
                        ' (' +
                        valoresVenta.total +
                        ')'
                      : 'Pagar'
                  }
                  onPress={() => realizarPago()}
                />
              </View>
              <View style={mainStyles.boxTransparent} />
            </View>
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );

  function realizarPago() {
    console.log(loginUser.usuario);
    if (productosCarrito.length >= 1) {
      let sendData = {
        idCurrency: Currency._id,
        idLanguage: GlobalLanguage._id,
        idUser: loginUser.usuario._id,
        value: valoresVenta.total,
        products: productosCarrito,
        promotions: [
          /*     {
              "idPromotion": "633b2bd9880e100adaf47a89",
              "type": "V"
          },
          {
              "idPromotion": "633b2bd9880e100adaf47a89",
              "type": "P"
          }*/
        ],
      };
      console.log(sendData);
      sendShoppingCartSell(sendData, goToScreen, 'Initial');
    } else {
      Snackbar.show({
        text: 'Carrito Vacio, Agregue un producto',
        duration: Snackbar.LENGTH_LONG,
      });
    }

    //P
  }

  function goToScreen(routeName) {
    props.navigation.navigate(routeName);
  }

  function borrarItem(item) {
    console.log(item);
    Alert.alert(
      'Borrar Item',
      '¿Deguro que desea borrar \nel producto seleccionado?',
      [
        {
          text:
            tags.closeSessionScreen.btnsi != ''
              ? tags.closeSessionScreen.btnsi
              : 'Si',
          onPress: () => {
            removeItemtoCart(item);
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
            // Calcular valores de la vista
            setValoresVenta({
              subTotal: subtotal,
              entrega: descuento,
              total: subtotal - descuento,
            });
            console.log('PRODS A ENVIAR', sendProds);
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
  productos: {
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: 30,
    borderBottomWidth: 1,
    paddingBottom: 40,
    borderColor: 'grey',
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
  txtTitulo: {
    fontSize: 17,
    textAlign: 'left',
    width: '50%',
    alignSelf: 'center',
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
});
