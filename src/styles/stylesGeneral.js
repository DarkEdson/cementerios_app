import {StyleSheet, Dimensions, StatusBar} from 'react-native';
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
  containers: {
    flex: 1,
    backgroundColor: color.WHITE,
    paddingTop:
      Platform.OS === 'android'
        ? StatusBar.currentHeight - Dimensions.get('screen').height * 0.02
        : 0,
  },
  containersp: {
    flex: 1,
    paddingTop:
      Platform.OS === 'android'
        ? StatusBar.currentHeight - Dimensions.get('screen').height * 0.02
        : 0,
  },
  logoImage: {
    width: 230,
    height: 185,
    marginBottom: 20,
  },
  leftView: {
    position: 'absolute',
    right: 4,
    top: Dimensions.get('screen').height * 0.05,
    flexDirection: 'row',
    width: 120,
  },
  headerBackground: {
    marginTop: Dimensions.get('screen').height * 0.03,
    width: Dimensions.get('screen').width * 1,
    height: Dimensions.get('screen').height * 0.35,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    overflow: 'hidden',
  },
  containerCenter: {
    paddingTop: 10,
    alignItems: 'center',
    marginBottom: 25,
  },
  logo: {
    flex: 1,
    marginTop: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 28,
    marginTop: 20,
    color: color.PRINCIPALCOLOR,
    fontFamily: 'Poppins-SemiBold',
  },
  toolBarStyle: {
    height: 50,
    marginTop: 16,
    backgroundColor: color.WHITE,
  },

  toolBarSessionStyle: {
    height: Dimensions.get('screen').height * 0.13,
    marginTop: 16,
    backgroundColor: color.WHITE,
  },
  toolBarText: {
    marginTop: 12,
    textAlign: 'center',
    fontSize: 23,
    fontWeight: 'bold',
    color: color.BLACK,
  },
  toolBarSessionText: {
    marginTop: 16,
    marginLeft: 8,
    textAlign: 'left',
    fontSize: 16,
    color: color.GRAY,
  },
  btnMain: {
    width: Dimensions.get('screen').width * 0.9,
    marginTop: 40,
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: color.PRINCIPALCOLOR,
    borderRadius: 15,
  },

  btnTransparent: {
    backgroundColor: 'rgba(52, 52, 52, 0)',
    borderColor: color.PRINCIPALCOLOR,
    width: 280,
    borderWidth: 2,
    marginBottom: 20,
    borderRadius: 60,
  },

  btnUnderline: {
    textDecorationLine: 'underline',
  },
  btnMargin: {
    marginTop: -5,
  },
  btntxt: {
    textAlign: 'center',
    fontSize: 17,
    color: color.WHITE,
    paddingVertical: 15,
  },
  viewComponents: {
    flexDirection: 'column',
  },
  txtTransparent: {
    color: color.PRINCIPALCOLOR,
    fontSize: 14,
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
  boxTransparent: {
    backgroundColor: 'transparent',
    marginBottom: Dimensions.get('screen').height * 0.06,
  },
  txtAgregar: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
  },
  txtUnico2: {
    fontWeight: '400',
    fontSize: 18,
    textAlign: 'center',
    alignSelf: 'center',
  },
  espacio: {
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    justifyContent: 'space-around',
    height: 50,
    marginBottom: 3,
    borderBottomWidth: 1,
    borderColor: color.GRAY2,
    flexDirection: 'row',
  },
  noPromoView: {
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  promoText: {
    fontSize: 20,
    fontWeight: '600',
    color: color.PRINCIPALCOLOR,
  },
});

