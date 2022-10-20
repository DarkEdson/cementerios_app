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
import Snackbar from 'react-native-snackbar';
import {Icon, FAB, ListItem, Button} from '@rneui/themed';
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
import {UsuarioContext} from '@context/UsuarioContext';
import {CreditCardContext} from '@context/CreditCardContext';
import {ScreentagContext} from '@context/ScreentagsContext';

//tags.paymentMethodsScreen.btn != '' ? tags.paymentMethodsScreen.btn :
export default function PaymentMethodScreen(props) {
  const {
    creditCard,
    creditCards,
    setcreditCardSel,
    setisUpdatedCard,
    isLoadingCreditCards,
    updateCard,
    deleteCard,
  } = useContext(CreditCardContext);
  const [loginUser] = useContext(UsuarioContext);
  const {tags} = useContext(ScreentagContext);

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
    console.log('CREDIT CARD?', creditCard);
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
      console.log('isFocused CREDIT CARDS');
    }
    //props, isFocused
  }, []);

  return (
    <SafeAreaView style={mainStyles.containers}>
      {isLoadingCreditCards ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '50%',
          }}>
          <FAB
            loading
            color={color.PRINCIPALCOLOR}
            visible={isLoadingCreditCards}
            icon={{name: 'add', color: 'white'}}
            size="small"
          />
        </View>
      ) : (
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
              {creditCards.length >= 1 ? (
                <PaymentButton
                  iconLeft={true}
                  titulo={'XXXX-XXXX-XXXX-' + creditCard.last4}
                  iconRight={true}
                  onPress={() => selectCard(creditCard)}
                />
              ) : (
                <Text style={styles.titleLabel} />
              )}
              <Text style={styles.titleLabel}>
                {tags.paymentMethodsScreen.tarjetas != ''
                  ? tags.paymentMethodsScreen.tarjetas
                  : 'Tarjetas:'}
              </Text>
              {creditCards.length >= 1
                ? creditCards.map((card, key) => (
                    <ListItem.Swipeable
                      key={key}
                      bottomDivider
                      leftContent={() => (
                        <Button
                          title={
                            tags.paymentMethodsScreen.preferido != ''
                              ? tags.paymentMethodsScreen.preferido
                              : 'Favorite'
                          }
                          onPress={() => {
                            updateCard(card, loginUser.usuario)
                          }}
                          icon={{name: 'favorite', color: 'white'}}
                          buttonStyle={{
                            minHeight: '100%',
                            backgroundColor: color.PRINCIPALCOLOR,
                          }}
                        />
                      )}
                      rightContent={() => (
                        <Button
                          title={
                            tags.PaymentScreen.deleteBtn != ''
                              ? tags.PaymentScreen.deleteBtn
                              : 'Delete'
                          }
                          onPress={() => borrarCard(card)}
                          icon={{name: 'delete', color: 'white'}}
                          buttonStyle={{
                            minHeight: '100%',
                            backgroundColor: 'red',
                          }}
                        />
                      )}>
                      <ListItem.Content>
                        <PaymentButton
                          key={key}
                          iconLeft={true}
                          titulo={'XXXX-XXXX-XXXX-' + card.last4}
                          iconRight={false}
                          onPress={() => selectCard(card)}
                        />
                      </ListItem.Content>
                      <ListItem.Chevron />
                    </ListItem.Swipeable>
                  ))
                : null}
              <MyButton
                titulo={
                  tags.paymentMethodsScreen.btn != ''
                    ? tags.paymentMethodsScreen.btn
                    : 'Crear Tarjeta'
                }
                onPress={() => newCard()}
              />
            </View>
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );

  function selectCard(card) {
    setisUpdatedCard(true);
    let month = '00';
    if (parseInt(card.exp_month) <= 9) {
      month = `0${card.exp_month}`;
    } else {
      month = card.exp_month;
    }
    setcreditCardSel({
      ...creditCard,
      cardNumber: `0000-0000-0000-${card.last4}`,
      cardHolderName: loginUser.usuario.name,
      nameSurname: loginUser.usuario.lastname,
      mmYY: `${month}/${card.exp_year}`,
      expiration: `${month}/${card.exp_year}`,
      securityCode: '000',
      brand: card.brand,
    });
    goToScreen('PaymentDetails');
  }

  function newCard() {
    setisUpdatedCard(false);
    setcreditCardSel({
      ...creditCard,
      cardNumber: '',
      cardHolderName: '',
      nameSurname: '',
      mmYY: '',
      expiration: '',
      securityCode: '',
      brand: '',
    });
    goToScreen('PaymentDetails');
  }

  function borrarCard(card) {
    console.log('card a borrar', card);
    if (creditCards.length <= 1) {
      Snackbar.show({
        text:
          tags.paymentMethodsScreen.cardmsg != ''
            ? tags.paymentMethodsScreen.cardmsg
            : 'Debe tener minimo una tarjeta registrada',
        duration: Snackbar.LENGTH_LONG,
      });
    } else {
      Alert.alert(
        tags.paymentMethodsScreen.deletetitle != ''
          ? tags.paymentMethodsScreen.deletetitle
          : 'Borrar Tarjeta',
        tags.dialogAlertsScreen.n != ''
          ? tags.dialogAlertsScreen.n
          : '¿Esta seguro que \ndesea eliminar la tarjeta?',
        [
          {
            text:
              tags.closeSessionScreen.btnsi != ''
                ? tags.closeSessionScreen.btnsi
                : 'Si',
            onPress: () => {
              deleteCard(card, loginUser.usuario);
            },
          },
          {
            text:
              tags.closeSessionScreen.btnno != ''
                ? tags.closeSessionScreen.btnno
                : 'No',
            onPress: () => {},
            style: 'cancel',
          },
        ],
      );
    }

    //F
    //
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
