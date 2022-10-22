import React from 'react';
import Card from '../Card/index';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

export default function CardColabGeneral(props) {
  return (
    <TouchableOpacity style={styles.cuerpoCard} onPress={props.onPressColab}>
      <View style={{...styles.view, backgroundColor: props.bgColor}}>
        <View style={styles.top}>
          <Image
            style={styles.imgPromocion}
            source={{uri: props.urlImagen}}
            resizeMode="stretch"
          />
        </View>
        <View style={styles.bottom}>
          <Text style={styles.titulo}> {props.nombre} </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cuerpoCard: {
    marginLeft: '5%',
    marginTop: '3%',
    width: '90%',
    height: Dimensions.get('screen').height * 0.3,
  },
  view: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 10,
    marginBottom: 6,
  },
  imgPromocion: {
    marginTop: '5.5%',
    height: '89%',
    width: '95%',
    borderRadius: 30,
  },
  top: {
    width: '80%',
    height: '80%',
    overflow: 'hidden',
    //borderColor: 'black',
    //borderWidth: 1,
    borderRadius: 40,
  },
  bottom: {
    width: '100%',
    height: '30%',
    alignItems: 'center',
    marginBottom: '3%',
  },
});
