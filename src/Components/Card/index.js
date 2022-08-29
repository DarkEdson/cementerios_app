import React from 'react';
import {View} from 'react-native';
import mainStyles from '@styles/stylesGeneral';

export default function Card(props) {
  return (
    <View style={mainStyles.card}>
      <View style={mainStyles.cardContenido}>{props.children}</View>
    </View>
  );
}
