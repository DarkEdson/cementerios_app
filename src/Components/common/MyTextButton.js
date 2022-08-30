//import liraries
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {mainStyles} from '@styles/stylesGeneral';
import color from '@styles/colors';

// create a component
const MyTextButton = props => {
  const sButton = props.underline ? mainStyles.btnUnderline : null;
  const sMargin = props.margin ? mainStyles.btnMargin : styles.container;
  const blue =
    props.color == 'blue' ? styles.txtTransparent : mainStyles.txtTransparent;

  return (
    <View style={sMargin}>
      <TouchableOpacity onPress={props.onPress}>
        <Text style={[blue, sButton]}>{props.titulo}</Text>
      </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    marginTop: 0,
  },
  txtTransparent: {
    color: color.BLUE3,
    fontSize: 19,
    fontWeight: '600',
  },
});

//make this component available to the app
export default MyTextButton;
