import React from 'react';
import Card from '../Card/index';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import mainStyles from '@styles/stylesGeneral';

export default function BtnCategoria(props) {
  return (
    <TouchableOpacity style={styles.cuerpoCard}>
      <Card>
        <View style={mainStyles.viewComponents}>
          <View style={styles.top}>
            <Image
              style={styles.imgCategoria}
              source={{uri: props.urlImagen}}
            />
          </View>
          <View style={styles.bottom}>
            <Text style={mainStyles.tituloComponents}> {props.titulo} </Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cuerpoCard: {
    marginLeft: '5%',
    marginTop: '3%',
    marginBottom: '3%',
    width: '35%',
    height: 130,
    borderRadius: 12,
  },
  top: {
    width: '40%',
    marginLeft: '30%',
    marginRight: '30%',
    height: '40%',
    marginTop: '10%',
    flexDirection: 'row',
  },
  bottom: {
    width: '100%',
    height: '50%',
    flexDirection: 'row',
    marginBottom: '5%',
  },
  imgCategoria: {
    height: '100%',
    width: '100%',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
});
