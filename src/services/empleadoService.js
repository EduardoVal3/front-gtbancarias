import api from './api';

// Obtener todos los empleados
export const getEmpleados = async () => {
  try {
    const res = await api.get('/empleado');
    return res.data;
  } catch (error) {
    throw new Error('Error al obtener empleados: ' + error.message);
  }
};

// Obtener un empleado por ID
export const getEmpleadoById = async (id) => {
  try {
    const res = await api.get(`/empleado/${id}`);
    return res.data;
  } catch (error) {
    throw new Error('Error al obtener el empleado: ' + error.message);
  }
};

// Crear un nuevo empleado
export const createEmpleado = async (empleado) => {
  try {
    const res = await api.post('/empleado', empleado);
    return res.data;
  } catch (error) {
    throw new Error('Error al crear el empleado: ' + error.message);
  }
};

// Actualizar un empleado existente
export const updateEmpleado = async (id, empleado) => {
  try {
    await api.put(`/empleado/${id}`, empleado);
  } catch (error) {
    throw new Error('Error al actualizar el empleado: ' + error.message);
  }
};

// Eliminar un empleado
export const deleteEmpleado = async (id) => {
  try {
    const res = await api.delete(`/empleado/${id}`);
    return res.data;
  } catch (error) {
    throw new Error('Error al eliminar el empleado: ' + error.message);
  }
};
