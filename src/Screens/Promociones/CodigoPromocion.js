import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TextInput, Platform, TouchableOpacity} from 'react-native';

export default function VistaCodigoPromocion(props) {
  // Cargar informacion de la vista
  useEffect(() => {
    // Actualizar valores de la vista
    setPropsVista({
      label1: 'Agregar una promoción',
      labelInput: 'Ingresa el código de promo...',
      labelBtn: 'Agregar una promo',
    });
  }, []);

  // Variables de la vista
  const [propsVista, setPropsVista] = useState({
    label1: '',
    labelInput: '',
    labelBtn: '',
  });

  return (
    <View style={styles.vista}>
      <Text style={styles.titulo}> {propsVista.label1} </Text>
      <View style={styles.searchSection}>
        <TextInput style={styles.input} placeholder={propsVista.labelInput} />
      </View>
      <TouchableOpacity style={styles.btnAgregar}>
        <Text style={styles.txtAgregar}> {propsVista.labelBtn} </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  vista: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  titulo: {
    fontWeight: '800',
    fontSize: 30,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 25,
  },
  searchSection: {
    borderBottomWidth: 1,
    borderColor: 'grey',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 15,
    width: '85%',
    height: Platform.OS === 'ios' ? 40 : 50,
  },
  input: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
  },
  btnAgregar: {
    width: '80%',
    marginLeft: '10%',
    marginRight: '10%',
    borderRadius: 10,
    backgroundColor: 'skyblue',
    height: 40,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
  },
  txtAgregar: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
  },
});
