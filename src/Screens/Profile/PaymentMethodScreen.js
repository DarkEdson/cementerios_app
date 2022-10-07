import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
//Recarga la screen
import {useIsFocused} from '@react-navigation/native';
//URL de server
import {BASE_URL_IMG} from '@utils/config';
//Estilos Generales
import {mainStyles} from '@styles/stylesGeneral';
import color from '@styles/colors';
//Componentes
import ToolBar from '@Components/common/toolBar';
import PaymentButton from '@Components/common/paymentButton';
import MyButton from '@Components/common/MyButton';
//Contextos
import {CreditCardContext} from '@context/CreditCardContext';
import {ScreentagContext} from '@context/ScreentagsContext';

//tags.paymentMethodsScreen.btn != '' ? tags.paymentMethodsScreen.btn :
export default function PaymentMethodScreen(props) {
  const [creditCard, setCreditCard] = useContext(CreditCardContext);
  const {tags, updateTags} = useContext(ScreentagContext);

  const isFocused = useIsFocused();
  const getInitialData = async () => {};

  const [data, setData] = useState({
    cardNumber: '',
    cardHolderName: '',
    nameSurname: '',
    mmYY: '',
    expiration: '',
    securityCode: '',
    brand: '',
  });
  useEffect(() => {
    setData({
      ...data,
      cardNumber: '5425 2334 3010 9903',
      cardHolderName: 'Edson',
      nameSurname: 'Aju',
      mmYY: '04/2023',
      expiration: '',
      securityCode: '',
      brand: 'mastercard',
    });
    if (isFocused) {
      getInitialData();
      console.log('isFocused Promo Code');
    }
    //props, isFocused
  }, []);

  return (
    <SafeAreaView style={mainStyles.containers} > 
    <View style={styles.container}>
      <StatusBar
        backgroundColor={color.PRINCIPALCOLOR}
        barStyle="dark-content"
        translucent={true}
      />
      <ToolBar
        titulo={
          tags.paymentMethodsScreen.titulo != ''
            ? tags.paymentMethodsScreen.titulo
            : 'Metodos de Pago'
        }
        onPressLeft={() => goToScreen('PersonalData')}
        iconLeft={true}
      />

      <ScrollView>
        <View style={styles.editField}>
          <Text style={styles.titleLabel}>
            {tags.paymentMethodsScreen.preferido != ''
              ? tags.paymentMethodsScreen.preferido
              : 'Preferido:'}
          </Text>
          <PaymentButton
            iconLeft={true}
            titulo={'XXXX-XXXX-XXXX-5678'}
            iconRight={true}
          />
          <Text style={styles.titleLabel}>
            {tags.paymentMethodsScreen.tarjetas != ''
              ? tags.paymentMethodsScreen.tarjetas
              : 'Tarjetas:'}
          </Text>
          <PaymentButton
            iconLeft={true}
            titulo={'XXXX-XXXX-XXXX-0123'}
            iconRight={true}
          />
          <PaymentButton
            iconLeft={true}
            titulo={'XXXX-XXXX-XXXX-9595'}
            iconRight={true}
            onPress={() => selectCard(data)}
          />
          <PaymentButton
            iconLeft={true}
            titulo={'XXXX-XXXX-XXXX-2345'}
            iconRight={true}
            //  onPress={() => goToScreen("PaymentMethodDetail")}
          />
          <PaymentButton
            iconLeft={true}
            titulo={'XXXX-XXXX-XXXX-4567'}
            iconRight={true}
          />
          <MyButton
            titulo={
              tags.paymentMethodsScreen.btn != ''
                ? tags.paymentMethodsScreen.btn
                : 'Guardar Cambios'
            }
            onPress={() => {}}
          />
        </View>
      </ScrollView>
    </View>
    </SafeAreaView>
  );

  function selectCard(card) {
    setCreditCard({
      ...creditCard,
      cardNumber: card.cardNumber,
      cardHolderName: card.cardHolderName,
      nameSurname: card.nameSurname,
      mmYY: card.mmYY,
      expiration: card.expiration,
      securityCode: '',
      brand: card.brand,
    });
    goToScreen('PaymentDetails');
  }
  function goToScreen(routeName) {
    props.navigation.navigate(routeName);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  titleLabel: {
    fontWeight: 'bold',
  },
  editField: {
    marginTop: 5,
    paddingHorizontal: 20,
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
