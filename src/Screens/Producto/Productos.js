import React, { useState, useEffect, useContext } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  StatusBar,
  Platform,
  TextInput,
} from 'react-native';
//URL de server
import { BASE_URL_IMG, PRODUCTS_URL } from '@utils/config';
//Recarga la screen
import { useIsFocused } from '@react-navigation/native';
//Estilos Generales
import color from '@styles/colors';
//Componentes
import ToolBar from '@Components/common/toolBar';
import CardProducto from '@Components/CardProducto/index';
//Contextos
import { ScreentagContext } from '@context/ScreentagsContext';
import { ProductContext } from '@context/ProductContext';
import { RouteBackContext } from '@context/RouteBackContext';
import { ProductsContext } from "@context/ProductsContext";
import { CategoryContext } from '@context/CategoryContext';

//tags.ProductsScreen.labelsearch1 != '' ? tags.ProductsScreen.labelsearch1 : 'Cementerio, Producto, Categoría...'
export default function VistaProductos(props) {
  const { tags } = useContext(ScreentagContext);
  const [Product, setProduct] = useContext(ProductContext);
  const { setRouteBack } = useContext(RouteBackContext);
  const {
    ProductsCountry,
    ProductsCategory,
  } = useContext(ProductsContext)
  const { Category, isCategory,setisCategory } = useContext(CategoryContext);

  const isFocused = useIsFocused();
  const getInitialData = async () => { };

  // Cargar informacion de la vista
  useEffect(() => {

    setArrProductosDisp(isCategory? ProductsCategory:ProductsCountry);
    if (isFocused) {
      getInitialData();
      console.log('isFocused in Products');
    }
    //props, isFocused
  }, []);

  // Variable de trabajo
  const [arrProductosDisp, setArrProductosDisp] = useState([]);

  return (
    <View>
      <StatusBar
        backgroundColor={color.PRINCIPALCOLOR}
        barStyle="dark-content"
        translucent={true}
      />
      <ToolBar
        titulo={
          tags.ProductsScreen.labelproductos != ''
            ? tags.ProductsScreen.labelproductos
            : 'Productos'
        }
        onPressLeft={() => {
          setisCategory(false)
          goToScreen('Initial')
      }}
        iconLeft={true}
      />
      <View style={styles.containerHeader}>
        <View style={styles.searchSection}>
          <TextInput
            style={styles.input}
            placeholder={
              tags.ProductsScreen.labelsearch1 != ''
                ? tags.ProductsScreen.labelsearch1
                : 'Cementerio, Producto, Categoría...'
            }
            onChangeText={val => {
              setArrProductosDisp(
                isCategory? ProductsCategory.filter(
                  p =>
                    p.name
                      .toLocaleLowerCase()
                      .includes(val.toLocaleLowerCase()) 
                ):ProductsCountry.filter(
                  p =>
                    p.name
                      .toLocaleLowerCase()
                      .includes(val.toLocaleLowerCase()) 
                )
              );
            }}
          />
        </View>
      </View>

      <ScrollView style={styles.scroll}>
        <View style={styles.containerHeader}>
          {arrProductosDisp.map((product, key) => {
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
          })}
        </View>
        <View style={styles.boxTransparent} />
      </ScrollView>
    </View>
  );

  function selectedProduct(producto, routeName) {
    setProduct(producto);
    goToScreen(routeName);
    setRouteBack('Productos');
  }

  function goToScreen(routeName) {
    props.navigation.navigate(routeName);
  }
}

const styles = StyleSheet.create({
  titulo: {
    fontWeight: '800',
    fontSize: 30,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 25,
  },
  containerHeader: {
    backgroundColor: color.WHITE,
  },
  boxTransparent: {
    backgroundColor: color.WHITE,
    marginBottom: Dimensions.get('screen').height * 0.027,
  },
  scroll: {
    height: '80%',
  },
  searchSection: {
    borderBottomWidth: 1,
    borderColor: 'grey',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 15,
    width: '85%',
    height: Platform.OS === 'ios' ? 40 : 50,
  },
  input: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
  },
});
