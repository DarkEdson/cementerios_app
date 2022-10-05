import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {Icon} from '@rneui/themed';
import InitialScreen from './InitialScreen';
//Screens
import PrincipalScreen from '@Screens/PrincipalScreen';
import SalesScreen from '@Screens/Sales/SalesScreen';
import PromoScreen from '@Screens/Promo/PromoScreen';
import VistaProductos from '@Screens/Producto/Productos';
//Estilos Generales
import color from '@styles/colors';
//Contextos
import {ScreentagContext} from '@context/ScreentagsContext';
import {getLanguague, saveLanguague} from '@storage/LanguagueAsyncStorage';

const Tab = createMaterialBottomTabNavigator();

//tags.HomeTagsScreen.home != '' ? tags.HomeTagsScreen.home :
export default function HomeScreen(props) {
  const {tags} = useContext(ScreentagContext);
  const [homeTags, sethomeTags] = useState({
    home: 'Inicio',
    promo: 'Promociones',
    products: 'Productos',
    sells: 'Ventas',
  });

  useEffect(() => {
    if (Object.keys(tags).length != 0) {
      console.log(Object.keys(tags).length, 'length tags');
      if (Object.keys(tags.HomeTagsScreen).length != 0) {
        console.log(
          Object.keys(tags.HomeTagsScreen).length,
          'length hometagsscreen',
        );
        sethomeTags({
          home: tags.HomeTagsScreen.home,
          promo: tags.HomeTagsScreen.promo,
          products: tags.HomeTagsScreen.products,
          sells: tags.HomeTagsScreen.sells,
        });
      }
    }

    sethomeTags({
      home: tags.HomeTagsScreen.home,
      promo: tags.HomeTagsScreen.promo,
      products: tags.HomeTagsScreen.products,
      sells: tags.HomeTagsScreen.sells,
    });
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="initial"
      labeled
      activeColor={color.PRINCIPALCOLOR}
      barStyle={{
        backgroundColor: color.WHITE,
        alignSelf: 'stretch',
        height: 55,
        alignItems: 'center',
        borderRadius: 0,
        elevation: 7,
        shadowOffset: {width: 1, height: 1},
        shadowColor: '#333',
        shadowOpacity: 0.6,
        shadowRadius: 2,
      }}>
      <Tab.Screen
        name="Initial"
        component={InitialScreen}
        options={{
          tabBarLabel: homeTags.home != '' ? homeTags.home : 'Inicio',
          tabBarIcon: ({color}) => (
            <Icon
              style={{marginTop: -2}}
              type={'material-community'}
              name="home"
              color={color}
              size={27}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Promociones"
        component={PromoScreen}
        options={{
          tabBarLabel: homeTags.promo != '' ? homeTags.promo : 'Promociones',
          tabBarIcon: ({color}) => (
            <Icon
              style={{marginTop: -2}}
              type={'material-community'}
              name="sale"
              color={color}
              size={27}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Productos"
        component={VistaProductos}
        options={{
          tabBarLabel:
            homeTags.products != '' ? homeTags.products : 'Productos',
          tabBarIcon: ({color}) => (
            <Icon
              style={{marginTop: -2}}
              type={'material-community'}
              name="file-document-edit-outline"
              color={color}
              size={27}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Ventas"
        component={SalesScreen}
        options={{
          tabBarLabel: homeTags.sells != '' ? homeTags.sells : 'Ventas',
          tabBarIcon: ({color}) => (
            <Icon
              style={{marginTop: -2}}
              type={'entypo'}
              name="text-document"
              color={color}
              size={27}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
