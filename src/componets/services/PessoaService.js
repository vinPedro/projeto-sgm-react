import api from "./api";

const API_URL = "/pessoas";

export const getPessoas = () => {
  return api.get(API_URL);
};

export const createPessoa = (pessoaData) => {
  return api.post(API_URL, pessoaData);
};

export const getPessoaById = (id) => {
  return api.get(`${API_URL}/${id}`);
};

export const updatePessoa = (id, pessoaData) => {
  return api.put(`${API_URL}/${id}`, pessoaData);
};

export const deletePessoa = (id) => {
  return api.delete(`${API_URL}/${id}`);
};

export const getInstituicoes = () => {
  return api.get("/instituicoes");
};