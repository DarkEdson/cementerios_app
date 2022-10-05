import React, { useContext, useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  StatusBar,
  Alert,
} from 'react-native';
import { Icon,FAB } from '@rneui/themed';
import SelectDropdown from 'react-native-select-dropdown';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
//Recarga la screen
import { useIsFocused } from '@react-navigation/native';
//Estilos generales
import { mainStyles, loginStyles } from '@styles/stylesGeneral';
import color from '@styles/colors';
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
//Storages
import { getLanguague, saveLanguague } from '@storage/LanguagueAsyncStorage';
//Componentes
import CardPromocion from '@Components/CardPromocion/';
import BtnCategoria from '@Components/BtnCategoria/';
import ToolBarSession from '@Components/common/toolBarSession';
import MyTextButton from '@Components/common/MyTextButton';
import CardColaborador from '@Components/CardColaborador/';




const PAGE_WIDTH = Dimensions.get('screen').width;

//tags.HomeScreen.ubica
//tags.HomeScreen.ubica != '' ? tags.HomeScreen.ubica :
export default function InitialScreen(props) {
  const [loginUser] = useContext(UsuarioContext);
  const [cementery, setCementery] = useContext(CementeryContext);
  const [countries] = useContext(CountriesContext);
  const [GlobalLanguage] = useContext(GlobalLanguageContext)
  const { tags } = useContext(ScreentagContext);
  const { setRouteBackComp } = useContext(RouteBackContext);
  const {
    categories,
    isLoadingCategories,
    getCategories,
  } = useContext(CategoriesContext)
  const {
    Cementeries,
    isLoadingCementeries,
    getCementeries,
  } = useContext(CementeriesContext)
  const { country, updateDefaultCountry, isLoadingCountry, getDefaultCountry } =
    useContext(CountryContext);

  const [ubicationSelect, setubicationSelect] = useState({
    label: `${countries[0].name}, ${countries[0].code.toUpperCase()}`,
    value: countries[0].code,
  });

  const isFocused = useIsFocused();
  const getInitialData = async () => { };

  const [ubicaciones, setubicaciones] = useState([]);

  const ref = useRef < ICarouselInstance > null;
  const baseOptions = {
    vertical: false,
    width: PAGE_WIDTH * 0.85,
    height: PAGE_WIDTH * 0.56,
  };
  const [data, setData] = useState([
    { id: 1, name: 'angellist' },
    { id: 2, name: 'codepen' },
    { id: 3, name: 'envelope' },
    { id: 4, name: 'etsy' },
    { id: 5, name: 'facebook' },
    { id: 6, name: 'foursquare' },
    { id: 7, name: 'github-alt' },
    { id: 8, name: 'github' },
    { id: 9, name: 'gitlab' },
    { id: 10, name: 'instagram' },
  ]);

  useEffect(() => {

    function misUbicaciones() {
      let getUbicaciones = [];
      console.log(countries)
      countries.forEach(country => {
        getUbicaciones.push({
          label: `${country.name}, ${country.code.toUpperCase()}`,
          value: country._id,
        });
      });
      console.log(country, 'DEFAULT');
      console.log(GlobalLanguage, 'LENGUAJE GLOBAL EN HOME')
      getCategories(country, GlobalLanguage)
      getCementeries(country)
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
    <View>
      {isLoadingCountry ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '50%',
          }}>
          <FAB
              loading
              color={color.PRINCIPALCOLOR}
              visible={isLoadingCountry}
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
          <ToolBarSession
            titulo={tags.HomeScreen.ubica != '' ? tags.HomeScreen.ubica : 'Ubicación'}
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
                  console.log(selectedItem.name, index);
                  Alert.alert(JSON.stringify(selectedItem));
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem.name;
                }}
                rowTextForSelection={(item, index) => {
                  return item.name;
                }}
              />
              <Carousel
                width={400}
                height={175}
                loop
                autoPlay={true}
                autoPlayInterval={2000}
                data={Cementeries}
                renderItem={({ item }) => (
                  <CardPromocion
                    titulo="30% de descuento"
                    descripcion="Descuesto en momentos y memorias al adquir un espacio en el cementerio"
                    bgColor="#fadf8e"
                    urlImagen="https://img.freepik.com/vector-premium/chico-dibujos-animados-buceo_33070-3880.jpg?w=2000"
                  />
                )}
              />
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
              icon={{name: 'add', color: 'white'}}
              size="small"
            />
                  </View>
                ) : (
                  <View style={styles.categories}>
                    {categories.map((category, key) => {
                      return (
                        <BtnCategoria
                          key={key}
                          urlImagen="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf6xM2nAd-gXu4cvl4MImqd-G0J1qtJGhH_w&usqp=CAU"
                          titulo={category.name}
                          onPressCategorie={() => { console.log(categories) }}
                        />
                      );
                    })}

                  </View>)}
              </View>
              <View style={[styles.categories, styles.titles]}>
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
              icon={{name: 'add', color: 'white'}}
              size="small"
            />
             <View style={styles.boxTransparent} />
                  </View>
                ) : (
                  <View>
                    <Carousel
                {...baseOptions}
                loop={true}
                style={{ width: '100%' }}
                autoPlay={true}
                autoPlayInterval={2000}
                data={Cementeries}
                pagingEnabled={true}
                //onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ item }) => (
                  <View style={styles.categories}>
                    <CardColaborador
                      urlImagen={item.urlImagen}
                      nombre={item.name}
                      onPressColab={() => selectCementery(item, 'Company')}
                    />
                  </View>
                )}
              />

                  </View>)}
              
              </View>
            </View>
            <View style={styles.boxTransparent} />
            <View style={styles.boxTransparent} />
          </ScrollView>
        </View>
      )}
    </View>
  );

  function cambiaPais(pais){
    console.log('cambia ubicacion seleccionada', pais);
              setubicationSelect(pais);
              updateDefaultCountry(pais);
              getCategories(pais, GlobalLanguage)
              getCementeries(pais)
  }

  function selectCementery(cementery, routeName) {
    setCementery(cementery);
    goToScreen(routeName);
    setRouteBackComp('Home');
  }

  function goToScreen(routeName) {
    props.navigation.navigate(routeName);
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
    justifyContent: 'space-between',
  },
  titleText: {
    marginLeft: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: color.BLACK,
  },
  titles: {
    marginRight: 20,
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
