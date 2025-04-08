import api from './api';

// Obtener todas las tarjetas de crédito
export const getTarjetasCredito = async () => {
  try {
    const res = await api.get('/TarjetaCredito');
    return res.data;
  } catch (error) {
    throw new Error('Error al obtener tarjetas de crédito: ' + error.message);
  }
};

// Obtener una tarjeta de crédito por ID
export const getTarjetaCreditoById = async (id) => {
  try {
    const res = await api.get(`/TarjetaCredito/${id}`);
    return res.data;
  } catch (error) {
    throw new Error('Error al obtener la tarjeta de crédito: ' + error.message);
  }
};

// Crear una nueva tarjeta de crédito
export const createTarjetaCredito = async (tarjeta) => {
  try {
    const res = await api.post('/TarjetaCredito', tarjeta);
    return res.data;
  } catch (error) {
    throw new Error('Error al crear la tarjeta de crédito: ' + error.message);
  }
};

// Actualizar una tarjeta de crédito
export const updateTarjetaCredito = async (id, tarjeta) => {
  try {
    await api.put(`/TarjetaCredito/${id}`, tarjeta);
  } catch (error) {
    throw new Error('Error al actualizar la tarjeta de crédito: ' + error.message);
  }
};

// Eliminar una tarjeta de crédito
export const deleteTarjetaCredito = async (id) => {
  try {
    const res = await api.delete(`/TarjetaCredito/${id}`);
    return res.data;
  } catch (error) {
    throw new Error('Error al eliminar la tarjeta de crédito: ' + error.message);
  }
};
