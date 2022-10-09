import React, { useContext, useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  Dimensions,
  StatusBar,
  Alert,
} from 'react-native';
import { Icon, FAB } from '@rneui/themed';
import SelectDropdown from 'react-native-select-dropdown';
import Carousel from 'react-native-reanimated-carousel';
//Recarga la screen
import { useIsFocused } from '@react-navigation/native';
//Estilos generales
import { mainStyles, loginStyles } from '@styles/stylesGeneral';
import color from '@styles/colors';
//Componentes
import CardPromocion from '@Components/CardPromocion/';
import BtnCategoria from '@Components/BtnCategoria/';
import ToolBarSession from '@Components/common/toolBarSession';
import MyTextButton from '@Components/common/MyTextButton';
import CardColaborador from '@Components/CardColaborador/';
//Contextos
import { UsuarioContext } from '@context/UsuarioContext';
import { CementeryContext } from '@context/CementeryContext';
import { ScreentagContext } from '@context/ScreentagsContext';
import { CountriesContext } from '@context/CountriesContext';
import { RouteBackContext } from '@context/RouteBackContext';
import { CountryContext } from '@context/CountryContext';
import { GlobalLanguageContext } from '@context/LanguageContext';
import { CategoriesContext } from '@context/CategoriesContext';
import { CementeriesContext } from '@context/CementeriesContext';
import { ShoppingCartContext } from '@context/ShoppingCartContext';
import { PromotionsContext } from '@context/PromotionsContext';
import { ProductsContext } from '@context/ProductsContext';
import { CategoryContext } from '@context/CategoryContext';
import { ProductContext } from '@context/ProductContext';
import { SedesContext } from '@context/SedesContext';
import { SedeContext } from '@context/SedeContext';

