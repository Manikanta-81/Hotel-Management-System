import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost', // Your Express server URL
  // baseURL: 'http://localhost:80', // Your Express server URL

});

export default axiosInstance;
