import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

// --- Funções do CRUD de Coordenador ---

export const getCoordenadores = () => {
    return axios.get(`${API_URL}/coordenadores`);
};

export const createCoordenador = (coordenadorData) => {
    // O backend espera { professorId: ..., cursoId: ... }
    return axios.post(`${API_URL}/coordenadores`, coordenadorData);
};

export const deleteCoordenador = (id) => {
    return axios.delete(`${API_URL}/coordenadores/${id}`);
};


// --- Funções para popular os formulários ---

// Precisaremos disso no formulário para listar os professores no dropdown
export const getProfessores = () => {
    return axios.get(`${API_URL}/professores`); // Supondo que este endpoint exista
};

// E isso para listar os cursos
export const getCursos = () => {
    return axios.get(`${API_URL}/cursos`); // Supondo que este endpoint exista
};