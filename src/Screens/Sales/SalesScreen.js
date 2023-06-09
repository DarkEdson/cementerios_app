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
//import DatePicker from 'react-native-date-ranges';
import DatePicker from 'react-native-date-picker';
//URL de server
import {BASE_URL_IMG, PRODUCTS_URL, formatAmount} from '@utils/config';
//Recarga la screen
import {useIsFocused} from '@react-navigation/native';
//Componentes
import ToolBar from '@Components/common/toolBar';
import CardProductoVenta from '@Components/CardSellProduct/';
import CardProductoReporte from '@Components/common/CardReportProduct';

import MyButton from '@Components/common/MyButton';
//Estilos Generales
import {mainStyles} from '@styles/stylesGeneral';
import color from '@styles/colors';
//Contextos
import {ScreentagContext} from '@context/ScreentagsContext';
import {ReportsContext} from '@context/ReportsContext';
import {UsuarioContext} from '@context/UsuarioContext';
import {GlobalLanguageContext} from '@context/LanguageContext';

//tags.SellsScreen.labelfechafin != '' ? tags.SellsScreen.labelfechafin :
//tags.SellsScreen.labelfechainicio != '' ? tags.SellsScreen.labelfechainicio :
export default function SalesScreen(props) {
  const {tags} = useContext(ScreentagContext);
  const [loginUser] = useContext(UsuarioContext);
  const [GlobalLanguage] = useContext(GlobalLanguageContext);
  const {
    getReportSeller,
    ReportsSellers,
    prodsSellers,
    isLoadingReports,
    setprodsSellers,
  } = useContext(ReportsContext);
  const [dateInicio, setDateInicio] = useState(new Date());
  const [openInicio, setOpenInicio] = useState(false);
  const [dateFinal, setDateFinal] = useState(new Date());
  const [openFinal, setOpenFinal] = useState(false);

  const dateRef = React.useRef();
  const isFocused = useIsFocused();
  const getInitialData = async () => {};

  // Cargar informacion de la vista
  useEffect(() => {
    //  console.log(dateRef);
    // Calcular valores de la vista
    setprodsSellers([]);
    let fechaInicial = `${dateInicio.getFullYear()}-${dateInicio.getMonth()}-${dateInicio.getDate()}`;
    let fechaFinal = `${dateFinal.getFullYear()}-${dateFinal.getMonth()}-${dateFinal.getDate()}`;
    console.log(fechaInicial, fechaFinal);
    setValoresVenta({
      subTotal: 0,
      comision: 0,
      total: 0,
    });
    if (isFocused) {
      getInitialData();
      console.log('isFocused Ventas Detail');
    }
    //props, isFocused
  }, [props, isFocused]);

  const [valoresVenta, setValoresVenta] = useState({
    subTotal: 0,
    comision: 0,
    total: 0,
  });

  function buscaVentas() {
    console.log(dateInicio, dateFinal);
    let monthInicial = '01';
    let monthFinal = '01';
    let dayInicial = '01';
    let dayFinal = '01';
    if (dateInicio.getMonth() + 1 <= 9) {
      monthInicial = `0${dateInicio.getMonth()}`;
    } else {
      monthInicial = dateInicio.getMonth() + 1;
    }
    if (dateFinal.getMonth() + 1 <= 9) {
      monthFinal = `0${dateFinal.getMonth()}`;
    } else {
      monthFinal = dateFinal.getMonth() + 1;
    }
    if (dateInicio.getDate() <= 9) {
      dayInicial = `0${dateInicio.getDate()}`;
    } else {
      dayInicial = dateInicio.getDate();
    }
    if (dateFinal.getDate() <= 9) {
      dayFinal = `0${dateFinal.getDate()}`;
    } else {
      dayFinal = dateFinal.getDate();
    }
    let fechaInicial = `${dateInicio.getFullYear()}-${monthInicial}-${dayInicial}`;
    let fechaFinal = `${dateFinal.getFullYear()}-${monthFinal}-${dayFinal}`;
    console.log(
      'DATA A ENVIAR',
      loginUser.usuario._id,
      GlobalLanguage._id,
      fechaInicial,
      fechaFinal,
    );
    getReportSeller(
      loginUser.usuario._id,
      GlobalLanguage._id,
      fechaInicial,
      fechaFinal,
      setValoresVenta,
    );
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
      ) : (
        <View>
          <StatusBar
            backgroundColor={color.PRINCIPALCOLOR}
            barStyle="dark-content"
            translucent={true}
          />
          <ToolBar
            titulo={
              tags.SellsScreen.ventas != '' ? tags.SellsScreen.ventas : 'Ventas'
            }
            onPressLeft={() => goToScreen('Initial')}
            iconLeft={true}
          />
          <ScrollView>
            <View style={styles.container}>
              <View style={styles.fechas}>
                <TouchableOpacity onPress={() => setOpenInicio(true)}>
                  <View style={styles.viewPadre}>
                    <View style={styles.viewHijo}>
                      <Text style={styles.texto}>
                        {' '}
                        {tags.SellsScreen.labelfechainicio != ''
                          ? tags.SellsScreen.labelfechainicio
                          : 'Fecha Inicio:'}{' '}
                      </Text>
                    </View>
                    <View style={styles.viewHijo2}>
                      <Text style={styles.textoFecha}>
                        {dateInicio.getFullYear()}-{dateInicio.getMonth() + 1}-
                        {dateInicio.getDate()}
                      </Text>
                      <DatePicker
                        modal
                        textColor={color.PRINCIPALCOLOR}
                        mode="date"
                        open={openInicio}
                        date={new Date()}
                        onConfirm={dateInicio => {
                          setOpenInicio(false);
                          setDateInicio(dateInicio);
                        }}
                        onCancel={() => {
                          setOpenInicio(false);
                        }}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setOpenFinal(true)}>
                  <View style={styles.viewPadre}>
                    <View style={styles.viewHijo}>
                      <Text style={styles.texto}>
                        {' '}
                        {tags.SellsScreen.labelfechafin != ''
                          ? tags.SellsScreen.labelfechafin
                          : 'Fecha Inicio:'}{' '}
                      </Text>
                    </View>
                    <View style={styles.viewHijo2}>
                      <Text style={styles.textoFecha}>
                        {dateFinal.getFullYear()}-{dateFinal.getMonth() + 1}-
                        {dateFinal.getDate()}
                      </Text>
                      <DatePicker
                        modal
                        textColor={color.PRINCIPALCOLOR}
                        mode="date"
                        open={openFinal}
                        date={new Date()}
                        onConfirm={dateFinal => {
                          setOpenFinal(false);
                          setDateFinal(dateFinal);
                        }}
                        onCancel={() => {
                          setOpenFinal(false);
                        }}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
                <MyButton
                  titulo={
                    tags.SellsScreen.search != ''
                      ? tags.SellsScreen.search
                      : 'Search.'
                  }
                  onPress={() => buscaVentas()}
                />
              </View>
              {prodsSellers.length >= 1
                ? prodsSellers.map((producto, key) => (
                    <CardProductoReporte
                      key={key}
                      urlImagen={`${BASE_URL_IMG}${PRODUCTS_URL}${producto.idProduct}/${producto.image}`}
                      titulo={producto.name}
                      styles={{marginLeft: 10}}
                      moneda={producto.currency ? producto.currency : '$'}
                      descripcion={producto.descripcion}
                      precio={formatAmount(producto.value)}
                      cantidad={producto.quantity}
                    />
                  ))
                : null}
              <View style={styles.espacio2}>
                <Text style={styles.txtTitulo}>
                  {tags.SellsScreen.subtotal1 != ''
                    ? tags.SellsScreen.subtotal1
                    : ' Subtotal'}
                </Text>
                <Text style={styles.valorCuenta}>
                  $ {formatAmount(valoresVenta.subTotal)}
                </Text>
              </View>
              <View style={styles.espacio}>
                <Text style={styles.txtTitulo}>
                  {tags.SellsScreen.comision != ''
                    ? tags.SellsScreen.comision
                    : ' Comisión'}
                </Text>
                <Text style={styles.valorCuenta}>
                  $ {formatAmount(valoresVenta.comision)}
                </Text>
              </View>
              <View style={styles.espacio}>
                <Text style={{...styles.txtTitulo, fontWeight: '700'}}>
                  Total
                </Text>
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
