import React from 'react';
import Card from '../Card/index';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';

export default function CardPromocion(props) {
  return (
    <TouchableOpacity style={styles.cuerpoCard}>
      <Card>
        <View style={{...styles.view, backgroundColor: props.bgColor}}>
          <View style={styles.left}>
            <Text style={styles.titulo}> {props.titulo} </Text>
            <Text style={styles.subTitulo}> {props.descripcion} </Text>
          </View>
          <View style={styles.right}>
            <Image
              style={styles.imgPromocion}
              source={{uri: props.urlImagen}}
            />
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cuerpoCard: {
    marginLeft: '5%',
    width: '90%',
    height: 170,
    borderRadius: 12,
  },
  view: {
    flexDirection: 'row',
    borderRadius: 12,
  },
  left: {
    width: '65%',
    height: '100%',
    flexDirection: 'column',
  },
  right: {
    width: '35%',
    height: '100%',
    flexDirection: 'column',
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 26,
    marginTop: 24,
    marginLeft: 13,
    marginBottom: 12,
  },
  subTitulo: {
    fontWeight: '400',
    color: 'grey',
    fontSize: 15,
    marginLeft: 13,
    marginRight: 10,
  },
  imgPromocion: {
    height: '100%',
    width: '100%',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
});
