import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import Snackbar from 'react-native-snackbar';
import {BASE_URL} from '@utils/config';
import {
  Alert,
} from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState({});
  const [errorInfo, setErrorInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);

  const register = (userNew, goToScreen, loginAction) => {
    setIsLoading(true);

    axios
      .post(`${BASE_URL}/auth/signup`, {
        name: userNew.name,
        email: userNew.email,
        password: userNew.password,
      })
      .then(res => {
        let userInfo = res.data;
        setUserInfo(userInfo);
        //   AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        loginAction({
          type: 'sign',
          data: userInfo,
        });

        console.log(userInfo);
        AsyncStorage.removeItem('errorInfo');
        setIsLoading(false);
        setErrorInfo(null);
        goToScreen('Loading');
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
        goToScreen('Loading');
      });
  };

  function login(email, password, goToScreen, loginAction) {
    setIsLoading(true);

    axios
      .post(`${BASE_URL}/auth/signin`, {
        email,
        password,
      })
      .then(res => {
        let userInfo = res.data;
        console.log(userInfo);
        setUserInfo(userInfo);
        // AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        AsyncStorage.removeItem('errorInfo');
        setIsLoading(false);
        setErrorInfo(null);
        loginAction({
          type: 'sign',
          data: userInfo,
        });

        goToScreen('Home');
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
          headers: {Authorization: `Bearer ${userInfo.access_token}`},
        },
      )
      .then(res => {
        console.log(res.data);
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
      userInfo = JSON.parse(userInfo);
      console.log(userInfo);
      if (userInfo) {
        setUserInfo(userInfo);
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
        register,
        login,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
