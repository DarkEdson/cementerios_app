import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView,  Image,
  Dimensions,
  ImageBackground,  SafeAreaView,
  StatusBar} from 'react-native'
//Recarga la screen
import {useIsFocused} from '@react-navigation/native';
//Componentes
import ToolBar from '@Components/common/toolBar';
//Estilos
import {loginStyles, mainStyles} from '@styles/stylesGeneral';
import color from '@styles/colors';
//Contextos
import {ScreentagContext} from '@context/ScreentagsContext';

const HelpScreen = () => {
  // Variables
  const [cel, setcel] = useState('308952032')
  const [email, setemail] = useState('senoriales@gmail.com')
  const {tags} = useContext(ScreentagContext);

  const isFocused = useIsFocused();
  const getInitialData = async () => {};

  useEffect(() => {
    if (isFocused) {
      getInitialData();
      console.log('isFocused HELP');
    }
    return () => {};
    //props, isFocused
  }, []);

  // Contenido 
	return (
    <SafeAreaView style={mainStyles.containersp}>
      <ScrollView>
        <View style={styles.container}>
          <StatusBar
            backgroundColor={color.PRINCIPALCOLOR}
            barStyle="dark-content"
            translucent={true}
          />

          <ToolBar
            titulo={
              'Ayuda'
            }
            onPressLeft={() => goToScreen('Profile')}
            iconLeft={true}
          />
          <View style={styles.headerContainer}>
          <Text style={styles.txtNuevoComponente}>
              {'Información de ayuda'}
            </Text>
          </View>
          <Text style={styles.txtComponente}>
              { tags.EditUserScreen.phone != ''
                    ? tags.EditUserScreen.phone
                    : 'Telefono:'}
            </Text>
          <View style={{backgroundColor: color.WHITE}}>
          <Text style={styles.txtComponente}>
                {cel}
              </Text>
          </View>
          <Text style={styles.txtComponente}>
              { tags.EditUserScreen.email != ''
                    ? tags.EditUserScreen.email
                    : 'Correo:'}
            </Text>
          <View style={{backgroundColor: color.WHITE}}>
              <Text style={styles.txtComponente}>
              {email}
              </Text>
          </View>
          <View style={mainStyles.logo}>
            <ImageBackground
              source={require('@images/profilepic.png')}
              resizeMode="stretch"
              style={loginStyles.logoBackground}>
              <Image
                source={require('@images/logo.png')}
                style={loginStyles.logoImage}
              />
            </ImageBackground>
          </View>
          <View style={styles.boxTransparent} />
        </View>
      </ScrollView>
    </SafeAreaView>

	)
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  boxTransparent: {
    marginBottom: Dimensions.get('screen').height * 0.01,
  },
  boxTransparent2: {
    marginBottom: Dimensions.get('screen').height * 0.05,
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: color.WHITE,
    height: '40%',
    width: '100%',
  },
  txtNuevoComponente: {
    marginTop: 20,
    marginHorizontal: 20,
    marginBottom: 5,
    fontSize: 20,
    fontWeight: 'bold',
    color: color.BLACK,
  },
  btnProfile: {
    marginTop: 20,
    height: 75,
    width: 75,
    borderRadius: 100,
    backgroundColor: color.PRINCIPALCOLOR,
  },
  txtComponente: {
    marginVertical: 15,
    marginHorizontal: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: color.BLACK,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default HelpScreen
