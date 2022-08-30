import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import {mainStyles, registroStyles} from '@styles/stylesGeneral';
import MyTextInput from '@Components/common/MyTextInput';
import color from '@styles/colors';
import ToolBar from '@Components/common/toolBar';
import {CheckBox} from '@rneui/themed';
import MyButton from '@Components/common/MyButton';

function goToScreen(props, routeName) {
  props.navigation.navigate(routeName);
}

export default function RegistroScreen(props) {
  return (
    <ScrollView
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="always"
      style={{backgroundColor: color.WHITE}}>
      <StatusBar backgroundColor={color.PRINCIPALCOLOR} translucent={true} />
      <ToolBar
        titulo="Completa tus datos"
        onPressLeft={() => goToScreen(props, 'Registro')}
        iconLeft={true}
      />
      <View style={mainStyles.container}>
        <MyTextInput
          keyboardType={null}
          placeholder="Nombres"
          image="account-circle"
        />
        <MyTextInput
          keyboardType={null}
          placeholder="Apellidos"
          image="account-circle"
        />
        <MyTextInput
          keyboardType={null}
          placeholder="Número de ID"
          image="card-account-details"
        />
        <MyTextInput
          keyboardType={null}
          placeholder="PayPal ID"
          image="credit-card-outline"
        />

        <CheckBox
          containerStyle={registroStyles.checkBox}
          textStyle={{color: color.PRINCIPALCOOR}}
          title="He leído y acepto los términos y condiciones"
          checked={false}
          checkedColor={color.PRINCIPALCOLOR}
        />
        <MyButton
          titulo="COMPLETAR REGISTRO"
          onPress={() => goToScreen(props, 'Login')}
        />
      </View>
    </ScrollView>
  );
}
