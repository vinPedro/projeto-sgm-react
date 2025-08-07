import api from "./api";

const API_URL = "/monitorias";

export const getMonitorias = () => {
  return api.get(API_URL);
};

export const createMonitoria = (monitoriaData) => {
  return api.post(API_URL, monitoriaData);
};

export const getMonitoriaById = (id) => {
  return api.get(`${API_URL}/${id}`);
};

export const updateMonitoria = (id, monitoriaData) => {
  return api.put(`${API_URL}/${id}`, monitoriaData);
};

export const deleteMonitoria = (id) => {
  return api.delete(`${API_URL}/${id}`);
};

export const inscrever_seEmMonitoria = (inscricaoData) => {
  return api.post(`${API_URL}/inscricao`, inscricaoData);
};

export const getInscricoesPorAluno = (id) => {
  return api.get(`${API_URL}/inscricao/${id}`);
};

export const getMonitoriasPorProcessoSeletivo = (id) => {
  return api.get(`${API_URL}/processos-seletivos/${id}`);
};

export const cancelarInscricao = (inscricao) => {
  return api.delete(`${API_URL}/inscricao`,  {
    data: inscricao,
  } );
}

export const getAlunos = (id) => {
  return api.get(`${API_URL}/inscricao/alunos/${id}`);
};

export const getDisciplinas = () => {
  return api.get("/disciplinas");
};

export const getProfessores = () => {
  return api.get("/professores");
};

export const getProcessos = () => {
  return api.get("/processos-seletivos");
};