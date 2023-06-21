//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Icon, Input} from '@rneui/themed';
import DatePicker from 'react-native-date-picker';
import color from '@styles/colors';

// create a component
const DateButton = props => {
  return (
    <TouchableOpacity onPress={() => props.setOpen(true)}>
      <View style={styles.viewPadre}>
        <View style={styles.viewHijo}>
          <View style={styles.viewTitulo}>
            <Icon
              style={styles.iconStyle}
              size={24}
              color={color.BLACK}
              type={'material-community'}
              name={props.image}
            />
            <Text style={styles.texto}>
              {' '}
              {props.tagFecha != '' ? props.tagFecha : 'Fecha Inicio:'}{' '}
            </Text>
          </View>
        </View>
        <View style={styles.viewHijo2}>
          <Text style={styles.textoFecha}>
            {props.date.getFullYear()}-{props.date.getMonth() + 1}-
            {props.date.getDate()}
          </Text>
          <DatePicker
            textColor={color.PRINCIPALCOLOR}
            modal
            mode="date"
            confirmText={props.tags.btnconfirmar != ''
            ? props.tags.btnconfirmar
            : 'CONFIRMAR'}
            cancelText={
              props.tags.btncancelar != ''
                ? props.tags.btncancelar
                : 'CANCEL'
            }
            locale='es'
            open={props.open}
            date={new Date()}
            onConfirm={datenew => {
              props.setOpen(false);
              props.setDate(datenew);
              props.setDateData(datenew);
            }}
            onCancel={() => {
              props.setOpen(false);
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  viewPadre: {
    width: '100%',
    height: 50,

    borderRadius: 10,
    marginTop: 10,
    flexDirection: 'row',
    backgroundColor: color.INPUTCOLOR,
  },
  iconStyle: {
    marginRight: 6,
  },
  viewTitulo: {
    flexDirection: 'row',
  },
  viewHijo: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 10,
    width: '65%',
  },
  viewHijo2: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: '35%',
  },
  texto: {
    color: color.TEXTCOLOR,
    fontSize: 17,
  },
  textoFecha: {
    fontWeight: '300',
    fontSize: 17,
  },
});

//make this component available to the app
export default DateButton;
