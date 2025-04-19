import api from './api';

// Obtener todos los depósitos
export const getDepositos = async () => {
  try {
    const res = await api.get('/Deposito');
    return res.data;
  } catch (error) {
    throw new Error('Error al obtener los depósitos: ' + error.message);
  }
};

// Obtener un depósito por ID
export const getDepositoById = async (id) => {
  try {
    const res = await api.get(`/Deposito/${id}`);
    return res.data;
  } catch (error) {
    throw new Error('Error al obtener el depósito: ' + error.message);
  }
};

// Crear un nuevo depósito
export const createDeposito = async (deposito) => {
  try {
    const res = await api.post('/Deposito', deposito);
    return res.data;
  } catch (error) {
    const backendError = error.response?.data?.Message || error.message;
    throw new Error('Error al crear el depósito: ' + backendError);
  }
};

// Actualizar un depósito existente
export const updateDeposito = async (id, deposito) => {
  try {
    await api.put(`/Deposito/${id}`, deposito);
  } catch (error) {
    const backendError = error.response?.data?.Message || error.message;
    throw new Error('Error al actualizar el depósito: ' + backendError);
  }
};

// Eliminar un depósito
export const deleteDeposito = async (id) => {
  try {
    const res = await api.delete(`/Deposito/${id}`);
    return res.data;
  } catch (error) {
    const backendError = error.response?.data?.Message || error.message;
    throw new Error('Error al eliminar el depósito: ' + backendError);
  }
};
