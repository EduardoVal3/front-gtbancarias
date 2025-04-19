// api.js
import axios from 'axios';

// URL fija de tu API en Azure (o la que Vercel necesite)
// Cambia esto por la tuya si difiere:
const API_URL = 'https://gestionbancaria-api-ahfdeggzdmhfdrcx.canadacentral-01.azurewebsites.net/api';

const api = axios.create({
  baseURL: API_URL,
});

// Interceptor: antes de cada petición, añade el header Authorization
api.interceptors.request.use(
  config => {
    // Lee tu token desde localStorage (o donde lo guardes)
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default api;
