import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import Snackbar from 'react-native-snackbar';
import {BASE_URL} from '@utils/config';
import {apiChangePassword, apiUpdateUser} from '@Apis/ApisGenerales';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState({});
  const [tokenUserInfo, setTokenUserInfo] = useState(null);
  const [errorInfo, setErrorInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);

  const register = (userNew, goToScreen, loginAction, tags) => {
    setIsLoading(true);

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
        status: '0',
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
