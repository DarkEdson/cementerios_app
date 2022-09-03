//import liraries
import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Icon} from '@rneui/themed';
import {floatButtonStyles} from '@styles/stylesGeneral';
import color from '@styles/colors';

// create a component
const MyFloatButton = props => {
  const sButton = floatButtonStyles.circleRounded;
  const sPosition = props.left
    ? {left: 20}
    : {
        right: 20,
      };
  const leftPadding = props.left ? {paddingRight: 4} : {paddingTop: 9.5};
  const iconHeight = props.left ? 50 : 30;
  return (
    <TouchableOpacity
      style={[sButton, props.style, sPosition]}
      onPress={props.onPress}>
      <Icon
        style={leftPadding}
        size={iconHeight}
        color={color.WHITE}
        type={props.tipo}
        name={props.image}
      />
    </TouchableOpacity>
  );
};

//make this component available to the app
export default MyFloatButton;
