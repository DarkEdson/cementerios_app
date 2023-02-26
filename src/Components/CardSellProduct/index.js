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
    <TouchableOpacity
      style={[styles.cuerpoCard, props.styles]}
      onPress={props.onPressProduct}
    >
      <View style={{...styles.view, backgroundColor: props.bgColor}}>
        <View style={styles.right}>
          <Image style={styles.imgPromocion} source={{uri: props.urlImagen}} />
        </View>
        <View style={styles.center}>
          <Text style={styles.titulo}> {props.titulo} </Text>
          <Text numberOfLines={3} style={styles.descripcion}>
            {props.descripcion}
          </Text>
          <Text
            style={
              props.precio.length <= 8
                ? styles.precio
                : props.precio.length >= 10
                ? styles.precio100k
                : styles.precio10k
            }
          >
            {props.moneda + '.' + props.precio}
          </Text>
          <Text style={styles.cantidad}>x{props.cantidad}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cuerpoCard: {
    width: '110%',
    marginLeft: Dimensions.get('screen').width * -0.025,
    height: 100,
    // backgroundColor: color.GRAY,
  },
  view: {
    flexDirection: 'row',
    borderRadius: 15,
  },
  center: {
    // borderColor: 'red',
    //borderWidth: 1,
    width: '60%',
    height: '100%',
    flexDirection: 'column',
    paddingLeft: 10,
  },
  left: {
    //borderColor: 'red',
    // borderWidth: 1,
    alignItems: 'flex-start',
    width: '29%',
    height: '80%',
    paddingTop: 15,
    flexDirection: 'column',
    paddingLeft: 3,
  },
  right: {
    marginTop: 10,
    width: '40%',
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
    fontSize: 20,
  },
  precio10k: {
    fontWeight: 'bold',
    color: 'skyblue',
    fontSize: 12,
  },
  precio100k: {
    fontWeight: 'bold',
    color: 'skyblue',
    fontSize: 11,
  },
  imgPromocion: {
    height: '100%',
    width: '100%',
    borderRadius: 15,
  },
});
