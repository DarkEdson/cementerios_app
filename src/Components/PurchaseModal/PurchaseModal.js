//import liraries
import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import {Dialog, Icon, FAB, ListItem, Button} from '@rneui/themed';
//Recarga la screen
import {useIsFocused} from '@react-navigation/native';
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




// create a component
const PurchaseModal = props => {
  const [visible, setVisible] = useState(false);
  const {
    creditCard,
    creditCards,
    setcreditCardSel,
    setisUpdatedCard,
    isLoadingCreditCards,
    updateCard,
    deleteCard
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

  const toggleDialog = () => {
    setVisible(false);
    props.setCustomModal(false);
  };

  useEffect(() => {
    setVisible(props.customModal);
    return () => {};
  }, []);

  return (<View>
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
    <Dialog overlayStyle={{width:'90%'}} isVisible={visible} onBackdropPress={toggleDialog}>
      <Dialog.Title title={  tags.paymentMethodsScreen.titulo != ''
                ? tags.paymentMethodsScreen.titulo
                : 'Metodos de Pago'} />
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
                 
                  onPress={() => {}}
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
                            toggleDialog();
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
                          onPress={() => {}}
                        />
                      </ListItem.Content>
                    </ListItem.Swipeable>
                  ))
                : null}
            </View>
          </ScrollView>
    </Dialog>)}
    </View>
  );

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
};

// define your styles
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


//make this component available to the app
export default PurchaseModal;
