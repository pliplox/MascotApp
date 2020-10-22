import React, { createContext, useState, useEffect, useMemo } from 'react';
import mascotappi from '../api/mascotappi';
import AsyncStorage from '@react-native-community/async-storage';
import { node } from 'prop-types';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState('')
  const [loadingUser, setLoadingUser] = useState(true);
  const [userToken, setUserToken] = useState();

  useEffect(() => {
    const loadUser = async () => {
      const getToken = await AsyncStorage.getItem('tokenId');
      try {
        if (!getToken) {
          setLoadingUser(false);
          return;
        }
        setLoadingUser(false);
      } catch (error) {
        setLoadingUser(false);
        console.error('error: ', error.message);
      }
    };

    loadUser();
  }, [user, loadingUser]);

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let tokenFromAsyncStorage;

      try {
        tokenFromAsyncStorage = await AsyncStorage.getItem('tokenId');
      } catch (e) {
        console.error(e.message);
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setUserToken(tokenFromAsyncStorage);
      setLoadingUser(false);
    };

    bootstrapAsync();
  }, [userToken]);

  const signIn = async (email, password) => {
    try {
      const response = await mascotappi.post('signin', { email, password });
      setUser(response.data); // For now: all data is set to the user      
      if (response.status >= 400) {
        setErrorMessage(response.data.message)
      }else {      
        setErrorMessage('');
        setUserToken(response?.data?.tokenId);
        await AsyncStorage.setItem('tokenId', response.data.tokenId);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const signOut = async () => {
    setLoadingUser(true);
    try {
      await AsyncStorage.removeItem('tokenId');
      setUserToken(null);
      setUser(null);
      setLoadingUser(false);
    } catch (error) {
      setLoadingUser(false);
      console.error(error);
      return error;
    }
  };

  const signUp = async (name, email, password) => {
    try {
      const response = await mascotappi.post('signup', {
        name,
        email,
        password,
      });      
      if (response.status >= 400) {
        console.log(response);
        setErrorMessage(response.data.message)
      }else {      
        setErrorMessage('');
        await signIn(email, password)       
      }
    } catch (error) {      
      return error.message;
    }
  };

  // TODO: connect this function
  // const resetPassword = () => {};

  const value = useMemo(() => {
    return { user, loadingUser, signIn, signOut, signUp, userToken, errorMessage, setErrorMessage };
  }, [user, loadingUser, userToken, errorMessage, setErrorMessage]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be inside AuthContext provider');
  }
  return context;
};

AuthProvider.propTypes = {
  children: node.isRequired,
};
