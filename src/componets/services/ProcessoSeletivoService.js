import api from "./api";

const API_URL = "/processos-seletivos";

export const getProcessos = () => {
  return api.get(API_URL);
};

export const createProcesso = (processoData) => {
  return api.post(API_URL, processoData);
};

export const getProcessoById = (id) => {
  return api.get(`${API_URL}/${id}`);
};

export const updateProcesso = (id, processoData) => {
  return api.put(`${API_URL}/${id}`, processoData);
};

export const deleteProcesso = (id) => {
  return api.delete(`${API_URL}/${id}`);
};

export const getInstituicoes = () => {
  return api.get("/instituicoes");
};

export const finalizarProcesso = (id) => {
  return api.put(`${API_URL}/resultado/${id}`);
};