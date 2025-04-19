import api from './api';

// Obtener todos los retiros
export const getRetiros = async () => {
  try {
    const res = await api.get('/Retiro');
    return res.data;
  } catch (error) {
    throw new Error('Error al obtener los retiros: ' + error.message);
  }
};

// Obtener un retiro por ID
export const getRetiroById = async (id) => {
  try {
    const res = await api.get(`/Retiro/${id}`);
    return res.data;
  } catch (error) {
    throw new Error('Error al obtener el retiro: ' + error.message);
  }
};

// Crear un nuevo retiro
export const createRetiro = async (retiro) => {
  try {
    const res = await api.post('/Retiro', retiro);
    return res.data;
  } catch (error) {
    const backendError = error.response?.data?.Message || error.message;
    throw new Error('Error al crear el retiro: ' + backendError);
  }
};

// Actualizar un retiro existente
export const updateRetiro = async (id, retiro) => {
  try {
    await api.put(`/Retiro/${id}`, retiro);
  } catch (error) {
    const backendError = error.response?.data?.Message || error.message;
    throw new Error('Error al actualizar el retiro: ' + backendError);
  }
};

// Eliminar un depósito
export const deleteRetiro = async (id) => {
  try {
    const res = await api.delete(`/Retiro/${id}`);
    return res.data;
  } catch (error) {
    const backendError = error.response?.data?.Message || error.message;
    throw new Error('Error al eliminar el retiro: ' + backendError);
  }
};
