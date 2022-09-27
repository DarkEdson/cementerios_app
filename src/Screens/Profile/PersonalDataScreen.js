import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
  BackHandler,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {Icon, Avatar} from '@rneui/themed';
//Componentes
import MyTextButton from '@Components/common/MyTextButton';
import ToolBar from '@Components/common/toolBar';
import LargeButton from '@Components/common/largeButton';
//Estilos
import {loginStyles, mainStyles} from '@styles/stylesGeneral';
import color from '@styles/colors';
//Contextos
import {LanguaguesContext} from '@context/LanguaguesContext';
import {UsuarioContext} from '@context/UsuarioContext';
//Async Storage
import {getLanguague, saveLanguague} from '@storage/LanguagueAsyncStorage';

export default function PersonalDataScreen(props) {
  const [loginUser, loginAction] = useContext(UsuarioContext);
  const [Languagues, setLanguagues] = useContext(LanguaguesContext);
  const [lenguajes, setLenguajes] = useState([]);
  const [defaultLanguage, setdefaultLanguage] = useState({});
  const [nuevoLenguaje, setnuevoLenguaje] = useState({});

  useEffect(() => {
    async function lenguajeDefault() {
      const lenguaje = await getLanguague();
      console.log(lenguaje, 'lenguaje que esta guardado');
      setdefaultLanguage({label: lenguaje.name, value: lenguaje.code});
    }
    let arrayLenguajes = [];
    Languagues.forEach(item => {
      arrayLenguajes.push({label: item.name, value: item.code});
    });
    setLenguajes(arrayLenguajes);
    lenguajeDefault();
    console.log(defaultLanguage);
    console.log(Languagues);
  }, [nuevoLenguaje]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <StatusBar
          backgroundColor={color.PRINCIPALCOLOR}
          barStyle="dark-content"
          translucent={true}
        />
        <ToolBar
          titulo="Datos Personales"
          onPressLeft={() => goToScreen('Profile')}
          iconLeft={true}
        />
        <Text style={styles.txtComponente}>Nombre</Text>
        <View style={{backgroundColor: color.WHITE}}>
          <Text style={styles.txtComponente}>
            {' '}
            {loginUser.usuario.name + ' ' + loginUser.usuario.lastname}
          </Text>
        </View>
        <Text style={styles.txtComponente}>e-mail</Text>
        <View style={{backgroundColor: color.WHITE}}>
          <Text style={styles.txtComponente}>{loginUser.usuario.email}</Text>
        </View>
        <Text style={styles.txtComponente}>Codigo de vendedor</Text>
        <View style={{backgroundColor: color.WHITE}}>
          <Text style={styles.txtComponente}>
            {loginUser.usuario.id_number}
          </Text>
        </View>
        <Text style={styles.txtComponente}>Editar</Text>
        <View style={{backgroundColor: color.WHITE}}>
          <View style={styles.espacio}>
            <LargeButton
              titulo="Informacion personal"
              onPressRight={() => goToScreen('EditProfile')}
              iconRight={true}
            />
          </View>
          <View style={styles.espacio}>
            <LargeButton
              titulo="Contraseña         "
              onPressRight={() => goToScreen('PasswordChange')}
              iconRight={true}
            />
          </View>
          <View style={styles.espacio}>
            <LargeButton
              titulo="Metodos de Pago"
              onPressRight={() => goToScreen('PaymentMethod')}
              iconRight={true}
            />
          </View>
          <View style={styles.espacio}>
            <Text style={styles.sectionDescription}>Cambiar Idioma</Text>
            <SelectDropdown
              data={lenguajes}
              defaultValue={defaultLanguage}
              //   defaultValueByIndex={0}
              defaultButtonText="Cambia Idioma"
              buttonTextStyle={{textAlign: 'left'}}
              buttonStyle={styles.btnDropStyle}
              dropdownStyle={{marginLeft: 15}}
              renderDropdownIcon={isOpened => {
                return (
                  <Icon
                    type={'font-awesome'}
                    name={isOpened ? 'chevron-up' : 'chevron-down'}
                    color={'#444'}
                    size={12}
                  />
                );
              }}
              dropdownIconPosition="right"
              onSelect={(selectedItem, index) => {
                console.log(selectedItem.label, index, selectedItem.value);
                Languagues.forEach(item => {
                  if (item.code == selectedItem.value) {
                    setnuevoLenguaje(item);
                    saveLanguague(item).then(msg => {
                      console.log('lenguaje cambiado correctamente');
                    });
                  }
                });
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.label;
              }}
              rowTextForSelection={(item, index) => {
                return item.label;
              }}
            />
          </View>
        </View>
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
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: color.WHITE,
    height: '40%',
    width: '100%',
  },
  btnDropStyle: {
    width: '35%',
    marginRight: 8,
    height: '85%',
    backgroundColor: color.WHITE,
  },
  espacio: {
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    height: 50,
    marginBottom: 3,
    borderBottomWidth: 1,
    borderColor: 'grey',
    flexDirection: 'row',
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
    height: 70,
    width: 70,
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
    marginLeft: 30,
    marginRight: 52,
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
