import React from 'react';
import Card from '../Card/index';

import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';

export default function CardColaborador(props) {
  return (
    <TouchableOpacity style={styles.cuerpoCard} onPress={props.onPressColab}>
      <View style={styles.top}>
        <Image
          style={styles.imgCategoria}
          resizeMode="stretch"
          source={{uri: props.urlImagen}}
        />
      </View>
      <View style={styles.bottom}>
        <Text style={styles.titulo}> {props.nombre} </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cuerpoCard: {
    marginLeft: '2%',
    marginTop: '2%',
    marginBottom: '2%',
    width: '50%',
    height: '100%',
  },
  view: {
    flexDirection: 'column',
  },
  top: {
    width: '100%',
    height: '70%',
    overflow: 'hidden',
    //borderColor: 'black',
    //borderWidth: 1,
    borderRadius: 40,
  },
  bottom: {
    width: '100%',
    height: '30%',
    flexDirection: 'row',
    marginBottom: '3%',
  },
  titulo: {
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 18,
    marginTop: 10,
    width: '100%',
    height: '100%',
  },
  imgCategoria: {
    marginVertical: 3.5,
    height: '100%',
    width: '100%',
    //  borderTopRightRadius: 40,
    //  borderTopLeftRadius: 40,
    //  borderBottomLeftRadius: 53,
    // borderBottomRightRadius: 53,
    //   borderRadius: 40,
  },
});
