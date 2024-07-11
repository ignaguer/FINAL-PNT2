import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.bluelytics.com.ar/v2/latest',
});

export default axiosInstance;