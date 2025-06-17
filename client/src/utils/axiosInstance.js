import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://13.202.204.246', // Your Express server URL
  // baseURL: 'http://localhost:80', // Your Express server URL

});

export default axiosInstance;
