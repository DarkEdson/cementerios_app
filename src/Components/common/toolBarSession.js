import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {mainStyles} from '@styles/stylesGeneral';

import {Icon} from '@rneui/themed';

import color from '@styles/colors';

export default function ToolBarSession(props) {
  return (
    <View style={[props.style, mainStyles.toolBarSessionStyle]}>
      {props.titulo && (
        <Text style={mainStyles.toolBarSessionText}>{props.titulo}</Text>
      )}
      {props.iconLeft && (
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 8,
            top: 15,
            borderRadius: 100,
            backgroundColor: color.PRINCIPALCOLOR,
          }}
          onPress={props.onPressLeft}>
          {props.image ? (
            <Image />
          ) : (
            <Icon
              size={60}
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
