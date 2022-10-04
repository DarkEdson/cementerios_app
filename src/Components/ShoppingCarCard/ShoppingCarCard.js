//import liraries
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Icon} from '@rneui/themed';
import {shoppingCarFloatStyles} from '@styles/stylesGeneral';
import color from '@styles/colors';

// create a component
const ShoppingCarCard = props => {
  const sButton = shoppingCarFloatStyles.circleRounded;
  const leftPadding = {paddingTop: 9};
  const iconHeight = 35;
  return (
    <TouchableOpacity style={[sButton, props.style]} onPress={props.onPress}>
      <View style={shoppingCarFloatStyles.items}>
        <View style={shoppingCarFloatStyles.iconContainer}>
          <Icon
            style={leftPadding}
            size={iconHeight}
            color={color.PRINCIPALCOLOR}
            type={props.tipo}
            name={props.image}
          />
        </View>

        <View style={shoppingCarFloatStyles.textContainer}>
          <Text style={shoppingCarFloatStyles.titleText}>
            {props.cantidad} {props.titulo}
          </Text>
          <Text style={shoppingCarFloatStyles.subtitleText}>{props.info}</Text>
        </View>
        <View style={shoppingCarFloatStyles.priceContainer}>
          <Text style={shoppingCarFloatStyles.btntxt}>{props.total}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

//make this component available to the app
export default ShoppingCarCard;
