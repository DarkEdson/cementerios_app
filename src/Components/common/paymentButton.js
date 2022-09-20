import React from 'react';
import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import {mainStyles} from '@styles/stylesGeneral';

import {Icon} from '@rneui/themed';

import color from '@styles/colors';

export default function PaymentButton(props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={[props.style, mainStyles.espacio]}>
        {props.iconLeft && (
          <View
            style={{
              marginTop: 7,
              alignItems: 'flex-start',
              alignContent: 'flex-start',
            }}>
            <Icon
              size={35}
              color={color.BLACK}
              type={'material-community'}
              name="credit-card"
            />
          </View>
        )}
        {props.titulo && (
          <View
            style={{
              marginTop: 7,

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
              size={15}
              color={color.BLACK}
              type={'material-community'}
              name="pencil"
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}
