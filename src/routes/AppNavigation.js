import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import SplashScreen from '@Screens/SplashScreen';
import LoginScreen from '@Screens/Login/LoginScreen';
import RegistroScreen from '@Screens/Registro/RegistroScreen';
import AdicionalRegistroScreen from '@Screens/Registro/AdicionalRegistroScreen';
import HomeScreen from '@Screens/Home/HomeScreen';
import RecuperarPasswordScreen from '@Screens/Login/RecuperarPasswordScreen';
import PrincipalScreen from '@Screens/PrincipalScreen';
import CompanyScreen from '@Screens/Company/CompanyScreen';

const AppNavigation = createStackNavigator({
  Splash: {
    screen: SplashScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  RecuperarPassword: {
    screen: RecuperarPasswordScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  Registro: {
    screen: RegistroScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  RegistroAdd: {
    screen: AdicionalRegistroScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  Principal: {
    screen: PrincipalScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  Company: {
    screen: CompanyScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
});

export default createAppContainer(AppNavigation);
