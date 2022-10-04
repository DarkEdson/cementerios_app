import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Platform,
  TouchableOpacity,
} from 'react-native';
//Recarga la screen
import {useIsFocused} from '@react-navigation/native';
//URL de server
import {BASE_URL_IMG} from '@utils/config';
//Componentes
import ToolBar from '@Components/common/toolBar';
//Contextos
import {ScreentagContext} from '@context/ScreentagsContext';

//tags.PromotionsScreen.labelpromociones
//tags.PromoScreen.labelbtn != '' ? tags.PromoScreen.labelbtn :
export default function VistaCodigoPromocion(props) {
  const {tags, updateTags} = useContext(ScreentagContext);

  const isFocused = useIsFocused();
  const getInitialData = async () => {};

  // Cargar informacion de la vista
  useEffect(() => {
    if (isFocused) {
      getInitialData();
      console.log('isFocused Promo Code');
    }
    //props, isFocused
  }, []);

  return (
    <View style={styles.vista}>
      <ToolBar
        titulo={
          tags.PromoScreen.titulo != ''
            ? tags.PromoScreen.titulo
            : 'Agregar una promoción'
        }
        onPressLeft={() => goToScreen('Payments')}
        iconLeft={true}
      />
      <View style={styles.searchSection}>
        <TextInput
          style={styles.input}
          placeholder={
            tags.PromoScreen.placeholder != ''
              ? tags.PromoScreen.placeholder
              : 'Ingresa el código de promo...'
          }
        />
      </View>
      <TouchableOpacity style={styles.btnAgregar}>
        <Text style={styles.txtAgregar}>
          {' '}
          {tags.PromoScreen.labelbtn != ''
            ? tags.PromoScreen.labelbtn
            : 'Agregar una promo'}{' '}
        </Text>
      </TouchableOpacity>
    </View>
  );
  function goToScreen(routeName) {
    props.navigation.navigate(routeName);
  }
}

const styles = StyleSheet.create({
  vista: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  titulo: {
    fontWeight: '800',
    fontSize: 30,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 25,
  },
  searchSection: {
    borderBottomWidth: 1,
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
  btnAgregar: {
    width: '80%',
    marginLeft: '10%',
    marginRight: '10%',
    borderRadius: 10,
    backgroundColor: 'skyblue',
    height: 40,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
  },
  txtAgregar: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
  },
});
