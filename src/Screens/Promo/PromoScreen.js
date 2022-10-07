import React, {useState, useEffect, useContext} from 'react';
import {Text, View, StyleSheet, StatusBar, SafeAreaView,ScrollView} from 'react-native';
//Recarga la screen
import {useIsFocused} from '@react-navigation/native';
//Estilos Generales
import color from '@styles/colors';
import {loginStyles, mainStyles} from '@styles/stylesGeneral';
//Componentes
import ToolBar from '@Components/common/toolBar';
import CardPromocion from '@Components/CardPromocion/';
//Contextos
import {ScreentagContext} from '@context/ScreentagsContext';
import { PromotionsContext } from '@context/PromotionsContext';

//tags.PromotionsScreen.labelpromociones
//tags.PromotionsScreen.labelpromociones != '' ? tags.PromotionsScreen.labelpromociones :
export default function PromoScreen(props) {
  const {tags, updateTags} = useContext(ScreentagContext);
  const {
    Promotions,
  } = useContext(PromotionsContext)

  const isFocused = useIsFocused();
  const getInitialData = async () => {};

  // Cargar informacion de la vista
  useEffect(() => {
    // Actualizar valores de la vista
    if (isFocused) {
      getInitialData();
      console.log('isFocused Promo');
    }
    //props, isFocused
  }, []);

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
          tags.PromotionsScreen.labelpromociones != ''
            ? tags.PromotionsScreen.labelpromociones
            : 'Promociones.'
        }
        onPressLeft={() => goToScreen('Initial')}
        iconLeft={true}
      />

      <ScrollView style={styles.scroll}>
        <View>
          {Promotions.map((promo, key) => {
            return (
              <CardPromocion
                key={key}
                titulo={promo.name}
                descripcion={promo.description}
                bgColor={promo.backgroundcolor}
                urlImagen={promo.image}
              />
            );
          })}
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
  titulo: {
    fontWeight: '800',
    fontSize: 30,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 25,
  },
  scroll: {
    height: '90%',
  },
});
