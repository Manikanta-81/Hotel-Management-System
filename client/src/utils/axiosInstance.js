import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost', // Your Express server URL

});

export default axiosInstance;
