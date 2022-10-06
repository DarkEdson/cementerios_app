import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import Snackbar from 'react-native-snackbar';
import {BASE_URL} from '@utils/config';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState({});
  const [tokenUserInfo, setTokenUserInfo] = useState(null);
  const [errorInfo, setErrorInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);

  const register = (userNew, goToScreen, loginAction) => {
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
      })
      .then(res => {
        let userInfo = res.data;
        let tokenUserInfo = res.headers.token;
        setUserInfo(userInfo);
        setTokenUserInfo(tokenUserInfo);
        AsyncStorage.setItem('tokenUserInfo', JSON.stringify(tokenUserInfo));
        //   AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        loginAction({
          type: 'sign',
          data: userInfo,
        });
        console.log(userInfo, 'dentro del registro');
        AsyncStorage.removeItem('errorInfo');
        setIsLoading(false);
        setErrorInfo(null);
        goToScreen('Splash');
      })
      .catch(e => {
        console.log(`register error ${e}`);
        let errorInfo = e.response.data;
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

  function login(email, password, goToScreen, loginAction) {
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
        Snackbar.show({
          text: errorInfo,
          duration: Snackbar.LENGTH_LONG,
        });
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
      }}>
      {children}
    </AuthContext.Provider>
  );
};
