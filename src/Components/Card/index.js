import React from 'react';
import {View} from 'react-native';
import stylesG from '../../../style';

export default function Card(props) {
  return (
    <View style={stylesG.card}>
      <View style={stylesG.cardContenido}>{props.children}</View>
    </View>
  );
}
