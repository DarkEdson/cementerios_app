import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {mainStyles} from '@styles/stylesGeneral';
import SelectDropdown from 'react-native-select-dropdown';

import {Icon, Avatar} from '@rneui/themed';

import color from '@styles/colors';

export default function ToolBarSession(props) {

  return (
    <View style={[props.style, mainStyles.toolBarSessionStyle]}>
      {props.titulo && (
        <Text style={mainStyles.toolBarSessionText}>{props.titulo}</Text>
      )}
      <SelectDropdown
        data={props.ubicaciones}
        defaultValueByIndex={0}
        defaultValue={props.ubicaciones[0]}
        defaultButtonText="Seleccione Pais"
        buttonTextStyle={{textAlign: 'left'}}
        buttonStyle={styles.btnStyle}
        dropdownStyle={{marginLeft: 15}}
        renderDropdownIcon={isOpened => {
          return (
            <Icon
              type={'font-awesome'}
              name={isOpened ? 'chevron-up' : 'chevron-down'}
              color={'#444'}
              size={12}
            />
          );
        }}
        dropdownIconPosition="right"
        onSelect={(selectedItem, index) => {
          console.log(selectedItem.label, index);
          props.onSelectUbication();
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem.label;
        }}
        rowTextForSelection={(item, index) => {
          return item.label;
        }}
      />
      {props.iconLeft && (
        <TouchableOpacity style={styles.btnProfile} onPress={props.onPressLeft}>
          {props.image != '' ? (
            <Avatar
              rounded
              source={{
                uri: `https://proyectocementeriogt.gq/images/${props.image}`,
              }}
              size="medium"
            />
          ) : (
            <Icon
              size={47}
              color={color.BLACK}
              type={'material-community'}
              name="account"
            />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  btnStyle: {
    width: '45%',
    position: 'absolute',
    marginLeft: -8,
    marginTop: 35,
    backgroundColor: color.WHITE,
  },
  btnProfile: {
    position: 'absolute',
    right: 8,
    top: 15,
    borderRadius: 100,
    backgroundColor: color.PRINCIPALCOLOR,
  },

  btnImage: {
    resizeMode: 'contain',
    height: '100%',
    width: '100%',
  },
});
