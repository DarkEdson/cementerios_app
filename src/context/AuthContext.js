import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import { Alert, Linking } from 'react-native';
import Snackbar from 'react-native-snackbar';
import {BASE_URL} from '@utils/config';
import {apiChangePassword, apiUpdateUser} from '@Apis/ApisGenerales';
import { apiBorraUsuario } from '../Apis/ApisGenerales';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState({});
  const [tokenUserInfo, setTokenUserInfo] = useState(null);
  const [errorInfo, setErrorInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);

  const handleEmailPress = ()=>{
    Linking.openURL(`mailto:${email}`)
  }

  const register = (userNew, goToScreen, loginAction, tags) => {
    setIsLoading(true);
    console.log(userNew)
    axios
      .post(`${BASE_URL}/auth/signup`, {
        username: userNew.username,
        name: userNew.name,
        email: userNew.email,
        password: userNew.password,
        role: userNew.role,
        lastname: userNew.lastname,
        paypal_id: userNew.paypal_id,
        phone: userNew.phone,
        nit: userNew?.nit || '',
        birthdayDate: userNew?.birthdayDate || '',
        country: userNew?.pais || '',
        accountNumber: userNew?.numercuenta || '',
        accountType: userNew?.tipocuenta || '',
        bank: userNew?.banco || '',
        swiftCode: userNew?.codigoswift || '',
        direction: userNew?.direccion || '',
        status: '1',
      })
      .then(res => {
        let userInfo = res.data;
        let tokenUserInfo = res.headers.token;
        setUserInfo(userInfo);
        setTokenUserInfo(tokenUserInfo);
        AsyncStorage.setItem('tokenUserInfo', JSON.stringify(tokenUserInfo));
        //   AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        loginAction({
          type: 'register',
          data: userInfo,
          tags: {
            registro: tags.q != '' ? tags.q : 'Registro con Exito',
          },
        });
        console.log(userInfo, 'dentro del registro');
        AsyncStorage.removeItem('errorInfo');
        setIsLoading(false);
        setErrorInfo(null);
        goToScreen('Login');
      })
      .catch(e => {
        console.log(`register error ${e}`);
        let errorInfo = e.response.message;
        console.log(errorInfo);
        AsyncStorage.setItem('errorInfo', JSON.stringify(errorInfo));
        Snackbar.show({
          text: errorInfo,
          duration: Snackbar.LENGTH_LONG,
        });
        setErrorInfo(errorInfo);
        setIsLoading(false);
        setUserInfo({});
        goToScreen('Login');
      });
  };

  function login(email, password, goToScreen, loginAction, tags) {
    setIsLoading(true);
    console.log(email, password, 'dentro de loginauth');
    axios
      .post(`${BASE_URL}/auth/signin`, {
        email,
        password,
      })
      .then(res => {
        let userInfo = res.data;
        let tokenUserInfo = res.headers.token;
        console.log('usuario data', userInfo, 'token de sesion', tokenUserInfo);
        setUserInfo(userInfo);
        setTokenUserInfo(tokenUserInfo);
        AsyncStorage.setItem('tokenUserInfo', JSON.stringify(tokenUserInfo));
        AsyncStorage.removeItem('errorInfo');
        setIsLoading(false);
        setErrorInfo(null);
        loginAction({
          type: 'sign',
          data: userInfo,
          tags: {
            inicio: tags.p != '' ? tags.p : 'Inicio de sesion con Exito',
          },
        });
        goToScreen('Splash');
      })
      .catch(e => {
        let errorInfo = e.response.data;
        console.log(`login error ${e}`);
        console.log(errorInfo);
        AsyncStorage.setItem('errorInfo', JSON.stringify(errorInfo));
        setErrorInfo(errorInfo);
        setIsLoading(false);
        setUserInfo({});
        if (errorInfo == 'Invalid password!') {
          Snackbar.show({
            text: tags.b != '' ? tags.b : errorInfo,
            duration: Snackbar.LENGTH_LONG,
          });
        } else if (errorInfo == 'Email or Password is wrong!') {
          Snackbar.show({
            text: tags.c != '' ? tags.c : errorInfo,
            duration: Snackbar.LENGTH_LONG,
          });
        } else {
          Snackbar.show({
            text: errorInfo,
            duration: Snackbar.LENGTH_LONG,
          });
        }

        goToScreen('Login');
      });
  }

  const logout = () => {
    setIsLoading(true);

    axios
      .post(
        `${BASE_URL}/logout`,
        {},
        {
          headers: {Authorization: `Bearer ${tokenUserInfo}`},
        },
      )
      .then(res => {
        console.log(res.data);
        setTokenUserInfo(null);
        AsyncStorage.removeItem('tokenUserInfo');
        AsyncStorage.removeItem('userInfo');
        AsyncStorage.removeItem('errorInfo');
        setUserInfo({});
        setErrorInfo(null);
        setIsLoading(false);
      })
      .catch(e => {
        console.log(`logout error ${e}`);
        setIsLoading(false);
      });
  };

  const deleteUser = (userID, tags, tags2) => {
    setIsLoading(true);

    axios
      .get(
        `${BASE_URL}/user.checkifcandelete/${userID}`,
        {},
      )
      .then( res => {
        console.log(res.data);
        if (res.data == 'Si se puede borrar'){
          Alert.alert(
             tags.borrarUsuario ? tags.borrarUsuario :'Confirmación de eliminar usuario',
            tags.confirmaEliminarUser ? tags.confirmaEliminarUser : '¿Esta seguro que \ndesea borrar su usuario?',
            [
              {
                text:
                  tags2.btnsi != ''
                    ? tags2.btnsi
                    : 'Si',
                onPress: async() => {
                  await apiBorraUsuario()
          setTokenUserInfo(null);
          AsyncStorage.removeItem('tokenUserInfo');
          AsyncStorage.removeItem('userInfo');
          AsyncStorage.removeItem('errorInfo');
          setUserInfo({});
          setErrorInfo(null);
          Snackbar.show({
            text: tags.usuarioBorrado ? tags.usuarioBorrado : 'Usuario Borrado',
            //tags.c != '' ? tags.c : errorInfo,
            duration: Snackbar.LENGTH_LONG,
          });
                },
              },
              {
                text:
                  tags2.btnno != ''
                    ? tags2.btnno
                    : 'No',
                onPress: () => {},
                style: 'cancel',
              },
            ],
          );
          
        }else if (res.data == 'No se puede borrar'){
          Alert.alert(
            tags.borrarUsuario ? tags.borrarUsuario : 'Borrar Usuario',
            tags.usuarioNoBorrado ? tags.usuarioNoBorrado  + ' sacwowgt@cementeriosgt.com' : res.data,
            [
              {
                text:
                  'OK',
                onPress: () => {},
              },
              
            ],
          );
          Snackbar.show({
            text: tags.usuarioNoBorrado ? tags.usuarioNoBorrado + ' sacwowgt@cementeriosgt.com': res.data,
            //tags.c != '' ? tags.c : errorInfo,
            duration: Snackbar.LENGTH_LONG,
          });
        }
      
        setIsLoading(false);
      })
      .catch(e => {
        console.log(`logout error ${e}`);
        setIsLoading(false);
      });
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);
      let userInfo = await AsyncStorage.getItem('userInfo');
      let tokenUserInfo = await AsyncStorage.getItem('tokenUserInfo');

      userInfo = JSON.parse(userInfo);
      tokenUserInfo = JSON.parse(tokenUserInfo);
      console.log(userInfo);
      console.log(tokenUserInfo);
      if (userInfo) {
        setUserInfo(userInfo);
        setTokenUserInfo(tokenUserInfo);
      }
      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);
      console.log(`is logged in error ${e}`);
    }
  };

  function cambiaClave(userID, newPassword, loginAction, tagmsj) {
    setIsLoading(true);
    apiChangePassword(userID, newPassword).then(res => {
      console.log('CONTRASEÑA', res);

      if (res.hasOwnProperty('value')) {
        let userInfo = res.value;
        console.log('usuario data actualizado', userInfo);
        setUserInfo(userInfo);
        Snackbar.show({
          text: tagmsj.success
            ? tagmsj.success
            : 'Su contraseña fue cambiada correctamente',
          duration: Snackbar.LENGTH_LONG,
        });
        loginAction({
          type: 'update',
          data: userInfo,
          tags: {
            inicio: tagmsj.success ? tagmsj.success : 'Contraseña Actualizada',
          },
        });
        setIsLoading(false);
      } else {
        Snackbar.show({
          text: tagmsj.failed ? tagmsj.failed : 'Error Cambiando Contraseña',
          duration: Snackbar.LENGTH_LONG,
        });
      }
    });
  }

  function actualizaUsuario(user, idUser, loginAction, tagsMsg) {
    setIsLoading(true);
    apiUpdateUser(user, idUser).then(res => {
      console.log('USUARIO ACTUALIZADO', res);

      if (res.hasOwnProperty('value')) {
        let userInfo = res.value;
        console.log('usuario data actualizado', userInfo);
        setUserInfo(userInfo);
        Snackbar.show({
          text: tagsMsg.success
            ? tagsMsg.success
            : 'Actualizacion de datos Exitosamente',
          duration: Snackbar.LENGTH_LONG,
        });
        loginAction({
          type: 'update',
          data: userInfo,
          tags: {
            inicio: 'Usuario Actualizado',
          },
        });
        setIsLoading(false);
      } else {
        Snackbar.show({
          text: tagsMsg.failed ? tagsMsg.failed : 'Error Actualizando Datos',
          duration: Snackbar.LENGTH_LONG,
        });
      }
    });
  }


  function actualizaAvatar(user, loginAction) {
    setIsLoading(true);
    console.log('usuario respuesta', user)
    let userInfo = JSON.parse(user)
    console.log('usuario PARSEADO', userInfo)
    setUserInfo(userInfo);
    loginAction({
      type: 'update',
      data: userInfo,
      tags: {
        inicio: 'Usuario Actualizado',
      },
    });
    setIsLoading(false);
  }

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        splashLoading,
        errorInfo,
        tokenUserInfo,
        register,
        login,
        logout,
        cambiaClave,
        actualizaUsuario,
        actualizaAvatar,
        deleteUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
