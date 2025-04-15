import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'development' 
  ? '/api' 
  : 'https://localhost:44334/api';

const api = axios.create({
  baseURL: API_URL,
});

export default api;