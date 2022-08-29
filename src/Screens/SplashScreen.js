import React, { Component } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import * as Animatable from 'react-native-animatable'
import { splashStyles } from '@styles/stylesGeneral';

export default class SplashScreen extends Component {

  goToScreen(routeName){
    this.props.navigation.navigate(routeName)
  }
  componentDidMount(){
    setTimeout(()=>{
      //aqui va el if para ir a Home o a Login
        this.goToScreen('Login')
    },5000, this)
  }

  render() {
    return (
      <View style={splashStyles.container}>
        <ImageBackground source={require('@images/background.png')} resizeMode='cover' style={splashStyles.image}>
        
        <Animatable.Image
            animation="pulse"
            easing="ease-in-out"
            iterationCount="infinite"
            style={
                splashStyles.logo
            }
            source={require('@images/logo.png')}
        />
        <Text style={splashStyles.texto}>Bienvenidos</Text>
        </ImageBackground>
      </View>
    );
  }
}


