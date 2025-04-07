import axios from 'axios';

// Configura la URL base según el entorno (desarrollo o producción)
const API_URL = process.env.NODE_ENV === 'development' 
  ? '/api' 
  : 'https://localhost:44334/api';

// Crea una instancia de Axios con la base URL
const api = axios.create({
  baseURL: API_URL,
});

// Función para obtener todos los clientes
export const getClientes = async () => {
  try {
    const response = await api.get('/cliente'); // Ajusta la ruta si es diferente (ej: '/clientes')
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener los clientes: ' + error.message);
  }
};

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