//Estilos para SplashScreen
const splashStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerLoading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  texto: {
    fontWeight: 'bold',
    color: color.WHITE,
    textAlign: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: Dimensions.get('screen').height * 0.4,
    marginHorizontal: Dimensions.get('screen').width * 0.37,
    fontSize: 17,
  },
  logo: {
    width: 190,
    height: 151,
    marginTop: 60,
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
    width: Dimensions.get('screen').width * 0.9,
    height: 60,
    alignItems: 'center',
    borderRadius: 5,
  },
});
//Estilos para CementeryScreen
const CementeryScreen = StyleSheet.create({
  HeaderView: {
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 25,
    justifyContent: 'space-evenly',
  },
  vista: {
    height: '100%',
    backgroundColor: color.WHITE,
  },
  descripcion: {
    paddingLeft: 20,
    paddingTop: 10,
    paddingRight: 20,
    borderBottomWidth: 3,
    borderColor: '#dbdbdb',
  },
  detalleProd: {
    paddingLeft: 20,
    paddingTop: 10,
    paddingRight: 20,
    marginTop: 5,
  },
  titulo: {
    fontWeight: '700',
    fontSize: 23,
    textAlign: 'left',
    marginTop: 5,
    marginBottom: 5,
  },
  categorias: {
    fontWeight: '600',
    fontSize: 15,
    textAlign: 'left',
    color: 'grey',
  },
  imgProducto: {
    height: 300,
    width: '100%',
  },
  logoImage: {
    width: 230,
    height: 185,
    marginVertical: Dimensions.get('screen').height * 0.1,
    marginHorizontal: Dimensions.get('screen').width * 0.2,
  },
  FooterView: {
    marginTop: Dimensions.get('screen').height * 0.48,

    backgroundColor: color.WHITE,
  },
  container: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  titleText: {
    marginLeft: 20,
    marginTop: 10,
    fontSize: 28,
    fontWeight: 'bold',
    color: color.BLACK,
  },
  title2Text: {
    marginLeft: 22,
    fontSize: 18,
    fontWeight: 'bold',
    color: color.BLACK,
  },
  titleFooterText: {
    marginLeft: 18,

    fontSize: 22,
    fontWeight: 'bold',
    color: color.PRINCIPALCOLOR,
  },
  subtitleText: {
    marginLeft: 20,
    marginTop: 4,
    fontSize: 16.28,
    color: color.GRAY3,
  },
  subtitleFooterText: {
    alignSelf: 'center',
    fontSize: 19,
    fontWeight: '600',
    color: color.GRAY3,
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titles: {
    marginRight: 70,
    marginBottom: 20,
    marginTop: 16,
  },
});

//Estilos para InformationIcon
const informationIconStyles = StyleSheet.create({
  circleRounded: {
    marginTop: 4,
    marginRight: 7,
    paddingTop: 3,
    height: 25,
    width: 25,
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: color.PRINCIPALCOLOR,
  },
  circleRoundedTransparent: {
    marginTop: 4,
    paddingTop: 3,
    marginRight: 7,
    height: 25,
    width: 25,
    alignItems: 'center',
    borderRadius: 100,
  },
  titleText: {
    fontWeight: '700',
    color: color.BLACK,
    justifyContent: 'center',
    fontSize: 16,
  },
  titleTextPrice: {
    fontWeight: '600',
    color: color.BLACK,
    justifyContent: 'center',
    fontSize: 14,
  },
  subtitleText: {
    fontWeight: '400',
    color: color.GRAY3,
    justifyContent: 'center',
    fontSize: 13,
  },
  verticleLine: {
    height: '100%',
    width: 2,
    backgroundColor: color.GRAY2,
  },
  logo: {
    width: 190,
    height: 151,
    marginTop: 20,
    marginBottom: Dimensions.get('screen').height * 0.2,
    marginHorizontal: Dimensions.get('screen').width * 0.25,
  },
});

//Estilos para Boton Flotante
const floatButtonStyles = StyleSheet.create({
  circleRounded: {
    position: 'absolute',
    top: 35,
    paddingTop: 3,
    height: 60,
    width: 60,
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: color.GRAY4,
  },
  btnMain: {
    width: Dimensions.get('screen').width * 0.9,
    marginTop: 40,
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: color.PRINCIPALCOLOR,
    borderRadius: 15,
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
  },
});

//Estilos para Carrito Compras Boton Flotante
const shoppingCarFloatStyles = StyleSheet.create({
  circleRounded: {
    position: 'absolute',
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.9,
    shadowRadius: 8,
    elevation: 30,
    bottom: Dimensions.get('screen').height * 0.02,
    left: Dimensions.get('screen').width * 0.1,
    right: Dimensions.get('screen').width * 0.1,
    paddingTop: 3,
    height: 70,
    width: Dimensions.get('screen').width * 0.8,
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: color.WHITE,
  },
  iconContainer: {
    position: 'absolute',
    left: Dimensions.get('screen').width * -0.376,
    top: 3,
    borderRadius: 15,
    height: Dimensions.get('screen').height * 0.075,
    width: Dimensions.get('screen').width * 0.13,
    backgroundColor: color.GRAY2,
  },
  textContainer: {
    alignItems: 'center',
    position: 'absolute',
    left: Dimensions.get('screen').width * -0.23,
    top: 3,
    height: Dimensions.get('screen').height * 0.075,
    width: Dimensions.get('screen').width * 0.45,
  },
  titleText: {
    fontSize: 16.5,
    fontWeight: 'bold',
    color: color.BLACK,
  },
  subtitleText: {
    fontWeight: '400',
    color: color.GRAY3,
    justifyContent: 'center',
    fontSize: 13,
  },
  priceContainer: {
    paddingTop: Dimensions.get('screen').height * 0.01,
    alignItems: 'center',
    position: 'absolute',
    left: Dimensions.get('screen').width * 0.235,
    top: Dimensions.get('screen').height * 0.015,
    height: Dimensions.get('screen').height * 0.055,
    width: Dimensions.get('screen').width * 0.15,
  },
  items: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnMain: {
    width: Dimensions.get('screen').width * 0.9,
    marginTop: 40,
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: color.PRINCIPALCOLOR,
    borderRadius: 15,
  },
  btntxt: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    color: color.PRINCIPALCOLOR,
  },
});

export {
  mainStyles,
  splashStyles,
  loginStyles,
  registroStyles,
  informationIconStyles,
  CementeryScreen,
  floatButtonStyles,
  shoppingCarFloatStyles,
};
