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
//import DatePicker from 'react-native-date-ranges';
import DatePicker from 'react-native-date-picker';
import { Button } from "@rneui/themed";
//URL de server
import {BASE_URL_IMG, PRODUCTS_URL} from '@utils/config';
//Recarga la screen
import {useIsFocused} from '@react-navigation/native';
//Componentes
import ToolBar from '@Components/common/toolBar';
import CardProductoVenta from '@Components/CardSellProduct/';
//Estilos Generales
import {mainStyles} from '@styles/stylesGeneral';
import color from '@styles/colors';
//Contextos
import {ScreentagContext} from '@context/ScreentagsContext';

//tags.SellsScreen.labelfechafin != '' ? tags.SellsScreen.labelfechafin :
//tags.SellsScreen.labelfechainicio != '' ? tags.SellsScreen.labelfechainicio :
export default function SalesScreen(props) {
  const {tags, updateTags} = useContext(ScreentagContext);
  const [dateInicio, setDateInicio] = useState(new Date());
  const [openInicio, setOpenInicio] = useState(false);
  const [dateFinal, setDateFinal] = useState(new Date());
  const [openFinal, setOpenFinal] = useState(false);
  const dateRef= React.useRef();
  const isFocused = useIsFocused();
  const getInitialData = async () => {};

  // Cargar informacion de la vista
  useEffect(() => {
    console.log(dateRef)
    // Calcular valores de la vista
    setValoresVenta({
      subTotal: 120,
      comision: 10,
      total: 110,
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

  return (
    <SafeAreaView style={mainStyles.containers} > 
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
            <Text style={styles.texto}> {tags.SellsScreen.labelfechainicio != '' ? tags.SellsScreen.labelfechainicio :'Fecha Inicio:'} </Text>
          </View>
          <View style={styles.viewHijo2}>
            <Text style={styles.textoFecha}>
              {dateInicio.getFullYear()}-{dateInicio.getMonth()}-{' '}
              {dateInicio.getDate()}
            </Text>
            <DatePicker
              modal
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
            <Text style={styles.texto}> {tags.SellsScreen.labelfechafin != '' ? tags.SellsScreen.labelfechafin :'Fecha Inicio:'} </Text>
          </View>
          <View style={styles.viewHijo2}>
            <Text style={styles.textoFecha}>
              {dateFinal.getFullYear()}-{dateFinal.getMonth()}-
              {dateFinal.getDate()}
            </Text>
            <DatePicker
              modal
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
    </View>
          <CardProductoVenta
            urlImagen={`${BASE_URL_IMG}${PRODUCTS_URL}/Producto_1.jpg`}
            titulo="Perla Magistral"
            descripcion="Perla, cemento, cremacion, traslado, hundimiento.."
            precio="$ 12.50"
            cantidad="3"
          />

          <CardProductoVenta
            urlImagen={`${BASE_URL_IMG}${PRODUCTS_URL}/Producto_2.jpg`}
            titulo="Perla oceano 2"
            descripcion="Perla, cemento, cremacion, traslado, hundimiento.."
            precio="$ 16.90"
            cantidad="5"
          />
          <CardProductoVenta
            urlImagen={`${BASE_URL_IMG}${PRODUCTS_URL}/Producto_3.jpg`}
            titulo="Perla oceano 3"
            descripcion="Perla, cemento, cremacion, traslado, hundimiento.."
            precio="$ 11.93"
            cantidad="9"
          />
          <View style={styles.espacio2}>
            <Text style={styles.txtTitulo}>
              {tags.SellsScreen.subtotal1 != ''
                ? tags.SellsScreen.subtotal1
                : ' Subtotal'}
            </Text>
            <Text style={styles.valorCuenta}>$ {valoresVenta.subTotal}</Text>
          </View>
          <View style={styles.espacio}>
            <Text style={styles.txtTitulo}>
              {tags.SellsScreen.comisionpct != ''
                ? tags.SellsScreen.comisionpct
                : '% de Comisión'}
            </Text>
            <Text style={styles.valorCuenta}>$ {valoresVenta.comision}</Text>
          </View>
          <View style={styles.espacio}>
            <Text style={{...styles.txtTitulo, fontWeight: '700'}}>
              {tags.SellsScreen.comision != ''
                ? tags.SellsScreen.comision
                : ' Comisión'}
            </Text>
            <Text style={styles.valorCuenta}>$ {valoresVenta.total}</Text>
          </View>
          <View style={styles.boxTransparent} />
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
