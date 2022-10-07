import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  StatusBar,
  Alert,
} from 'react-native';
//Recarga la screen
import {useIsFocused} from '@react-navigation/native';
//Estilos Generales
import {mainStyles} from '@styles/stylesGeneral';
import color from '@styles/colors';
//Componentes
import ToolBar from '@Components/common/toolBar';
import MyButton from '@Components/common/MyButton';
import CreditCard from 'react-native-credit-card-form-ui';
//Contextos
import {CreditCardContext} from '@context/CreditCardContext';
import {ScreentagContext} from '@context/ScreentagsContext';

//tags.PaymentCardDetailScreen.guardar != '' ? tags.PaymentCardDetailScreen.guardar :
export default function PaymentDetailScreen(props) {
  const [creditCard, setCreditCard] = useContext(CreditCardContext);
  const {tags, updateTags} = useContext(ScreentagContext);

  const isFocused = useIsFocused();
  const getInitialData = async () => {};

  const [dataCard, setDataCard] = useState({
    cardNumber: '',
    cardHolderName: '',
    nameSurname: '',
    mmYY: '',
    expiration: '',
    securityCode: '',
    brand: '',
  });
  useEffect(() => {
    setDataCard({
      ...dataCard,
      cardNumber: creditCard.cardNumber,
      cardHolderName: creditCard.cardHolderName,
      nameSurname: creditCard.nameSurname,
      mmYY: creditCard.mmYY,
      expiration: creditCard.expiration,
      securityCode: creditCard.securityCode,
      brand: creditCard.brand,
    });
  }, []);
  const creditCardRef = React.useRef();

  const handleSubmit = React.useCallback(() => {
    if (creditCardRef.current) {
      const {error, data} = creditCardRef.current.submit();
      if (error != null) {
        console.log('ERROR: ', error);
      }
      console.log('CARD DATA: ', data);
      console.log('CONTEXT DATA', dataCard);
    }
    if (isFocused) {
      getInitialData();
      console.log('isFocused Promo');
    }
  }, [props, isFocused]);
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
          tags.PaymentCardDetailScreen.titulo != ''
            ? tags.PaymentCardDetailScreen.titulo
            : 'Detalles de Tarjeta'
        }
        onPressLeft={() => goToScreen('PaymentMethod')}
        iconLeft={true}
      />

      <View style={styles.editField}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={20}
          style={styles.containerCard}>
          <CreditCard
            ref={creditCardRef}
            background="gray"
            placeholderTextColor={color.WHITE}
            textColor={color.BLACK}
            labels={{
              holder:
                tags.PaymentCardDetailScreen.titular != ''
                  ? tags.PaymentCardDetailScreen.titular
                  : 'Titular de tarjeta',
              expiration:
                tags.PaymentCardDetailScreen.vence != ''
                  ? tags.PaymentCardDetailScreen.vence
                  : 'Vencimiento',
              cvv:
                tags.PaymentCardDetailScreen.securecode != ''
                  ? tags.PaymentCardDetailScreen.securecode
                  : 'codigo de seguridad',
            }}
            placeholders={{
              number: '0000 0000 0000 0000',
              holder: 'titular de tarjeta',
              expiration: 'MM/YYYY',
              cvv: '000',
            }}
            initialValues={{
              number: creditCard.cardNumber,
              holder: creditCard.cardHolderName + ' ' + creditCard.nameSurname,
              expiration: creditCard.mmYY,
              cvv: '',
              brand: creditCard.brand,
            }}
          />
          <View style={styles.boxTransparent} />
          <MyButton
            titulo={
              tags.PaymentCardDetailScreen.guardar != ''
                ? tags.PaymentCardDetailScreen.guardar
                : 'Guardar'
            }
            onPress={handleSubmit}
          />
        </KeyboardAvoidingView>
      </View>
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
  },
  boxTransparent: {
    backgroundColor: 'white',
    marginBottom: Dimensions.get('screen').height * 0.05,
  },
  containerCard: {
    height: '70%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleLabel: {
    fontWeight: 'bold',
  },
  editField: {
    marginTop: 20,
    height: '80%',
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
