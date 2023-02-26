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

export default function CardProductoCarrito(props) {
  return (
    <>
      <View style={styles.view}>
        <View style={styles.right}>
          <Image
            style={styles.imgPromocion}
            resizeMode="cover"
            source={{uri: props.urlImagen}}
          />
        </View>
        <View style={styles.left}>
          <Text style={styles.titulo}> {props.titulo} </Text>
          <Text numberOfLines={3} style={styles.descripcion}>
            {props.descripcion}
          </Text>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
            }}
          >
            <Text style={styles.precio}>
              {props.moneda + '.' + props.precio}
            </Text>
          </View>
          <View style={styles.cantButtons}>
            <TouchableOpacity
              style={styles.btnCant}
              onPress={() => {
                if (props.cantidad <= 1) {
                  console.log('no puede ser 0');
                } else {
                  props.resta(props.producto);
                }
                console.log(props.producto);
              }}
            >
              <Text style={styles.txtCantBtn}> - </Text>
            </TouchableOpacity>
            <View style={styles.cantBox}>
              <Text style={styles.cantidad}>{props.cantidad}</Text>
            </View>
            <TouchableOpacity
              style={styles.btnCant}
              onPress={() => {
                props.suma(props.producto);
                console.log(props.producto);
              }}
            >
              <Text style={styles.txtCantBtn}> + </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
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
  cantBox: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 5,
    width: 50,
    height: 25,
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
    width: '60%',
    height: '100%',
    paddingTop: 15,
    flexDirection: 'column',
    paddingLeft: 5,
  },
  right: {
    width: '40%',
    height: '75%',
    flexDirection: 'column',
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: -10,
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
    color: 'black',
    fontSize: 15,
    marginHorizontal: 20,
  },
  precio: {
    fontWeight: 'bold',
    color: 'skyblue',
    fontSize: 19,
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
    resizeMode: 'contain',
    borderRadius: 15,
    marginTop: 18,
  },
  btnCant: {
    borderWidth: 1,
    borderColor: 'skyblue',
    width: 35,
    height: 35,
    borderRadius: 35,
    marginLeft: 10,
    marginRight: 10,
    alignContent: 'center',
    justifyContent: 'center',
  },
  txtCantBtn: {
    fontSize: 17,
    fontWeight: '800',
    color: 'skyblue',
    textAlign: 'center',
  },
  cantButtons: {flexDirection: 'row', marginTop: 10, marginHorizontal: 20},
});
