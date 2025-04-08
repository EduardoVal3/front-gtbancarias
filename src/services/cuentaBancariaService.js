import api from './api';

// Obtener todas las cuentas bancarias
export const getCuentasBancarias = async () => {
  try {
    const res = await api.get('/cuentabancaria');
    return res.data;
  } catch (error) {
    throw new Error('Error al obtener cuentas bancarias: ' + error.message);
  }
};

// Obtener una cuenta bancaria por ID
export const getCuentaBancariaById = async (id) => {
  try {
    const res = await api.get(`/cuentabancaria/${id}`);
    return res.data;
  } catch (error) {
    throw new Error('Error al obtener la cuenta bancaria: ' + error.message);
  }
};

// Crear una nueva cuenta bancaria
export const createCuentaBancaria = async (cuenta) => {
  try {
    const res = await api.post('/cuentabancaria', cuenta);
    return res.data;
  } catch (error) {
    throw new Error('Error al crear la cuenta bancaria: ' + error.message);
  }
};

// Actualizar una cuenta bancaria
export const updateCuentaBancaria = async (id, cuenta) => {
  try {
    await api.put(`/cuentabancaria/${id}`, cuenta);
  } catch (error) {
    throw new Error('Error al actualizar la cuenta bancaria: ' + error.message);
  }
};

// Eliminar una cuenta bancaria
export const deleteCuentaBancaria = async (id) => {
  try {
    const res = await api.delete(`/cuentabancaria/${id}`);
    return res.data;
  } catch (error) {
    throw new Error('Error al eliminar la cuenta bancaria: ' + error.message);
  }
};
