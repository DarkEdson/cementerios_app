import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
  BackHandler,
} from 'react-native';
import BtnCategoria from '@Components/BtnCategoria/';
import ToolBar from '@Components/common/toolBar';
import {mainStyles} from '@styles/stylesGeneral';
import MyTextInput from '@Components/common/MyTextInput';
import {UsuarioContext} from '@context/UsuarioContext';
import color from '@styles/colors';
import MyButton from '@Components/common/MyButton';

export default function PasswordChangeScreen(props) {
  const [loginUser, loginAction] = useContext(UsuarioContext);
  const [hidePassword, setHidePassword] = useState(true);
  const [hidePasswordNew, setHidePasswordNew] = useState(true);
  const [hidePasswordConfirm, setHidePasswordConfirm] = useState(true);

  const [data, setData] = useState({
    password: '',
    newpasswordConfirm: '',
    newPassword: '',
  });
  useEffect(() => {}, []);

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
    <View style={styles.container}>
      <StatusBar
        backgroundColor={color.PRINCIPALCOLOR}
        barStyle="dark-content"
        translucent={true}
      />
      <ToolBar
        titulo="Cambiar Clave"
        onPressLeft={() => goToScreen('PersonalData')}
        iconLeft={true}
      />

      <ScrollView>
        <View style={styles.editField}>
          <Text style={styles.titleLabel}>Password:</Text>
          <MyTextInput
            keyboardType={null}
            placeholder="Actual Password"
            image="lock"
            bolGone={true}
            value={data.password}
            onChangeText={pass => setData({...data, password: pass})}
            secureTextEntry={hidePassword}
            onPressIcon={() => setHidePassword(!hidePassword)}
            onEndEditing={e => handlePassword(e.nativeEvent.text)}
          />
          <Text style={styles.titleLabel}>New Password:</Text>
          <MyTextInput
            keyboardType={null}
            placeholder="New Password"
            image="lock"
            bolGone={true}
            value={data.newPassword}
            onChangeText={newpass => setData({...data, newpassword: newpass})}
            secureTextEntry={hidePasswordNew}
            onPressIcon={() => setHidePasswordNew(!hidePasswordNew)}
            onEndEditing={e => handlePasswordChange(e.nativeEvent.text)}
          />
          <Text style={styles.titleLabel}>New Confirm Password:</Text>
          <MyTextInput
            keyboardType={null}
            placeholder="Confirmar New Password"
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
          <MyButton titulo="Guardar Cambios" onPress={() => {}} />
        </View>
      </ScrollView>
    </View>
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
