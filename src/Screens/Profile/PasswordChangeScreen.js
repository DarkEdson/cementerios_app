import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
//Recarga la screen
import {useIsFocused} from '@react-navigation/native';
//URL de server
import {BASE_URL_IMG} from '@utils/config';
//Estilos Generales
import {mainStyles} from '@styles/stylesGeneral';
import color from '@styles/colors';
//Componentes
import MyTextInput from '@Components/common/MyTextInput';
import ToolBar from '@Components/common/toolBar';
import MyButton from '@Components/common/MyButton';
//Contextos
import {UsuarioContext} from '@context/UsuarioContext';
import {ScreentagContext} from '@context/ScreentagsContext';

//tags.changePasswordScreen.btn != '' ? tags.changePasswordScreen.btn :
export default function PasswordChangeScreen(props) {
  const [loginUser, loginAction] = useContext(UsuarioContext);
  const [hidePassword, setHidePassword] = useState(true);
  const [hidePasswordNew, setHidePasswordNew] = useState(true);
  const [hidePasswordConfirm, setHidePasswordConfirm] = useState(true);
  const {tags, updateTags} = useContext(ScreentagContext);

  const isFocused = useIsFocused();
  const getInitialData = async () => {};

  const [data, setData] = useState({
    password: '',
    newpasswordConfirm: '',
    newPassword: '',
  });
  useEffect(() => {
    if (isFocused) {
      getInitialData();
      console.log('isFocused Promo Code');
    }
    //props, isFocused
  }, []);

  const handlePasswordChange = val => {
    if (data.newpasswordConfirm != '') {
      if (val == data.password) {
        Snackbar.show({
          text: 'La contraseña es igual a la actual',
          duration: Snackbar.LENGTH_LONG,
        });
      } else {
        if (val == data.newpasswordConfirm) {
          if (val.trim().length >= 8) {
            setData({...data, newPassword: val});
          } else {
            Snackbar.show({
              text: 'La contraseña debe ser de al menos 8 caracteres',
              duration: Snackbar.LENGTH_LONG,
            });
          }
        } else {
          if (val.trim().length >= 8) {
            Snackbar.show({
              text: 'Las contraseñas no coinciden',
              duration: Snackbar.LENGTH_LONG,
            });
          } else {
            Snackbar.show({
              text: 'La contraseña debe ser de al menos 8 caracteres y no coinciden',
              duration: Snackbar.LENGTH_LONG,
            });
          }
        }
      }
    } else {
      if (val.trim().length >= 8) {
        setData({...data, newPassword: val});
      } else {
        Snackbar.show({
          text: 'La contraseña debe ser de al menos 8 caracteres',
          duration: Snackbar.LENGTH_LONG,
        });
      }
    }
  };
  const handlePasswordConfirm = val => {
    if (val == data.newpasswordConfirm) {
      setData({...data, newpasswordConfirm: val});
    } else {
      Snackbar.show({
        text: 'Las contraseñas no coinciden',
        duration: Snackbar.LENGTH_LONG,
      });
    }
  };

  const handlePassword = val => {
    if (val == loginUser.usuario.password) {
      setConfirmPassword(val);
    } else {
      Snackbar.show({
        text: 'No es la contraseña actual',
        duration: Snackbar.LENGTH_LONG,
      });
    }
  };

  return (
    <SafeAreaView style={mainStyles.containers} > 
    <View style={styles.container}>
      <StatusBar
        backgroundColor={color.PRINCIPALCOLOR}
        barStyle="dark-content"
        translucent={true}
      />
      <ToolBar
        titulo={
          tags.changePasswordScreen.titulo != ''
            ? tags.changePasswordScreen.titulo
            : 'Cambiar Clave'
        }
        onPressLeft={() => goToScreen('PersonalData')}
        iconLeft={true}
      />

      <ScrollView>
        <View style={styles.editField}>
          <Text style={styles.titleLabel}>
            {tags.changePasswordScreen.password != ''
              ? tags.changePasswordScreen.password
              : 'Password'}
            :
          </Text>
          <MyTextInput
            keyboardType={null}
            placeholder={
              tags.changePasswordScreen.password != ''
                ? tags.changePasswordScreen.password
                : 'Actual Password'
            }
            image="lock"
            bolGone={true}
            value={data.password}
            onChangeText={pass => setData({...data, password: pass})}
            secureTextEntry={hidePassword}
            onPressIcon={() => setHidePassword(!hidePassword)}
            onEndEditing={e => handlePassword(e.nativeEvent.text)}
          />
          <Text style={styles.titleLabel}>
            {tags.changePasswordScreen.newpass != ''
              ? tags.changePasswordScreen.newpass
              : 'New Password:'}
          </Text>
          <MyTextInput
            keyboardType={null}
            placeholder={
              tags.changePasswordScreen.newpass != ''
                ? tags.changePasswordScreen.newpass
                : 'New Password'
            }
            image="lock"
            bolGone={true}
            value={data.newPassword}
            onChangeText={newpass => setData({...data, newpassword: newpass})}
            secureTextEntry={hidePasswordNew}
            onPressIcon={() => setHidePasswordNew(!hidePasswordNew)}
            onEndEditing={e => handlePasswordChange(e.nativeEvent.text)}
          />
          <Text style={styles.titleLabel}>
            {tags.changePasswordScreen.confpass != ''
              ? tags.changePasswordScreen.confpass
              : 'New Confirm Password:'}
          </Text>
          <MyTextInput
            keyboardType={null}
            placeholder={
              tags.changePasswordScreen.confpass != ''
                ? tags.changePasswordScreen.confpass
                : 'Confirmar New Password'
            }
            image="lock"
            bolGone={true}
            value={data.newpasswordConfirm}
            onChangeText={newconfirm =>
              setData({...data, newpasswordConfirm: newconfirm})
            }
            secureTextEntry={hidePasswordConfirm}
            onPressIcon={() => setHidePasswordConfirm(!hidePasswordConfirm)}
            onEndEditing={e => handlePasswordConfirm(e.nativeEvent.text)}
          />
          <MyButton
            titulo={
              tags.changePasswordScreen.btn != ''
                ? tags.changePasswordScreen.btn
                : 'Guardar Cambios'
            }
            onPress={() => {}}
          />
        </View>
      </ScrollView>
    </View>
    </SafeAreaView>
  );

  function goToScreen(routeName) {
    props.navigation.navigate(routeName);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  titleLabel: {
    fontWeight: 'bold',
  },
  editField: {
    marginTop: 5,
    paddingHorizontal: 20,
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
