import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar, Image, ImageBackground, ScrollView } from 'react-native';
import {mainStyles,loginStyles} from '@styles/stylesGeneral'
import MyTextInput from '@Components/common/MyTextInput';
import color from '@styles/colors'
import ToolBar from '@Components/common/toolBar';


function goToScreen(props, routeName){
    props.navigation.navigate(routeName)
}

export default function RecuperarPasswordScreen (props) {
 
    return (
        <ScrollView
            keyboardDismissMode='on-drag'
            keyboardShouldPersistTaps='always'
            style={{backgroundColor: color.WHITE}}
        >   
        <StatusBar backgroundColor={color.PRINCIPALCOLOR} translucent={true}/>
        <ToolBar titulo='Contraseña' onPressLeft={()=>goToScreen(props, 'Login')}
        iconLeft={require('@images/back.png')}/>
            <View style={mainStyles.container}>
                
                <View style={loginStyles.logo}>
                <ImageBackground source={require('@images/logoBackground.png')} resizeMode='stretch' style={loginStyles.logoBackground}>
                    <Image source={require('@images/logo.png')} style={loginStyles.logoImage}/>
                </ImageBackground>
                </View>         
                <Text style={mainStyles.titleText}>
                Recuperar{'\n'}Contraseña
                </Text> 
                <MyTextInput keyboardType='email-address' placeholder='E-mail' image='user'/>
                <View style={mainStyles.btnMain}>
                    <TouchableOpacity onPress={()=> goToScreen(props, 'Login')}>
                    <Text style={mainStyles.btntxt}> Recuperar</Text>
                    </TouchableOpacity>
                </View>
                <View style={loginStyles.boxTransparent}/>
            </View>
        </ScrollView>
    );
  
}

