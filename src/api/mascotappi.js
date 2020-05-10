import axios from 'axios';

// TODO: use environment variables to know where should axios be pointing at
export default axios.create({
  baseURL: 'https://skollapp-api.herokuapp.com/api/',
});

// TODO: find a better way to do this

// When working on local environment with android/ios emulator and localhost backend
// make sure to know your local ip and connect to it with the following code and
// commenting the above code, leaving the below code only.

// export default axios.create({
//   baseURL: 'http://192.168.0.58:3000/api/',
// });
