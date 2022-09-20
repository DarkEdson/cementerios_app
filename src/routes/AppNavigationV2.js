import React, {useEffect, useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '@Screens/SplashScreen';
import LoginScreen from '@Screens/Login/LoginScreen';
import RegistroScreen from '@Screens/Registro/RegistroScreen';
import AdicionalRegistroScreen from '@Screens/Registro/AdicionalRegistroScreen';
import HomeScreen from '@Screens/Home/HomeScreen';
import RecuperarPasswordScreen from '@Screens/Login/RecuperarPasswordScreen';
import PrincipalScreen from '@Screens/PrincipalScreen';
import CompanyScreen from '@Screens/Company/CompanyScreen';
import CementeriesScreen from '@Screens/Company/CementeriesScreen';
import ProfileScreen from '@Screens/Profile/ProfileScreen';
import EditProfileScreen from '@Screens/Profile/EditProfileScreen';
import PersonalDataScreen from '@Screens/Profile/PersonalDataScreen';
import PaymentMethodScreen from '@Screens/Profile/PaymentMethodScreen';
import PasswordChangeScreen from '@Screens/Profile/PasswordChangeScreen';
import LoadingScreen from '@Screens/LoadingScreen';
import VistaProducto from '@Screens/Producto/Producto';
import VistaPago from '@Screens/Payments/Pago';
import VistaCodigoPromocion from '@Screens/Promo/CodigoPromocion';
import {AuthContext} from '@context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const AppNavigationV2 = () => {
  //  const {tokenUserInfo} = useContext(AuthContext);

  useEffect(() => {
    async function tokenRefresh() {
      let tokenUserInfo = await AsyncStorage.getItem('tokenUserInfo');
      console.log(tokenUserInfo, 'tokenInfo en react navigate');
    }
    setTimeout(() => {
      tokenRefresh();
    }, 1000);
  });
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerTitle: 'Logo',
        }}>
        {
          //Vistas iniciales
        }
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Loading"
          component={LoadingScreen}
          options={{
            headerShown: false,
          }}
        />
        {
          //Vistas de login y registro
        }
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="RecuperarPassword"
          component={RecuperarPasswordScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Registro"
          component={RegistroScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="RegistroAdd"
          component={AdicionalRegistroScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Principal"
          component={PrincipalScreen}
          options={{
            headerShown: false,
          }}
        />
        {
          //vistas internas
        }
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PersonalData"
          component={PersonalDataScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PaymentMethod"
          component={PaymentMethodScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PasswordChange"
          component={PasswordChangeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfileScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Cementeries"
          component={CementeriesScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Company"
          component={CompanyScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Product"
          component={VistaProducto}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Payments"
          component={VistaPago}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PromoCode"
          component={VistaCodigoPromocion}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigationV2;
