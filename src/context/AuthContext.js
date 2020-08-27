import React, { createContext, useState, useEffect, useMemo } from 'react';
import mascotappi from '../api/mascotappi';
import AsyncStorage from '@react-native-community/async-storage';
import { node } from 'prop-types';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

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
        console.error('error:', error);
      }
    };

    loadUser();
  }, [user, loadingUser]);

  const signIn = async (email, password) => {
    try {
      const response = await mascotappi.post('signin', { email, password });
      setUser(response.data); // For now: all data is set to the user
      await AsyncStorage.setItem('tokenId', response.data.tokenId);
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('tokenId');
      setUser(null);
    } catch (error) {
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
      return response;
    } catch (error) {
      console.log('error', error);
      return error.toString();
    }
  };

  // TODO: connect this function
  // const resetPassword = () => {};

  const value = useMemo(() => {
    return { user, loadingUser, signIn, signOut, signUp };
  }, [user, loadingUser]);

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
