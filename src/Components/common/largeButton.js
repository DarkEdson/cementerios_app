import React from 'react';
import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import {mainStyles} from '@styles/stylesGeneral';

import {Icon} from '@rneui/themed';

import color from '@styles/colors';

export default function LargeButton(props) {
  return (
    <TouchableOpacity onPress={props.onPressRight}>
      <View style={[props.style, mainStyles.espacio]}>
        {props.titulo && (
          <View
            style={{
              marginTop: 7,
              marginRight: 155,
              alignItems: 'flex-start',
              alignContent: 'flex-start',
            }}>
            <Text style={mainStyles.txtUnico2}>{props.titulo}</Text>
          </View>
        )}
        {props.iconRight && (
          <View
            style={{
              marginTop: 7,
              alignItems: 'flex-end',
              alignContent: 'flex-end',
            }}>
            <Icon
              size={35}
              color={color.BLACK}
              type={'material-community'}
              name="chevron-right"
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}
