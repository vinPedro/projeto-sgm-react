import api from "./api";

const API_URL = "/cursos";

export const getCursos = () => {
  return api.get(API_URL);
};

export const createCurso = (cursoData) => {
  return api.post(API_URL, cursoData);
};

export const getCursoById = (id) => {
  return api.get(`${API_URL}/${id}`);
};

export const updateCurso = (id, cursoData) => {
  return api.put(`${API_URL}/${id}`, cursoData);
};

export const deleteCurso = (id) => {
  return api.delete(`${API_URL}/${id}`);
};

export const getInstituicoes = () => {
  return api.get("/instituicoes");
};

export const getNiveis = () => {
  return [
  { label: "Graduação", value: "GRADUACAO" },
  { label: "Técnico", value: "TECNICO" },
  { label: "Mestrado", value: "MESTRADO" },
  { label: "Doutorado", value: "DOUTORADO" },
  { label: "Outro", value: "OUTRO" }
];
};