import api from "./api";

const API_URL = "/professores";

export const getProfessores = () => {
  return api.get(API_URL);
};

export const createProfessor = (professorData) => {
  return api.post(API_URL, professorData);
};

export const getProfessorById = (id) => {
  return api.get(`${API_URL}/${id}`);
};

export const updateProfessor = (id, professorData) => {
  return api.put(`${API_URL}/${id}`, professorData);
};

export const deleteProfessor = (id) => {
  return api.delete(`${API_URL}/${id}`);
};