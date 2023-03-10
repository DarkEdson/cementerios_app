import React from 'react';
import {StyleSheet, TouchableOpacity, Image, View, Text} from 'react-native';
import {Icon, Input} from '@rneui/themed';
import color from '@styles/colors';

export default function PhoneTextInput(props) {
  return (
    <View style={styles.vista}>
      <Input
        style={{alignItems: 'center'}}
        containerStyle={styles.container}
        inputContainerStyle={{
          borderBottomColor: color.INPUTCOLOR,
          marginBottom: -23,
        }}
        inputStyle={{
          fontSize: 18,
          borderBottomWidth: 0.5,
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
              onPress={props.onPressIcon}
            >
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
      <Text style={styles.guion}>-</Text>
      <Input
        style={{alignItems: 'center'}}
        containerStyle={styles.container2}
        inputContainerStyle={{
          borderBottomColor: color.INPUTCOLOR,
          marginBottom: -23,
        }}
        inputStyle={{
          fontSize: 18,
          borderBottomWidth: 0.5,
          paddingHorizontal: 6,
          color: color.PRINCIPALCOLOR,
        }}
        placeholderTextColor={color.TEXTCOLOR}
        placeholder={props.placeholder2}
        autoCapitalize="none"
        errorStyle={{color: color.RED}}
        errorMessage={props.bolError ? props.strError : ''}
        editable={props.editable2}
        secureTextEntry={props.secureTextEntry2}
        keyboardType={props.keyboardType2}
        onChangeText={props.onChangeText2}
        onEndEditing={props.onEndEditing2}
        value={props.value2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  vista: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 12,
    borderColor: color.INPUTCOLOR,
    borderWidth: 1,
    backgroundColor: color.INPUTCOLOR,
  },
  guion: {
    marginTop: 15,
    fontSize: 18,
    marginLeft: -5,
  },
  container: {
    width: '33%',
  },
  container2: {
    width: '67%',
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
