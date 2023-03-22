import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  LogBox,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import {CheckBox, Divider} from '@rneui/themed';
import DatePicker from 'react-native-date-picker';
import SelectDropdown from 'react-native-select-dropdown';
import {Icon} from '@rneui/base';
//Recarga la screen
import {useIsFocused} from '@react-navigation/native';
//Estilos generales
import {mainStyles, registroStyles} from '@styles/stylesGeneral';
import color from '@styles/colors';
//Componentes
import MyTextInput from '@Components/common/MyTextInput';
import ToolBar from '@Components/common/toolBar';
import MyButton from '@Components/common/MyButton';
import DateButton from '@Components/common/DateButton';
import PhoneTextInput from '../../Components/common/PhoneTextInput';
//Contextos
import {RegisterContext} from '@context/RegisterContext';
import {AuthContext} from '@context/AuthContext';
import {UsuarioContext} from '@context/UsuarioContext';
import {ScreentagContext} from '@context/ScreentagsContext';
import {CurrenciesContext} from '../../context/CurrencyContext';

//tags.registerAddScreen.ubica
export default function RegistroScreen(props) {
  const [loginUser, loginAction] = useContext(UsuarioContext);
  const {tags} = useContext(ScreentagContext);
  const {register} = useContext(AuthContext);
  const [registerUser, registerAction] = useContext(RegisterContext);
  const {paisesLista, getListaPaises} = useContext(CurrenciesContext);
  const [boolProd, setboolProd] = useState(false);
  const [boolPhone, setboolPhone] = useState(false);
  const [codigoPais, setcodigoPais] = useState(null);
  const [userPhone, setuserPhone] = useState(null);

  const isFocused = useIsFocused();
  const getInitialData = async () => {};

  const [TC, setTC] = useState(false);
  const [birthday, setBirthday] = useState(new Date());
  const [openDate, setOpenDate] = useState(false);
  const [filtroPaises, setfiltroPaises] = useState([]);
  const [tipoCuentaBank, settipoCuentaBank] = useState([
    {id: 1, name: 'monetaria'},
    {id: 2, name: 'ahorro'},
    {id: 3, name: 'nomina'},
  ]);
  const [data, setData] = useState({
    name: '',
    lastname: '',
    paypal_id: '',
    phone: '',
    nit: '',
    birthdayDate: '',
    pais: '',
    numercuenta: '',
    tipocuenta: '',
    banco: '',
    codigoswift: '',
    direccion: '',
  });

  function filtrarPaises(texto) {
    let listado = [];
    paisesLista.map(pais => {
      if (pais.name.includes(texto) && texto != '') {
        listado.push(pais);
      }
      if (texto == '') {
        listado.push(pais);
      }
    });
    setfiltroPaises(listado);
  }
  
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    setData({
      ...data,
      email: registerUser.email,
      password: registerUser.password,
      username: registerUser.username,
      role: registerUser.role,
    });
    if (isFocused) {
      getInitialData();
      console.log('isFocused Register ADD');
    }
    getListaPaises();
    (async () => {
      await getListaPaises();
      setfiltroPaises(paisesLista);
    })();
    return () => {};
    //props, isFocused
  }, []);

  return (
    <SafeAreaView style={mainStyles.containers}>
      <ScrollView
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="always"
        style={{backgroundColor: color.WHITE}}
      >
        <StatusBar backgroundColor={color.PRINCIPALCOLOR} translucent={true} />
        <ToolBar
          titulo={
            tags.registerAddScreen.completa != ''
              ? tags.registerAddScreen.completa
              : 'Completa tus datos'
          }
          onPressLeft={() => goToScreen('Registro')}
          iconLeft={true}
        />
        <View style={mainStyles.container}>
          <MyTextInput
            keyboardType={null}
            placeholder={
              tags.registerAddScreen.inputnombres != ''
                ? tags.registerAddScreen.inputnombres
                : 'Nombres'
            }
            value={data.name}
            onChangeText={nombre => setData({...data, name: nombre})}
            image="account-circle"
          />
          <MyTextInput
            keyboardType={null}
            value={data.lastname}
            onChangeText={apellido => setData({...data, lastname: apellido})}
            placeholder={
              tags.registerAddScreen.inputapellidos != ''
                ? tags.registerAddScreen.inputapellidos
                : 'Apellidos'
            }
            image="account-circle"
          />
          {/* 
          <MyTextInput
            keyboardType={null}
            value={data.paypal_id}
            onChangeText={paypalID => setData({...data, paypal_id: paypalID})}
            placeholder={
              tags.registerAddScreen.inputpaypalid != ''
                ? tags.registerAddScreen.inputpaypalid
                : 'PayPal ID'
            }
            image="credit-card-outline"
          />
           */}
          <PhoneTextInput
            keyboardType={'phone-pad'}
            placeholder={'+XXX'}
            value={codigoPais}
            onChangeText={codigoP => {
              setcodigoPais(codigoP);
              setboolPhone(true);
            }}
            onEndEditing={() => {
              setData({...data, phone: codigoPais + userPhone});
              setboolPhone(false);
            }}
            value2={userPhone}
            onChangeText2={phones => setuserPhone(phones)}
            placeholder2={
              tags.registerAddScreen.phone != ''
                ? tags.registerAddScreen.phone
                : 'Phone'
            }
            onEndEditing2={() => {
              setData({...data, phone: codigoPais + userPhone});
            }}
            image="phone"
          />
          {boolPhone ? (
            <View style={styles.espacioOpcionesProducto}>
              {filtroPaises
                .filter(str =>
                  str.dial_code
                    .toUpperCase()
                    .includes(codigoPais.toUpperCase()),
                )
                .map((op, key) => {
                  if (key < 3) {
                    return (
                      <View key={key}>
                        <TouchableOpacity
                          style={styles.espacioItemProducto}
                          key={key}
                          onPress={() => {
                            setcodigoPais(op.dial_code);
                            setboolPhone(false);
                          }}
                        >
                          <Text style={styles.title55}>
                            {op.dial_code}-{op.name}
                          </Text>
                        </TouchableOpacity>
                        <Divider orientation="vertical" />
                      </View>
                    );
                  }
                })}
            </View>
          ) : null}
          {registerUser.role != 'seller' ? (
            <>
              <MyTextInput
                keyboardType={null}
                value={data.nit}
                onChangeText={nitClient => setData({...data, nit: nitClient})}
                placeholder={'NIT'}
                image="identifier"
              />
              <DateButton
                setOpen={setOpenDate}
                setDate={setBirthday}
                open={openDate}
                date={birthday}
                setDateData={setDateData}
                tagFecha="Fecha Nacimiento: "
                image="calendar-range"
              />
            </>
          ) : null}
          {registerUser.role == 'seller' ? (
            <>
              <MyTextInput
                keyboardType={null}
                value={data.pais}
                onChangeText={paisSelect => {
                  setData({...data, pais: paisSelect});
                  filtrarPaises(paisSelect);
                  setboolProd(true);
                }}
                onEndEditing={() => {
                  setboolProd(false);
                }}
                placeholder={'Pais'}
                image="earth"
              />
              {boolProd ? (
                <View style={styles.espacioOpcionesProducto}>
                  {filtroPaises
                    .filter(str =>
                      str.name.toUpperCase().includes(data.pais.toUpperCase()),
                    )
                    .map((op, key) => {
                      if (key < 3) {
                        return (
                          <View key={key}>
                            <TouchableOpacity
                              style={styles.espacioItemProducto}
                              key={key}
                              onPress={() => {
                                setData({...data, pais: op.name});
                                setboolProd(false);
                              }}
                            >
                              <Text style={styles.title55}>{op.name}</Text>
                            </TouchableOpacity>
                            <Divider orientation="vertical" />
                          </View>
                        );
                      }
                    })}
                </View>
              ) : null}

              <MyTextInput
                keyboardType={null}
                value={data.numercuenta}
                onChangeText={cuentaSeller =>
                  setData({...data, numercuenta: cuentaSeller})
                }
                placeholder={'Numero de Cuenta'}
                image="book-account"
              />
              <SelectDropdown
                data={tipoCuentaBank}
                //     defaultValue={defaultLanguage}
                //   defaultValueByIndex={0}
                defaultButtonText={'Tipo de Cuenta'}
                buttonTextStyle={{
                  textAlign: 'left',
                  color: color.TEXTCOLOR,
                  marginLeft: 3,
                }}
                buttonStyle={styles.btnDropStyle}
                search
                dropdownStyle={{
                  marginLeft: 2,
                  backgroundColor: color.INPUTCOLOR,
                  paddingHorizontal: 0,
                  borderWidth: 1,
                  borderRadius: 8,
                  borderColor: '#444',
                }}
                renderDropdownIcon={isOpened => {
                  return (
                    <Icon
                      style={{marginRight: 15}}
                      type={'font-awesome'}
                      name={isOpened ? 'chevron-up' : 'chevron-down'}
                      color={'#444'}
                      size={20}
                    />
                  );
                }}
                dropdownIconPosition="right"
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem);
                  setData({...data, tipocuenta: selectedItem.name});
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem.name;
                }}
                rowTextForSelection={(item, index) => {
                  return item.name;
                }}
              />
              <MyTextInput
                keyboardType={null}
                value={data.codigoswift}
                onChangeText={swiftCode =>
                  setData({...data, codigoswift: swiftCode})
                }
                placeholder={'Codigo Swift'}
                image="card-account-details-outline"
              />
              <MyTextInput
                keyboardType={null}
                value={data.banco}
                onChangeText={bancoSeller =>
                  setData({...data, banco: bancoSeller})
                }
                placeholder={'Banco'}
                image="bank"
              />
              <MyTextInput
                keyboardType={null}
                value={data.direccion}
                onChangeText={addressSeller =>
                  setData({...data, direccion: addressSeller})
                }
                placeholder={'Direccion'}
                image="map-marker"
              />
            </>
          ) : null}
          {/*
      <CheckBox
          containerStyle={registroStyles.checkBox}
          textStyle={{color: color.PRINCIPALCOOR}}
          onPress={() => {
            console.log(data);
            console.log(!TC);
            setData({...data, termino: !TC});
            setTC(!TC);
          }}
          checked={TC}
          title="He leído y acepto los términos y condiciones"
          checkedColor={color.PRINCIPALCOLOR}
        />
        */}
          <MyButton
            titulo={
              tags.registerAddScreen.btncompletar != ''
                ? tags.registerAddScreen.btncompletar
                : 'COMPLETAR REGISTRO'
            }
            onPress={() => registrar()}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  function registrar() {
    console.log(data);
    if (data.name == '' || data.name == ' ') {
      Snackbar.show({
        text: 'Datos en blanco Debe Ingresar un Nombre',
        duration: Snackbar.LENGTH_LONG,
      });
    } else if (data.lastname == '' || data.lastname == ' ') {
      Snackbar.show({
        text: 'Datos en blanco Debe Ingresar un Apellido',
        duration: Snackbar.LENGTH_LONG,
      });
    }

    // else if (data.paypal_id == '' || data.paypal_id == ' ') {
    //   Snackbar.show({
    //     text: 'Datos en blanco Debe Ingresar un ID de Paypal',
    //     duration: Snackbar.LENGTH_LONG,
    //   });
    // }
    else if (data.phone == '' || data.phone == ' ') {
      Snackbar.show({
        text: 'Datos en blanco Debe Ingresar un Telefono',
        duration: Snackbar.LENGTH_LONG,
      });
    } else {
      register(data, goToScreen, loginAction, tags.dialogAlertsScreen);
    }
  }
  function goToScreen(routeName) {
    props.navigation.navigate(routeName);
  }

  function setDateData(dateData) {
    let actualDate = new Date();
    let month = dateData.getMonth() + 1;
    let day = dateData.getDate();
    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }
    let edad = actualDate.getFullYear() - dateData.getFullYear();
    let m = actualDate.getMonth() - dateData.getMonth();
    if (m < 0 || (m === 0 && actualDate.getDate() < dateData.getDate())) {
      edad--;
    }
    let myDate = `${dateData.getFullYear()}/${month}/${day}`;
    console.log(myDate, edad);
    if (edad < 18) {
      Snackbar.show({
        text: 'menor de edad, ingrese edad correcta',
        duration: Snackbar.LENGTH_LONG,
      });
    } else {
      setData({...data, birthday: myDate});
      Snackbar.show({
        text: 'fecha guardada',
        duration: Snackbar.LENGTH_LONG,
      });
    }
  }
}
const styles = StyleSheet.create({
  btnDropStyle: {
    width: '100%',
    borderColor: color.GRAY2,
    borderRadius: 15,
  },
  autocompleteContainer: {
    left: 0,

    position: 'absolute',
    right: 0,
    zIndex: 1,
  },
  espacioOpcionesProducto: {
    borderColor: 'grey',
    backgroundColor: color.INPUTCOLOR,
    marginTop: 10,
    borderRadius: 15,
    borderWidth: 1,
    height: Platform.OS === 'ios' ? 120 : 190,
    width: '100%',
  },
  title55: {
    color: color.PRINCIPALCOLOR,
    fontSize: 18,
    fontWeight: '300',
    marginTop: 10,
    marginLeft: 7,
  },
  espacioItemProducto: {
    height: Platform.OS === 'ios' ? 40 : 60,
    width: '100%',
  },
});
