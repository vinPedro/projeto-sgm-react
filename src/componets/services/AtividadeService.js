import api from "./api";

const API_URL = "/atividades";

export const getAtividades = () => {
  return api.get(API_URL);
};

export const createAtividade = (atividadeData) => {
  return api.post(API_URL, atividadeData);
};

export const getAtividadeById = (id) => {
  return api.get(`${API_URL}/${id}`);
};

export const updateAtividade = (id, atividadeData) => {
  return api.put(`${API_URL}/${id}`, atividadeData);
};

export const deleteAtividade = (id) => {
  return api.delete(`${API_URL}/${id}`);
};

export const getMonitorias = () => {
  return api.get("/monitorias");
};