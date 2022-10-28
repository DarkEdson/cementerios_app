import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import {Icon, FAB, ListItem, Button} from '@rneui/themed';
import Snackbar from 'react-native-snackbar';
//URL de server
import {BASE_URL_IMG, PRODUCTS_URL, formatAmount} from '@utils/config';
//Recarga la screen
import {useIsFocused} from '@react-navigation/native';
//Componentes
import ToolBar from '@Components/common/toolBar';
import CardProductoVenta from '@Components/CardSellProduct/';
import MyButton from '@Components/common/MyButton';
//Estilos Generales
import {mainStyles} from '@styles/stylesGeneral';
import color from '@styles/colors';
//Contextos
import {ScreentagContext} from '@context/ScreentagsContext';
import {ReportsContext} from '@context/ReportsContext';
import {UsuarioContext} from '@context/UsuarioContext';
import {RouteBackContext} from '@context/RouteBackContext';
import {GlobalLanguageContext} from '@context/LanguageContext';
import {ProductContext} from '@context/ProductContext';
import {ProductsContext} from '@context/ProductsContext';
import {CategoriesContext} from '@context/CategoriesContext';
import {CategoryContext} from '@context/CategoryContext';
import {SedesContext} from '@context/SedesContext';
import {SedeContext} from '@context/SedeContext';
import {ShoppingCartContext} from '@context/ShoppingCartContext';

//tags.SellsScreen.labelfechafin != '' ? tags.SellsScreen.labelfechafin :
//tags.SellsScreen.labelfechainicio != '' ? tags.SellsScreen.labelfechainicio :
export default function BuyScreen(props) {
  const {tags} = useContext(ScreentagContext);
  const [loginUser] = useContext(UsuarioContext);
  const [Product, setProduct] = useContext(ProductContext);
  const {setrutaCart} = useContext(ShoppingCartContext);
  const [sede, setSede] = useContext(SedeContext);
  const {isLoadingSedes, getSedeDirect} = useContext(SedesContext);
  const [GlobalLanguage] = useContext(GlobalLanguageContext);
  const {categories} = useContext(CategoriesContext);
  const {setRouteBack} = useContext(RouteBackContext);
  const {
    ProductsCountry,
    isLoadingProducts,
    getMultimediabyProduct,
  } = useContext(ProductsContext);
  const {isCategory, setisCategory, setCategory} = useContext(CategoryContext);
  const {
    getReportClient,
    ReportsClients,
    setprodsClients,
    prodsClients,
    isLoadingReports,
  } = useContext(ReportsContext);
  const isFocused = useIsFocused();
  const getInitialData = async () => {};

  // Cargar informacion de la vista
  useEffect(() => {
    setprodsClients([]);
    // Calcular valores de la vista
    setValoresVenta({
      subTotal: 0,
      comision: 0,
      total: 0,
    });
    buscaCompras();
    if (isFocused) {
      getInitialData();
      console.log('isFocused Compras Detail');
    }
    //props, isFocused
  }, [props, isFocused]);

  const [valoresVenta, setValoresVenta] = useState({
    subTotal: 0,
    comision: 0,
    total: 0,
  });

  function buscaCompras() {
    getReportClient(loginUser.usuario._id, GlobalLanguage._id, setValoresVenta);
  }

  return (
    <SafeAreaView style={mainStyles.containers}>
      {isLoadingReports ? (
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
            visible={isLoadingReports}
            icon={{name: 'add', color: 'white'}}
            size="small"
          />
        </View>
      ) : isLoadingProducts ? (
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
            marginTop: '50%',
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
      ) : (
        <View>
          <StatusBar
            backgroundColor={color.PRINCIPALCOLOR}
            barStyle="dark-content"
            translucent={true}
          />
          <ToolBar
            titulo={
              tags.SellsScreen.compras != ''
                ? tags.SellsScreen.compras
                : 'Compras'
            }
            onPressLeft={() => goToScreen('Initial')}
            iconLeft={true}
          />
          <ScrollView>
            <View style={styles.container}>
              <View style={styles.fechas} />
              {prodsClients.length >= 1
                ? prodsClients.map((producto, key) => (
                    <CardProductoVenta
                      key={key}
                      urlImagen={`${BASE_URL_IMG}${PRODUCTS_URL}${producto.image}`}
                      titulo={producto.name}
                      styles={{marginLeft: 10}}
                      moneda={producto.currency}
                      descripcion={producto.descripcion}
                      precio={formatAmount(producto.value)}
                      cantidad={producto.quantity}
                      onPressProduct={() =>
                        selectedProduct(producto, 'Product')
                      }
                    />
                  ))
                : null}
              <View style={styles.espacio} />
              <View style={styles.espacio}>
                <Text style={styles.txtTitulo}>{' Total'}</Text>
                <Text style={styles.valorCuenta}>
                  $ {formatAmount(valoresVenta.total)}
                </Text>
              </View>
              <View style={styles.boxTransparent} />
            </View>
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );

  function goToScreen(routeName) {
    props.navigation.navigate(routeName);
  }

  function selectedProduct(producto, routeName) {
    let flag = false;
    ProductsCountry.forEach(prod => {
      if (prod._id == producto.idProduct) {
        flag = true;
        categories.forEach(category => {
          if (category._id == prod.idCategory) {
            setCategory(category);
            prodSel(prod, routeName, 'Productos');
          }
        });
      } else {
        flag = false;
        //M
      }
    });
    if (!flag) {
      Snackbar.show({
        text: 'Producto ya no existe',
        duration: Snackbar.LENGTH_LONG,
      });
    }
  }

  function prodSel(producto, routeName, routeB) {
    setrutaCart(false);
    setProduct(producto);
    getMultimediabyProduct(producto);
    setRouteBack(routeB);
    getSedeDirect(producto.idHeadquarter, setSede, goToScreen, routeName);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.WHITE,
    marginBottom: 15,
    paddingBottom: 20,
  },
  boxTransparent: {
    backgroundColor: color.WHITE,
    marginBottom: Dimensions.get('screen').height * 0.08,
  },
  promociones: {
    width: '100%',
    height: 180,
    borderWidth: 1,
    borderColor: 'red',
  },
  espacio: {
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    height: 50,
    marginBottom: 3,
    borderBottomWidth: 1,
    borderColor: 'grey',
    flexDirection: 'row',
  },
  espacio2: {
    marginTop: Dimensions.get('screen').height * 0.02,
    width: Dimensions.get('screen').width * 0.9,
    marginLeft: '5%',
    marginRight: '5%',
    height: Dimensions.get('screen').height * 0.07,
    marginBottom: 3,
    borderBottomWidth: 0,
    borderColor: 'grey',
    flexDirection: 'row',
  },
  txtTitulo: {
    fontSize: 17,
    textAlign: 'left',
    width: Dimensions.get('screen').width * 0.45,
    alignSelf: 'center',
  },
  valorCuenta: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'right',
    width: '50%',
    alignSelf: 'center',
  },
  txtNuevoComponente: {
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 15,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  //fechas style
  fechas: {
    alignItems: 'center',
    width: '90%',
    marginLeft: '5%',
    marginTop: 20,
    marginBottom: 20,
  },
  viewPadre: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    marginTop: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  viewHijo: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 20,
    width: '65%',
  },
  viewHijo2: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: '35%',
  },
  texto: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  textoFecha: {
    fontWeight: '300',
    fontSize: 17,
  },
});
