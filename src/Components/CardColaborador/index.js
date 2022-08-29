import React from 'react';
import Card from '../Card/index';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import mainStyles from '@styles/stylesGeneral';

export default function CardColaborador(props) {
  return (
    <TouchableOpacity style={styles.cuerpoCard}>
      <View style={mainStyles.viewComponents}>
        <View style={styles.top}>
          <Card>
            <Image
              style={styles.imgCategoria}
              source={{uri: props.urlImagen}}
            />
          </Card>
        </View>
        <View style={styles.bottom}>
          <Text style={mainStyles.tituloComponents}> {props.nombre} </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cuerpoCard: {
    marginLeft: '5%',
    marginTop: '3%',
    marginBottom: '3%',
    width: '65%',
    height: 240,
    borderRadius: 12,
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
  imgCategoria: {
    height: '100%',
    width: '100%',
    borderRadius: 12,
  },
});
