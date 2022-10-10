import React, { useState, useEffect, useContext } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
  StatusBar,
  Platform,
  TextInput,
} from 'react-native';
import { Icon, FAB } from '@rneui/themed';
//URL de server
import { BASE_URL_IMG, PRODUCTS_URL } from '@utils/config';
//Recarga la screen
import { useIsFocused } from '@react-navigation/native';
//Estilos Generales
import color from '@styles/colors';
import {
  mainStyles,
} from '@styles/stylesGeneral';
//Componentes
import ToolBar from '@Components/common/toolBar';
import CardProducto from '@Components/CardProducto/index';
//Contextos
import { ScreentagContext } from '@context/ScreentagsContext';
import { ProductContext } from '@context/ProductContext';
import { RouteBackContext } from '@context/RouteBackContext';
import { ProductsContext } from '@context/ProductsContext';
import { CategoriesContext } from '@context/CategoriesContext';
import { CategoryContext } from '@context/CategoryContext';
import { SedesContext } from '@context/SedesContext';
import { SedeContext } from '@context/SedeContext';
import { GlobalLanguageContext } from '@context/LanguageContext';
import { ShoppingCartContext } from '@context/ShoppingCartContext';

//tags.ProductsScreen.labelsearch1 != '' ? tags.ProductsScreen.labelsearch1 : 'Cementerio, Producto, Categoría...'
export default function VistaProductos(props) {
  const { tags } = useContext(ScreentagContext);
  const [GlobalLanguage] = useContext(GlobalLanguageContext);
  const {  setrutaCart } = useContext(ShoppingCartContext);
  const [Product, setProduct] = useContext(ProductContext);
  const [sede, setSede] = useContext(SedeContext);
  const { isLoadingSedes,  getSedeDirect } = useContext(SedesContext);
  const { setRouteBack } = useContext(RouteBackContext);
  const {
    ProductsCountry,
    ProductsCategory,
    ProductsFullCategory,
    isLoadingProducts,
    getProductsFullbyCategory,
    getMultimediabyProduct,
  } = useContext(ProductsContext);
  const { categories } =
    useContext(CategoriesContext);
  const { isCategory, setisCategory, setCategory } = useContext(CategoryContext);

  const isFocused = useIsFocused();
  const getInitialData = async () => { };

  // Cargar informacion de la vista
  useEffect(() => {
    if (isCategory) {
      let arrayP = [];
      ProductsCountry.forEach(producto => {
        ProductsCategory.forEach(p => {
          if (p._id == producto._id) {
            arrayP.push(producto);
          }
        });
      });
      getProductsFullbyCategory(arrayP, GlobalLanguage);
      setArrProductosDisp(arrayP);
    } else {
      setArrProductosDisp(ProductsCountry);
    }

    if (isFocused) {
      getInitialData();
      console.log('isFocused in Products');
    }
    //props, isFocused
  }, [props, isFocused]);

  // Variable de trabajo
  const [arrProductosDisp, setArrProductosDisp] = useState([]);

  return (
    <SafeAreaView style={mainStyles.containers} >
      <View>
        {isCategory && isLoadingProducts ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '50%',
            }}>
            <FAB
              loading
              color={color.PRINCIPALCOLOR}
              visible={isLoadingProducts}
              icon={{ name: 'add', color: 'white' }}
              size="small"
            />
          </View>
        ) : isLoadingSedes ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '50%',
            }}>
            <FAB
              loading
              color={color.PRINCIPALCOLOR}
              visible={isLoadingSedes}
              icon={{ name: 'add', color: 'white' }}
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
                tags.ProductsScreen.labelproductos != ''
                  ? tags.ProductsScreen.labelproductos
                  : 'Productos'
              }
              onPressLeft={() => {
                setisCategory(false);
                goToScreen('Initial');
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
                      isCategory
                        ? ProductsFullCategory.filter(p =>
                          p.name
                            .toLocaleLowerCase()
                            .includes(val.toLocaleLowerCase()),
                        )
                        : ProductsCountry.filter(p =>
                          p.name
                            .toLocaleLowerCase()
                            .includes(val.toLocaleLowerCase()),
                        ),
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
                      precio={tags.ProductsScreen.detallePrecio != ''
                      ? tags.ProductsScreen.detallePrecio
                      : 'Ver Precio Dentro'}
                    />
                  );
                })}
                <View style={styles.boxTransparent} />
              </View>
              <View style={styles.boxTransparent} />
            </ScrollView>
          </View>
        )}
      </View>
    </SafeAreaView>
  );

  function selectedProduct(producto, routeName) {
    if (isCategory) {
      prodSel(producto, routeName, 'Productos')

    } else {
      categories.forEach(category => {
        if (category._id == producto.idCategory) {
          setCategory(category);
          prodSel(producto, routeName, 'Productos')
        }
      });

    }

  }

  function prodSel(producto, routeName, routeB) {
    setrutaCart(false)
    setProduct(producto);
    getMultimediabyProduct(producto);
    setRouteBack(routeB);
    getSedeDirect(producto.idHeadquarter, setSede, goToScreen, routeName)
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
