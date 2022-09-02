import React, {useContext, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import {mainStyles} from '@styles/stylesGeneral';
import {UsuarioContext} from '@context/UsuarioContext';
import {CementeryContext} from '@context/CementeryContext';
import color from '@styles/colors';
import MyButton from '@Components/common/MyButton';

export default function CompanyScreen(props) {
  const [login, loginAction] = useContext(UsuarioContext);
  const [cementery] = useContext(CementeryContext);

  useEffect(() => {
    console.log(cementery);
    return () => {};
  }, []);
  return (
    <ScrollView>
      <View style={styles.container}>
        <StatusBar
          backgroundColor={color.PRINCIPALCOLOR}
          barStyle="dark-content"
          translucent={true}
        />
      </View>
    </ScrollView>
  );

  function goToScreen(routeName) {
    props.navigation.navigate(routeName);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  promociones: {
    width: '100%',
    height: 180,
    borderWidth: 1,
    borderColor: 'red',
  },
  txtNuevoComponente: {
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 15,
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
