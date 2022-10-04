import React, {useState, useEffect, useContext} from 'react';
import {Text, View, StyleSheet, StatusBar, ScrollView} from 'react-native';
//Recarga la screen
import {useIsFocused} from '@react-navigation/native';
//Estilos Generales
import color from '@styles/colors';
//Componentes
import ToolBar from '@Components/common/toolBar';
import CardPromocion from '@Components/CardPromocion/';
//Contextos
import {ScreentagContext} from '@context/ScreentagsContext';

//tags.PromotionsScreen.labelpromociones
//tags.PromotionsScreen.labelpromociones != '' ? tags.PromotionsScreen.labelpromociones :
export default function PromoScreen(props) {
  const {tags, updateTags} = useContext(ScreentagContext);

  const isFocused = useIsFocused();
  const getInitialData = async () => {};

  // Cargar informacion de la vista
  useEffect(() => {
    // Actualizar valores de la vista
    setPropsVista({
      descuentos: [
        {
          titulo: '30% de descuento',
          descripcion:
            'Descuesto en momentos y memorias al adquir un espacio en el cementerio',
          bgColor: '#fadf8e',
          urlImagen:
            'https://img.freepik.com/vector-premium/chico-dibujos-animados-buceo_33070-3880.jpg?w=2000',
        },
        {
          titulo: '40% de descuento',
          descripcion: 'Descuento en viaje en lancha en acuatic.',
          bgColor: '#f5c48c',
          urlImagen:
            'https://img.freepik.com/vector-premium/chico-dibujos-animados-buceo_33070-3880.jpg?w=2000',
        },
        {
          titulo: '30% de descuento',
          descripcion:
            'Descuesto en momentos y memorias al adquir un espacio en el cementerio',
          bgColor: '#fadf8e',
          urlImagen:
            'https://img.freepik.com/vector-premium/chico-dibujos-animados-buceo_33070-3880.jpg?w=2000',
        },
        {
          titulo: '40% de descuento',
          descripcion: 'Descuento en viaje en lancha en acuatic.',
          bgColor: '#f5c48c',
          urlImagen:
            'https://img.freepik.com/vector-premium/chico-dibujos-animados-buceo_33070-3880.jpg?w=2000',
        },
        {
          titulo: '30% de descuento',
          descripcion:
            'Descuesto en momentos y memorias al adquir un espacio en el cementerio',
          bgColor: '#fadf8e',
          urlImagen:
            'https://img.freepik.com/vector-premium/chico-dibujos-animados-buceo_33070-3880.jpg?w=2000',
        },
        {
          titulo: '40% de descuento',
          descripcion: 'Descuento en viaje en lancha en acuatic.',
          bgColor: '#f5c48c',
          urlImagen:
            'https://img.freepik.com/vector-premium/chico-dibujos-animados-buceo_33070-3880.jpg?w=2000',
        },
        {
          titulo: '30% de descuento',
          descripcion:
            'Descuesto en momentos y memorias al adquir un espacio en el cementerio',
          bgColor: '#fadf8e',
          urlImagen:
            'https://img.freepik.com/vector-premium/chico-dibujos-animados-buceo_33070-3880.jpg?w=2000',
        },
        {
          titulo: '40% de descuento',
          descripcion: 'Descuento en viaje en lancha en acuatic.',
          bgColor: '#f5c48c',
          urlImagen:
            'https://img.freepik.com/vector-premium/chico-dibujos-animados-buceo_33070-3880.jpg?w=2000',
        },
        {
          titulo: '30% de descuento',
          descripcion:
            'Descuesto en momentos y memorias al adquir un espacio en el cementerio',
          bgColor: '#fadf8e',
          urlImagen:
            'https://img.freepik.com/vector-premium/chico-dibujos-animados-buceo_33070-3880.jpg?w=2000',
        },
        {
          titulo: '40% de descuento',
          descripcion: 'Descuento en viaje en lancha en acuatic.',
          bgColor: '#f5c48c',
          urlImagen:
            'https://img.freepik.com/vector-premium/chico-dibujos-animados-buceo_33070-3880.jpg?w=2000',
        },
      ],
    });
    if (isFocused) {
      getInitialData();
      console.log('isFocused Promo');
    }
  }, [props, isFocused]);

  // Variables de la vista
  const [propsVista, setPropsVista] = useState({
    descuentos: [],
  });

  return (
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
          {propsVista.descuentos.map((promo, key) => {
            return (
              <CardPromocion
                key={key}
                titulo={promo.titulo}
                descripcion={promo.descripcion}
                bgColor={promo.bgColor}
                urlImagen={promo.urlImagen}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
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
