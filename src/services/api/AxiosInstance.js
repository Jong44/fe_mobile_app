import axios from 'axios';
import { API_BASE_URL } from '../config/ConstantaVar';

const AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request Interceptor
AxiosInstance.interceptors.request.use(
    (config) => {
        // Do something before request is sent
        return config;
    },
  (error) => Promise.reject(error)
);

// Response Interceptor
AxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Tangani error global
    return Promise.reject(error);
  }
);

export default AxiosInstance;
