import api from "./api";

const API_URL = "/instituicoes";

export const getInstituicoes = () => {
  return api.get(API_URL);
};

export const createInstituicao = (instituicaoData) => {
  return api.post(API_URL, instituicaoData);
};

export const getInstituicaoById = (id) => {
  return api.get(`${API_URL}/${id}`);
};

export const updateInstituicao = (id, instituicaoData) => {
  return api.put(`${API_URL}/${id}`, instituicaoData);
};

export const deleteInstituicao = (id) => {
  return api.delete(`${API_URL}/${id}`);
};