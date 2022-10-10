import React from 'react';
import color from '@styles/colors';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

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
          <Text style={styles.precio}>
            {props.moneda + '.' + props.precio}{' '}
          </Text>
          <Text style={styles.cantidad}>x{props.cantidad}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cuerpoCard: {
    width: '100%',
    height: 80,
    backgroundColor: '#fff',
  },
  view: {
    flexDirection: 'row',
  },
  center: {
    width: '55%',
    height: '100%',
    flexDirection: 'column',
    paddingLeft: 10,
  },
  left: {
    width: '30%',
    height: '80%',
    paddingTop: 15,
    flexDirection: 'column',
    paddingLeft: 15,
  },
  right: {
    marginTop: 10,
    width: '20%',
    height: '75%',
    flexDirection: 'column',
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 10,
    marginBottom: 6,
  },
  descripcion: {
    fontWeight: '400',
    color: 'grey',
    fontSize: 13,
    marginBottom: 10,
  },
  cantidad: {
    fontWeight: '600',
    color: 'grey',
    fontSize: 13,
    marginLeft: 37,
    marginTop: 25,
    marginBottom: 10,
  },
  precio: {
    fontWeight: 'bold',
    color: 'skyblue',
    fontSize: 14,
  },
  imgPromocion: {
    height: '100%',
    width: '100%',
    borderRadius: 15,
  },
});
