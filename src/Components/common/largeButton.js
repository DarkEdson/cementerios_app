import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {mainStyles} from '@styles/stylesGeneral';

import {Icon} from '@rneui/themed';

import color from '@styles/colors';

export default function LargeButton(props) {
  return (
    <View style={[props.style, mainStyles.espacio]}>
      {props.titulo && <Text style={mainStyles.txtUnico2}>{props.titulo}</Text>}
      {props.iconRight && (
        <TouchableOpacity
          style={{position: 'absolute', right: -15, top: 8}}
          onPress={props.onPressRight}>
          <Icon
            size={35}
            color={color.BLACK}
            type={'material-community'}
            name="chevron-right"
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
