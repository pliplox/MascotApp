import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

// TODO: use environment variables to know where should axios be pointing at
const mascotappi = axios.create({
  baseURL: 'https://mascotappi.herokuapp.com/api/',
});

// TODO: find a better way to do this

// When working on local environment with android/ios emulator and localhost backend
// make sure to know your local ip and connect to it with the following code and
// commenting the above code, leaving the below code only.

// const mascotappi = axios.create({
//   baseURL: 'http://0.0.0.0:3000/api/',
// });

mascotappi.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('tokenId');
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  error => Promise.reject(error),
);

export default mascotappi;
