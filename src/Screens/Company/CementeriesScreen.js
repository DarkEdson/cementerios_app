import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Alert,
  Platform,
  TextInput,
} from 'react-native';
import {Icon, FAB} from '@rneui/themed';
//Recarga la screen
import {useIsFocused} from '@react-navigation/native';
//URL de server
import {BASE_URL_IMG} from '@utils/config';
//Estilos Generales
import {mainStyles} from '@styles/stylesGeneral';
import color from '@styles/colors';
//Contextos
import {CementeryContext} from '@context/CementeryContext';
import {ScreentagContext} from '@context/ScreentagsContext';
import {RouteBackContext} from '@context/RouteBackContext';
import {CementeriesContext} from '@context/CementeriesContext';
import {ShoppingCartContext} from '@context/ShoppingCartContext';
import {CountryContext} from '@context/CountryContext';
import {SedesContext} from '@context/SedesContext';
import {SedeContext} from '@context/SedeContext';
import {CurrenciesContext} from '@context/CurrencyContext';
//Componentes
import ToolBar from '@Components/common/toolBar';
import CardColaborador from '@Components/CardColaborador/';
import CardColabGeneral from '@Components/CardColabGeneral';

//tags.ProductsScreen.labelsearch1 != '' ? tags.ProductsScreen.labelsearch1 : 'Cementerio, Producto, Categoría...'
export default function CompanyScreen(props) {
  const [cementery, setCementery] = useContext(CementeryContext);
  const {setrutaCart} = useContext(ShoppingCartContext);
  const [sede, setSede] = useContext(SedeContext);
  const {getCurrency} = useContext(CurrenciesContext);
  const {RouteBack, setRouteBack, RouteBackComp, setRouteBackComp} =
    useContext(RouteBackContext);
  const {Cementeries} = useContext(CementeriesContext);
  const {isLoadingSedes, getSedes} = useContext(SedesContext);
  const {country} = useContext(CountryContext);

  const {tags} = useContext(ScreentagContext);

  const isFocused = useIsFocused();
  const getInitialData = async () => {};
  // Cargar informacion de la vista
  useEffect(() => {
    setArrCementeriosDisp(Cementeries);
    if (isFocused) {
      getInitialData();
      console.log('isFocused in Cementeries');
    }
    //props, isFocused
  }, [props, isFocused]);

  // Variable de trabajo
  const [arrCementeriosDisp, setArrCementeriosDisp] = useState([]);
  // Variable de trabajo
  const [arrProductosDisp, setArrProductosDisp] = useState([]);

  return (
    <SafeAreaView style={mainStyles.containers}>
      <View>
        {isLoadingSedes ? (
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
                tags.CementeriesScreen.titulo != ''
                  ? tags.CementeriesScreen.titulo
                  : 'Cementerios'
              }
              onPressLeft={() => goToScreen('Initial')}
              iconLeft={true}
            />
            <View style={styles.containerHeader}>
              <View style={styles.searchSection}>
                <TextInput
                  style={styles.btnStyle}
                  placeholder={
                    tags.CementeriesScreen.placeholder != ''
                      ? tags.CementeriesScreen.placeholder
                      : 'Cementerio, Producto, Categoría...'
                  }
                  onChangeText={val => {
                    setArrCementeriosDisp(
                      Cementeries.filter(c =>
                        c.name
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
                {arrCementeriosDisp.map((company, key) => {
                  return (
                    <CardColabGeneral
                      key={key}
                      onPressColab={() => selectCementery(company, 'Company')}
                      urlImagen={company.image}
                      nombre={company.name}
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
  function selectCementery(cementery, routeName) {
    setrutaCart(true);
    setCementery(cementery);
    getCurrency(cementery);
    getSedes(cementery, setSede, goToScreen, routeName, country);
    setRouteBackComp('Cementeries');
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
  btnStyle: {
    width: '100%',
    marginBottom: 7,
    paddingLeft: 10,
    borderRadius: 10,
    backgroundColor: color.GRAY2,
  },
});