const PAGE_WIDTH = Dimensions.get('screen').width;
//tags.HomeScreen.ubica
export default function InitialScreen(props) {
  const [loginUser] = useContext(UsuarioContext);
  const [cementery, setCementery] = useContext(CementeryContext);
  const [sede, setSede] = useContext(SedeContext);
  const [countries] = useContext(CountriesContext);
  const [GlobalLanguage] = useContext(GlobalLanguageContext);
  const { tags } = useContext(ScreentagContext);
  const { setRouteBack, setRouteBackComp } = useContext(RouteBackContext);
  const { setisCategory, setCategory } = useContext(CategoryContext);
  const [Product, setProduct] = useContext(ProductContext);
  const { categories, isLoadingCategories, getCategories } =
    useContext(CategoriesContext);
  const { Cementeries, isLoadingCementeries, getCementeries } =
    useContext(CementeriesContext);
  const {  setrutaCart } = useContext(ShoppingCartContext);
  const { Sedes, isLoadingSedes, getSedes, getSedeDirect } = useContext(SedesContext);
  const { Promotions, isLoadingPromotions, getPromotions } =
    useContext(PromotionsContext);
  const {
    ProductsCountry,
    isLoadingProducts,
    getProductsbyCountry,
    getProductsbyCategory,
    getMultimediabyProduct,
  } = useContext(ProductsContext);
  const { country, updateDefaultCountry, isLoadingCountry, getDefaultCountry } =
    useContext(CountryContext);

  const [ubicationSelect, setubicationSelect] = useState({
    label: `${countries[0].name}, ${countries[0].code.toUpperCase()}`,
    value: countries[0].code,
  });

  const isFocused = useIsFocused();
  const getInitialData = async () => { };

  const [ubicaciones, setubicaciones] = useState([]);

  const baseOptions = {
    vertical: false,
    width: PAGE_WIDTH * 0.85,
    height: PAGE_WIDTH * 0.56,
  };
  const [data, setData] = useState([{ id: 1, name: 'example' }]);

  useEffect(() => {
    function misUbicaciones() {
      let getUbicaciones = [];
      countries.forEach(country => {
        getUbicaciones.push({
          label: `${country.name}, ${country.code.toUpperCase()}`,
          value: country._id,
        });
      });
      console.log(country, 'DEFAULT');
      console.log(GlobalLanguage, 'LENGUAJE GLOBAL EN HOME');
      getCategories(country, GlobalLanguage);
      getPromotions(country, GlobalLanguage);
      getProductsbyCountry(country, GlobalLanguage);
      getCementeries(country);
      setubicaciones(getUbicaciones);
    }
    if (isFocused) {
      getInitialData();
      console.log('isFocused in Start Screen');
    }
    misUbicaciones();
    getDefaultCountry();
    return () => { };
  }, []);

  return (
    <SafeAreaView style={mainStyles.containers}>
      {isLoadingProducts ? (
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
          <ToolBarSession
            titulo={
              tags.HomeScreen.ubica != '' ? tags.HomeScreen.ubica : 'Ubicación'
            }
            ubicaciones={ubicaciones}
            ubicationSelect={ubicationSelect}
            defaultCountry={country}
            onSelectUbication={item => cambiaPais(item)}
            onPressLeft={() => goToScreen('Profile')}
            iconLeft={true}
            image={loginUser.usuario.avatar}
          />
          <ScrollView>
            <View style={styles.container}>
              <SelectDropdown
                data={data}
                search
                onFocus={() => arrayBusqueda()}
                defaultButtonText={
                  tags.HomeScreen.inputsearch != ''
                    ? tags.HomeScreen.inputsearch
                    : 'Cementerios, arrecifes o flores...'
                }
                searchPlaceHolder={
                  tags.HomeScreen.inputsearch != ''
                    ? tags.HomeScreen.inputsearch
                    : 'Cementerios, arrecifes o flores...'
                }
                buttonTextStyle={{ textAlign: 'left' }}
                buttonStyle={styles.btnStyle}
                renderDropdownIcon={isOpened => {
                  return (
                    <Icon
                      type={'material-community'}
                      name={isOpened ? 'magnify-expand' : 'magnify'}
                      color={'#444'}
                      size={16}
                    />
                  );
                }}
                dropdownIconPosition="left"
                onSelect={(selectedItem, index) => {
                  navSearch(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem.name;
                }}
                rowTextForSelection={(item, index) => {
                  return item.name;
                }}
              />
              <View>
                {isLoadingPromotions ? (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View style={styles.boxTransparent} />
                    <FAB
                      loading
                      color={color.PRINCIPALCOLOR}
                      visible={isLoadingPromotions}
                      icon={{ name: 'add', color: 'white' }}
                      size="small"
                    />
                    <View style={styles.boxTransparent} />
                  </View>
                ) : Promotions.length >= 1 ? (
                  <View>
                    <Carousel
                      width={400}
                      height={175}
                      loop
                      autoPlay={true}
                      autoPlayInterval={2000}
                      data={Promotions}
                      renderItem={({ item }) => (
                        <CardPromocion
                          titulo={item.name}
                          descripcion={item.description}
                          bgColor={item.backgroundcolor}
                          urlImagen={item.image}
                          onPressPromotion={() => { }}
                        />
                      )}
                    />
                  </View>
                ) : (
                  <View style={styles.noPromoView}>
                    <Text style={styles.promoText}>No Promos</Text>
                  </View>
                )}
              </View>
              <View>
                {isLoadingCategories ? (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <FAB
                      loading
                      color={color.PRINCIPALCOLOR}
                      visible={isLoadingCategories}
                      icon={{ name: 'add', color: 'white' }}
                      size="small"
                    />
                  </View>
                ) : (
                  <View style={styles.categories}>
                    {categories.map((category, key) => {
                      return (
                        <BtnCategoria
                          key={key}
                          urlImagen={category.image}
                          titulo={category.name}
                          onPressCategorie={() =>
                            prodByCategory(category, 'Productos')
                          }
                        />
                      );
                    })}
                  </View>
                )}
              </View>
              <View style={[styles.cementeriestitle, styles.titles]}>
                <Text style={styles.titleText}>
                  {tags.HomeScreen.labelcementarios != ''
                    ? tags.HomeScreen.labelcementarios
                    : 'Cementerios'}
                </Text>
                <MyTextButton
                  titulo={
                    tags.HomeScreen.labelvertodos != ''
                      ? tags.HomeScreen.labelvertodos
                      : 'Ver todos'
                  }
                  underline={true}
                  color="blue"
                  onPress={() => goToScreen('Cementeries')}
                />
              </View>
              <View>
                {isLoadingCementeries ? (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View style={styles.boxTransparent} />
                    <FAB
                      loading
                      color={color.PRINCIPALCOLOR}
                      visible={isLoadingCementeries}
                      icon={{ name: 'add', color: 'white' }}
                      size="small"
                    />
                    <View style={styles.boxTransparent} />
                  </View>
                ) : (
                  <View>
                    <Carousel
                      {...baseOptions}
                      loop={true}
                      style={{ width: '100%', flex: 1 }}
                      autoPlay={true}
                      autoPlayInterval={2000}
                      data={Cementeries}
                      pagingEnabled={true}
                      //onSnapToItem={(index) => console.log('current index:', index)}
                      renderItem={({ item }) => (
                        <CardColaborador
                          urlImagen={item.image}
                          nombre={item.name}
                          onPressColab={() => selectCementery(item, 'Company')}
                        />
                      )}
                    />
                  </View>
                )}
              </View>
            </View>
            <View style={styles.boxTransparent} />
            <View style={styles.boxTransparent} />
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );

  function prodByCategory(category, routeName) {
    {
      console.log(category);
      setisCategory(true);
      setCategory(category);
      getProductsbyCategory(category, goToScreen, routeName);
      setRouteBackComp('Initial');
    }
  }
  function arrayBusqueda() {
    let array = [];
    categories.forEach(category => {
      array.push({ id: category._id, name: category.name });
    });
    Cementeries.forEach(cementery => {
      array.push({ id: cementery._id, name: cementery.name });
    });
    Promotions.forEach(promotion => {
      array.push({ id: promotion._id, name: promotion.name });
    });
    ProductsCountry.forEach(Product => {
      array.push({ id: Product._id, name: Product.name });
    });
    console.log('ARRAY DE BUSQUEDA', array);
    setData(array);
  }

  function cambiaPais(pais) {
    console.log('cambia ubicacion seleccionada', pais);
    setubicationSelect(pais);
    updateDefaultCountry(pais);
    getCategories(pais, GlobalLanguage);
    getPromotions(pais, GlobalLanguage);
    getProductsbyCountry(pais, GlobalLanguage);
    getCementeries(pais);
  }

  function selectCementery(cementery, routeName) {
    setrutaCart(true)
    setCementery(cementery);
    getSedes(cementery, setSede, goToScreen, routeName, country);
    setRouteBackComp('Home');
  }

  function goToScreen(routeName) {
    props.navigation.navigate(routeName);
  }

  function navSearch(item) {
    let routeName = 'Initial';
    categories.forEach(category => {
      if (item.id == category._id) {
        prodByCategory(category, 'Productos')
        routeName = '';
      }
    });
    Cementeries.forEach(cementery => {
      if (item.id == cementery._id) {
        selectCementery(cementery, 'Company')
        routeName = '';
      }
    });
    Promotions.forEach(promotion => {
      if (item.id == promotion._id) {
        //  setPromotion(promotion);
        routeName = 'Promociones';
      }
    });
    ProductsCountry.forEach(Product => {
      if (item.id == Product._id) {
        setrutaCart(false)
        categories.forEach(category => {
          if (category._id == Product.idCategory) {
            setCategory(category);
            setProduct(Product);
            setRouteBack('Initial');
            getMultimediabyProduct(Product);
            getSedeDirect(Product.idHeadquarter, setSede, goToScreen, 'Product');
            routeName = '';
          }
        });
      }
    });
    if (routeName == '') {
      //F
    } else {
      goToScreen(routeName);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.WHITE,
    marginBottom: 15,
    paddingBottom: 20,
  },
  containers: {
    flex: 1,
    backgroundColor: color.WHITE,
    marginBottom: 15,
    paddingBottom: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  boxTransparent: {
    backgroundColor: 'white',
    marginBottom: Dimensions.get('screen').height * 0.13,
  },
  btnStyle: {
    width: '90%',
    marginLeft: 20,
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: color.GRAY2,
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  cementeries: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cementeriestitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    marginLeft: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: color.BLACK,
  },
  promoText: {
    fontSize: 20,
    fontWeight: '600',
    color: color.PRINCIPALCOLOR,
  },
  titles: {
    marginRight: 20,
  },
  noPromoView: {
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  promociones: {
    width: '100%',
    height: 180,
    borderWidth: 1,
    borderColor: 'red',
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
});
