import React from 'react';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Icon, Input} from '@rneui/themed';
import color from '@styles/colors';

export default function MyTextInput(props) {
  return (
    <Input
      style={{alignItems: 'center'}}
      containerStyle={styles.container}
      inputContainerStyle={{
        borderBottomColor: color.INPUTCOLOR,
        marginBottom: -25,
      }}
      inputStyle={{
        fontSize: 18,
        paddingHorizontal: 6,
        color: color.PRINCIPALCOLOR,
      }}
      placeholderTextColor={color.TEXTCOLOR}
      placeholder={props.placeholder}
      leftIconContainerStyle={{marginLeft: 0}}
      leftIcon={
        <Icon
          size={24}
          color={color.BLACK}
          type={'material-community'}
          name={props.image}
        />
      }
      rightIcon={
        props.bolGone ? (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.btnVisibility}
            onPress={props.onPressIcon}>
            <Icon
              size={24}
              color={color.BLACK}
              type={'material-community'}
              name={props.secureTextEntry ? 'eye' : 'eye-off'}
            />
          </TouchableOpacity>
        ) : (
          <Icon
            size={24}
            color={color.BLACK}
            type={'font-awesome'}
            name={props.imageRight}
          />
        )
      }
      autoCapitalize="none"
      errorStyle={{color: color.RED}}
      errorMessage={props.bolError ? props.strError : ''}
      editable={props.editable}
      secureTextEntry={props.secureTextEntry}
      keyboardType={props.keyboardType}
      onChangeText={props.onChangeText}
      onEndEditing={props.onEndEditing}
      value={props.value}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 12,
    borderColor: color.INPUTCOLOR,
    borderWidth: 1,
    backgroundColor: color.INPUTCOLOR,
  },
  btnVisibility: {
    height: 40,
    width: 35,
    paddingTop: 8,
    paddingLeft: 5,
    paddingRight: 5,
  },

  btnImage: {
    resizeMode: 'contain',
    height: '100%',
    width: '100%',
  },
});
