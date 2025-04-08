import api from './api';

export const getClientes = async () => {
  const res = await api.get('/cliente');
  return res.data;
};

export const getClienteById = async (id) => {
  const res = await api.get(`/cliente/${id}`);
  return res.data;
};

export const createCliente = async (cliente) => {
  const res = await api.post('/cliente', cliente);
  return res.data;
};

export const updateCliente = async (id, cliente) => {
  await api.put(`/cliente/${id}`, cliente);
};

export const deleteCliente = async (id) => {
  const res = await api.delete(`/cliente/${id}`);
  return res.data;
};
