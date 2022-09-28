//import libraries
import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { mainStyles, informationIconStyles } from '@styles/stylesGeneral';
import { Icon } from '@rneui/themed';
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
            <View style={{ flexDirection: 'row' }}>
                <View style={sIcon}>
                    <Icon
                        size={iconHeight}
                        color={sColor}
                        type={props.tipo}
                        name={props.image}
                    />
                </View>
                <View>

                    <Text style={informationIconStyles.titleText}>{props.titulo}</Text>

                    <Text style={informationIconStyles.subtitleText}>{props.subtitulo}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

//make this component available to the app
export default InformationIcon;
