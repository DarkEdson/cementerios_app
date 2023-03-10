import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import {CheckBox} from '@rneui/themed';
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

  const isFocused = useIsFocused();
  const getInitialData = async () => {};

  const [TC, setTC] = useState(false);
  const [birthday, setBirthday] = useState(new Date());
  const [openDate, setOpenDate] = useState(false);
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

  useEffect(() => {
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
          <MyTextInput
            keyboardType={'phone-pad'}
            value={data.phone}
            onChangeText={phones => setData({...data, phone: phones})}
            placeholder={
              tags.registerAddScreen.phone != ''
                ? tags.registerAddScreen.phone
                : 'Phone'
            }
            image="phone"
          />
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
              <SelectDropdown
                data={paisesLista}
                //     defaultValue={defaultLanguage}
                //   defaultValueByIndex={0}
                defaultButtonText={'Pais'}
                buttonTextStyle={{
                  textAlign: 'left',
                  color: color.TEXTCOLOR,
                  marginLeft: 3,
                }}
                buttonStyle={styles.btnDropStyle}
                search
                dropdownStyle={{marginLeft: 15}}
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
                  setData({...data, pais: selectedItem.name});
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
                dropdownStyle={{marginLeft: 15}}
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
});
