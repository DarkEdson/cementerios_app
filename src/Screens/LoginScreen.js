import React, {  useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar, Image, ImageBackground } from 'react-native';
import {mainStyles,loginStyles} from '@styles/stylesGeneral'
import MyTextInput from '@Components/common/MyTextInput';
import color from '@styles/colors'

function goToScreen(props, routeName){
  props.navigation.navigate(routeName)
}
export default function LoginScreen (props) {
 
  const [hidePassword, setHidePassword] = useState(true)
    return (
      <View style={mainStyles.container}>
        <StatusBar backgroundColor={color.PRINCIPALCOLOR} translucent={true}/>
        <View style={loginStyles.logo}>
          <ImageBackground source={require('@images/logoBackground.png')} resizeMode='stretch' style={loginStyles.logoBackground}>
            <Image source={require('@images/logo.png')} style={loginStyles.logoImage}/>
          </ImageBackground>
        </View>     
         
        <MyTextInput keyboardType='email-address' placeholder='Usuario' image='user'/>
        <MyTextInput keyboardType={null} placeholder='Password' image='lock' bolGone={true} 
        secureTextEntry={hidePassword} onPress={()=> setHidePassword(!hidePassword)}/>
        <View style={{marginTop:-5}}>
            <TouchableOpacity onPress={()=>goToScreen(props, 'Registro')}>
              <Text style={[loginStyles.btntxt,{color: color.PRINCIPALCOLOR}]}> Si no tiene cuenta, suscribase. </Text>
            </TouchableOpacity>
        </View>
        <View style={mainStyles.btnMain}>
            <TouchableOpacity onPress={()=>goToScreen(props, 'Principal')}>
              <Text style={mainStyles.btntxt}> LOGIN</Text>
            </TouchableOpacity>
        </View>
        <View>
            <TouchableOpacity onPress={()=>goToScreen(props, 'RecuperarPassword')}>
              <Text style={[mainStyles.txtTransparent,{textDecorationLine: 'underline'}]}> Olvide mi Contraseña </Text>
            </TouchableOpacity>
        </View>
        <View style={loginStyles.boxTransparent}/>
      </View>
    );
  
}

