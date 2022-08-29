import React from 'react'
import {StyleSheet, TouchableOpacity, Image} from 'react-native'
import {Icon, Input } from "@rneui/themed"
import color from '@styles/colors'

export default function MyTextInput(props){

    return (
      <Input
        style={{alignItems: 'center'}}
        containerStyle={{marginTop:10,marginBottom:10,borderRadius: 12,
        
        borderColor: color.INPUTCOLOR, borderWidth: 1, backgroundColor: color.INPUTCOLOR }}
        inputContainerStyle={{borderBottomColor: color.INPUTCOLOR, marginBottom:-23}}
        inputStyle={{ fontSize:18,
            paddingHorizontal:6, 
            color: color.PRIMARYCOLOR,
            
            }}
        placeholderTextColor={color.TEXTCOLOR}
        placeholder={props.placeholder}
        leftIconContainerStyle={{ marginLeft:0 }}
        leftIcon={<Icon size={24} color={color.BLACK} 
        type={'font-awesome'} name={props.image}/>}
        rightIcon={props.bolGone?
        <TouchableOpacity activeOpacity = { 0.8 } style={styles.btnVisibility} onPress = {props.onPress}>
        <Image style={ styles.btnImage} tintColor={color.BLACK} 
        source = { (props.secureTextEntry) ? require('@images/ic_show_password.png') : require('@images/ic_hide_password.png')}/>
        </TouchableOpacity>:
        <Icon size={24} color={color.BLACK}
        type={'font-awesome'} name={props.imageRight}/>}
        errorStyle={{ color: color.RED }}
        errorMessage={(props.bolError)?props.strError:''}
        editable={props.editable}
        secureTextEntry={props.secureTextEntry}
        keyboardType={props.keyboardType}
        onChangeText={props.onChangeText}
        value={props.value}/>
    )
}

const styles = StyleSheet.create({  

      btnVisibility:
      {
        height: 40,
        width: 35,
        paddingTop: 8,
        paddingLeft:5,
        paddingRight:5
      },
     
      btnImage:
      {
        resizeMode: 'contain',
        height: '100%',
        width: '100%'
      },
})

