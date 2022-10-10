import React from 'react';
import Card from '../Card/index';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';

export default function CardProducto(props) {
  return (
    <TouchableOpacity style={styles.cuerpoCard} onPress={props.onPressProduct}>
      <View style={{...styles.view, backgroundColor: props.bgColor}}>
        <View style={styles.right}>
          <Image
            style={styles.imgPromocion}
            source={{uri: props.urlImagen}}
            resizeMode="cover"
          />
        </View>
        <View style={styles.left}>
          <Text style={styles.titulo}> {props.titulo} </Text>
          <Text numberOfLines={1} style={styles.descripcion}>
            {props.descripcion}
          </Text>
          <Text style={styles.precio}> {props.moneda ? props.moneda+'.'+props.precio: 'View Price Inside'} </Text>
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
    height: 100,
    elevation: 2,
    backgroundColor: '#fff',
    shadowOffset: {width: 1, height: 1},
    shadowColor: '#333',
    shadowOpacity: 0.17,
    shadowRadius: 2,
    borderRadius: 15,
  },
  view: {
    flexDirection: 'row',
  },
  left: {
    width: '65%',
    height: '100%',
    flexDirection: 'column',
    paddingLeft: '7%',
  },
  right: {
    width: '25%',
    height: '100%',
    flexDirection: 'column',
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10,
    marginBottom: 6,
  },
  descripcion: {
    fontWeight: '400',
    color: 'grey',
    fontSize: 15,
    marginBottom: 10,
  },
  precio: {
    fontWeight: 'bold',
    color: 'skyblue',
    fontSize: 15,
  },
  imgPromocion: {
    marginTop: '8.5%',
    marginLeft: '10%',
    height: '89%',
    width: '100%',
    borderRadius: 15,
  },
});
