import {createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SplashScreen from '@Screens/SplashScreen'
import LoginScreen from '@Screens/LoginScreen'
import RegistroScreen from '@Screens/RegistroScreen'
import PrincipalScreen from '@Screens/PrincipalScreen'
import RecuperarPasswordScreen from '@Screens/RecuperarPasswordScreen'

const AppNavigation = createStackNavigator({
    Splash: {
        screen: SplashScreen,
        navigationOptions: {
            headerShown: false,
        }
    },
    Login: {
        screen: LoginScreen,
        navigationOptions: {
            headerShown: false,
        }
    },
    Principal: {
        screen: PrincipalScreen,
        navigationOptions: {
            headerShown: false,
        }
    },
    RecuperarPassword: {
        screen: RecuperarPasswordScreen,
        navigationOptions: {
            headerShown: false,
        }
    },
    Registro: {
        screen: RegistroScreen,
        navigationOptions: {
            headerShown: false,
        }
    },
})

export default createAppContainer(AppNavigation)