import axios from 'axios';
import { getToken } from './auth';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '',
});

instance.interceptors.request.use(config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance; 