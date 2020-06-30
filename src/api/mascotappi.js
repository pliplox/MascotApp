import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

let API_HOST;
const baseHost = apiHost => `https://mascot${apiHost}.herokuapp.com`;
if (process.env.MOBILE_NODE_ENV === 'production') {
  API_HOST = baseHost('api');
} else if (process.env.MOBILE_NODE_ENV === 'staging') {
  API_HOST = baseHost('-api-dev');
} else {
  API_HOST = `http://${process.env.MOBILE_IP}:3000`;
}

const mascotappi = axios.create({
  baseURL: `${API_HOST}/api/`,
});

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
