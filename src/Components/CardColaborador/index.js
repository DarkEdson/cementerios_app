import React from 'react';
import Card from '../Card/index';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';

export default function CardColaborador(props) {
  return (
    <TouchableOpacity style={styles.cuerpoCard} onPress={props.onPressColab}>
      <View style={styles.view}>
        <View style={styles.top}>
          <Card>
            <Image
              style={styles.imgCategoria}
              resizeMode='stretch'
              source={{uri: props.urlImagen}}
            />
          </Card>
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
    marginLeft: '2%',
    marginTop: '3%',
    marginBottom: '3%',
    width: '65%',
    height: 240,
    borderRadius: 12,
  },
  view: {
    flexDirection: 'column',
  },
  top: {
    width: '98%',
    height: '70%',
    margin: '1%',
    flexDirection: 'row',
  },
  bottom: {
    width: '100%',
    height: '30%',
    flexDirection: 'row',
    marginBottom: '5%',  
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
    height: '100%',
    width: '100%',
    borderRadius: 12,
  },
});
