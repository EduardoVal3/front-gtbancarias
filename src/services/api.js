import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'development' 
  ? '/api' 
  : 'https://localhost:44334/api';

const api = axios.create({
  baseURL: API_URL,
});

export default api;





// Función para obtener todos los clientes


// Funciones adicionales :
// export const createCliente = async (cliente) => {
//   await api.post('/cliente', cliente);
// };
// ...


export const getTransferencias = async () => {
  const response = await api.get('/transferencia');
  return response.data;
};
// más funciones (PUT, DELETE)