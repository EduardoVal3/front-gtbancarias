import api from './api';

// Obtener todas las tarjetas de débito
export const getTarjetasDebito = async () => {
  try {
    const res = await api.get('/TarjetaDebito');
    return res.data;
  } catch (error) {
    throw new Error('Error al obtener tarjetas de débito: ' + error.message);
  }
};

// Obtener una tarjeta de débito por ID
export const getTarjetaDebitoById = async (id) => {
  try {
    const res = await api.get(`/TarjetaDebito/${id}`);
    return res.data;
  } catch (error) {
    throw new Error('Error al obtener la tarjeta de débito: ' + error.message);
  }
};

// Crear una nueva tarjeta de débito
export const createTarjetaDebito = async (tarjeta) => {
  try {
    const res = await api.post('/TarjetaDebito', tarjeta);
    return res.data;
  } catch (error) {
    throw new Error('Error al crear la tarjeta de débito: ' + error.message);
  }
};

// Actualizar una tarjeta de débito
export const updateTarjetaDebito = async (id, tarjeta) => {
  try {
    await api.put(`/TarjetaDebito/${id}`, tarjeta);
  } catch (error) {
    throw new Error('Error al actualizar la tarjeta de débito: ' + error.message);
  }
};

// Eliminar una tarjeta de débito
export const deleteTarjetaDebito = async (id) => {
  try {
    const res = await api.delete(`/TarjetaDebito/${id}`);
    return res.data;
  } catch (error) {
    throw new Error('Error al eliminar la tarjeta de débito: ' + error.message);
  }
};
