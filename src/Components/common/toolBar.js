import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {mainStyles} from '@styles/stylesGeneral';

import {Icon} from '@rneui/themed';

import color from '@styles/colors';

export default function ToolBar(props) {
  return (
    <View style={[mainStyles.toolBarStyle, props.style]}>
      {props.titulo && (
        <Text style={mainStyles.toolBarText}>{props.titulo}</Text>
      )}
      {props.iconLeft && (
        <TouchableOpacity
          style={{position: 'absolute', left: 20, top: 12}}
          onPress={props.onPressLeft}
        >
          <Icon
            size={35}
            color={color.BLACK}
            type={'material-community'}
            name="chevron-left"
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
