import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const useIsSignedIn = () => {
  const [isSignedIn, setIsSignedIn] = useState();

  const getTokenId = async () => {
    try {
      const tokenId = await AsyncStorage.getItem('tokenId');
      tokenId ? setIsSignedIn(true) : setIsSignedIn(false);
    } catch (e) {
      console.error(e.message);
    }
  };

  useEffect(() => {
    getTokenId();
  }, []);

  return [isSignedIn];
};

export default useIsSignedIn;
