import React from 'react';
import Card from '../Card/index';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';

export default function BtnCategoria(props) {
  return (
    <TouchableOpacity
      style={styles.cuerpoCard}
      onPress={props.onPressCategorie}>
      <Card>
        <View style={styles.view}>
          <View style={styles.top}>
            <Image
              style={styles.imgCategoria}
              source={{uri: props.urlImagen}}
              resizeMode="center"
            />
          </View>
          <View style={styles.bottom}>
            <Text style={styles.titulo}> {props.titulo} </Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cuerpoCard: {
    marginLeft: '4%',
    marginTop: '3%',
    marginBottom: '3%',
    width: '20%',
    height: 130,
    borderRadius: 12,
  },
  view: {
    flexDirection: 'column',
  },
  top: {
    width: '65%',
    marginLeft: '15%',
    marginRight: '30%',
    height: '40%',
    marginTop: '15%',
    flexDirection: 'row',
  },
  bottom: {
    width: '100%',
    height: '50%',
    flexDirection: 'row',
    marginBottom: '5%',
  },
  titulo: {
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 13,
    marginTop: 10,
    width: '100%',
    height: '100%',
  },
  imgCategoria: {
    height: '100%',
    width: '100%',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
});
