import api from "./api";

const API_URL = "/disciplinas";

export const getDisciplinas = () => {
  return api.get(API_URL);
};

export const createDisciplina = (disciplinaData) => {
  return api.post(API_URL, disciplinaData);
};

export const getDisciplinaById = (id) => {
  return api.get(`${API_URL}/${id}`);
};

export const updateDisciplina = (id, disciplinaData) => {
  return api.put(`${API_URL}/${id}`, disciplinaData);
};

export const deleteDisciplina = (id) => {
  return api.delete(`${API_URL}/${id}`);
};

export const getDisciplinasProfessor = (id) => {
  return api.get(`${API_URL}/professor/${id}`);
};

export const getCursos = () => {
  return api.get("/cursos");
};