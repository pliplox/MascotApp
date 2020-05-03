import axios from 'axios';

export default axios.create({
  baseURL: 'https://skollapp-api.herokuapp.com/api/',
});
