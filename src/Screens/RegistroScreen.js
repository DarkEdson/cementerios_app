import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar, Image, ImageBackground, ScrollView } from 'react-native';
import {mainStyles,registroStyles, loginStyles} from '@styles/stylesGeneral';
import MyTextInput from '@Components/common/MyTextInput';
import color from '@styles/colors';
import ToolBar from '@Components/common/toolBar';
import {CheckBox, SocialIcon, Button } from "@rneui/themed"


function goToScreen(props, routeName){
    props.navigation.navigate(routeName)
}

export default function RegistroScreen (props) {

    const [hidePassword, setHidePassword] = useState(true)
    const [hidePasswordConfirm, setHidePasswordConfirm] = useState(true)
 
    return (
        <ScrollView
            keyboardDismissMode='on-drag'
            keyboardShouldPersistTaps='always'
            style={{backgroundColor: color.WHITE}}
        >   
        <StatusBar backgroundColor={color.PRINCIPALCOLOR} translucent={true}/>
        <ToolBar titulo='Registro' onPressLeft={()=>goToScreen(props, 'Login')}
        iconLeft={require('@images/back.png')}/>
            <View style={mainStyles.container}>  
                <Text style={mainStyles.titleText}>
                Introduce tus datos
                </Text> 
                <MyTextInput keyboardType={null} placeholder='Usuario' image='user'/>
                <MyTextInput keyboardType='email-address' placeholder='E-mail' image='envelope'/>
                <MyTextInput keyboardType={null} placeholder='Password' image='lock' bolGone={true} 
        secureTextEntry={hidePassword} onPress={()=> setHidePassword(!hidePassword)}/>
                <MyTextInput keyboardType={null} placeholder='Confirmar Password' image='lock' bolGone={true} 
        secureTextEntry={hidePasswordConfirm} onPress={()=> setHidePasswordConfirm(!hidePasswordConfirm)}/>
                <MyTextInput keyboardType={null}  placeholder='Tipo Usuario' image='user'/>
                <CheckBox
                    containerStyle={registroStyles.checkBox}
                    textStyle={{ color: color.PRINCIPALCOOR }}
                    title='He leído y acepto los términos y condiciones'
                    checked={false}
                    checkedColor={color.PRINCIPALCOLOR}
                />
                <View style={mainStyles.btnMain}>
                    <TouchableOpacity onPress={()=> goToScreen(props, 'Login')}>
                    <Text style={mainStyles.btntxt}> Siguiente</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: color.PRINCIPALCOLOR }}>¿Ya tienes una cuenta? </Text>
                    <Button title="Inicia Sesión" onPress={() => goToScreen(props, 'Login')} type="clear" />
                </View>
                <View style={registroStyles.containerSocial}>
                    <SocialIcon
                        style={registroStyles.buttonSocialIcon}
                        title='Iniciar con Facebook'
                        button
                        type='facebook'
                    />
                    <SocialIcon
                        style={registroStyles.buttonSocialIcon}
                        title='Iniciar con Google'
                        button
                        type='google-plus-official'
                    />
                </View>
                <View style={loginStyles.boxTransparent}/>
            </View>
        </ScrollView>
    );
  
}

