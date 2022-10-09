import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
//Recarga la screen
import {useIsFocused} from '@react-navigation/native';
//URL de server
import {BASE_URL_IMG} from '@utils/config';
//Componentes
import CardProductoVenta from '@Components/CardSellProduct/';
import ToolBar from '@Components/common/toolBar';
import LargeButton from '@Components/common/largeButton';
//Contextos
import {ScreentagContext} from '@context/ScreentagsContext';
import {ShoppingCartContext} from '@context/ShoppingCartContext';
import {RouteBackContext} from '@context/RouteBackContext';
//Estilos Generales
import color from '@styles/colors';
import {
  mainStyles,
  CementeryScreen,
  informationIconStyles,
} from '@styles/stylesGeneral';

//tags.PaymentScreen.agregar != '' ? tags.PaymentScreen.agregar :
export default function VistaPago(props) {
  const {tags, updateTags} = useContext(ScreentagContext);
  const {ShoppingCart, removeItemtoCart} = useContext(ShoppingCartContext);
  const {RouteBack} = useContext(RouteBackContext);
  const isFocused = useIsFocused();
  const getInitialData = async () => {};

  // Cargar informacion de la vista
  useEffect(() => {
    let subtotal = 0;
    let descuento = 0;
    // Productos del carrito
    console.log(ShoppingCart, 'DENTRO DE VISTA COMPRAR');
    ShoppingCart.forEach(item => {
      subtotal = subtotal + item.cantidad * parseFloat(item.price);
    });
    // Calcular valores de la vista
    setValoresVenta({
      subTotal: subtotal,
      entrega: descuento,
      total: subtotal - descuento,
    });
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
              {ShoppingCart.map((promo, key) => {
                return (
                  <CardProductoVenta
                    key={key}
                    urlImagen={promo.principalImage}
                    titulo={promo.name}
                    descripcion={promo.description}
                    precio={promo.price}
                    cantidad={promo.cantidad}
                  />
                );
              })}
            </View>
            <View style={styles.espacio}>
              <Text style={styles.txtTitulo}>
                {tags.PaymentScreen.subtotal != ''
                  ? tags.PaymentScreen.subtotal
                  : 'Subtotal'}
              </Text>
              <Text style={styles.valorCuenta}>$ {valoresVenta.subTotal}</Text>
            </View>
            <View style={styles.espacio}>
              <Text style={styles.txtTitulo}>
                {tags.PaymentScreen.entrega != ''
                  ? tags.PaymentScreen.entrega
                  : 'Entrega'}
              </Text>
              <Text style={styles.valorCuenta}>$ {valoresVenta.entrega}</Text>
            </View>
            <View style={styles.espacio2}>
              <Text style={{...styles.txtTitulo, fontWeight: '700'}}>
                {tags.PaymentScreen.total != ''
                  ? tags.PaymentScreen.total
                  : 'Total (incl. IVA)'}
              </Text>
              <Text style={styles.valorCuenta}>$ {valoresVenta.total}</Text>
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
                titulo={
                  tags.PaymentScreen.codigo != ''
                    ? tags.PaymentScreen.codigo
                    : 'Codigo de Promocion'
                }
                onPressRight={() => goToScreen('PromoCode')}
                iconRight={true}
              />
            </View>
            <TouchableOpacity style={styles.btnAgregar}>
              <Text style={styles.txtAgregar}>
                {' '}
                {tags.PaymentScreen.pagar != ''
                  ? tags.PaymentScreen.pagar
                  : 'Pagar'}{' '}
              </Text>
            </TouchableOpacity>
            <View style={mainStyles.boxTransparent} />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
  function goToScreen(routeName) {
    props.navigation.navigate(routeName);
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
