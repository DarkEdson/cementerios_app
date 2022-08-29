import {StyleSheet, Dimensions} from 'react-native';
import color from './colors'

//Estilos para MainScreen
const mainStyles = StyleSheet.create({

    container: {
        marginTop: Dimensions.get('screen').height*.034,
        flex: 1,
        alignItems: 'center',
        backgroundColor: color.WHITE,
        paddingHorizontal: 20,
        
    },

    containerCenter: {
        paddingTop: 10,
        alignItems: 'center',
        marginBottom: 25,
    },

    titleText: {
        fontSize: 28,
        marginTop: 20,
        color: color.PRINCIPALCOLOR,
        fontFamily: "Poppins-SemiBold"
    },

    btnMain: {
        width: 280,
        marginTop: 40,
        marginBottom: 20,
        alignItems: 'center',
        backgroundColor: color.PRINCIPALCOLOR,
        borderRadius: 60
    },

    btnTransparent: {
        backgroundColor: 'rgba(52, 52, 52, 0)',
        borderColor: color.PRINCIPALCOLOR,
        width: 280,
        borderWidth: 2,
        marginBottom: 20,
        borderRadius: 60
    },

    btntxt: {
        textAlign: 'center',
        fontSize: 17,
        color: color.WHITE,
        paddingVertical: 15,
        fontFamily: 'Poppins-Bold',
    },

    txtTransparent: {
        color: color.PRINCIPALCOLOR,
        fontSize: 14,
        fontFamily: 'Poppins-Light',
    }
    
})
//Estilos para SplashScreen
const splashStyles = StyleSheet.create({
    container: {
        flex: 1
      },
      image:{
          flex: 1,
          justifyContent: 'center',
      },
      texto:{
          fontWeight: "bold",
          color: color.WHITE,
          justifyContent: 'center',
          marginBottom: Dimensions.get('screen').height*.40,
          marginHorizontal: Dimensions.get('screen').width*.35,
          fontSize: 20
      },
      logo:{
        width: 190,
        height: 151,
        marginTop: 20,
        marginBottom: Dimensions.get('screen').height*.20,
        marginHorizontal: Dimensions.get('screen').width*.25
    }
})


//Estilos para LoginScreen
const loginStyles = StyleSheet.create({
    logo: {     
        flex:1,
        marginTop: 30,
        borderRadius: 25,
        alignItems: 'center',              
    },
    logoBackground: {
        width: Dimensions.get('screen').width*.90,
        height:Dimensions.get('screen').height*.276,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
       overflow:'hidden',
    },
    logoImage:{
        width: 190,
        height: 151,
        marginBottom:20,
    },
    boxTransparent: {
        backgroundColor: 'transparent',
        marginBottom: Dimensions.get('screen').height*.15

    },
})

//Estilos para RegistroScreen
const registroStyles = StyleSheet.create({

    checkBox: {
        marginLeft: 0,
        marginRight: 0,
        borderWidth: 0,
        backgroundColor: color.WHITE,
    },

    containerSocial: {
        paddingTop: 30,
        alignItems: 'center',
        marginBottom: 10,
    },

    buttonSocialIcon: {
        marginBottom: 10,
        width: 250,
        height: 60,
        alignItems: 'center',
        borderRadius: 60,
    },
})

export { mainStyles, splashStyles, loginStyles, registroStyles }