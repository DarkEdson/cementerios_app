import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Image,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Alert,
  BackHandler,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {Icon, FAB} from '@rneui/themed';
//Recarga la screen
import {useIsFocused} from '@react-navigation/native';
//Componentes
import ToolBar from '@Components/common/toolBar';
import LargeButton from '@Components/common/largeButton';
import MyTextButton from '@Components/common/MyTextButton';
//Estilos
import {loginStyles, mainStyles} from '@styles/stylesGeneral';
import color from '@styles/colors';
//Contextos
import {LanguaguesContext} from '@context/LanguaguesContext';
import {UsuarioContext} from '@context/UsuarioContext';
import {ScreenIdContext} from '@context/ScreensIDsContext';
import {ScreentagContext} from '@context/ScreentagsContext';
import {GlobalLanguageContext} from '@context/LanguageContext';
//Async Storage
import {
  getLanguague,
  saveLanguague,
  updateLanguage,
} from '@storage/LanguagueAsyncStorage';

export default function PersonalDataScreen(props) {
  const [loginUser, loginAction] = useContext(UsuarioContext);
  const [Languagues, setLanguagues] = useContext(LanguaguesContext);
  const [ScreenId, setScreenId] = useContext(ScreenIdContext);
  const {tags, updateTags} = useContext(ScreentagContext);
  const [lenguajes, setLenguajes] = useState([]);
  const [defaultLanguage, setdefaultLanguage] = useState({});
  const [GlobalLanguage, setGlobalLanguage] = useContext(GlobalLanguageContext);
  const [nuevoLenguaje, setnuevoLenguaje] = useState({});
  let arrayLenguajes = [];
  const [isLoading, setLoading] = useState(false);
  const isFocused = useIsFocused();
  const getInitialData = async () => {};

  //tags.personalDataScreen.titulo

  useEffect(() => {
    async function lenguajeDefault() {
      const lenguaje = await getLanguague();
      console.log(
        lenguaje,
        'lenguaje que esta guardado en Personal Data',
        GlobalLanguage,
      );
      setdefaultLanguage({label: lenguaje.name, value: lenguaje.code});
      setGlobalLanguage(lenguaje);
    }
    Languagues.forEach(item => {
      arrayLenguajes.push({label: item.name, value: item.code});
    });
    setLenguajes(arrayLenguajes);
    lenguajeDefault();
    console.log('PANTALLAS EXISTENTES', ScreenId);
    console.log('LAS ETIQUETAS GENERALES CAMBIADAS', tags);
  }, [nuevoLenguaje]);

  return (
    <SafeAreaView style={mainStyles.containersp}>
      <ScrollView>
        <View style={styles.container}>
          {isLoading ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '50%',
              }}>
              <Text style={{paddingVertical: 10}}>
                {nuevoLenguaje.code == 'en'
                  ? 'Updating Configuration'
                  : 'Actualizando Configuracion'}
              </Text>

              <FAB
                loading
                color={color.PRINCIPALCOLOR}
                visible={isLoading}
                icon={{name: 'add', color: 'white'}}
                size="small"
              />
            </View>
          ) : (
            <View>
              <StatusBar
                backgroundColor={color.PRINCIPALCOLOR}
                barStyle="dark-content"
                translucent={true}
              />
              <ToolBar
                titulo={
                  tags.personalDataScreen.titulo != ''
                    ? tags.personalDataScreen.titulo
                    : 'Datos Personales'
                }
                onPressLeft={() => goToScreen('Profile')}
                iconLeft={true}
              />
              <Text style={styles.txtComponente}>
                {tags.personalDataScreen.nombre != ''
                  ? tags.personalDataScreen.nombre
                  : 'Nombre'}
              </Text>
              <View style={{backgroundColor: color.WHITE}}>
                <Text style={styles.txtComponente}>
                  {' '}
                  {loginUser.usuario.name + ' ' + loginUser.usuario.lastname}
                </Text>
              </View>
              <Text style={styles.txtComponente}>
                {tags.personalDataScreen.email != ''
                  ? tags.personalDataScreen.email
                  : 'e-mail'}
              </Text>
              <View style={{backgroundColor: color.WHITE}}>
                <Text style={styles.txtComponente}>
                  {loginUser.usuario.email}
                </Text>
              </View>
              {loginUser.usuario.role == 'seller' ||
              loginUser.usuario.role == 'SELLER' ||
              loginUser.usuario.role == 'Seller' ? (
                <Text style={styles.txtComponente}>
                  {tags.personalDataScreen.codigo != ''
                    ? tags.personalDataScreen.codigo
                    : 'Codigo de vendedor'}
                </Text>
              ) : (
                <Text style={styles.txtComponente} />
              )}
              <View style={{backgroundColor: color.WHITE}}>
                {loginUser.usuario.role == 'seller' ||
                loginUser.usuario.role == 'SELLER' ||
                loginUser.usuario.role == 'Seller' ? (
                  <Text style={styles.txtComponente}>
                    {loginUser.usuario.id_number
                      ? loginUser.usuario.id_number
                      : loginUser.usuario.vendorcode}
                  </Text>
                ) : (
                  <TouchableOpacity onPress={() => {}}>
                    <Text style={styles.txtComponente}>
                      {tags.perfilScreen.help != ''
                        ? tags.perfilScreen.help
                        : 'Ayuda'}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              <Text style={styles.txtComponente}>
                {tags.personalDataScreen.editar != ''
                  ? tags.personalDataScreen.editar
                  : 'Editar'}
              </Text>
              <View style={{backgroundColor: color.WHITE}}>
                <View style={styles.espacio}>
                  <LargeButton
                    titulo={
                      tags.personalDataScreen.info != ''
                        ? tags.personalDataScreen.info
                        : 'Informacion personal'
                    }
                    onPressRight={() => goToScreen('EditProfile')}
                    iconRight={true}
                  />
                </View>
                <View style={styles.espacio}>
                  <LargeButton
                    titulo={
                      tags.personalDataScreen.contrasena != ''
                        ? tags.personalDataScreen.contrasena
                        : 'Contraseña         '
                    }
                    onPressRight={() => goToScreen('PasswordChange')}
                    iconRight={true}
                  />
                </View>
                <View style={styles.espacio}>
                  <LargeButton
                    titulo={
                      tags.personalDataScreen.metodos != ''
                        ? tags.personalDataScreen.metodos
                        : 'Metodos de Pago'
                    }
                    onPressRight={() => goToScreen('PaymentMethod')}
                    iconRight={true}
                  />
                </View>
                <View style={styles.espacio}>
                  <Text style={styles.sectionDescription}>
                    {tags.personalDataScreen.idioma != ''
                      ? tags.personalDataScreen.idioma
                      : 'Cambiar Idioma'}
                  </Text>
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
                      setLoading(true);
                      console.log(
                        selectedItem.label,
                        index,
                        selectedItem.value,
                      );
                      Languagues.forEach(item => {
                        if (item.code == selectedItem.value) {
                          setnuevoLenguaje(item);
                          updateLanguage(item, actualizaTags);
                          setGlobalLanguage(item);
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
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  function actualizaTags() {
    ScreenId.forEach(pantalla => {
      updateTags(pantalla);
    });
    setTimeout(() => {
      setLoading(false);
    }, 9500);
  }

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
    marginRight: 30,
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
