import {StyleSheet, Dimensions} from 'react-native';
import color from './colors';

//Estilos para MainScreen
const mainStyles = StyleSheet.create({
  container: {
    marginTop: Dimensions.get('screen').height * 0.034,
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
    fontFamily: 'Poppins-SemiBold',
  },

  btnMain: {
    width: 280,
    marginTop: 40,
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: color.PRINCIPALCOLOR,
    borderRadius: 60,
  },

  btnTransparent: {
    backgroundColor: 'rgba(52, 52, 52, 0)',
    borderColor: color.PRINCIPALCOLOR,
    width: 280,
    borderWidth: 2,
    marginBottom: 20,
    borderRadius: 60,
  },

  btntxt: {
    textAlign: 'center',
    fontSize: 17,
    color: color.WHITE,
    paddingVertical: 15,
    fontFamily: 'Poppins-Bold',
  },
  viewComponents: {
    flexDirection: 'column',
  },
  txtTransparent: {
    color: color.PRINCIPALCOLOR,
    fontSize: 14,
    fontFamily: 'Poppins-Light',
  },
  tituloComponents: {
    fontWeight: '700',
    textAlign: 'left',
    fontSize: 18,
    marginTop: 10,
    width: '100%',
    height: '100%',
  },
  card: {
    width: '100%',
    borderRadius: 12,
    elevation: 2,
    backgroundColor: '#fff',
    shadowOffset: {width: 1, height: 1},
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginTop: 5,
    marginBottom: 5,
  },
  cardContenido: {
    marginHorizontal: 0,
    marginVertical: 0,
  },
});
//Estilos para SplashScreen
const splashStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  texto: {
    fontWeight: 'bold',
    color: color.WHITE,
    justifyContent: 'center',
    marginBottom: Dimensions.get('screen').height * 0.4,
    marginHorizontal: Dimensions.get('screen').width * 0.35,
    fontSize: 20,
  },
  logo: {
    width: 190,
    height: 151,
    marginTop: 20,
    marginBottom: Dimensions.get('screen').height * 0.2,
    marginHorizontal: Dimensions.get('screen').width * 0.25,
  },
});

//Estilos para LoginScreen
const loginStyles = StyleSheet.create({
  logo: {
    flex: 1,
    marginTop: 30,
    borderRadius: 25,
    alignItems: 'center',
  },
  logoBackground: {
    width: Dimensions.get('screen').width * 0.9,
    height: Dimensions.get('screen').height * 0.276,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    overflow: 'hidden',
  },
  logoImage: {
    width: 190,
    height: 151,
    marginBottom: 20,
  },
  boxTransparent: {
    backgroundColor: 'transparent',
    marginBottom: Dimensions.get('screen').height * 0.15,
  },
});

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
});

export {mainStyles, splashStyles, loginStyles, registroStyles};
