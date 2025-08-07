import api from "./api";

const API_URL = "/alunos";

export const getAlunos = () => {
  return api.get(API_URL);
};

export const createAluno = (alunoData) => {
  return api.post(API_URL, alunoData);
};

export const getAlunoById = (id) => {
  return api.get(`${API_URL}/${id}`);
};

export const updateAluno = (id, alunoData) => {
  return api.put(`${API_URL}/${id}`, alunoData);
};

export const deleteAluno = (id) => {
  return api.delete(`${API_URL}/${id}`);
};

export const getDisciplinas = () => {
  return api.get("/disciplinas");
};

export const getInstituicoes = () => {
  return api.get("/instituicoes");
};