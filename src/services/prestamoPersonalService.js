import api from './api';
//obtener todos los prestamos
export const getPrestamosPersonales = async () => {
  try {
    const res = await api.get('/PrestamoPersonal');
    return res.data;
  } catch (error) {
    throw new Error('Error al obtener: ' + error.message);
  }
};
 // obtener un prestamo por Id
export const getPrestamoPersonalById = async (id) => {
  try {
    const res = await api.get(`/PrestamoPersonal/${id}`);
    return res.data;
  } catch (error) {
    throw new Error('Error al obtener: ' + error.message);
  }
};

// Crear un prestamo
export const createPrestamoPersonal = async (prestamo) => {
  try {
    const res = await api.post('/PrestamoPersonal', prestamo);
    return res.data;
  } catch (error) {
    throw new Error('Error al crear el prestamo: ' + error.message);
  }
};

// Actualizar un prestamo
export const updatePrestamoPersonal = async (id, prestamo) => {
  try {
    await api.put(`/PrestamoPersonal/${id}`, prestamo);
  } catch (error) {
    throw new Error('Error al actualizar el prestamo: ' + error.message);
  }
};

// Eliminar un prestamo
export const deletePrestamoPersonal = async (id) => {
  try {
    const res = await api.delete(`/PrestamoPersonal/${id}`);
    return res.data;
  } catch (error) {
    throw new Error('Error al eliminar el prestamo: ' + error.message);
  }
};
