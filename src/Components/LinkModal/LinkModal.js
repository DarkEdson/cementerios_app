//import liraries
import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StyleSheet, TextInput,KeyboardAvoidingView, Alert, TouchableOpacity, ScrollView} from 'react-native';
import color from '@styles/colors';
import {AirbnbRating, Dialog, CheckBox, Divider} from '@rneui/themed';
import Snackbar from 'react-native-snackbar';
import MyButton from '@Components/common/MyButton';
import MyTextInput from '@Components/common/MyTextInput';
import {ShoppingCartContext} from '@context/ShoppingCartContext';
import Card from '../Card';
import PhoneTextInput from '../common/PhoneTextInput';
import {CurrenciesContext} from '../../context/CurrencyContext';
// create a component
const LinkModal = props => {
  const [visible, setVisible] = useState(false);
  const {removeAllItemstoCart} = useContext(ShoppingCartContext);
  const {paisesLista, getListaPaises} = useContext(CurrenciesContext);
  const [comment, setComment] = useState('');
  const [checked, setChecked] = useState(3);
  const [filtroPaises, setfiltroPaises] = useState([]);
  const [codigoPais, setcodigoPais] = useState(null)
  const [userPhone, setuserPhone] = useState(null)
  const [boolPhone, setboolPhone] = useState(false)
  const [tags, settags] = useState({
    btncancelar: 'CANCEL',
    btnconfirmar: 'CONFIRM',
    titulo: 'Calificar',
  });
  const [data, setData] = useState({
    name: '',
    lastname: '',
    email: '',
    phone: '',
    nit: '',
  });

  const toggleDialog = () => {
    setVisible(false);
    props.setCustomModal(false);
  };

  useEffect(() => {
    settags(props.tags);
    setVisible(props.customModal);
    getListaPaises();
    (async () => {
      let paisList = await getListaPaises();
      console.log(paisList)
      setfiltroPaises(paisList);
    })();
    return () => {};
  }, []);

  return (
    <ScrollView>
    <Dialog isVisible={visible} onBackdropPress={toggleDialog} overlayStyle={{width: '98%'}}>
      <Dialog.Title title={'Info'} />
      <KeyboardAvoidingView  behavior="padding">
      <Text style={styles.titleLabel}>
        {props.tags.EditUserScreen.name != ''
          ? props.tags.EditUserScreen.name
          : 'Nombres'}
      </Text>
      <MyTextInput
        keyboardType={null}
        placeholder={
          props.tags.EditUserScreen.name != ''
            ? props.tags.EditUserScreen.name
            : 'Nombres'
        }
        value={data.name}
        onChangeText={nombre => setData({...data, name: nombre})}
        image="account-circle"
      />
      <Text style={styles.titleLabel}>
        {props.tags.EditUserScreen.lastname != ''
          ? props.tags.EditUserScreen.lastname
          : 'Apellidos'}
      </Text>
      <MyTextInput
        keyboardType={null}
        value={data.lastname}
        onChangeText={apellido => setData({...data, lastname: apellido})}
        placeholder={
          props.tags.EditUserScreen.lastname != ''
            ? props.tags.EditUserScreen.lastname
            : 'Apellidos'
        }
        image="account-circle"
      />
      <Text style={styles.titleLabel}>
        {props.tags.EditUserScreen.email != ''
          ? props.tags.EditUserScreen.email
          : 'e-mail'}
      </Text>
      <MyTextInput
        keyboardType={null}
        value={data.email}
        onChangeText={correo => setData({...data, email: correo})}
        placeholder={
          props.tags.EditUserScreen.email != ''
            ? props.tags.EditUserScreen.email
            : 'e-mail'
        }
        image="email"
      />
      <Text style={styles.titleLabel}>
        {props.tags.EditUserScreen.phone != ''
          ? props.tags.EditUserScreen.phone
          : 'phone'}
      </Text>
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
              props.tags.EditUserScreen.phone != ''
                ? props.tags.EditUserScreen.phone
                : 'phone'
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
      {/* <MyTextInput
        keyboardType={null}
        value={data.phone}
        onChangeText={tel => setData({...data, phone: tel})}
        placeholder={
          props.tags.EditUserScreen.phone != ''
            ? props.tags.EditUserScreen.phone
            : 'phone'
        }
        image="card-account-details"
      /> */}
      <Text style={styles.titleLabel}>{props.tags.dialogAlertsScreen.y}</Text>
      <MyTextInput
        keyboardType={null}
        value={data.nit}
        onChangeText={nitClient => setData({...data, nit: nitClient})}
        placeholder={props.tags.dialogAlertsScreen.y}
        image="identifier"
      />
    </KeyboardAvoidingView>
      <Dialog.Actions>
        <Dialog.Button
          title={
            props.tags.sedeSelectScreen.btnconfirmar != ''
              ? props.tags.sedeSelectScreen.btnconfirmar
              : 'CONFIRMAR'
          }
          onPress={() => {
            dataUser();
          }}
        />
        <Dialog.Button
          title={
            props.tags.sedeSelectScreen.btncancelar != ''
              ? props.tags.sedeSelectScreen.btncancelar
              : 'CANCEL'
          }
          onPress={toggleDialog}
        />
      </Dialog.Actions>
    </Dialog>
    </ScrollView>
  );

  function dataUser() {
    let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (data.name == '') {
      mensajeSnack(
        props.tags.EditUserScreen.whitename != ''
          ? props.tags.EditUserScreen.whitename
          : 'Nombre en Blanco',
      );
    } else if (data.lastname == '') {
      mensajeSnack(
        props.tags.EditUserScreen.whitelastname != ''
          ? props.tags.EditUserScreen.whitelastname
          : 'Apellido en Blanco',
      );
    } else if (data.email == '') {
      mensajeSnack(
        props.tags.EditUserScreen.whiteemail != ''
          ? props.tags.EditUserScreen.whiteemail
          : 'Correo en Blanco',
      );
    } else if (data.email.match(validRegex)) {
      let sendInfo = {
        clientData: [data],
        shoppingCart: [props.shoppingCart],
        sellerID: props.shoppingCart.idUser,
      };
      console.log('INFO a Enviar', sendInfo);
      props.generaLink(sendInfo);
      toggleDialog();
      Alert.alert(
        'Link Alert',
        `${props.tags.dialogAlertsScreen.t} ${data.email}, ${props.tags.dialogAlertsScreen.u}`,
        [
          {
            text: 'Ok',
            onPress: () => {
              toggleDialog();
              removeAllItemstoCart();
              props.goToScreen('Initial');
            },
            style: 'cancel',
          },
        ],
      );
    } else {
      mensajeSnack(`${props.tags.dialogAlertsScreen.v}`);
    }
  }

  function mensajeSnack(msj) {
    Snackbar.show({
      text: msj,
      duration: Snackbar.LENGTH_LONG,
    });
  }
};

// define your styles
const styles = StyleSheet.create({
  imgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    fontWeight: '700',
    fontSize: 23,
    textAlign: 'left',
    marginTop: 5,
    marginBottom: 5,
  },
  searchIcon: {
    padding: 10,
  },
  viewButton: {
    marginLeft: 10,
    marginRight: 80,
    width: '10%',
    height: '19.2%',
  },
  container: {backgroundColor: 'white', borderWidth: 0},
  btnIconBack2: {
    alignItems: 'center',
    width: '10%',
    justifyContent: 'center',
    marginVertical: '10%',
    borderRadius: 15,
    elevation: 3,
    backgroundColor: color.PRINCIPALCOLOR,
    height: 32,
  },
});

//make this component available to the app
export default LinkModal;
