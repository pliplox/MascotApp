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
      if (!getToken) {
        setLoadingUser(false);
        return;
      }
      try {
        // TODO: autologin when app is reopened
        // get user data from api
        // setUser(user from api);
        setLoadingUser(false);
      } catch (error) {
        console.log(error);
      }
    };

    loadUser();
  }, []);

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
    setUser(null);
    await AsyncStorage.removeItem('tokenId');
  };

  // TODO: connect this functions
  // const signUp = ({ email, password, name }) => {};
  // const resetPassword = () => {};

  const value = useMemo(() => {
    return { user, loadingUser, signIn, signOut };
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
