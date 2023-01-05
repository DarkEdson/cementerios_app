//import liraries
import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {mainStyles} from '@styles/stylesGeneral';
import color from '@styles/colors';

// create a component
const MyButtonImage = props => {
  const sButton = props.transparent
    ? mainStyles.btnTransparent
    : mainStyles.btnMain;
  const sText = props.transparent ? {color: color.PRINCIPALCOLOR} : null;

  return (
    <TouchableOpacity style={[sButton, props.style]} onPress={props.onPress}>
      <Text style={[mainStyles.btntxt, sText]}>{props.titulo}</Text>
    </TouchableOpacity>
  );
};

//make this component available to the app
export default MyButtonImage;
