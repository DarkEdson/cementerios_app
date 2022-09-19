import React from 'react';
import color from '@styles/colors';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';

export default function CardProductoVenta(props) {
  return (
    <TouchableOpacity style={styles.cuerpoCard} onPress={props.onPressProduct}>
      <View style={{...styles.view, backgroundColor: props.bgColor}}>
        <View style={styles.right}>
          <Image style={styles.imgPromocion} source={{uri: props.urlImagen}} />
        </View>
        <View style={styles.center}>
          <Text style={styles.titulo}> {props.titulo} </Text>
          <Text numberOfLines={4} style={styles.descripcion}>
            {props.descripcion}
          </Text>
        </View>
        <View style={styles.left}>
          <Text style={styles.precio}>US{props.precio} </Text>
          <Text style={styles.cantidad}>x{props.cantidad}</Text>
        </View>
      </View>
      <View
        style={{
          marginHorizontal: '7%',
          marginVertical: 5,
          width: '85%',
          borderBottomColor: color.GRAY,
          borderBottomWidth: 2,
        }}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cuerpoCard: {
    marginLeft: '5%',
    marginVertical: '2.5%',
    width: '90%',
    height: 100,
    backgroundColor: '#fff',
  },
  view: {
    flexDirection: 'row',
  },
  center: {
    width: '52%',
    height: '100%',
    flexDirection: 'column',
    paddingLeft: 10,
  },
  left: {
    width: '23%',
    height: '100%',
    paddingTop: 10,
    flexDirection: 'column',
    paddingLeft: 10,
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
  cantidad: {
    fontWeight: '600',
    color: 'grey',
    fontSize: 15,
    marginLeft: 55,
    marginTop: 25,
    marginBottom: 10,
  },
  precio: {
    fontWeight: 'bold',
    color: 'skyblue',
    fontSize: 15,
  },
  imgPromocion: {
    height: '100%',
    width: '100%',
    borderRadius: 15,
  },
});
