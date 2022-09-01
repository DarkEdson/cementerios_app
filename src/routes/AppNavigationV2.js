import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '@Screens/SplashScreen';
import LoginScreen from '@Screens/Login/LoginScreen';
import RegistroScreen from '@Screens/Registro/RegistroScreen';
import AdicionalRegistroScreen from '@Screens/Registro/AdicionalRegistroScreen';
import HomeScreen from '@Screens/Home/HomeScreen';
import RecuperarPasswordScreen from '@Screens/Login/RecuperarPasswordScreen';
import PrincipalScreen from '@Screens/PrincipalScreen';
import CompanyScreen from '@Screens/Company/CompanyScreen';

const Stack = createStackNavigator();

const AppNavigationV2 = ()=>{
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Splash"
                screenOptions={{
                    headerTitle:'Logo',
                    
                }}
            >
                <Stack.Screen 
                    name="Splash"
                    component={SplashScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen 
                    name="Login"
                    component={LoginScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen 
                    name="Home"
                    component={HomeScreen}
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
                <Stack.Screen 
                    name="Company"
                    component={CompanyScreen}
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigationV2;
