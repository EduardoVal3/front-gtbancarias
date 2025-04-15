import api from './api';
//obtener todos los prestamos
export const getPrestamosHipotecarios = async () => {
  try {
    const res = await api.get('/PrestamoHipotecario');
    return res.data;
  } catch (error) {
    throw new Error('Error al obtener los préstamos: ' + error.message);
  }
};
 // obtener un prestamo por Id
export const getPrestamoHipotecarioById = async (id) => {
  try {
    const res = await api.get(`/PrestamoHipotecario/${id}`);
    return res.data;
  } catch (error) {
    throw new Error('Error al obtener el préstamo: ' + error.message);
  }
};

// Crear un prestamo
export const createPrestamoHipotecario = async (prestamo) => {
  try {
    const res = await api.post('/PrestamoHipotecario', prestamo);
    return res.data;
  } catch (error) {
    throw new Error('Error al crear el prestamo: ' + error.message);
  }
};

// Actualizar un prestamo
export const updatePrestamoHipotecario = async (id, prestamo) => {
  try {
    await api.put(`/PrestamoHipotecario/${id}`, prestamo);
  } catch (error) {
    throw new Error('Error al actualizar el prestamo: ' + error.message);
  }
};

// Eliminar un prestamo
export const deletePrestamoHipotecario = async (id) => {
  try {
    const res = await api.delete(`/PrestamoHipotecario/${id}`);
    return res.data;
  } catch (error) {
    throw new Error('Error al eliminar el prestamo: ' + error.message);
  }
};
