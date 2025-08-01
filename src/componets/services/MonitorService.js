import api from "./api";

const API_URL = "/alunos/monitores";

export const getMonitores = () => {
  return api.get(API_URL);
};

export const createMonitor = (coordenadorData) => {
  return api.post(API_URL, coordenadorData);
};

export const getMonitorById = (id) => {
  return api.get(`${API_URL}/${id}`);
};

export const updateMonitor = (id, coordenadorData) => {
  return api.put(`${API_URL}/${id}`, coordenadorData);
};

export const deleteMonitor = (id) => {
  return api.delete(`${API_URL}/${id}`);
};

export const getDisciplinas = () => {
  return api.get("/disciplinas");
};

export const getAlunos = () => {
  return api.get("/alunos/null-monitoria");
};
