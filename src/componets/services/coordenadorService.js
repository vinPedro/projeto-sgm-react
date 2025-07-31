import api from "./api";

const API_URL = "/professores/coordenadores";

export const getCoordenadores = () => {
  return api.get(API_URL);
};

export const createCoordenador = (coordenadorData) => {
  return api.post(API_URL, coordenadorData);
};

export const getCoordenadorById = (id) => {
  return api.get(`${API_URL}/${id}`);
};

export const updateCoordenador = (id, coordenadorData) => {
  return api.put(`${API_URL}/${id}`, coordenadorData);
};

export const deleteCoordenador = (id) => {
  return api.delete(`${API_URL}/${id}`);
};

export const getCursos = () => {
  return api.get("/cursos/null-coordenadores");
};

export const getProfessores = () => {
  return api.get("/professores/null-coordenacao");
};
