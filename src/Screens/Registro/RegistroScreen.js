import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import {SocialIcon, Icon, Dialog, CheckBox} from '@rneui/themed';
import SelectDropdown from 'react-native-select-dropdown';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
//Recarga la screen
import {useIsFocused} from '@react-navigation/native';
//Estilos generales
import color from '@styles/colors';
import {mainStyles, registroStyles, loginStyles} from '@styles/stylesGeneral';
//Componentes
import MyTextInput from '@Components/common/MyTextInput';
import ToolBar from '@Components/common/toolBar';
import MyButton from '@Components/common/MyButton';
//Contextos
import {RegisterContext} from '@context/RegisterContext';
import {ScreentagContext} from '@context/ScreentagsContext';

//tags.registerScreen.ubica
export default function RegistroScreen(props) {
  const [registerUser, registerAction] = useContext(RegisterContext);
  const {tags, updateTags} = useContext(ScreentagContext);
  const isFocused = useIsFocused();
  const getInitialData = async () => {};
  const [tiposUsuario, settiposUsuario] = useState([
    {
      label: 'Vendedor',
      value: 'seller',
    },
    {
      label: 'Cliente',
      value: 'user',
    },
  ]);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [role, setUsertype] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [hidePasswordConfirm, setHidePasswordConfirm] = useState(true);
  const [visible, setVisible] = useState(false);
  const [checked, setChecked] = useState(1);
  const [variableSocial, setVariableSocial] = useState(null);
  const [state, setState] = useState({userInfo: {}});
  const [stateGoogle, setStateGoogle] = useState({user: null});
  const [tagsModal, settags] = useState({
    btncancelar: 'Cancel',
    btnconfirmar: 'CONFIRM',
    titulo: 'Selecciona Tipo Usuario',
  });

  const logoutWithFacebook = () => {
    LoginManager.logOut();
    setState({userInfo: {}});
  };

  const signOutGoogle = async () => {
    try {
      await GoogleSignin.signOut();
      setStateGoogle({user: null}); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

  const getInfoFromToken = token => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: 'id,name,first_name,last_name',
      },
    };
    const profileRequest = new GraphRequest(
      '/me',
      {token, parameters: PROFILE_REQUEST_PARAMS},
      (error, user) => {
        if (error) {
          console.log('login info has error: ' + error);
        } else {
          setState({userInfo: user});
          console.log('result:', user);
        }
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };

  useEffect(() => {
    if (isFocused) {
      getInitialData();
      console.log('isFocused Register');
    }
    return () => {};
    //props, isFocused
  }, []);

  const toggleDialog = () => {
    setVisible(!visible);
  };
  const handlePasswordChange = val => {
    if (confirmPassword != '') {
      if (val == confirmPassword) {
        if (val.trim().length >= 8) {
          setPassword(val);
        } else {
          Snackbar.show({
            text:
              tags.dialogAlertsScreen.g != ''
                ? tags.dialogAlertsScreen.g
                : 'La contraseña debe ser de al menos 8 caracteres',
            duration: Snackbar.LENGTH_LONG,
          });
        }
      } else {
        if (val.trim().length >= 8) {
          Snackbar.show({
            text:
              tags.dialogAlertsScreen.h != ''
                ? tags.dialogAlertsScreen.h
                : 'Las contraseñas no coinciden',
            duration: Snackbar.LENGTH_LONG,
          });
        } else {
          Snackbar.show({
            text:
              tags.dialogAlertsScreen.i != ''
                ? tags.dialogAlertsScreen.i
                : 'La contraseña debe ser de al menos 8 caracteres y no coinciden',
            duration: Snackbar.LENGTH_LONG,
          });
        }
      }
    } else {
      if (val.trim().length >= 8) {
        setPassword(val);
      } else {
        Snackbar.show({
          text:
            tags.dialogAlertsScreen.g != ''
              ? tags.dialogAlertsScreen.g
              : 'La contraseña debe ser de al menos 8 caracteres',
          duration: Snackbar.LENGTH_LONG,
        });
      }
    }
  };
  const handlePasswordConfirm = val => {
    if (val == password) {
      setConfirmPassword(val);
    } else {
      Snackbar.show({
        text:
          tags.dialogAlertsScreen.h != ''
            ? tags.dialogAlertsScreen.h
            : 'Las contraseñas no coinciden',
        duration: Snackbar.LENGTH_LONG,
      });
    }
  };
  const handleValidUser = val => {
    if (val.trim().toString().length >= 4) {
      setUsername(val);
    } else {
      Snackbar.show({
        text:
          tags.dialogAlertsScreen.f != ''
            ? tags.dialogAlertsScreen.f
            : 'usuario debe ser de minimo 4 caracteres',
        duration: Snackbar.LENGTH_LONG,
      });
    }
  };

  return (
    <SafeAreaView style={mainStyles.containers}>
      <ScrollView
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="always"
        style={{backgroundColor: color.WHITE}}
      >
        <StatusBar backgroundColor={color.PRINCIPALCOLOR} translucent={true} />
        <ToolBar
          titulo={
            tags.registerScreen.header1 != ''
              ? tags.registerScreen.header1
              : 'Introduce tus datos'
          }
          onPressLeft={() => goToScreen('Login')}
          iconLeft={true}
        />
        <View style={mainStyles.container}>
          <MyTextInput
            keyboardType={null}
            placeholder={
              tags.registerScreen.inputusuario1 != ''
                ? tags.registerScreen.inputusuario1
                : 'Usuario'
            }
            image="account-circle"
            value={username}
            onChangeText={username => setUsername(username)}
            onEndEditing={e => handleValidUser(e.nativeEvent.text)}
          />
          <MyTextInput
            keyboardType="email-address"
            placeholder={
              tags.registerScreen.inputcorreo != ''
                ? tags.registerScreen.inputcorreo
                : 'Correo electrónico'
            }
            image="email"
            value={email}
            onChangeText={email => setEmail(email)}
          />
          <MyTextInput
            keyboardType={null}
            placeholder={
              tags.registerScreen.inputpassword1 != ''
                ? tags.registerScreen.inputpassword1
                : 'Password'
            }
            image="lock"
            value={password}
            onChangeText={password => setPassword(password)}
            bolGone={true}
            secureTextEntry={hidePassword}
            onPressIcon={() => setHidePassword(!hidePassword)}
            onEndEditing={e => handlePasswordChange(e.nativeEvent.text)}
          />
          <MyTextInput
            keyboardType={null}
            placeholder={
              tags.registerScreen.inputconfpassword != ''
                ? tags.registerScreen.inputconfpassword
                : 'Confirmar Password'
            }
            image="lock"
            bolGone={true}
            value={confirmPassword}
            onChangeText={confirmPassword =>
              setConfirmPassword(confirmPassword)
            }
            secureTextEntry={hidePasswordConfirm}
            onPressIcon={() => setHidePasswordConfirm(!hidePasswordConfirm)}
            onEndEditing={e => handlePasswordConfirm(e.nativeEvent.text)}
          />
          <View style={styles.containerDropStyle}>
            <Icon
              style={{marginLeft: 10, marginTop: 12}}
              type={'material-community'}
              name={'account'}
              color={'#444'}
              size={25}
            />
            <SelectDropdown
              data={tiposUsuario}
              //     defaultValue={defaultLanguage}
              //   defaultValueByIndex={0}
              defaultButtonText={
                tags.registerScreen.inputtipo != ''
                  ? tags.registerScreen.inputtipo
                  : 'Tipo usuario'
              }
              buttonTextStyle={{
                textAlign: 'left',
                color: color.TEXTCOLOR,
                marginLeft: 3,
              }}
              buttonStyle={styles.btnDropStyle}
              dropdownStyle={{
                marginLeft: 2,
                position: 'absolute',
                backgroundColor: color.INPUTCOLOR,
                paddingHorizontal: 0,
                borderWidth: 1,
                borderRadius: 8,
                borderColor: '#444',
              }}
              renderDropdownIcon={isOpened => {
                return (
                  <Icon
                    style={{marginRight: 15}}
                    type={'font-awesome'}
                    name={isOpened ? 'chevron-up' : 'chevron-down'}
                    color={'#444'}
                    size={20}
                  />
                );
              }}
              dropdownIconPosition="right"
              onSelect={(selectedItem, index) =>
                setUsertype(selectedItem.value)
              }
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.label;
              }}
              rowTextForSelection={(item, index) => {
                return item.label;
              }}
            />
          </View>

          <MyButton
            titulo={
              tags.registerScreen.btnsiguiente != ''
                ? tags.registerScreen.btnsiguiente
                : 'SIGUIENTE'
            }
            onPress={() => registroParcial()}
          />
          {/* <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{color: color.GRAY, fontSize: 16}}>
              {tags.registerScreen.label2 != ''
                ? tags.registerScreen.label2
                : 'o crea tu cuenta con tus redes sociales.'}
            </Text>
          </View> */}
          {/* <View style={registroStyles.containerSocial}>
            <SocialIcon
              style={registroStyles.buttonSocialIcon}
              title={
                tags.registerScreen.btnfacebook != ''
                  ? tags.registerScreen.btnfacebook
                  : 'Continuar con Facebook'
              }
              button
              type="facebook"
              onPress={() => {
                toggleDialog();
                setVariableSocial('F');
              }}
            />
            <SocialIcon
              style={registroStyles.buttonSocialIcon}
              title={
                tags.registerScreen.btngoogle != ''
                  ? tags.registerScreen.btngoogle
                  : 'Continuar con Google'
              }
              button
              type="google-plus-official"
              onPress={() => {
                toggleDialog();
                setVariableSocial('G');
              }}
            />
          </View> */}
          <View style={loginStyles.boxTransparent} />
          <Dialog isVisible={visible} onBackdropPress={toggleDialog}>
            <Dialog.Title
              title={
                tags.registerScreen.inputtipo != ''
                  ? tags.registerScreen.inputtipo
                  : 'Tipo usuario'
              }
            />
            {tiposUsuario.map((tipo, i) => {
              return (
                <CheckBox
                  key={i}
                  title={tipo.label}
                  containerStyle={styles.container}
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  checked={checked === i + 1}
                  onPress={() => {
                    setUsertype(tipo.value);
                    setChecked(i + 1);
                  }}
                />
              );
            })}

            <Dialog.Actions>
              <Dialog.Button
                title={
                  tags.registerScreen.btnsiguiente != ''
                    ? tags.registerScreen.btnsiguiente
                    : 'CONFIRMAR'
                }
                onPress={() => {
                  socialConnect(variableSocial);
                  toggleDialog();
                }}
              />
              <Dialog.Button
                title={
                  tagsModal.btncancelar != '' ? tagsModal.btncancelar : 'CANCEL'
                }
                onPress={toggleDialog}
              />
            </Dialog.Actions>
          </Dialog>
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  function socialConnect(socialVariable) {
    if (socialVariable == 'F') {
      //
      console.log(socialVariable);
      FacebookLogin();
    } else if (socialVariable == 'G') {
      //
      console.log(socialVariable);
      GoogleLogin();
    }
  }
  function registroParcial() {
    if (
      password == '' ||
      password == ' ' ||
      confirmPassword == '' ||
      confirmPassword == ' '
    ) {
      Snackbar.show({
        text:
          tags.dialogAlertsScreen.e != ''
            ? tags.dialogAlertsScreen.e
            : 'Revise las contraseñas, una esta vacia',
        duration: Snackbar.LENGTH_LONG,
      });
    } else if (username == ' ' || username == '' || role == '' || role == ' ') {
      Snackbar.show({
        text:
          tags.dialogAlertsScreen.j != ''
            ? tags.dialogAlertsScreen.j
            : 'No se admiten campos vacios, revise usuario o tipo de usuario',
        duration: Snackbar.LENGTH_LONG,
      });
    } else if (password != confirmPassword) {
      Snackbar.show({
        text:
          tags.dialogAlertsScreen.h != ''
            ? tags.dialogAlertsScreen.h
            : 'Las contraseñas no coinciden',
        duration: Snackbar.LENGTH_LONG,
      });
    } else {
      registerAction({
        username,
        email,
        password,
        role,
      });
      goToScreen('RegistroAdd');
    }
  }

  function goToScreen(routeName) {
    props.navigation.navigate(routeName);
  }

  function GoogleLogin() {
    GoogleSignin.configure({
      androidClientId:
        '607622761629-sdlr627m6781mjergpcn727jo9ovrm8p.apps.googleusercontent.com',
      iosClientId:
        '607622761629-2moln709psuiugvgbkhmg37ocqmn92dg.apps.googleusercontent.com',
    });
    GoogleSignin.hasPlayServices()
      .then(hasPlayService => {
        if (hasPlayService) {
          GoogleSignin.signIn()
            .then(userInfo => {
              console.log(JSON.stringify(userInfo.user));
              signOutGoogle();
            })
            .catch(e => {
              console.log('ERROR IS: ' + JSON.stringify(e));
            });
        }
      })
      .catch(e => {
        console.log('ERROR IS: ' + JSON.stringify(e));
      });
  }

  function FacebookLogin() {
    // Attempt a login using the Facebook login dialog asking for default permissions.
    LoginManager.logInWithPermissions(['public_profile']).then(
      login => {
        if (login.isCancelled) {
          console.log('Login cancelled');
          logoutWithFacebook();
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            const accessToken = data.accessToken.toString();
            getInfoFromToken(accessToken);
            console.log('Logueado?');
            logoutWithFacebook();
          });
        }
      },
      error => {
        console.log('Login fail with error: ' + error);
      },
    );
  }
}

const styles = StyleSheet.create({
  btnDropStyle: {
    width: '91%',
    borderColor: color.GRAY2,
    borderRadius: 15,
  },
  containerDropStyle: {
    marginTop: 5,
    flexDirection: 'row',
    width: '100%',
    height: '6.25%',
    borderRadius: 15,
    backgroundColor: color.INPUTCOLOR,
  },
  container: {backgroundColor: 'white', borderWidth: 0},
});
