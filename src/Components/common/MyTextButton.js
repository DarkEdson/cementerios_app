//import liraries
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {mainStyles} from '@styles/stylesGeneral';

// create a component
const MyTextButton = props => {
  const sButton = props.underline ? mainStyles.btnUnderline : null;
  const sMargin = props.margin ? mainStyles.btnMargin : styles;

  return (
    <View style={sMargin}>
      <TouchableOpacity onPress={props.onPress}>
        <Text style={[mainStyles.txtTransparent, sButton]}>{props.titulo}</Text>
      </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    marginTop: 0,
  },
});

//make this component available to the app
export default MyTextButton;
