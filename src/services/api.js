// api.js
import axios from 'axios';

const API_URL = 'https://gestionbancaria-api-ahfdeggzdmhfdrcx.canadacentral-01.azurewebsites.net/api';

const api = axios.create({
  baseURL: API_URL,
});

// Interceptor: antes de cada petición, añade el header Authorization
api.interceptors.request.use(
  config => {
    // Lee el token desde localStorage
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log(token);
    }
    return config;
  },
  error => Promise.reject(error)
);

export default api;
