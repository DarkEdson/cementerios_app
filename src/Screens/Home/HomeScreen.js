import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import color from '@styles/colors';
import { Icon } from '@rneui/themed';
import InitialScreen from './InitialScreen';
import PrincipalScreen from '@Screens/PrincipalScreen'
import ProfileScreen from '@Screens/PrincipalScreen'

const Tab = createMaterialBottomTabNavigator();


export default function HomeScreen(props) {
  return (
    <Tab.Navigator
    initialRouteName="initial"
    labeled
    activeColor={color.PRINCIPALCOLOR}
    barStyle={{ backgroundColor: color.WHITE, alignSelf: 'stretch',
    height: 55,
    alignItems: 'center',
    borderRadius: 0,
    elevation: 7,
    shadowOffset: {width: 1, height: 1},
    shadowColor: '#333',
    shadowOpacity: 0.6,
    shadowRadius: 2,}}
  >
    <Tab.Screen
      name="Initial"
      component={InitialScreen}
      options={{
        tabBarLabel: 'Inicio',
        tabBarIcon: ({ color }) => (
          <Icon style={{marginTop:-2}} type={'material-community'} name="home" color={color} size={27} />
        ),
      }}
    />
    <Tab.Screen
      name="Principal"
      component={PrincipalScreen}
      options={{
        tabBarLabel: 'Promociones',
        tabBarIcon: ({ color }) => (
          <Icon style={{marginTop:-2}} type={'material-community'} name="sale" color={color} size={27} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarLabel: 'Productos',
        tabBarIcon: ({ color }) => (
          <Icon style={{marginTop:-2}} type={'material-community'} name="file-document-edit-outline" color={color} size={27} />
        ),
      }}
    />
    <Tab.Screen
      name="Ventas"
      component={ProfileScreen}
      options={{
        tabBarLabel: 'Ventas',
        tabBarIcon: ({ color }) => (
          <Icon style={{marginTop:-2}} type={'entypo'} name="text-document" color={color} size={27} />
        ),
      }}
    />
  </Tab.Navigator>
  );
}
