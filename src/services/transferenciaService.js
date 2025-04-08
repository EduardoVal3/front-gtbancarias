import api from './api';

// Obtener todas las transferencias
export const getTransferencias = async () => {
  try {
    const res = await api.get('/transferencia');
    return res.data;
  } catch (error) {
    throw new Error('Error al obtener las transferencias: ' + error.message);
  }
};

// Obtener una transferencia por ID
export const getTransferenciaById = async (id) => {
  try {
    const res = await api.get(`/transferencia/${id}`);
    return res.data;
  } catch (error) {
    throw new Error('Error al obtener la transferencia: ' + error.message);
  }
};

// Crear una nueva transferencia
export const createTransferencia = async (transferencia) => {
  try {
    const res = await api.post('/transferencia', transferencia);
    return res.data;
  } catch (error) {
    // Mensajes específicos del backend como "Saldo insuficiente", "Cuenta no existe", etc.
    const backendError = error.response?.data?.Message || error.message;
    throw new Error('Error al crear la transferencia: ' + backendError);
  }
};

// Actualizar una transferencia
export const updateTransferencia = async (id, transferencia) => {
  try {
    await api.put(`/transferencia/${id}`, transferencia);
  } catch (error) {
    const backendError = error.response?.data?.Message || error.message;
    throw new Error('Error al actualizar la transferencia: ' + backendError);
  }
};

// Eliminar una transferencia
export const deleteTransferencia = async (id) => {
  try {
    const res = await api.delete(`/transferencia/${id}`);
    return res.data;
  } catch (error) {
    const backendError = error.response?.data?.Message || error.message;
    throw new Error('Error al eliminar la transferencia: ' + backendError);
  }
};
