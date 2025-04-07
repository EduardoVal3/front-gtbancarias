import axios from 'axios';

// base URL (sin el proxy, usar directamente 'https://localhost:44334')
const API_URL = process.env.NODE_ENV === 'development' 
  ? '/api' 
  : 'https://localhost:44334/api';

const api = axios.create({
  baseURL: API_URL,
});

// obtener transferencias
export const getTransferencias = async () => {
  const response = await api.get('/transferencia');
  return response.data;
};

// crear una transferencia
export const createTransferencia = async (transferencia) => {
  const response = await api.post('/transferencia', transferencia);
  return response.data;
};

// Agrega más funciones (PUT, DELETE) según necesites