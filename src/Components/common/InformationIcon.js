//import libraries
import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {mainStyles, informationIconStyles} from '@styles/stylesGeneral';
import {Icon} from '@rneui/themed';
import color from '@styles/colors';

// create a component
const InformationIcon = props => {
  const sIcon = props.transparent
    ? informationIconStyles.circleRoundedTransparent
    : informationIconStyles.circleRounded;
  const sColor = props.transparent ? color.PRINCIPALCOLOR : color.WHITE;
  const iconHeight = props.transparent ? 22 : 16;

  return (
    <TouchableOpacity style={[props.style]} onPress={props.onPress}>
      <View style={{flexDirection: 'row', marginLeft: 5}}>
        <View style={sIcon}>
          <Icon
            size={iconHeight}
            color={sColor}
            type={props.tipo}
            name={props.image}
          />
        </View>
        
        <View style={{width: 85, marginRight: 15
        //borderWidth: 1, borderColor: 'red'
        }}>
          {
            props.isPrice ? (
            <>
            <Text
              style={
                props.titulo.length <= 5
                  ? informationIconStyles.titleText14
                  : informationIconStyles.titleTextPrice
              }
            >
              {props.titulo}
            </Text>
            <Text style={informationIconStyles.subtitleTextPrice}>
            {props.subtitulo}
          </Text>
            </>
            )
            
            :(
            <><Text
              style={
                props.titulo.length <= 5
                  ? informationIconStyles.titleText
                  : informationIconStyles.titleText14
              }
            >
              {props.titulo}
            </Text>
            <Text style={informationIconStyles.subtitleText}>
            {props.subtitulo}
          </Text>
            </>
            )
          }
        </View>
      </View>
    </TouchableOpacity>
  );
};

//make this component available to the app
export default InformationIcon;
